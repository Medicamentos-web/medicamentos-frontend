import { parseJsonResponse } from "@/lib/parseJsonSafe";

export async function getAlerts(familyId) {
  const res = await fetch(`/api/alerts?family_id=${familyId}`, {
    credentials: "include",
  });
  if (!res.ok) return [];
  try {
    const data = await parseJsonResponse(res);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
