import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DarkVeilBackground from "../../../components/DarkVeilBackground";
import SpotlightCard from "../../../components/SpotlightCard";
import AnimatedCounter from "../../../components/AnimatedCounter";
import ScrollReveal from "../../../components/ScrollReveal";
import AppFooter from "../../../components/AppFooter";

const metrics = [
  { to: 95, suffix: "%", label: "Acurácia de Predição" },
  { to: 50, suffix: "k+", label: "Partidas Analisadas" },
  { to: 100, suffix: "+", label: "Sinais por Partida" },
  { to: 24, suffix: "/7", label: "Análise em Tempo Real" },
];

const kpis = [
  { label: "Win Rate", value: "62%", trend: "+5%" },
  { label: "KDA Médio", value: "4.8", trend: "Top 12%" },
  { label: "CS / min", value: "7.8", trend: "Top 18%" },
];

const insights = [
  { label: "Eficiência de rotação", value: "Alta" },
  { label: "Controle de visão", value: "Média" },
  { label: "Prioridade de objetivos", value: "Ótima" },
];

const features = [
  "Benchmark de performance em tempo real",
  "Insights estratégicos gerados por IA",
  "Reconhecimento de padrões em 50k+ partidas",
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center px-6 pb-24 pt-10">
        <DarkVeilBackground />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1fr_1.1fr]">

          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-border/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary"
            >
              Inteligência Estratégica · LoL
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-display text-6xl font-black leading-[0.92] md:text-7xl lg:text-8xl"
            >
              Transforme dados em
              <br />
              <span className="text-gradient">dominância.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground"
            >
              Plataforma de análise estratégica com IA para jogadores e equipes competitivas de League of Legends.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                to="/login"
                className="group relative inline-flex items-center overflow-hidden rounded-xl bg-gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow transition"
              >
                Analisar Agora
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-[hsl(0_0%_100%/0.25)] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>

              <Link
                to="/dashboard"
                className="inline-flex items-center rounded-xl border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition hover:border-border/80 hover:text-foreground"
              >
                Ver Insights
              </Link>
            </motion.div>
          </div>

          {/* Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <SpotlightCard className="rounded-3xl p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Relatório Estratégico — IA
                </span>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                  Ao vivo
                </span>
              </div>

              <div className="space-y-3">
                {kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="flex items-center justify-between rounded-xl border border-border/60 bg-background/40 px-4 py-3"
                  >
                    <span className="text-sm text-muted-foreground">{kpi.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-primary">{kpi.trend}</span>
                      <span className="font-display text-lg font-bold text-foreground">
                        {kpi.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-border pt-6">
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-primary">Insight da IA</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    Você perdeu{" "}
                    <span className="font-semibold text-primary">3 waves</span>{" "}
                    por rotação errada aos{" "}
                    <span className="font-semibold text-primary">12 min</span>.
                    Recuperar isso equivale a{" "}
                    <span className="font-semibold text-primary">+340 de ouro</span>.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      {/* ── METRICS ───────────────────────────────────────────── */}
      <section className="relative z-10 border-t border-border px-6 py-32 md:py-40">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 divide-x divide-border md:grid-cols-4">
            {metrics.map((m, i) => (
              <ScrollReveal
                key={m.label}
                preset="up"
                delay={i * 0.1}
                duration={0.7}
                className="px-6 py-4 first:pl-0 last:pr-0 md:px-10"
              >
                <div className="font-display text-5xl font-black text-foreground md:text-6xl lg:text-7xl">
                  <AnimatedCounter to={m.to} suffix={m.suffix} />
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {m.label}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANALYSIS ──────────────────────────────────────────── */}
      <section className="relative z-10 border-t border-border px-6 py-32 md:py-40">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.2fr]">

            {/* Copy */}
            <ScrollReveal preset="left" duration={0.9}>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary">
                  Análise Estratégica
                </p>
                <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
                  Cada decisão
                  <br />
                  tem um custo.
                </h2>
                <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
                  O Arcane Stats mapeia cada rotação, troca e decisão de objetivo — mostrando exatamente onde o jogo foi ganho ou perdido.
                </p>
                <div className="mt-8 space-y-4">
                  {features.map((item) => (
                    <div key={item} className="flex items-center gap-4 border-l-2 border-primary pl-4">
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Score mockup */}
            <ScrollReveal preset="reveal" duration={1}>
              <SpotlightCard className="rounded-3xl p-8 md:p-10">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Score Estratégico — IA
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-8xl font-black text-primary">87</span>
                  <span className="font-display text-3xl text-muted-foreground">/ 100</span>
                </div>
                <div className="mt-4 h-0.5 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full w-[87%] rounded-full bg-gradient-primary" />
                </div>
                <div className="mt-8">
                  {insights.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between border-t border-border py-3"
                    >
                      <span className="text-sm text-muted-foreground">{row.label}</span>
                      <span className="text-sm font-semibold text-foreground">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 border-t border-border pt-6">
                  <p className="text-sm font-semibold text-primary">
                    → Rotacione após o Baron aos 28:00
                  </p>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── NARRATIVE ─────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-border">

        {/* 01 */}
        <div className="overflow-hidden border-b border-border px-6 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal preset="left" duration={0.9}>
              <div className="lg:w-1/2">
                <span className="pointer-events-none block select-none font-display text-8xl font-black leading-none text-foreground/[0.04] md:text-9xl">
                  01
                </span>
                <div className="-mt-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary">
                    Fase um
                  </p>
                  <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-6xl">
                    Observe padrões.
                  </h2>
                  <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
                    Cada partida gera milhares de pontos de dado. Nós filtramos os que realmente definem o resultado — visão, rotações, timing de objetivos.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* 02 */}
        <div className="overflow-hidden border-b border-border px-6 py-24 md:py-32">
          <div className="mx-auto flex max-w-6xl justify-end">
            <ScrollReveal preset="right" duration={0.9}>
              <div className="lg:w-full">
                <span className="pointer-events-none block select-none font-display text-8xl font-black leading-none text-foreground/[0.04] md:text-9xl">
                  02
                </span>
                <div className="-mt-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary">
                    Fase dois
                  </p>
                  <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-6xl">
                    Preveja decisões.
                  </h2>
                  <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
                    IA treinada em milhões de partidas competitivas identifica lacunas estratégicas antes que elas se tornem derrotas.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* 03 */}
        <div className="overflow-hidden border-b border-border px-6 py-24 md:py-32">
          <div className="mx-auto max-w-6xl text-center">
            <ScrollReveal preset="up" duration={1}>
              <span className="pointer-events-none block select-none font-display text-9xl font-black leading-none text-foreground/[0.04] md:text-[12rem]">
                03
              </span>
              <p className="-mt-4 text-xs uppercase tracking-[0.2em] text-primary">
                Fase três
              </p>
              <h2 className="mt-3 font-display text-5xl font-bold leading-tight md:text-7xl">
                Jogue com <span className="text-gradient">inteligência.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                Sem ruído — apenas as três coisas que você precisa corrigir agora, entregues após cada partida.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* ── CTA FINAL ─────────────────────────────────────────── */}
      <section className="relative z-10 border-t border-border px-6 py-32 md:py-40">
        <ScrollReveal preset="fade" duration={1.2}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
              Sua próxima vantagem competitiva
              <br />
              começa com dados.
            </h2>
            <p className="mt-5 text-base text-muted-foreground">
              Junte-se a jogadores e times que já tomam decisões mais inteligentes.
            </p>
            <div className="mt-10">
              <Link
                to="/register"
                className="group relative inline-flex items-center overflow-hidden rounded-xl bg-gradient-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-glow transition"
              >
                Começar Agora
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-[hsl(0_0%_100%/0.25)] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">Grátis para começar.</p>
          </div>
        </ScrollReveal>
      </section>

      <AppFooter />
    </div>
  );
}
