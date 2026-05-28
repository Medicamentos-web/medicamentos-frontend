"use client";

import Link from "next/link";
import type { Party } from "@/lib/types";
import CharacterAvatar from "./CharacterAvatar";

export default function PartyGrid({ parties }: { parties: Party[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {parties.map((party) => (
        <Link key={party.id} href={`/chat/${party.id}`} className="party-card group">
          <div className="flex gap-4">
            <CharacterAvatar party={party} size={56} />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 group-hover:text-red-700 transition-colors">
                {party.partyName}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{party.description}</p>
              <span
                className="inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${party.primaryColor}15`,
                  color: party.primaryColor,
                }}
              >
                {party.personality}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
