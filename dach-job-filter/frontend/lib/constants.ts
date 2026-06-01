export type CountryCode = "CH" | "DE" | "AT";

export const COUNTRIES: { code: CountryCode; label: string }[] = [
  { code: "CH", label: "Suiza" },
  { code: "DE", label: "Alemania" },
  { code: "AT", label: "Austria" },
];

export const REGIONS: Record<CountryCode, string[]> = {
  CH: [
    "All regions",
    "Zürich",
    "Zurich",
    "Geneva",
    "Basel",
    "Bern",
    "Lausanne",
    "Lucerne",
    "St. Gallen",
    "Lugano",
  ],
  DE: [
    "All regions",
    "Berlin",
    "Munich",
    "München",
    "Hamburg",
    "Frankfurt",
    "Cologne",
    "Köln",
    "Stuttgart",
    "Düsseldorf",
    "Leipzig",
    "Dresden",
  ],
  AT: [
    "All regions",
    "Vienna",
    "Wien",
    "Salzburg",
    "Graz",
    "Linz",
    "Innsbruck",
    "Tyrol",
  ],
};

export const PCT_BANDS = [
  { id: "20-40", label: "20–40%" },
  { id: "40-60", label: "40–60%" },
  { id: "60-80", label: "60–80%" },
  { id: "80-100", label: "80–100%" },
] as const;

export const CATEGORIES = [
  "IT Support",
  "System Administration",
  "Cybersecurity",
  "Helpdesk",
  "Administrative",
] as const;

export const LANGUAGE_OPTIONS = [
  { id: "german_b1", label: "Alemán B1" },
  { id: "german_b2", label: "Alemán B2" },
  { id: "german_c1", label: "Alemán C1" },
  { id: "english", label: "Inglés" },
] as const;

export const WORK_MODELS = [
  { id: "remote", label: "Remoto" },
  { id: "hybrid", label: "Híbrido" },
  { id: "onsite", label: "Presencial" },
] as const;
