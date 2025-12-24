import { useEffect, useState } from 'react';

type StoredUser = { id: string; name: string; email: string; password?: string };

export type Team = {
  id: number;
  nome: string;
  tag: string;
  creatorId: string;
  members: string[]; // user ids
  createdAt: number;
  // optional stats
  winrate?: number;
  partidas?: number;
  vitorias?: number;
  derrotas?: number;
};

const TEAMS_KEY = 'arcane_teams_v1';
const USERS_KEY = 'arcane_users_v1';

function readTeams(): Team[] {
  try {
    const raw = localStorage.getItem(TEAMS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Team[];
  } catch {
    return [];
  }
}

function writeTeams(teams: Team[]) {
  localStorage.setItem(TEAMS_KEY, JSON.stringify(teams));
}

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
}

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    setTeams(readTeams());
  }, []);

  const refresh = () => setTeams(readTeams());

  const createTeam = async (nome: string, tag: string, creatorId: string) => {
    if (!nome || !creatorId) return { success: false, message: 'Nome e criador são obrigatórios' };
    const existing = readTeams();
    const id = Date.now();
    const newTeam: Team = {
      id,
      nome,
      tag: tag || nome.slice(0, 3).toUpperCase(),
      creatorId,
      members: [creatorId],
      createdAt: Date.now(),
    };
    existing.unshift(newTeam);
    writeTeams(existing);
    setTeams(existing);
    return { success: true, team: newTeam };
  };

  const findUserByEmail = (email: string) => {
    if (!email) return null;
    const users = readUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  };

  const findUserById = (id?: string) => {
    if (!id) return null;
    const users = readUsers();
    return users.find(u => u.id === id) || null;
  };

  const addMemberByEmail = async (teamId: number, email: string, byUserId: string) => {
    const teams = readTeams();
    const team = teams.find(t => t.id === teamId);
    if (!team) return { success: false, message: 'Time não encontrado' };
    if (team.creatorId !== byUserId) return { success: false, message: 'Apenas o criador pode adicionar membros' };
    const user = findUserByEmail(email);
    if (!user) return { success: false, message: 'Usuário não encontrado' };
    if (team.members.includes(user.id)) return { success: false, message: 'Usuário já é membro do time' };
    team.members.push(user.id);
    writeTeams(teams);
    setTeams(teams);
    return { success: true };
  };

  const getTeamsForUser = (userId?: string) => {
    if (!userId) return [] as Team[];
    return teams.filter(t => t.members.includes(userId));
  };

  return {
    teams,
    refresh,
    createTeam,
    addMemberByEmail,
    findUserByEmail,
    findUserById,
    getTeamsForUser,
  } as const;
}

export default useTeams;
