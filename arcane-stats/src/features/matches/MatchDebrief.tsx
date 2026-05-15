import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useCallback } from "react";
import { X, TrendingUp, TrendingDown, Zap, Target, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

import type { Partida } from './types';

type EventType = "erro" | "acerto" | "turning";

type MatchEvent = {
  time: string;
  type: EventType;
  title: string;
  description: string;
  impacto: number;
};

type Insight = {
  resumo: string;
  detalhe: string;
  plano: string[];
};

type MatchDebriefProps = {
  match: Partida;
  onClose: () => void;
};

// ---------- Data builders (puros, fáceis de testar) ----------

const DEFEAT_EVENTS: MatchEvent[] = [
  {
    time: "08:30",
    type: "erro",
    title: "Morte evitável",
    description: "Avançou sem visão no rio.",
    impacto: -10,
  },
  {
    time: "14:10",
    type: "erro",
    title: "Fight ruim",
    description: "Entrou sem vantagem numérica.",
    impacto: -18,
  },
  {
    time: "21:00",
    type: "turning",
    title: "Turning Point",
    description: "Teamfight perdida que levou ao Barão inimigo.",
    impacto: -28,
  },
];

const VICTORY_EVENTS: MatchEvent[] = [
  {
    time: "05:20",
    type: "acerto",
    title: "Boa troca",
    description: "Pressão na lane com vantagem.",
    impacto: 8,
  },
  {
    time: "12:40",
    type: "acerto",
    title: "Objetivo garantido",
    description: "Rotação correta para o dragão.",
    impacto: 15,
  },
  {
    time: "20:10",
    type: "turning",
    title: "Clutch Fight",
    description: "Execução perfeita que virou o jogo.",
    impacto: 25,
  },
];

const DEFEAT_INSIGHT: Insight = {
  resumo: "Você perdeu controle após o mid game.",
  detalhe:
    "As decisões após ganhar ou perder vantagem foram inconsistentes, especialmente sem visão.",
  plano: [
    "Evitar avançar sem controle de visão",
    "Aguardar vantagem numérica antes de fights",
    "Priorizar objetivos ao invés de kills",
  ],
};

const VICTORY_INSIGHT: Insight = {
  resumo: "Boa execução com impacto consistente.",
  detalhe:
    "Você soube transformar vantagem em objetivos e manteve controle do ritmo da partida.",
  plano: [
    "Aumentar agressividade no early",
    "Punir mais erros do inimigo",
    "Refinar controle de wave",
  ],
};

function generateEvents(match: Partida): MatchEvent[] {
  return match.resultado === "Derrota" ? DEFEAT_EVENTS : VICTORY_EVENTS;
}

function getMatchInsight(match: Partida): Insight {
  return match.resultado === "Derrota" ? DEFEAT_INSIGHT : VICTORY_INSIGHT;
}

// ---------- Style helpers ----------

const EVENT_STYLES: Record<
  EventType,
  { wrapper: string; iconWrapper: string; Icon: typeof AlertTriangle; label: string }
> = {
  erro: {
    wrapper: "border-red-500/30 bg-red-500/5 hover:bg-red-500/10",
    iconWrapper: "bg-red-500/15 text-red-400",
    Icon: AlertTriangle,
    label: "Erro",
  },
  acerto: {
    wrapper: "border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10",
    iconWrapper: "bg-emerald-500/15 text-emerald-400",
    Icon: CheckCircle2,
    label: "Acerto",
  },
  turning: {
    wrapper: "border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10",
    iconWrapper: "bg-amber-500/15 text-amber-400",
    Icon: Zap,
    label: "Turning Point",
  },
};

// ---------- Component ----------

export default function MatchDebrief({ match, onClose }: MatchDebriefProps) {
  const events = useMemo(() => generateEvents(match), [match]);
  const insight = useMemo(() => getMatchInsight(match), [match]);

  const totalImpacto = useMemo(
    () => events.reduce((acc, e) => acc + e.impacto, 0),
    [events]
  );

  // Fecha no ESC
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [handleKeyDown]);

  const isVitoria = match.resultado === "Vitória";

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center items-start overflow-y-auto p-4 sm:p-6"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="debrief-title"
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl bg-[#0B132B] rounded-2xl border border-white/10 shadow-2xl my-4"
        >
          {/* HEADER */}
          <div className="p-6 border-b border-white/10 flex justify-between items-start gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    isVitoria
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-red-500/15 text-red-400"
                  }`}
                >
                  {match.resultado}
                </span>
                <span className="text-xs text-[#A8A8A8]">Partida #{match.id}</span>
              </div>
              <h2
                id="debrief-title"
                className="text-xl sm:text-2xl font-bold text-[#E0E0E0] truncate"
              >
                Debrief da Partida
              </h2>
              <p className="text-sm text-[#A8A8A8] mt-1">
                {match.campeao} • {match.role} • KDA {match.kda}
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Fechar debrief"
              className="shrink-0 p-2 rounded-lg text-[#A8A8A8] hover:text-white hover:bg-white/5 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* STATS RÁPIDAS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-6 border-b border-white/10">
            <StatCard label="Gold" value={match.gold.toLocaleString("pt-BR")} />
            <StatCard label="Dano" value={match.dano.toLocaleString("pt-BR")} />
            <StatCard label="Visão" value={match.visao.toString()} />
            <StatCard
              label="Impacto total"
              value={`${totalImpacto > 0 ? "+" : ""}${totalImpacto}%`}
              valueClassName={totalImpacto >= 0 ? "text-emerald-400" : "text-red-400"}
              icon={
                totalImpacto >= 0 ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )
              }
            />
          </div>

          <div className="p-6 space-y-6">
            {/* TIMELINE */}
            <section aria-labelledby="timeline-title">
              <h3
                id="timeline-title"
                className="text-lg font-semibold mb-4 text-[#00B4D8] flex items-center gap-2"
              >
                <Target size={18} />
                Timeline Estratégica
              </h3>

              <ol className="space-y-3">
                {events.map((e, i) => {
                  const style = EVENT_STYLES[e.type];
                  const Icon = style.Icon;
                  const positivo = e.impacto > 0;

                  return (
                    <motion.li
                      key={`${e.time}-${i}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.25 }}
                      className={`p-4 rounded-lg border transition-colors ${style.wrapper}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${style.iconWrapper}`}
                          aria-hidden="true"
                        >
                          <Icon size={18} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center gap-2">
                            <span className="font-semibold text-[#E0E0E0]">
                              {e.title}
                            </span>
                            <span className="text-xs text-[#A8A8A8] tabular-nums">
                              {e.time}
                            </span>
                          </div>

                          <p className="text-sm text-[#A8A8A8] mt-1">
                            {e.description}
                          </p>

                          <div className="text-xs mt-2 flex items-center gap-1 text-[#A8A8A8]">
                            <span className="sr-only">{style.label}.</span>
                            Impacto:{" "}
                            <span
                              className={`font-semibold ${
                                positivo ? "text-emerald-400" : "text-red-400"
                              }`}
                            >
                              {positivo ? "+" : ""}
                              {e.impacto}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </ol>
            </section>

            {/* INSIGHT */}
            <section
              aria-labelledby="insight-title"
              className="bg-[#1D2D50] p-5 rounded-xl border border-white/5"
            >
              <h3
                id="insight-title"
                className="text-[#00B4D8] font-semibold mb-2"
              >
                Diagnóstico da Partida
              </h3>
              <p className="text-[#E0E0E0]">{insight.resumo}</p>
              <p className="text-sm text-[#A8A8A8] mt-2">{insight.detalhe}</p>
            </section>

            {/* PLANO */}
            <section
              aria-labelledby="plano-title"
              className="bg-[#1D2D50] p-5 rounded-xl border border-white/5"
            >
              <h3
                id="plano-title"
                className="text-[#4CAF50] font-semibold mb-3"
              >
                Ajustes Sugeridos
              </h3>

              <ul className="space-y-2">
                {insight.plano.map((p, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[#A8A8A8] text-sm"
                  >
                    <ArrowRight
                      size={16}
                      className="text-[#00B4D8] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ---------- Subcomponentes ----------

function StatCard({
  label,
  value,
  valueClassName = "text-[#E0E0E0]",
  icon,
}: {
  label: string;
  value: string;
  valueClassName?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
      <div className="text-[11px] uppercase tracking-wide text-[#A8A8A8]">
        {label}
      </div>
      <div
        className={`mt-1 font-semibold flex items-center gap-1 tabular-nums ${valueClassName}`}
      >
        {icon}
        {value}
      </div>
    </div>
  );
}
