import type { SearchParams } from "@/lib/api";
import type { CountryCode } from "@/lib/constants";

/** Parámetros exactos de API + estado del sidebar (sin estado obsoleto). */
export type QuickSearchPreset = {
  id: string;
  label: string;
  hint: string;
  ui: {
    country: CountryCode;
    region: string;
    pctBand: string;
    category: string;
    languages: string[];
    workModel: string;
    /** Sincronizado con búsqueda por texto (`q`). */
    keywords?: string;
  };
  params: SearchParams;
};

/** Atajos típicos Suiza (Teilzeit ~20–40 % en banda del filtro). */
export const SWISS_QUICK_PRESETS: QuickSearchPreset[] = [
  {
    id: "ch-it-support-zurich-20-40",
    label: "IT Support · 20–40 % · Zürich",
    hint: "Suiza, ciudad/región Zürich, categoría IT Support",
    ui: {
      country: "CH",
      region: "Zürich",
      pctBand: "20-40",
      category: "IT Support",
      languages: [],
      workModel: "",
      keywords: "support",
    },
    params: {
      country: "CH",
      region: "Zürich",
      pct_band: "20-40",
      category: "IT Support",
      languages: [],
      work_model: null,
      keywords: "support",
    },
  },
  {
    id: "ch-helpdesk-zurich-20-40",
    label: "Helpdesk · 20–40 % · Zürich",
    hint: "Alternativa cercana a «IT Supporter» / service desk",
    ui: {
      country: "CH",
      region: "Zürich",
      pctBand: "20-40",
      category: "Helpdesk",
      languages: [],
      workModel: "",
      keywords: "helpdesk",
    },
    params: {
      country: "CH",
      region: "Zürich",
      pct_band: "20-40",
      category: "Helpdesk",
      languages: [],
      work_model: null,
      keywords: "helpdesk",
    },
  },
  {
    id: "ch-it-support-zurich-20-40-de-en",
    label: "IT Support · 20–40 % · Zürich · DE + EN",
    hint: "Misma zona con idiomas (menos resultados, más afinados)",
    ui: {
      country: "CH",
      region: "Zürich",
      pctBand: "20-40",
      category: "IT Support",
      languages: ["german_b2", "english"],
      workModel: "",
      keywords: "support",
    },
    params: {
      country: "CH",
      region: "Zürich",
      pct_band: "20-40",
      category: "IT Support",
      languages: ["german_b2", "english"],
      work_model: null,
      keywords: "support",
    },
  },
  {
    id: "ch-it-support-geneva-20-40",
    label: "IT Support · 20–40 % · Geneva",
    hint: "Romandía (Geneva en ubicación)",
    ui: {
      country: "CH",
      region: "Geneva",
      pctBand: "20-40",
      category: "IT Support",
      languages: [],
      workModel: "",
      keywords: "support",
    },
    params: {
      country: "CH",
      region: "Geneva",
      pct_band: "20-40",
      category: "IT Support",
      languages: [],
      work_model: null,
      keywords: "support",
    },
  },
];
