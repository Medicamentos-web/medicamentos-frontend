"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import type { VoteStats } from "@/lib/firebase";

export default function StatsChart({ stats }: { stats: VoteStats[] }) {
  const active = stats.filter((s) => s.total > 0);

  if (active.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        Aún no hay votos para este filtro.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={active} barGap={2}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="ageRange" tick={{ fontSize: 12 }} />
        <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 12 }} />
        <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
        <Legend />
        <Bar dataKey="yes" name="Sí" fill="#22c55e" radius={[4, 4, 0, 0]} />
        <Bar dataKey="no" name="No" fill="#ef4444" radius={[4, 4, 0, 0]} />
        <Bar dataKey="abstention" name="Abstención" fill="#9ca3af" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
