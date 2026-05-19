import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useTeams from "../hooks/useTeams";
import { LaneBadge } from "../../../components/LaneBadge";
import { LANES, type Lane, type Member } from "../types";

function byLane(members: Member[]) {
  const map: Partial<Record<Lane, Member>> = {};
  members.forEach((m) => {
    if (m.lane && !map[m.lane]) map[m.lane] = m;
  });
  return map;
}

function laneStrength(m?: Member) {
  if (!m) return 0;
  return (m.winrate ?? 0) + (m.kda ?? 0) * 10 + (m.aggression ?? 0) * 0.3;
}

const TeamsSimulate: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { teams } = useTeams();

  const [opponentId, setOpponentId] = useState<number | null>(null);

  const current = teams.find((t) => t.id === Number(id));
  const opponents = useMemo(() => {
    if (!current) return [];
    return teams.filter((t) => t.id !== current.id);
  }, [teams, current]);

  const opponent = opponents.find((t) => t.id === opponentId) ?? null;

  const aByLane = useMemo(
    () =>
      current
        ? byLane(current.members)
        : ({} as Record<string, Member | undefined>),
    [current],
  );
  const bByLane = useMemo(
    () =>
      opponent
        ? byLane(opponent.members)
        : ({} as Record<string, Member | undefined>),
    [opponent],
  );

  useEffect(() => {
    if (opponents.length > 0 && opponentId === null) {
      setOpponentId(opponents[0]?.id ?? null);
    }
  }, [opponents, opponentId]);

  const score = useMemo(() => {
    if (!opponent || !current) return { a: 0, b: 0 };
    let a = 0;
    let b = 0;
    LANES.forEach((lane) => {
      const av = laneStrength(aByLane[lane]);
      const bv = laneStrength(bByLane[lane]);
      if (av > bv) a++;
      else if (bv > av) b++;
    });
    return { a, b };
  }, [opponent, current, aByLane, bByLane]);

  const winning = score.a > score.b ? "a" : score.b > score.a ? "b" : "tie";

  if (!current) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="text-muted-foreground">Time não encontrado.</p>
         <button
          onClick={() => navigate("/times")}
          className="cursor-pointer rounded-xl border border-border bg-[hsl(var(--secondary)/0.6)] px-5 py-2.5 text-sm font-bold transition hover:border-primary/30 hover:bg-secondary"
        >
          Fechar simulação
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-full px-6 py-8 lg:px-10 lg:py-10">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,hsl(var(--primary)/0.07),transparent)]" />

      {/* Top bar */}
      <div className="relative mb-10 flex items-center justify-between gap-4">
        <button
          onClick={() => navigate("/times")}
          className="cursor-pointer rounded-xl border border-border bg-[hsl(var(--secondary)/0.6)] px-5 py-2.5 text-sm font-bold transition hover:border-primary/30 hover:bg-secondary"
        >
          Fechar simulação
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground/60 hidden sm:block">
            Adversário
          </span>
          <select
            value={opponentId ?? ""}
            onChange={(e) => setOpponentId(Number(e.target.value))}
            className="cursor-pointer rounded-xl border border-border bg-[hsl(var(--secondary)/0.6)] px-4 py-2 text-sm font-bold text-foreground backdrop-blur-sm transition hover:border-primary/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary)/0.3)]"
          >
            {opponents.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {opponent && (
          <motion.div
            key={opponentId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ── Hero scoreboard ── */}
            <div className="relative mb-6 overflow-hidden rounded-3xl border border-border bg-[hsl(var(--background)/0.5)] backdrop-blur-xl">
              {/* Background layers */}
              <div className="absolute inset-0 bg-hex opacity-[0.12]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,hsl(var(--primary)/0.05),transparent)]" />
              {/* Glowing top edge */}
              <div className="absolute top-0 left-[20%] right-[20%] h-px bg-linear-to-r from-transparent via-[hsl(var(--primary)/0.5)] to-transparent" />

              <div className="relative px-8 py-10 lg:px-14 lg:py-12">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 lg:gap-10">
                  {/* Team A */}
                  <motion.div
                    animate={winning === "a" ? { scale: [1, 1.015, 1] } : {}}
                    transition={{
                      repeat: Infinity,
                      duration: 2.8,
                      ease: "easeInOut",
                    }}
                    className="min-w-0"
                  >
                    <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50">
                      Seu time
                    </p>
                    <h2
                      className={`font-display text-2xl font-black leading-none transition-all duration-700 lg:text-4xl ${
                        winning === "a"
                          ? "text-gradient drop-shadow-[0_0_24px_hsl(var(--primary)/0.4)]"
                          : winning === "b"
                            ? "text-foreground/25"
                            : "text-foreground/70"
                      }`}
                    >
                      {current.nome}
                    </h2>
                    <p className="mt-2 text-xs text-muted-foreground/40">
                      {current.members.length} membros
                    </p>
                  </motion.div>

                  {/* Score */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-baseline gap-3 font-display font-black lg:gap-5">
                      <motion.span
                        key={`a-${score.a}`}
                        initial={{ scale: 0.3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 18,
                        }}
                        className={`text-5xl leading-none lg:text-7xl ${
                          winning === "a"
                            ? "text-primary drop-shadow-[0_0_32px_hsl(var(--primary)/0.8)]"
                            : "text-foreground/20"
                        }`}
                      >
                        {score.a}
                      </motion.span>

                      <span className="text-lg text-muted-foreground/20 lg:text-2xl">
                        ·
                      </span>

                      <motion.span
                        key={`b-${score.b}`}
                        initial={{ scale: 0.3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 18,
                        }}
                        className={`text-5xl leading-none lg:text-7xl ${
                          winning === "b"
                            ? "text-foreground drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                            : "text-foreground/20"
                        }`}
                      >
                        {score.b}
                      </motion.span>
                    </div>

                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/35">
                      Vitórias por rota
                    </p>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={winning}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.2 }}
                        className={`rounded-full border px-3 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] ${
                          winning === "a"
                            ? "border-primary/30 bg-primary/10 text-primary"
                            : winning === "b"
                              ? "border-white/15 bg-white/5 text-foreground/60"
                              : "border-border bg-secondary/30 text-muted-foreground/60"
                        }`}
                      >
                        {winning === "a"
                          ? `${current.nome} vence`
                          : winning === "b"
                            ? `${opponent.nome} vence`
                            : "Empate"}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Team B */}
                  <motion.div
                    animate={winning === "b" ? { scale: [1, 1.015, 1] } : {}}
                    transition={{
                      repeat: Infinity,
                      duration: 2.8,
                      ease: "easeInOut",
                    }}
                    className="min-w-0 text-right"
                  >
                    <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50">
                      Oponente
                    </p>
                    <h2
                      className={`font-display text-2xl font-black leading-none transition-all duration-700 lg:text-4xl ${
                        winning === "b"
                          ? "text-foreground drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                          : winning === "a"
                            ? "text-foreground/25"
                            : "text-foreground/70"
                      }`}
                    >
                      {opponent.nome}
                    </h2>
                    <p className="mt-2 text-xs text-muted-foreground/40">
                      {opponent.members.length} membros
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* ── Lane header ── */}
            <div className="mb-3 flex items-center justify-between px-1 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/30">
              <span>{current.nome}</span>
              <span>Confronto por rota</span>
              <span>{opponent.nome}</span>
            </div>

            {/* ── Lane cards ── */}
            <div className="space-y-2">
              {LANES.map((l, idx) => {
                const a = aByLane[l!];
                const b = bByLane[l!];
                const av = laneStrength(a);
                const bv = laneStrength(b);
                const total = Math.max(1, av + bv);
                const aPct = (av / total) * 100;
                const bPct = 100 - aPct;
                const winner = av > bv ? "a" : bv > av ? "b" : "tie";

                return (
                  <motion.div
                    key={l}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: idx * 0.055,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -2 }}
                    className={`rounded-2xl border bg-card-glass p-4 transition-colors duration-300 ${
                      winner === "a"
                        ? "border-[hsl(var(--primary)/0.25)]"
                        : winner === "b"
                          ? "border-white/10"
                          : "border-border"
                    }`}
                  >
                    <div className="mb-3 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                      {/* Player A */}
                      <div className="flex min-w-0 items-center gap-2">
                        {winner === "a" && (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))] animate-glow" />
                        )}
                        <span
                          className={`truncate font-display text-sm font-bold transition-all duration-500 ${
                            winner === "a"
                              ? "text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                              : "text-foreground/35"
                          }`}
                        >
                          {a?.name ?? "—"}
                        </span>
                      </div>

                      <LaneBadge lane={l ?? undefined} />

                      {/* Player B */}
                      <div className="flex min-w-0 items-center justify-end gap-2">
                        <span
                          className={`truncate text-right font-display text-sm font-bold transition-all duration-500 ${
                            winner === "b"
                              ? "text-foreground"
                              : "text-foreground/35"
                          }`}
                        >
                          {b?.name ?? "—"}
                        </span>
                        {winner === "b" && (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/70 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                        )}
                      </div>
                    </div>

                    {/* Bar */}
                    <div className="flex h-2 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${aPct}%` }}
                        transition={{
                          duration: 0.85,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`h-full ${
                          winner === "a"
                            ? "bg-linear-to-r from-primary to-primary-glow shadow-[0_0_10px_hsl(var(--primary)/0.5)]"
                            : "bg-primary/25"
                        }`}
                      />
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${bPct}%` }}
                        transition={{
                          duration: 0.85,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`h-full ${
                          winner === "b"
                            ? "bg-white/50 shadow-[0_0_6px_rgba(255,255,255,0.12)]"
                            : "bg-white/15"
                        }`}
                      />
                    </div>

                    <div className="mt-2 flex justify-between font-mono text-[10px] tabular-nums text-muted-foreground/30">
                      <span>{aPct.toFixed(0)}%</span>
                      <span>{bPct.toFixed(0)}%</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-end"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeamsSimulate;
