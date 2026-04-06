import { parseJsonResponse } from "@/lib/parseJsonSafe";

export async function getMedicinesByDate(userId, selectedDate, familyId) {
  const date = selectedDate.toISOString().slice(0, 10);
  const url = `/api/meds-by-date?user_id=${userId}&family_id=${familyId}&date=${date}`;
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    return [];
  }
  try {
    const data = await parseJsonResponse(res);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
