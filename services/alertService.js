export async function getAlerts(familyId) {
  const res = await fetch(`/api/alerts?family_id=${familyId}`, {
    credentials: "include",
  });
  if (!res.ok) return [];
  return res.json();
}
