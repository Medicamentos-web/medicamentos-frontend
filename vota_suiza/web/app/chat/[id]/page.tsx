"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getParty } from "@/lib/data";
import ChatInterface from "@/components/ChatInterface";
import { useSettings } from "@/components/SettingsProvider";
import CharacterAvatar from "@/components/CharacterAvatar";
import { use } from "react";

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const party = getParty(id);
  const { language } = useSettings();

  if (!party) {
    return <p className="text-center text-gray-500">Partido no encontrado.</p>;
  }

  return (
    <div>
      <div
        className="flex items-center gap-3 mb-4 pb-4 border-b"
        style={{ borderColor: `${party.primaryColor}30` }}
      >
        <Link href="/" className="text-gray-400 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <CharacterAvatar party={party} size={40} />
        <div>
          <h1 className="font-bold">{party.partyName}</h1>
          <p className="text-xs text-gray-500">Chat con IA · {language.toUpperCase()}</p>
        </div>
        <Link
          href={`/timeline/${party.id}`}
          className="ml-auto text-sm text-gray-500 hover:text-red-600"
        >
          Ver historia →
        </Link>
      </div>
      <ChatInterface party={party} language={language} />
    </div>
  );
}
