export type AppLanguage = "de" | "fr" | "it" | "rm";

export interface Party {
  id: string;
  partyName: string;
  description: string;
  personality: string;
  primaryColor: string;
  avatarAsset: string;
  initials: string;
  languages: AppLanguage[];
  promptFile: string;
  elevenLabsVoiceId: string;
}

export interface HistoryEvent {
  year: number;
  title: string;
  description: string;
  relatedProposal?: string;
}

export interface VotingQuestion {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: number;
}

export interface VoteRecord {
  ageRange: string;
  canton: string;
  language: string;
  voteOption: string;
}

export const AGE_RANGES = [
  { code: "under_18", label: "< 18" },
  { code: "18_29", label: "18-29" },
  { code: "30_44", label: "30-44" },
  { code: "45_59", label: "45-59" },
  { code: "60_plus", label: "60+" },
];

export const SWISS_CANTONS = [
  "AG", "AI", "AR", "BE", "BL", "BS", "FR", "GE", "GL", "GR",
  "JU", "LU", "NE", "NW", "OW", "SG", "SH", "SO", "SZ", "TG",
  "TI", "UR", "VD", "VS", "ZG", "ZH",
];

export const LANGUAGES: { code: AppLanguage; label: string; tts: boolean }[] = [
  { code: "de", label: "Deutsch", tts: true },
  { code: "fr", label: "Français", tts: true },
  { code: "it", label: "Italiano", tts: true },
  { code: "rm", label: "Rumantsch", tts: false },
];
