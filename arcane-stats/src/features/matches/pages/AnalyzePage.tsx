import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  Target,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Swords,
  Users,
  BarChart3,
  Flame,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import ScrollReveal from "../../../components/ScrollReveal";
import DarkVeilBackground from "../../../components/DarkVeilBackground";
import KPICard from "../../../components/KPICard";
import PerformanceRadar from "../../../components/PerformanceRadar";
import TrendChart from "../../../components/TrendChart";
import SpotlightCard from "../../../components/SpotlightCard";
import MetricBenchmarkRow from "../components/MetricBenchmarkRow";
import ActionAccordion from "../components/ActionAccordion";
import { useImageFallback } from "../../../shared/hooks/useImageFallback";
import { useAssets } from "../../../hooks/useAssets";
import type { AnalysisReport } from "../analysisTypes";
import { MOCK_ANALYSIS } from "../mockAnalysis";

type PageState = "idle" | "loading" | "ready";

function gradeStyle(grade: string) {
  const g = grade[0];
  if (g === "S")
    return {
      text: "text-primary",
      border: "border-primary/30",
      bg: "bg-primary/10",
      accent: "border-l-4 border-l-primary",
    };
  if (g === "A")
    return {
      text: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
      accent: "border-l-4 border-l-emerald-500",
    };
  if (g === "B")
    return {
      text: "text-amber-400",
      border: "border-amber-500/30",
      bg: "bg-amber-500/10",
      accent: "border-l-4 border-l-amber-500",
    };
  return {
    text: "text-rose-400",
    border: "border-rose-500/30",
    bg: "bg-rose-500/10",
    accent: "border-l-4 border-l-rose-500",
  };
}

function poolGrade(grade: string) {
  const g = grade[0];
  if (g === "S") return "bg-primary/15 text-primary border-primary/30";
  if (g === "A")
    return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
  if (g === "B") return "bg-amber-500/15 text-amber-400 border-amber-500/30";
  return "bg-rose-500/15 text-rose-400 border-rose-500/30";
}

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-9 w-9 shrink-0 flex items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
        {icon}
      </div>
      <div>
        <h2 className="space-grotesk-title text-lg sm:text-xl font-bold text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-36 rounded-2xl bg-white/5" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-xl bg-white/5" />
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-64 rounded-2xl bg-white/5" />
        <div className="h-64 rounded-2xl bg-white/5" />
      </div>
      <div className="h-72 rounded-2xl bg-white/5" />
    </div>
  );
}

function buildKpis(report: AnalysisReport) {
  const winrateItem = report.recentVsOld.find((r) => r.label === "Winrate");
  const kdaMetric = report.metricas.find((m) => m.name === "KDA");
  const goldMetric = report.metricas.find((m) => m.name === "Gold/min");
  const goldMeta = report.metas.find((m) => m.metric === "Gold/min");
  const bestChamp = report.pool[0];

  const wDelta =
    winrateItem && winrateItem.old > 0
      ? Math.round((winrateItem.recent / winrateItem.old - 1) * 100)
      : 0;

  return [
    {
      title: "Taxa de Vitória",
      value: `${winrateItem?.recent ?? 0}%`,
      feedback:
        wDelta >= 0 ? `+${wDelta}% vs anterior` : `${wDelta}% vs anterior`,
    },
    {
      title: "KDA Médio",
      value: (kdaMetric?.value ?? 0).toFixed(1),
      feedback:
        (kdaMetric?.deviation ?? 0) >= 0
          ? "↑ Acima da média do ELO"
          : "↓ Abaixo da média do ELO",
    },
    {
      title: "Gold/min",
      value: String(Math.round(goldMetric?.value ?? 0)),
      feedback: goldMeta ? `meta: ${goldMeta.target}g/min` : "",
    },
    {
      title: "Melhor Campeão",
      value: bestChamp?.champion ?? "",
      feedback: bestChamp ? `${bestChamp.winrate}% Winrate` : "",
    },
  ];
}

