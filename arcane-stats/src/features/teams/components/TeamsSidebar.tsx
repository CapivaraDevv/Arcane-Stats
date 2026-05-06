// src/features/teams/components/TeamsSidebar.tsx
import { motion } from "framer-motion";
import { Crown, Shield, ChevronRight } from "lucide-react";
import ScrollReveal from "../../../components/ScrollReveal";
import type { Team } from "../types";

type Props = {
  teams: Team[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  userId?: string;
};

export default function TeamsSidebar({
  teams,
  selectedId,
  onSelect,
  userId,
}: Props) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <ScrollReveal preset="left">
        <div className="rounded-2xl border border-border bg-card-glass p-4 shadow-card">
          {/* Header */}
          <div className="flex items-center justify-between px-1 pb-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Seus times
            </span>
            <span className="rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.1)] px-2 py-0.5 text-[10px] font-bold text-primary">
              {teams.length}
            </span>
          </div>

          {/* Lista */}
          <div className="space-y-1.5">
            {teams.length === 0 && (
              <div className="rounded-xl border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--background)/0.4)] px-3 py-8 text-center">
                <Shield className="mx-auto h-8 w-8 text-[hsl(var(--muted-foreground)/0.5)]" />
                <p className="mt-2 text-xs text-muted-foreground">
                  Nenhum time ainda.
                </p>
              </div>
            )}

            {teams.map((t, i) => {
              const active = t.id === selectedId;

              return (
                <motion.button
                  key={t.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => onSelect(t.id)}
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

                  {/* Avatar */}
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

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-bold">
                      {t.nome}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {t.members.length}{" "}
                      {t.members.length === 1 ? "membro" : "membros"}
                    </p>
                  </div>

                  {/* Owner */}
                  {t.creatorId === userId && (
                    <Crown className="h-3.5 w-3.5 text-amber-400" />
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
  );
}