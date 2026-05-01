import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "../../../components/ScrollReveal";

type AnalysisResult = {
  kdaMedia: number;
  winrate: number;
  goldMedia: number;
  danoMedia: number;
  insight: string;
  planoAcao: string[];
};

const mockMatches = Array.from({ length: 20 }).map((_, i) => ({
  kda: Math.random() * 6,
  win: Math.random() > 0.45 ? 1 : 0,
  gold: 11000 + Math.random() * 6000,
  dano: 25000 + Math.random() * 30000,
}));

function analyzeMatches(): AnalysisResult {
  const total = mockMatches.length;

  const kdaMedia =
    mockMatches.reduce((acc, m) => acc + m.kda, 0) / total;

  const winrate =
    (mockMatches.reduce((acc, m) => acc + m.win, 0) / total) * 100;

  const goldMedia =
    mockMatches.reduce((acc, m) => acc + m.gold, 0) / total;

  const danoMedia =
    mockMatches.reduce((acc, m) => acc + m.dano, 0) / total;

  let insight = "";
  let planoAcao: string[] = [];

  if (winrate < 45) {
    insight = "Você está perdendo controle de mid game e decisões de objetivo.";
    planoAcao = [
      "Reduzir mortes antes dos 15 minutos",
      "Priorizar visão em dragão/barão",
      "Evitar fights sem vantagem numérica",
    ];
  } else if (kdaMedia < 3) {
    insight = "Problema forte de sobrevivência em fights.";
    planoAcao = [
      "Melhorar posicionamento em teamfights",
      "Evitar engage sozinho",
      "Aumentar uso defensivo de flash/cleanse",
    ];
  } else {
    insight = "Performance consistente com bom impacto geral.";
    planoAcao = [
      "Explorar mais agressividade no early game",
      "Forçar mais objetivos após vantagem",
      "Melhorar consistência de farm",
    ];
  }

  return {
    kdaMedia,
    winrate,
    goldMedia,
    danoMedia,
    insight,
    planoAcao,
  };
}

export default function AnalyzePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);

    // simula "IA pensando"
    setTimeout(() => {
      const res = analyzeMatches();
      setResult(res);
      setLoading(false);
    }, 1800);
  };

  return (
    <div className="p-8 min-h-screen bg-[#0B132B] text-[#E0E0E0]">
      <ScrollReveal preset="up">
        <h1 className="text-3xl font-bold mb-2">Análise de Performance</h1>
        <p className="text-[#A8A8A8] mb-6">
          IA analisa suas últimas 20 partidas ranked
        </p>
      </ScrollReveal>

      <motion.button
        onClick={handleAnalyze}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 rounded-xl bg-[#0077B6] hover:bg-[#00B4D8] font-semibold transition"
      >
        Analisar últimas 20 partidas
      </motion.button>

      {loading && (
        <div className="mt-8 text-[#A8A8A8] animate-pulse">
          IA analisando padrões de jogo...
        </div>
      )}

      {result && !loading && (
        <div className="mt-8 space-y-6">
          {/* métricas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Metric label="KDA Médio" value={result.kdaMedia.toFixed(2)} />
            <Metric label="Winrate" value={`${result.winrate.toFixed(0)}%`} />
            <Metric label="Gold Médio" value={String(Math.round(result.goldMedia))} />
            <Metric label="Dano Médio" value={String(Math.round(result.danoMedia))} />
          </div>

          {/* insight */}
          <div className="bg-[#1D2D50] p-5 rounded-xl border border-white/5">
            <h2 className="font-semibold mb-2 text-[#00B4D8]">
              Diagnóstico
            </h2>
            <p className="text-[#A8A8A8]">{result.insight}</p>
          </div>

          {/* plano de ação */}
          <div className="bg-[#1D2D50] p-5 rounded-xl border border-white/5">
            <h2 className="font-semibold mb-3 text-[#4CAF50]">
              Plano de Ação
            </h2>

            <ul className="space-y-2">
              {result.planoAcao.map((item, i) => (
                <li key={i} className="flex gap-2 text-[#A8A8A8]">
                  <span className="text-[#00B4D8]">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#1D2D50] p-4 rounded-lg border border-white/5">
      <div className="text-sm text-[#A8A8A8]">{label}</div>
      <div className="text-xl font-bold text-[#E0E0E0]">{value}</div>
    </div>
  );
}