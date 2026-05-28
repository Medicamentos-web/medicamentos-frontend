"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getParty, getHistory } from "@/lib/data";

export default function TimelinePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const party = getParty(id);
  const events = getHistory(id).sort((a, b) => b.year - a.year);

  if (!party) return <p>Partido no encontrado.</p>;

  return (
    <div>
      <Link href={`/chat/${id}`} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6">
        <ArrowLeft className="w-4 h-4" /> Volver al chat
      </Link>
      <h1 className="text-2xl font-bold mb-6" style={{ color: party.primaryColor }}>
        Historia — {party.partyName}
      </h1>
      <div className="space-y-4">
        {events.map((event, i) => (
          <details key={i} className="bg-white rounded-2xl border border-gray-100 p-5 group">
            <summary className="cursor-pointer font-medium flex items-center gap-3">
              <span
                className="text-sm font-bold px-2 py-0.5 rounded"
                style={{ backgroundColor: `${party.primaryColor}15`, color: party.primaryColor }}
              >
                {event.year}
              </span>
              {event.title}
            </summary>
            <p className="mt-3 text-gray-600 leading-relaxed">{event.description}</p>
            {event.relatedProposal && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm">
                <p className="font-medium text-gray-800 mb-1">Relación con propuesta actual</p>
                <p className="text-gray-600">{event.relatedProposal}</p>
              </div>
            )}
          </details>
        ))}
      </div>
    </div>
  );
}
