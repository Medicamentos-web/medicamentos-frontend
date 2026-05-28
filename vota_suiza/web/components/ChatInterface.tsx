"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Send, Volume2 } from "lucide-react";
import type { Party, ChatMessage, AppLanguage } from "@/lib/types";
import CharacterAvatar from "./CharacterAvatar";
import { onAuthReady, trackDialogue, unlockAchievement } from "@/lib/firebase";

interface Props {
  party: Party;
  language: AppLanguage;
}

export default function ChatInterface({ party, language }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<{ role: string; text: string }[]>([]);

  useEffect(() => {
    return onAuthReady(setUid);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function playTts(text: string) {
    if (language === "rm") return;
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voiceId: party.elevenLabsVoiceId }),
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      await audio.play();
    } catch {}
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setLoading(true);
    setMessages((m) => [...m, { text, isUser: true, timestamp: Date.now() }]);
    historyRef.current.push({ role: "user", text });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partyId: party.id,
          message: text,
          language,
          history: historyRef.current.slice(0, -1),
        }),
      });

      const data = await res.json();
      const reply = data.text ?? data.error ?? "Error al obtener respuesta.";

      historyRef.current.push({ role: "model", text: reply });
      setMessages((m) => [...m, { text: reply, isUser: false, timestamp: Date.now() }]);
      await playTts(reply);

      if (uid) {
        await trackDialogue(uid, party.id);
        await unlockAchievement(uid, "primer_dialogo", "Primer diálogo", "Primer chat con un partido");
      }
    } catch {
      setMessages((m) => [
        ...m,
        { text: "Error de conexión. Inténtalo de nuevo.", isUser: false, timestamp: Date.now() },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <CharacterAvatar party={party} size={80} />
            <p className="mt-4 text-lg font-medium">¡Hola! Soy {party.partyName}</p>
            <p className="text-gray-500 mt-1">Pregúntame sobre nuestras propuestas.</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-3 ${msg.isUser ? "chat-bubble-user" : "chat-bubble-bot"}`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              {!msg.isUser && language !== "rm" && (
                <button
                  onClick={() => playTts(msg.text)}
                  className="mt-2 flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800"
                >
                  <Volume2 className="w-3 h-3" /> Escuchar
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" /> Escribiendo...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Escribe tu pregunta..."
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-200"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="w-12 h-12 rounded-full gradient-hero text-white flex items-center justify-center disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
