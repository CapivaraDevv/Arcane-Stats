// src/pages/TeamsPage.tsx
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Plus,
  Swords,
  Trophy,
  Crown,
  UserPlus,
  ArrowUpDown,
  X,
  Shield,
  Target,
  Flame,
  Sparkles,
  ChevronRight,
  Zap,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import ScrollReveal from "../../../components/ScrollReveal";
import { useConfig } from "../../../hooks/useConfig";
import useTeams from "../hooks/useTeams";
import type { User } from "../../../features/auth/hooks/useAuth";
import useAuthContext from "../../../features/auth/hooks/useAuth";

// ─── Tipos ────────────────────────────────────────────────────────────────────
type Member = {
  id: string;
  nome: string;
  tag?: string;
  lane?: "Top" | "Jungle" | "Mid" | "ADC" | "Support";
  winrate?: number;
  kda?: number;
  aggression?: number;
  mainChampion?: string;
};
type Team = {
  id: number;
  nome: string;
  creatorId: string;
  members: Member[];
  tag?: string;
};
type SortKey = "winrate" | "kda" | "aggression";

// ─── Página ───────────────────────────────────────────────────────────────────
const TeamsPage: React.FC = () => {
  useConfig();
  const { user } = useAuthContext();
  const userId = user?.id ?? "";

  const {
    teams,
    createTeam,
    addMemberByEmail,
    addMemberByNameTag,
    findUserById,
  } = useTeams();

  const [selectedId, setSelectedId] = useState<number | null>(
    teams[0]?.id ?? null,
  );
  const selected = useMemo(
    () => teams.find((t: Team) => t.id === selectedId) ?? null,
    [teams, selectedId],
  );

  const [showCreate, setShowCreate] = useState(false);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("winrate");

  const isOwner = selected && selected.creatorId === userId;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background hextech */}
      <div className="pointer-events-none absolute inset-0 bg-hero" />
      <div className="pointer-events-none absolute inset-0 bg-hex opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[hsl(var(--primary)/0.2)] blur-3xl" />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[hsl(var(--border)/0.6)] bg-[hsl(var(--background)/0.7)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.1)] text-primary shadow-glow">
                <Users className="h-5 w-5" />
              </div>
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-glow-pulse rounded-full bg-primary-glow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl font-bold tracking-tight">
                  Times
                </h1>
              </div>
              <p className="text-xs text-muted-foreground">
                Gerencie squads, escale jogadores e simule embates.
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowCreate(true)}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Novo time</span>
            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-[hsl(0_0%_100%/0.3)] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </motion.button>
        </div>
      </header>

      {/* Layout sidebar + detalhe */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-[340px_1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ScrollReveal preset="left">
            <div className="rounded-2xl border border-border bg-card-glass p-4 shadow-card">
              <div className="flex items-center justify-between px-1 pb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Seus times
                </span>
                <span className="rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.1)] px-2 py-0.5 text-[10px] font-bold text-primary">
                  {teams.length}
                </span>
              </div>

              <div className="space-y-1.5">
                {teams.length === 0 && (
                  <div className="rounded-xl border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--background) / 0.4)] px-3 py-8 text-center">
                    <Shield className="mx-auto h-8 w-8 text-[hsl(var(--muted-foreground)/0.5)]" />
                    <p className="mt-2 text-xs text-muted-foreground">
                      Nenhum time ainda.
                    </p>
                  </div>
                )}

                {teams.map((t: Team, i: number) => {
                  const active = t.id === selectedId;
                  return (
                    <motion.button
                      key={t.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => setSelectedId(t.id)}
                      className={[
                        "group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-3 py-3 text-left transition-all cursor-pointer",
                        active
                          ? "border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--primary)/0.2)]"
                          : "border-[hsl(var(--border)/0.4)] bg-[hsl(var(--background)/0.1)] hover:border-border hover:bg-[hsl(var(--secondary)/0.4)]",
                      ].join(" ")}
                    >
                      {active && (
                        <motion.div
                          layoutId="activeTeam"
                          className="absolute inset-y-0 left-0 w-1 rounded-r-full bg-linear-to-b from-primary to-primary-glow"
                        />
                      )}
                      <div
                        className={[
                          "flex h-10 w-10 items-center justify-center rounded-lg font-display text-sm font-black transition",
                          active
                            ? "bg-gradient-primary text-primary-foreground shadow-glow"
                            : "bg-secondary text-foreground group-hover:bg-[hsl(var(--secondary)/0.8)]",
                        ].join(" ")}
                      >
                        {t.nome.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-sm font-bold">
                          {t.nome}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {t.members.length}{" "}
                          {t.members.length === 1 ? "membro" : "membros"}
                        </p>
                      </div>
                      {t.creatorId === userId && (
                        <Crown className="h-3.5 w-3.5 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]" />
                      )}
                      <ChevronRight
                        className={[
                          "h-4 w-4 transition",
                          active
                            ? "text-primary"
                            : "text-[hsl(var(--muted-foreground)/0.4)] group-hover:translate-x-0.5 group-hover:text-foreground",
                        ].join(" ")}
                      />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </aside>

        {/* Detalhe */}
        <main className="min-w-0">
          {!selected ? (
            <EmptyState onCreate={() => setShowCreate(true)} />
          ) : (
            <ScrollReveal preset="up" key={selected.id}>
              <TeamDetail
                team={selected}
                isOwner={!!isOwner}
                sortKey={sortKey}
                onChangeSort={setSortKey}
                onAddPlayer={() => setShowAddPlayer(true)}
                findUserById={findUserById}
              />
            </ScrollReveal>
          )}
        </main>
      </div>

      {/* Modais */}
      <AnimatePresence>
        {showCreate && (
          <CreateTeamModal
            onClose={() => setShowCreate(false)}
            onCreate={async (name) => {
              const result = await createTeam?.(name, userId);
              if (result?.success && result.team?.id) {
                setSelectedId(result.team.id);
              }
            }}
          />
        )}
        {showAddPlayer && selected && (
          <AddPlayerModal
            onClose={() => setShowAddPlayer(false)}
            onSubmit={async ({ name, tag }) => {
              if (typeof addMemberByNameTag === "function") {
                await addMemberByNameTag(selected.id, { name, tag }, userId);
              } else {
                await addMemberByEmail?.(selected.id, `${name}#${tag}`, userId);
              }
              setShowAddPlayer(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Empty state ──────────────────────────────────────────────────────────────
const EmptyState: React.FC<{ onCreate: () => void }> = ({ onCreate }) => (
  <div className="relative flex h-[60vh] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[hsl(var(--primary)/0.3)] bg-card-glass shadow-card">
    <div className="absolute inset-0 bg-hex opacity-30" />
    <div className="relative text-center">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.1)] shadow-glow"
      >
        <Shield className="h-8 w-8 text-primary" />
      </motion.div>
      <h2 className="mt-5 font-display text-2xl font-bold text-primary">
        Selecione um time
      </h2>
      <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
        Escolha um squad ao lado ou crie um novo para começar a montar sua
        composição.
      </p>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onCreate}
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-primary mt-5 px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition cursor-pointer"
      >
        <Plus className="h-4 w-4" />
        <span>Novo time</span>
        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </motion.button>
    </div>
  </div>
);

// ─── Detalhe do time ──────────────────────────────────────────────────────────
const TeamDetail: React.FC<{
  team: Team;
  isOwner: boolean;
  sortKey: SortKey;
  onChangeSort: (k: SortKey) => void;
  onAddPlayer: () => void;
  findUserById?: (id: string) => Member | null;
}> = ({ team, isOwner, sortKey, onChangeSort, onAddPlayer }) => {
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
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-[hsl(var(--secondary)/0.6)] px-4 py-2.5 text-sm font-bold backdrop-blur-sm transition hover:border-[hsl(var(--primary)/0.4)] hover:bg-secondary"
            >
              <Swords className="h-4 w-4" /> Simular embate
            </motion.button>
            {isOwner && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onAddPlayer}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-glow"
              >
                <UserPlus className="h-4 w-4" /> Adicionar jogador
              </motion.button>
            )}
          </div>
        </div>

        {/* Mini stats */}
        <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MiniStat
            icon={Trophy}
            label="Winrate médio"
            value={`${stats.wr}%`}
            tone="emerald"
            delay={0}
          />
          <MiniStat
            icon={Swords}
            label="KDA médio"
            value={stats.kda.toFixed(2)}
            tone="primary"
            delay={0.05}
          />
          <MiniStat
            icon={Flame}
            label="Agressividade"
            value={`${stats.agg}`}
            tone="rose"
            delay={0.1}
          />
          <MiniStat
            icon={Target}
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
              <Zap className="h-4 w-4 text-primary" />
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
                    <div className="font-display font-bold">{m.nome}</div>
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
};

// ─── Auxiliares visuais ───────────────────────────────────────────────────────
const TONE_MAP: Record<string, { bg: string; text: string; ring: string }> = {
  emerald: {
    bg: "bg-[hsl(157_72%_40%_/_0.1)]",
    text: "text-emerald-400",
    ring: "border-[hsl(157_72%_40%_/_0.3)]",
  },
  primary: {
    bg: "bg-[hsl(var(--primary)/0.1)]",
    text: "text-primary",
    ring: "border-[hsl(var(--primary)/0.3)]",
  },
  rose: {
    bg: "bg-[hsl(344_84%_57%_/_0.1)]",
    text: "text-rose-400",
    ring: "border-[hsl(344_84%_57%_/_0.3)]",
  },
  amber: {
    bg: "bg-[hsl(42_96%_56%_/_0.1)]",
    text: "text-amber-400",
    ring: "border-[hsl(42_96%_56%_/_0.3)]",
  },
};

const MiniStat: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone?: keyof typeof TONE_MAP;
  delay?: number;
}> = ({ icon: Icon, label, value, tone = "primary", delay = 0 }) => {
  const t = TONE_MAP[tone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-xl border ${t.ring} bg-[hsl(var(--background)/0.4)] p-3.5 backdrop-blur-sm transition hover:bg-[hsl(var(--background)/0.6)]`}
    >
      <div
        className={`absolute -right-4 -top-4 h-16 w-16 rounded-full ${t.bg} blur-2xl transition group-hover:scale-150`}
      />
      <div className="relative">
        <div
          className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${t.bg} ${t.text}`}
        >
          <Icon className="h-3.5 w-3.5" />
        </div>
        <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
        <div
          className={`mt-0.5 font-display text-2xl font-black tabular-nums ${t.text}`}
        >
          {value}
        </div>
      </div>
    </motion.div>
  );
};

const RankBadge: React.FC<{ position: number }> = ({ position }) => {
  const styles =
    position === 1
      ? "bg-gradient-to-br from-amber-300 to-amber-500 text-background shadow-[0_0_12px_rgba(251,191,36,0.5)]"
      : position === 2
        ? "bg-gradient-to-br from-slate-200 to-slate-400 text-background"
        : position === 3
          ? "bg-gradient-to-br from-orange-400 to-orange-600 text-background"
          : "bg-secondary text-muted-foreground";
  return (
    <div
      className={`flex h-7 w-7 items-center justify-center rounded-lg font-display text-xs font-black ${styles}`}
    >
      {position}
    </div>
  );
};

const LANE_TONES: Record<string, string> = {
  Top: "border-rose-500/30 bg-rose-500/10 text-rose-300",
  Jungle: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  Mid: "border-primary/30 bg-primary/10 text-primary",
  ADC: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  Support:
    "border-[hsl(248_86%_70%_/_0.3)] bg-[hsl(248_86%_70%_/_0.1)] text-violet-300",
};
const LaneBadge: React.FC<{ lane?: string }> = ({ lane }) => (
  <span
    className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
      lane
        ? LANE_TONES[lane]
        : "border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.4)] text-muted-foreground"
    }`}
  >
    {lane ?? "—"}
  </span>
);

const AggressionBar: React.FC<{ value: number }> = ({ value }) => {
  const v = Math.max(0, Math.min(100, value));
  const tone =
    v > 75
      ? "from-rose-400 to-orange-500"
      : v > 45
        ? "from-primary to-primary-glow"
        : "from-emerald-400 to-cyan-400";
  return (
    <div className="flex items-center justify-end gap-2">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[hsl(var(--secondary)/0.6)]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${v}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full bg-linear-to-r ${tone} shadow-[0_0_8px_currentColor]`}
        />
      </div>
      <span className="w-8 text-right font-display text-xs font-bold tabular-nums">
        {v}
      </span>
    </div>
  );
};

// ─── Modal: Criar time ────────────────────────────────────────────────────────
const CreateTeamModal: React.FC<{
  onClose: () => void;
  onCreate: (name: string) => void;
}> = ({ onClose, onCreate }) => {
  const [name, setName] = useState("");
  return (
    <ModalShell
      title="Criar novo time"
      subtitle="Dê um nome de impacto ao seu time"
      onClose={onClose}
    >
      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        Nome do time
      </label>
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ex: Hextech Vanguards"
        className="mt-2 w-full rounded-xl border border-border bg-[hsl(var(--background)/0.6)] px-4 py-3 text-sm font-medium backdrop-blur-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)]"
      />
      <ModalFooter
        onCancel={onClose}
        onConfirm={() => onCreate(name.trim())}
        disabled={!name.trim()}
        confirmLabel="Criar time"
      />
    </ModalShell>
  );
};

// ─── Modal: Adicionar jogador ─────────────────────────────────────────────────
const AddPlayerModal: React.FC<{
  onClose: () => void;
  onSubmit: (p: { name: string; tag: string }) => void;
}> = ({ onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const valid = name.trim().length >= 2 && tag.trim().length >= 2;

  return (
    <ModalShell
      title="Adicionar jogador"
      subtitle="Use o Riot ID (Nome + Tag)"
      onClose={onClose}
    >
      <div className="grid grid-cols-[1fr_140px] gap-3">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Nome
          </label>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Faker"
            className="mt-2 w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.6)] px-4 py-3 text-sm font-medium focus:border-primary focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)]"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Tag
          </label>
          <div className="mt-2 flex items-center rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.6)] focus-within:border-primary focus-within:ring-2 focus-within:ring-[hsl(var(--primary)/0.3)]">
            <span className="px-3 font-display text-sm font-bold text-primary">
              #
            </span>
            <input
              value={tag}
              onChange={(e) => setTag(e.target.value.replace("#", ""))}
              placeholder="KR1"
              className="w-full bg-transparent py-3 pr-3 text-sm font-medium focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[hsl(var(--primary)/0.2)] bg-[hsl(var(--primary)/0.05)] p-3">
        <div className="flex items-start gap-2">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Buscaremos as estatísticas reais do jogador via Riot API após
            confirmar.
          </p>
        </div>
      </div>

      <ModalFooter
        onCancel={onClose}
        onConfirm={() => onSubmit({ name: name.trim(), tag: tag.trim() })}
        disabled={!valid}
        confirmLabel="Adicionar"
      />
    </ModalShell>
  );
};



// ─── Modal shell ──────────────────────────────────────────────────────────────
const ModalShell: React.FC<{
  title: string;
  subtitle?: string;
  onClose: () => void;
  wide?: boolean;
  children: React.ReactNode;
}> = ({ title, subtitle, onClose, wide, children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-[hsl(var(--background)/0.8)] p-4 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 20 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => e.stopPropagation()}
      className={[
        "relative w-full max-h-[85vh] overflow-hidden rounded-2xl border border-border bg-card-glass p-6 shadow-elevated flex flex-col",
        wide ? "max-w-2xl" : "max-w-md",
      ].join(" ")}
    >
      <div className="absolute -right-20 -top-20 h-36 w-48 rounded-full bg-[hsl(var(--primary)/0.1)] blur-3xl" />
      <button
        onClick={onClose}
        className="absolute right-3 top-3 z-10 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.4)] p-1.5 text-muted-foreground backdrop-blur-sm transition hover:border-[hsl(var(--border))] hover:bg-secondary hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="relative flex flex-col max-h-[80vh]">
        <h3 className="font-display text-xl font-black text-primary">
          {title}
        </h3>

        {subtitle && (
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        )}
        <div className="mt-5 flex-1 overflow-y-auto pr-2">{children}</div>
      </div>
    </motion.div>
  </motion.div>
);

const ModalFooter: React.FC<{
  onCancel: () => void;
  onConfirm: () => void;
  disabled?: boolean;
  confirmLabel: string;
}> = ({ onCancel, onConfirm, disabled, confirmLabel }) => (
  <div className="mt-6 flex justify-end gap-2">
    <button
      onClick={onCancel}
      className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.4)] px-4 py-2.5 text-sm font-bold transition hover:bg-secondary"
    >
      Cancelar
    </button>
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      disabled={disabled}
      onClick={onConfirm}
      className="rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
    >
      {confirmLabel}
    </motion.button>
  </div>
);



// ─── Helpers ──────────────────────────────────────────────────────────────────
function aggregate(members: Member[]) {
  if (members.length === 0) return { wr: 0, kda: 0, agg: 0, lanes: 0 };
  const wr = Math.round(
    members.reduce((s, m) => s + (m.winrate ?? 0), 0) / members.length,
  );
  const kda = members.reduce((s, m) => s + (m.kda ?? 0), 0) / members.length;
  const agg = Math.round(
    members.reduce((s, m) => s + (m.aggression ?? 0), 0) / members.length,
  );
  const lanes = new Set(members.map((m) => m.lane).filter(Boolean)).size;
  
  return { wr, kda, agg, lanes};
}

export default TeamsPage;
