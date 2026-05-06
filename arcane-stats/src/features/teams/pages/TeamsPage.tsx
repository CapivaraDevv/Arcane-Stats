// src/pages/TeamsPage.tsx
import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Shield, Sparkles } from "lucide-react";

import ScrollReveal from "../../../components/ScrollReveal";
import { useConfig } from "../../../hooks/useConfig";
import useTeams from "../hooks/useTeams";
import type { Team, SortKey } from "../types";
import useAuthContext from "../../../features/auth/hooks/useAuth";
import TeamsHeader from "../components/TeamsHeader";
import TeamsSidebar from "../components/TeamsSidebar";
import TeamDetail from "../components/TeamDetail";

// ─── Página ───────────────────────────────────────────────────────────────────
const TeamsPage: React.FC = () => {
  useConfig();
  const { user } = useAuthContext();
  const userId = user?.id ?? "";

  const { teams, createTeam, addMemberByEmail, addMemberByNameTag } =
    useTeams();

  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (!selectedId && teams.length > 0) {
      setSelectedId(teams[0].id);
    }
  }, [teams, selectedId]);

  const selected = useMemo(
    () => teams.find((t: Team) => t.id === selectedId) ?? null,
    [teams, selectedId],
  );

  const [showCreate, setShowCreate] = useState(false);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("winrate");

  const isOwner = selected?.creatorId === userId;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background hextech */}
      <div className="pointer-events-none absolute inset-0 bg-hero" />
      <div className="pointer-events-none absolute inset-0 bg-hex opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[hsl(var(--primary)/0.2)] blur-3xl" />

      {/* Header */}
      <TeamsHeader onCreate={() => setShowCreate(true)} />

      {/* Layout sidebar + detalhe */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-[340px_1fr]">
        {/* Sidebar */}
        <TeamsSidebar
          teams={teams}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
          userId={user?.id}
        />

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
      <label className="text-[10px] font-bold uppercase tracking-widest">
        Nome do time
      </label>
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ex: Hextech Vanguards"
        className="mt-2 w-full rounded-xl text-muted-foreground border border-border bg-[hsl(var(--background)/0.6)] px-4 py-3 text-sm font-medium backdrop-blur-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)] focus:ring-inset"
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
      <div className="grid grid-cols-[1fr_140px] gap-4">
        <div>
          <label className="text-[10px] p-1 font-bold uppercase tracking-widest">
            Nome
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Faker"
            className="mt-2 w-full rounded-xl border border-border
            bg-[hsl(var(--background)/0.6)]
            px-4 py-3 text-sm text-muted-foreground font-medium
            focus:outline-none
            focus:border-primary
            focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)]
            focus:ring-inset"
          />
        </div>
        <div>
          <label className="text-[10px] p-1 font-bold uppercase tracking-widest">
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
              className="w-full bg-transparent text-muted-foreground py-3 pr-3 text-sm font-medium focus:outline-none"
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
        "relative w-full max-h-[85vh] overflow-visible rounded-2xl border border-border bg-card-glass p-6 shadow-elevated flex flex-col",
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

export default TeamsPage;
