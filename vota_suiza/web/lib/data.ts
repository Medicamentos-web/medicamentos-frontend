import parties from "@/data/parties.json";
import history from "@/data/history.json";
import questions from "@/data/voting_questions.json";
import type { Party, HistoryEvent, VotingQuestion } from "./types";

export function getParties(): Party[] {
  return parties as Party[];
}

export function getParty(id: string): Party | undefined {
  return getParties().find((p) => p.id === id);
}

export function getHistory(partyId: string): HistoryEvent[] {
  const entry = (history as { partyId: string; events: HistoryEvent[] }[]).find(
    (h) => h.partyId === partyId
  );
  return entry?.events ?? [];
}

export function getVotingQuestions(): VotingQuestion[] {
  return questions as VotingQuestion[];
}

export async function loadPrompt(partyId: string): Promise<string> {
  const mod = await import(`@/data/prompts/${partyId}.json`);
  return mod.default.systemPrompt as string;
}
