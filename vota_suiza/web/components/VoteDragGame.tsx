"use client";

import { useRef, useState } from "react";
import { CheckCircle, Timer } from "lucide-react";
import type { VotingQuestion } from "@/lib/types";
import { submitVote, unlockAchievement, ensureAuth } from "@/lib/firebase";

interface Props {
  question: VotingQuestion;
  ageRange: string;
  canton: string;
  language: string;
}

export default function VoteDragGame({ question, ageRange, canton, language }: Props) {
  const [option, setOption] = useState<"yes" | "no" | "abstention" | null>(null);
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [voted, setVoted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const dragStart = useRef<number | null>(null);

  async function handleDrop() {
    if (!option || submitting || voted) return;
    setSubmitting(true);

    try {
      await submitVote({
        ageRange,
        canton,
        language,
        voteOption: option,
        questionId: question.id,
      });

      const user = await ensureAuth();
      await unlockAchievement(user.uid, "voto_emitido", "Voto emitido", "Participaste en la simulación");

      if (dragStart.current && Date.now() - dragStart.current < 10000) {
        await unlockAchievement(user.uid, "votante_rapido", "Votante rápido", "Votaste en menos de 10 segundos");
      }

      setVoted(true);
    } catch {
      alert("Error al enviar el voto. Verifica Firebase.");
    } finally {
      setSubmitting(false);
    }
  }

  if (voted) {
    return (
      <div className="text-center py-12 bg-green-50 rounded-2xl border border-green-100">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h3 className="text-xl font-bold mt-4">¡Voto registrado!</h3>
        <p className="text-gray-600 mt-2">Tu voto anónimo se ha enviado a las estadísticas.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold">{question.title}</h2>
        <p className="text-gray-600 mt-2 leading-relaxed">{question.description}</p>
        <p className="text-xs text-gray-400 mt-2">Fecha: {question.date}</p>
      </div>

      <div>
        <p className="font-medium mb-3">Selecciona tu voto:</p>
        <div className="flex flex-wrap gap-2">
          {(["yes", "no", "abstention"] as const).map((o) => (
            <button
              key={o}
              onClick={() => setOption(o)}
              className={`px-5 py-2 rounded-full border-2 font-medium transition-all ${
                option === o
                  ? "border-red-500 bg-red-50 text-red-700"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {o === "yes" ? "Sí" : o === "no" ? "No" : "Abstención"}
            </button>
          ))}
        </div>
      </div>

      {option && (
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
          <div className="flex items-center gap-2 text-amber-800 text-sm mb-4">
            <Timer className="w-4 h-4" />
            Vota en menos de 10 segundos para la insignia &quot;Votante rápido&quot;
          </div>

          <div className="relative h-52 flex flex-col items-center justify-between">
            <div
              draggable
              onDragStart={() => {
                setDragging(true);
                dragStart.current = Date.now();
              }}
              onDragEnd={() => setDragging(false)}
              className={`ballot ${dragging ? "opacity-40" : ""}`}
            >
              PAPELETA
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); setHovering(true); }}
              onDragLeave={() => setHovering(false)}
              onDrop={(e) => {
                e.preventDefault();
                setHovering(false);
                setDragging(false);
                handleDrop();
              }}
              className={`urna-target border-amber-900 ${hovering ? "urna-hover" : ""}`}
            >
              <span className="text-3xl">🗳️</span>
              <span className="text-white font-bold text-sm mt-1">URNA</span>
            </div>
          </div>

          {submitting && (
            <p className="text-center text-gray-500 mt-4">Enviando voto...</p>
          )}
        </div>
      )}
    </div>
  );
}
