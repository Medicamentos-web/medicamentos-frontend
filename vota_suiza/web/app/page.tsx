import { getParties } from "@/lib/data";
import PartyGrid from "@/components/PartyGrid";
import LanguageSelector from "@/components/LanguageSelector";

export default function HomePage() {
  const parties = getParties();

  return (
    <div>
      <section className="gradient-hero rounded-3xl p-8 text-white mb-8 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">🇨🇭 Explora la política suiza</h1>
            <p className="mt-3 text-white/90 leading-relaxed max-w-xl">
              Dialoga con personajes virtuales de los principales partidos, descubre su historia
              y participa en una simulación de votación 100% anónima.
            </p>
          </div>
          <LanguageSelector />
        </div>
        <div className="flex gap-2 mt-4">
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">Gemini IA</span>
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">ElevenLabs Voz</span>
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">Firebase</span>
        </div>
      </section>

      <h2 className="text-xl font-bold mb-4">Elige un partido</h2>
      <PartyGrid parties={parties} />
    </div>
  );
}
