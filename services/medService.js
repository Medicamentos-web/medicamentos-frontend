export async function getMedicinesByDate(userId, selectedDate, familyId) {
  const date = selectedDate.toISOString().slice(0, 10);
  const url = `/api/meds-by-date?user_id=${userId}&family_id=${familyId}&date=${date}`;
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    return [];
  }
  return res.json();
}
