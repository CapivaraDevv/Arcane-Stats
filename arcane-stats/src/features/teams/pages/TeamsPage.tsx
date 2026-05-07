import React from "react";
import { AnimatePresence } from "framer-motion";

import ScrollReveal from "../../../components/ScrollReveal";
import { useConfig } from "../../../hooks/useConfig";

import useAuthContext from "../../../features/auth/hooks/useAuth";

import useTeams from "../hooks/useTeams";
import useTeamsPageState from "../hooks/useTeamsPageState";

import TeamsHeader from "../components/TeamsHeader";
import TeamsSidebar from "../components/TeamsSidebar";
import TeamDetail from "../components/TeamDetail";
import EmptyState from "../components/EmptyState";
import CreateTeamModal from "../components/CreateTeamModal";
import AddPlayerModal from "../components/AddPlayerModal";

// ─── Página ───────────────────────────────────────────────────────────────────
const TeamsPage: React.FC = () => {
  useConfig();
  const { user } = useAuthContext();
  const userId = user?.id ?? "";

  const { teams, createTeam, addMemberByEmail, addMemberByNameTag } =
    useTeams();

  const {
    selected,
    selectedId,
    setSelectedId,

    showCreate,
    setShowCreate,

    showAddPlayer,
    setShowAddPlayer,

    sortKey,
    setSortKey,
  } = useTeamsPageState({ teams });

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

export default TeamsPage;
