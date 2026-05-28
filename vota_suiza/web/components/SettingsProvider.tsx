"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { AppLanguage } from "@/lib/types";

interface Settings {
  language: AppLanguage;
  ageRange: string;
  canton: string;
  setLanguage: (l: AppLanguage) => void;
  setAgeRange: (r: string) => void;
  setCanton: (c: string) => void;
}

const SettingsContext = createContext<Settings | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<AppLanguage>("de");
  const [ageRange, setAgeRange] = useState("18_29");
  const [canton, setCanton] = useState("ZH");

  return (
    <SettingsContext.Provider
      value={{ language, ageRange, canton, setLanguage, setAgeRange, setCanton }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be inside SettingsProvider");
  return ctx;
}
