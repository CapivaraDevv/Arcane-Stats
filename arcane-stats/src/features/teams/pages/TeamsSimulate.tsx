import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import useTeams from "../hooks/useTeams";
import { TeamBadge } from "../../../components/TeamBadge";
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

  // Initialize opponent ID on first render
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
    return <div>Time não encontrado</div>;
  }

  return (
    <div className="p-8">
      <button onClick={() => navigate("/times")} className="mb-4">
        ← Voltar
      </button>

      <h1 className="text-2xl font-bold mb-6">Simulação: {current.nome}</h1>

      {/* seletor */}
      <select
        value={opponentId ?? ""}
        onChange={(e) => setOpponentId(Number(e.target.value))}
      >
        {opponents.map((t) => (
          <option key={t.id} value={t.id}>
            {t.nome}
          </option>
        ))}
      </select>

      {opponent && (
        <>
          {/* Placar */}
          <div className="relative mb-5 grid grid-cols-3 items-center gap-3 overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.4)] p-5">
            <div className="absolute inset-0 bg-hex opacity-30" />
            <div className="relative">
              <TeamBadge
                team={current}
                alignment="left"
                winning={winning === "a"}
              />
            </div>
            <div className="relative text-center">
              <div className="font-display text-4xl font-black tabular-nums">
                <motion.span
                  key={`a-${score.a}`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={
                    winning === "a"
                      ? "text-primary drop-shadow-[0_0_12px_hsl(var(--primary))]"
                      : "text-muted-foreground"
                  }
                >
                  {score.a}
                </motion.span>
                <span className="mx-3 text-[hsl(var(--muted-foreground)/0.5)]">
                  :
                </span>
                <motion.span
                  key={`b-${score.b}`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={
                    winning === "b"
                      ? "text-rose-400 drop-shadow-[0_0_12px_rgba(251,113,133,0.6)]"
                      : "text-muted-foreground"
                  }
                >
                  {score.b}
                </motion.span>
              </div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Vitórias por rota
              </div>
            </div>
            <div className="relative">
              <TeamBadge
                team={opponent}
                alignment="right"
                winning={winning === "b"}
              />
            </div>
          </div>

          {/* Rotas */}
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
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className="rounded-xl border border-[hsl(var(--border))] bg-card-glass p-3"
                >
                  <div className="mb-2 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs">
                    <div
                      className={`text-left font-display font-bold ${winner === "a" ? "text-primary" : "text-foreground"}`}
                    >
                      {a?.name ?? "—"}
                    </div>
                    <LaneBadge lane={l ?? undefined} />
                    <div
                      className={`text-right font-display font-bold ${winner === "b" ? "text-rose-400" : "text-foreground"}`}
                    >
                      {b?.name ?? "—"}
                    </div>
                  </div>
                  <div className="flex h-2.5 overflow-hidden rounded-full bg-[hsl(var(--background)/0.6)]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${aPct}%` }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-linear-to-r from-primary to-primary-glow shadow-[0_0_8px_hsl(var(--primary))]"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${bPct}%` }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-linear-to-r from-rose-500 to-orange-400 shadow-[0_0_8px_rgba(251,113,133,0.6)]"
                    />
                  </div>
                  <div className="mt-1.5 flex justify-between font-mono text-[10px] tabular-nums text-muted-foreground">
                    <span>Força {av.toFixed(0)}</span>
                    <span>Força {bv.toFixed(0)}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => navigate("/teams")}
          className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.6)] px-5 py-2.5 text-sm font-bold transition hover:bg-secondary"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default TeamsSimulate;
