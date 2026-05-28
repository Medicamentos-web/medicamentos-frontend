"use client";

import { getVotingQuestions } from "@/lib/data";
import VoteDragGame from "@/components/VoteDragGame";
import { useSettings } from "@/components/SettingsProvider";
import { AGE_RANGES, SWISS_CANTONS } from "@/lib/types";

export default function VotePage() {
  const questions = getVotingQuestions();
  const { ageRange, canton, language, setAgeRange, setCanton } = useSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Simulación de voto</h1>
      <p className="text-gray-500 mb-6">Arrastra tu papeleta a la urna. Datos 100% anónimos.</p>

      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-white rounded-2xl border border-gray-100">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Edad</label>
          <select
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            {AGE_RANGES.map((r) => (
              <option key={r.code} value={r.code}>{r.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Cantón</label>
          <select
            value={canton}
            onChange={(e) => setCanton(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            {SWISS_CANTONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {questions[0] && (
        <VoteDragGame
          question={questions[0]}
          ageRange={ageRange}
          canton={canton}
          language={language}
        />
      )}
    </div>
  );
}
