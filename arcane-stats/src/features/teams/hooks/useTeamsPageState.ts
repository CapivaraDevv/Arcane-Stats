// src/features/teams/hooks/useTeamsPageState.ts
import { useEffect, useMemo, useState } from "react";

import type { SortKey, Team } from "../types";

type UseTeamsPageStateProps = {
  teams: Team[];
};

const useTeamsPageState = ({
  teams,
}: UseTeamsPageStateProps) => {
  const [selectedId, setSelectedId] =
    useState<number | null>(null);

  const [showCreate, setShowCreate] =
    useState(false);

  const [showAddPlayer, setShowAddPlayer] =
    useState(false);

  const [sortKey, setSortKey] =
    useState<SortKey>("winrate");

  useEffect(() => {
    if (!selectedId && teams.length > 0) {
      setSelectedId(teams[0].id);
    }
  }, [teams, selectedId]);

  const selected = useMemo(
    () =>
      teams.find((t) => t.id === selectedId) ?? null,
    [teams, selectedId],
  );

  return {
    selected,
    selectedId,
    setSelectedId,

    showCreate,
    setShowCreate,

    showAddPlayer,
    setShowAddPlayer,

    sortKey,
    setSortKey,
  };
};

export default useTeamsPageState;