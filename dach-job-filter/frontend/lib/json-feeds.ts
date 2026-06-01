/** Feeds JSON del backend (`GET /jobs`, `/jobs/search` → query `sources`). */

export const JSON_JOB_FEEDS = [
  {
    id: "arbeitnow",
    label: "Arbeitnow",
    hint: "Agregador internacional; conviene filtrar país y/o desmarcar si solo buscas Suiza.",
  },
  {
    id: "remotive",
    label: "Remotive",
    hint: "Ofertas remotas.",
  },
  {
    id: "jobicy",
    label: "Jobicy",
    hint: "Remoto.",
  },
  {
    id: "himalayas",
    label: "Himalayas",
    hint: "Remoto / restricciones de ubicación.",
  },
] as const;

export type JsonFeedId = (typeof JSON_JOB_FEEDS)[number]["id"];

export const ALL_JSON_FEED_IDS: JsonFeedId[] = JSON_JOB_FEEDS.map((f) => f.id);