export default function AnalyzePage({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const [pageState, setPageState] = useState<PageState>("idle");
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [expandedDiag, setExpandedDiag] = useState(false);
  const [filters, setFilters] = useState({
    queue: "solo",
    lane: "all",
    period: "50",
  });
  const { imageErrors, markImageError } = useImageFallback();
  const { getChampionIcon } = useAssets();

  const handleAnalyze = () => {
    setPageState("loading");
    setTimeout(() => {
      setReport(MOCK_ANALYSIS);
      setPageState("ready");
    }, 1800);
  };

  const filtersBar = (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={filters.queue}
        onChange={(e) => setFilters((f) => ({ ...f, queue: e.target.value }))}
        className="text-xs bg-[hsl(var(--secondary))] border border-border text-foreground rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary/50"
      >
        <option value="solo">Solo/Duo</option>
        <option value="flex">Flex</option>
        <option value="all">Todas as filas</option>
      </select>
      <select
        value={filters.lane}
        onChange={(e) => setFilters((f) => ({ ...f, lane: e.target.value }))}
        className="text-xs bg-[hsl(var(--secondary))] border border-border text-foreground rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary/50"
      >
        <option value="all">Todas as lanes</option>
        <option value="top">Top</option>
        <option value="jungle">Jungle</option>
        <option value="mid">Mid</option>
        <option value="adc">ADC</option>
        <option value="support">Support</option>
      </select>
      <select
        value={filters.period}
        onChange={(e) => setFilters((f) => ({ ...f, period: e.target.value }))}
        className="text-xs bg-[hsl(var(--secondary))] border border-border text-foreground rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary/50"
      >
        <option value="20">Últimas 20</option>
        <option value="50">Últimas 50</option>
        <option value="100">Últimas 100</option>
      </select>

      {(pageState === "ready" || pageState === "loading") && (
        <motion.button
          onClick={handleAnalyze}
          disabled={pageState === "loading"}
          whileTap={{ scale: 0.97 }}
          className="cursor-pointer flex items-center gap-2 px-4 py-1.5 rounded-lg bg-primary text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pageState === "loading" ? "Analisando..." : "Analisar"}
        </motion.button>
      )}
    </div>
  );

  const mainContent = (
    <div className="space-y-8">
      {/* IDLE */}
      {pageState === "idle" && (
        <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
          <div className="h-20 w-20 rounded-2xl bg-primary/10 border border-[hsl(var(--primary)/0.2)] flex items-center justify-center">
            <Brain className="h-10 w-10 text-primary " />
          </div>
          <div>
            <h2 className="space-grotesk-title text-2xl font-bold text-foreground mb-2">
              Pronto para analisar
            </h2>
            <p className="text-muted-foreground max-w-sm text-sm">
              Configure os filtros acima e clique em{" "}
              <strong className="text-primary">Analisar</strong> para gerar seu
              relatório de coaching personalizado.
            </p>
          </div>
          <motion.button
            onClick={handleAnalyze}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden cursor-pointer flex items-center gap-2 px-6 py-3 rounded-xl bg-primary  font-bold"
          >
            Gerar análise completa
            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-[hsl(0_0%_100%/0.25)] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </motion.button>
        </div>
      )}

      {/* LOADING */}
      {pageState === "loading" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary animate-pulse">
            <Brain className="h-4 w-4" />
            <span className="text-sm font-medium">
              IA processando médias do ELO e padrões de jogo...
            </span>
          </div>
          <Skeleton />
        </div>
      )}

      {/* READY */}
      {pageState === "ready" &&
        report &&
        (() => {
          const gs = gradeStyle(report.gradeGlobal);
          const kpis = buildKpis(report);
          return (
            <>
              {/* S1 — Visão Geral */}
              <ScrollReveal preset="up" delay={0}>
                <div
                  className={`bg-card-glass rounded-2xl border border-border p-5 sm:p-6 ${gs.accent}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          Diagnóstico Geral
                        </span>
                      </div>
                      <p
                        className={`text-sm text-foreground leading-relaxed ${!expandedDiag ? "line-clamp-3" : ""}`}
                      >
                        {report.diagnosticoGeral}
                      </p>
                      <button
                        onClick={() => setExpandedDiag((v) => !v)}
                        className="mt-2 text-xs text-primary flex items-center gap-1 hover:underline"
                      >
                        {expandedDiag ? "Ver menos" : "Ver mais"}
                        <ChevronRight
                          className={`h-3 w-3 transition-transform ${expandedDiag ? "rotate-90" : ""}`}
                        />
                      </button>
                    </div>
                    <div
                      className={`shrink-0 flex flex-col items-center justify-center rounded-2xl border ${gs.border} ${gs.bg} px-8 py-4`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                        Nota Global
                      </span>
                      <span
                        className={`font-display text-5xl font-black ${gs.text}`}
                      >
                        {report.gradeGlobal}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal preset="up" delay={0.05}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {kpis.map((kpi, idx) => (
                    <KPICard
                      key={idx}
                      kpi={kpi}
                      idx={idx}
                      imageErrors={imageErrors}
                      handleImageError={markImageError}
                    />
                  ))}
                </div>
              </ScrollReveal>

              {/* S2 — Radar + Benchmarks */}
              <ScrollReveal preset="up" delay={0}>
                <div className="bg-card-glass rounded-2xl border border-border p-5 sm:p-6">
                  <SectionHeader
                    icon={<BarChart3 className="h-4 w-4" />}
                    title="Radar de Habilidades & Médias do ELO"
                    subtitle="Comparação com a média da sua lane no ELO atual"
                  />
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <PerformanceRadar data={report.radarData} />
                    <div className="space-y-4">
                      {report.metricas.map((m, i) => (
                        <MetricBenchmarkRow
                          key={m.name}
                          metric={m}
                          delay={i * 0.05}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* S3 — Evolução */}
              <ScrollReveal preset="up" delay={0}>
                <div className="bg-card-glass rounded-2xl border border-border p-5 sm:p-6">
                  <SectionHeader
                    icon={<TrendingUp className="h-4 w-4" />}
                    title="Tendência de Evolução"
                    subtitle="Últimas 20 partidas — KDA e Winrate ao longo do tempo"
                  />
                  <div className="grid md:grid-cols-[1fr_260px] gap-6 items-start">
                    <TrendChart data={report.trendData} />
                    <div className="space-y-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                        Recentes vs Anteriores
                      </p>
                      {report.recentVsOld.map((item) => {
                        const improved = item.recent >= item.old;
                        const delta =
                          item.old > 0
                            ? ((item.recent - item.old) / item.old) * 100
                            : 0;
                        return (
                          <div
                            key={item.label}
                            className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 gap-2"
                          >
                            <span className="text-xs text-muted-foreground w-20 shrink-0">
                              {item.label}
                            </span>
                            <div className="flex items-center gap-2 text-xs flex-wrap justify-end">
                              <span className="text-muted-foreground tabular-nums">
                                {item.old}
                                {item.unit}
                              </span>
                              <span className="text-muted-foreground">→</span>
                              <span className="font-bold text-foreground tabular-nums">
                                {item.recent}
                                {item.unit}
                              </span>
                              <span
                                className={`flex items-center gap-0.5 font-bold ${improved ? "text-emerald-400" : "text-rose-400"}`}
                              >
                                {improved ? (
                                  <ArrowUpRight className="h-3 w-3" />
                                ) : (
                                  <ArrowDownRight className="h-3 w-3" />
                                )}
                                {Math.abs(Math.round(delta))}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* S4 — Pool de Campeões */}
              <ScrollReveal preset="up" delay={0}>
                <div className="bg-card-glass rounded-2xl border border-border p-5 sm:p-6">
                  <SectionHeader
                    icon={<Swords className="h-4 w-4" />}
                    title="Pool de Campeões"
                    subtitle={`${report.pool.reduce((a, c) => a + c.games, 0)} partidas analisadas`}
                  />
                  <div>
                    <div className="grid grid-cols-5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <span className="col-span-2">Campeão</span>
                      <span className="text-right">Partidas</span>
                      <span className="text-right">WR</span>
                      <span className="text-right">KDA</span>
                    </div>
                    {report.pool.map((champ, i) => (
                      <motion.div
                        key={champ.champion}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="grid grid-cols-5 items-center px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <div className="col-span-2 flex items-center gap-3">
                          <img
                            src={getChampionIcon(champ.champion)}
                            alt={champ.champion}
                            className="h-8 w-8 rounded-lg object-cover border border-white/10 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                          <div>
                            <div className="text-sm font-semibold text-foreground">
                              {champ.champion}
                            </div>
                            <span
                              className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded border ${poolGrade(champ.grade)}`}
                            >
                              {champ.grade}
                            </span>
                          </div>
                        </div>
                        <span className="text-right text-sm text-muted-foreground tabular-nums">
                          {champ.games}
                        </span>
                        <span
                          className={`text-right text-sm font-semibold tabular-nums ${champ.winrate >= 50 ? "text-emerald-400" : "text-rose-400"}`}
                        >
                          {champ.winrate}%
                        </span>
                        <span className="text-right text-sm text-foreground tabular-nums">
                          {champ.kda.toFixed(1)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* S5 — Gargalos vs Positivos */}
              <ScrollReveal preset="up" delay={0}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card-glass rounded-2xl border border-rose-500/20 p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
                      <h3 className="font-bold text-sm text-foreground">
                        Gargalos Críticos
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {report.gargalos.map((g, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-card-glass rounded-2xl border border-emerald-500/20 p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <h3 className="font-bold text-sm text-foreground">
                        Pontos Positivos
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {report.pontosPositivos.map((p, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>

              {/* S6 — Plano de Ação */}
              <ScrollReveal preset="up" delay={0}>
                <div className="bg-card-glass rounded-2xl border border-border p-5 sm:p-6">
                  <SectionHeader
                    icon={<Target className="h-4 w-4" />}
                    title="Plano de Ação"
                    subtitle="Prioridades para as próximas sessões"
                  />
                  <ActionAccordion steps={report.planoDeAcao} />
                </div>
              </ScrollReveal>

              {/* S7 — Metas + Recomendações */}
              <ScrollReveal preset="up" delay={0}>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Metas */}
                  <div className="bg-card-glass rounded-2xl border border-border p-5">
                    <SectionHeader
                      icon={<Flame className="h-4 w-4" />}
                      title="Metas — Próximas 10 Partidas"
                    />
                    <div className="space-y-5">
                      {report.metas.map((meta, i) => {
                        const pct = Math.min(
                          (meta.current / meta.target) * 100,
                          100,
                        );
                        const decimals = meta.current % 1 !== 0 ? 2 : 0;
                        return (
                          <div key={i} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-foreground font-medium">
                                {meta.metric}
                              </span>
                              <span className="text-muted-foreground tabular-nums text-xs">
                                {meta.current.toFixed(decimals)}
                                {meta.unit}
                                <span className="text-muted-foreground/40 mx-1">
                                  /
                                </span>
                                {meta.target}
                                {meta.unit}
                              </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{
                                  delay: i * 0.1 + 0.3,
                                  duration: 0.8,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="h-full rounded-full bg-linear-to-r from-primary to-[hsl(var(--primary-glow))]"
                              />
                            </div>
                            <p className="text-[10px] text-muted-foreground text-right">
                              {Math.round(pct)}% da meta
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recomendações */}
                  <div className="bg-card-glass rounded-2xl border border-border p-5">
                    <SectionHeader
                      icon={<Users className="h-4 w-4" />}
                      title="Campeões Recomendados"
                      subtitle="Com base no seu perfil de jogo"
                    />
                    <div className="space-y-3">
                      {report.recomendacoes.map((rec, i) => (
                        <SpotlightCard key={i} className="p-4">
                          <div className="flex items-start gap-3">
                            <img
                              src={getChampionIcon(rec.champion)}
                              alt={rec.champion}
                              className="h-10 w-10 rounded-lg object-cover border border-white/10 shrink-0"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display =
                                  "none";
                              }}
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-foreground">
                                {rec.champion}
                              </p>
                              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                                {rec.motivo}
                              </p>
                            </div>
                          </div>
                        </SpotlightCard>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </>
          );
        })()}
    </div>
  );

  if (embedded) {
    return (
      <div className="space-y-6 px-4 sm:px-6 py-8">
        <div className="flex flex-wrap items-center justify-end gap-2">
          {filtersBar}
        </div>
        {mainContent}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden min-h-screen">
      <DarkVeilBackground />
      <div className="relative z-10">
        <header className="sticky top-0 border-b border-[hsl(var(--border)/0.6)] bg-[hsl(var(--background)/0.7)] backdrop-blur-xl z-30">
          <div className="mx-auto flex flex-wrap items-center gap-3 justify-between max-w-7xl px-4 sm:px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.1)] text-primary">
                <Brain className="h-4 w-4" />
              </div>
              <div>
                <h1 className="font-display text-lg font-bold tracking-tight">
                  Análise de Performance
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Relatório de coaching gerado por IA
                </p>
              </div>
            </div>
            {filtersBar}
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {mainContent}
        </main>
      </div>
    </div>
  );
}
