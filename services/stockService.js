export async function updateMedStock(scheduleId, status, familyId, date) {
  const res = await fetch(`/api/meds-toggle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      schedule_id: scheduleId,
      status,
      family_id: familyId,
      date,
    }),
  });
  return res.ok;
}
