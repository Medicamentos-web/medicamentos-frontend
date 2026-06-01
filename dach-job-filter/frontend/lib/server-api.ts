import type { SwissPortalsResponse } from "@/lib/types-portals";

export function getApiBase(): string {
  return process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8765";
}

export async function fetchSwissPortalsCatalog(): Promise<SwissPortalsResponse | null> {
  try {
    const res = await fetch(`${getApiBase()}/portals/switzerland`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
