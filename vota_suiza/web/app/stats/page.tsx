"use client";

import { useEffect, useState } from "react";
import StatsChart from "@/components/StatsChart";
import { watchVotes, calcStats, type VoteStats } from "@/lib/firebase";
import { SWISS_CANTONS } from "@/lib/types";

export default function StatsPage() {
  const [canton, setCanton] = useState("ALL");
  const [stats, setStats] = useState<VoteStats[]>([]);

  useEffect(() => {
    const unsub = watchVotes(canton, (votes) => setStats(calcStats(votes)));
    return unsub;
  }, [canton]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Estadísticas anónimas</h1>
      <p className="text-gray-500 mb-6">Resultados en tiempo real por rango de edad.</p>

      <div className="flex items-center gap-3 mb-6">
        <label className="text-sm font-medium">Cantón:</label>
        <select
          value={canton}
          onChange={(e) => setCanton(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="ALL">Todos</option>
          {SWISS_CANTONS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <StatsChart stats={stats} />
      </div>
    </div>
  );
}
