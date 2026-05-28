"use client";

import { LANGUAGES } from "@/lib/types";
import { useSettings } from "./SettingsProvider";

export default function LanguageSelector() {
  const { language, setLanguage } = useSettings();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as typeof language)}
      className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white"
    >
      {LANGUAGES.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}{!l.tts ? " (solo texto)" : ""}
        </option>
      ))}
    </select>
  );
}
