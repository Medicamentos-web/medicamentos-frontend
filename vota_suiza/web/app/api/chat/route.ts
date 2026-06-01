import { NextRequest, NextResponse } from "next/server";

import svp from "@/data/prompts/svp.json";
import sp from "@/data/prompts/sp.json";
import fdp from "@/data/prompts/fdp.json";
import cvp from "@/data/prompts/cvp.json";
import gps from "@/data/prompts/gps.json";

const PROMPTS: Record<string, { systemPrompt: string }> = {
  svp,
  sp,
  fdp,
  cvp,
  gps,
};

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

interface ChatHistoryItem {
  role: string;
  text: string;
}

export async function POST(req: NextRequest) {
  try {
    const { partyId, message, language, history } = (await req.json()) as {
      partyId: string;
      message: string;
      language: string;
      history?: ChatHistoryItem[];
    };

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY no configurada en .env.local" },
        { status: 500 }
      );
    }

    const promptData = PROMPTS[partyId];
    if (!promptData) {
      return NextResponse.json(
        { error: `Prompt no encontrado para partyId=${partyId}` },
        { status: 404 }
      );
    }

    const systemPrompt = promptData.systemPrompt;

    const contents: { role: string; parts: { text: string }[] }[] = [];
    if (history?.length) {
      for (const msg of history) {
        contents.push({
          role: msg.role,
          parts: [{ text: msg.text }],
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: `Responde en idioma: ${language}.\n\nMensaje: ${message}` }],
    });

    const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json(
        { error: `Gemini API error ${res.status}: ${err}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "No pude generar una respuesta.";

    return NextResponse.json({ text });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Error desconocido" },
      { status: 500 }
    );
  }
}
