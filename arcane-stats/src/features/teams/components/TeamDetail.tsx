// src/features/teams/components/TeamDetail.tsx
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Swords,
  Crown,
  UserPlus,
  Trophy,
  Target,
  Flame,
  Zap,
  ArrowUpDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Team, Member, SortKey } from "../types";
import { MiniStat } from "./ui/MiniStat";
import { RankBadge } from "./ui/RankBadge";
import { LaneBadge } from "./ui/LaneBadge";
import { AggressionBar } from "./ui/AggressionBar";

type Props = {
  team: Team;
  isOwner: boolean;
  sortKey: SortKey;
  onChangeSort: (k: SortKey) => void;
  onAddPlayer: () => void;
};

export default function TeamDetail({
  team,
  isOwner,
  sortKey,
  onChangeSort,
  onAddPlayer,
}: Props) {
  const navigate = useNavigate();

  const stats = useMemo(() => aggregate(team.members), [team.members]);

  const sorted = useMemo(
    () =>
      [...team.members].sort(
        (a, b) => ((b[sortKey] ?? 0) as number) - ((a[sortKey] ?? 0) as number),
      ),
    [team.members, sortKey],
  );

  return (
    <div className="space-y-6">
      {/* Header do time */}
      <div className="relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-card-glass p-6 shadow-elevated">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[hsl(var(--primary)/0.2)] blur-3xl" />
        <div className="absolute inset-0 bg-hex opacity-20" />

        <div className="relative flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary font-display text-2xl font-black text-primary-foreground shadow-glow"
            >
              {team.nome.slice(0, 2).toUpperCase()}
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-amber-400">
                <Crown className="h-2.5 w-2.5 text-background" />
              </span>
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-3xl font-black tracking-tight text-primary">
                  {team.nome}
                </h2>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {team.members.length}
                </span>{" "}
                membros • criado por{" "}
                <span className="font-semibold text-foreground">
                  {isOwner ? "você" : "outro jogador"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/times/${team.id}/simulate`)}
              className="inline-flex items-center gap-2 rounded-xl border border-border
               bg-[hsl(var(--secondary)/0.6)] px-4 py-2.5 text-sm font-bold backdrop-blur-sm 
               transition hover:border-[hsl(var(--primary)/0.4)] hover:bg-secondary cursor-pointer"
            >
              <Swords className="h-4 w-4" /> Simular embate
            </motion.button>
            {isOwner && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onAddPlayer}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-glow cursor-pointer"
              >
                <UserPlus className="h-4 w-4" /> Adicionar jogador
              </motion.button>
            )}
          </div>
        </div>

        {/* Mini stats */}
        <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MiniStat
            
            label="Winrate médio"
            value={`${stats.wr}%`}
            tone="emerald"
            delay={0}
          />
          <MiniStat
            
            label="KDA médio"
            value={stats.kda.toFixed(2)}
            tone="primary"
            delay={0.05}
          />
          <MiniStat
            
            label="Agressividade"
            value={`${stats.agg}`}
            tone="rose"
            delay={0.1}
          />
          <MiniStat
            
            label="Rotas cobertas"
            value={`${stats.lanes}/5`}
            tone="amber"
            delay={0.15}
          />
        </div>
      </div>

      {/* Ranking interno */}
      <div className="rounded-2xl border border-[hsl(var(--border))] bg-card-glass p-6 shadow-card">
        <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-xl font-bold">
                Ranking interno
              </h3>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Membros ordenados por desempenho.
            </p>
          </div>
          <div className="inline-flex items-center gap-1 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.6)] p-1 backdrop-blur-sm">
            {(["winrate", "kda", "aggression"] as SortKey[]).map((k) => (
              <button
                key={k}
                onClick={() => onChangeSort(k)}
                className={[
                  "relative rounded-lg px-3.5 py-1.5 text-xs font-bold transition",
                  sortKey === k
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {sortKey === k && (
                  <motion.span
                    layoutId="sortPill"
                    className="absolute inset-0 rounded-lg bg-gradient-primary shadow-glow"
                  />
                )}
                <span className="relative">
                  {k === "winrate" ? "WR" : k === "kda" ? "KDA" : "Agressão"}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-[hsl(var(--border)/0.6)]">
          <table className="w-full text-sm">
            <thead className="bg-[hsl(var(--secondary)/0.4)] text-[10px] uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Jogador</th>
                <th className="px-4 py-3 text-left">Rota</th>
                <th className="px-4 py-3 text-right">WR</th>
                <th className="px-4 py-3 text-right">KDA</th>
                <th className="px-4 py-3 text-right">
                  <span className="inline-flex items-center gap-1">
                    Agressão <ArrowUpDown className="h-3 w-3" />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <UserPlus className="mx-auto h-8 w-8 text-[hsl(var(--muted-foreground)/0.4)]" />
                    <p className="mt-2 text-xs text-muted-foreground">
                      Nenhum membro ainda. Adicione jogadores por Nome + Tag.
                    </p>
                  </td>
                </tr>
              )}
              {sorted.map((m, i) => (
                <motion.tr
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="group border-t border-[hsl(var(--border)/0.4)] transition hover:bg-primary/5"
                >
                  <td className="px-4 py-3">
                    <RankBadge position={i + 1} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-display font-bold">{m.name}</div>
                    {m.tag && (
                      <div className="text-[11px] text-muted-foreground">
                        #{m.tag}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <LaneBadge lane={m.lane} />
                  </td>
                  <td className="px-4 py-3 text-right font-display font-bold tabular-nums">
                    <span
                      className={
                        (m.winrate ?? 0) >= 50
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }
                    >
                      {m.winrate ?? 0}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs tabular-nums">
                    {(m.kda ?? 0).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <AggressionBar value={m.aggression ?? 0} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* helpers */

function aggregate(members: Member[]) {
  if (!members.length) return { wr: 0, kda: 0, agg: 0, lanes: 0 };

  return {
    wr: Math.round(
      members.reduce((s, m) => s + (m.winrate ?? 0), 0) / members.length,
    ),
    kda: members.reduce((s, m) => s + (m.kda ?? 0), 0) / members.length,
    agg: Math.round(
      members.reduce((s, m) => s + (m.aggression ?? 0), 0) / members.length,
    ),
    lanes: new Set(members.map((m) => m.lane).filter(Boolean)).size,
  };
}