import { useEffect, useState } from "react";
import { readTeams, readUsers, writeTeams } from "../services/teamsStorage";
import type { Member, Team } from "../types";

const normalizeRiotId = (name: string, tag: string) => {
  return {
    gameName: name.trim(),
    tagLine: tag.trim().toUpperCase(),
  };
};

const findRiotUser = async (name: string, tag: string) => {
  const { gameName, tagLine } = normalizeRiotId(name, tag);

  // mock (depois vira API)
  return {
    id: `${gameName}#${tagLine}`,
    name: gameName,
    tag: tagLine,
    winrate: Math.floor(Math.random() * 40) + 50,
    kda: Number((Math.random() * 3 + 1).toFixed(2)),
    aggression: Math.floor(Math.random() * 100),
  };
};

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    setTeams(readTeams());
  }, []);

  const refresh = () => setTeams(readTeams());

  const createTeam = async (nome: string, creatorId: string, tag?: string) => {
    if (!nome || !creatorId)
      return { success: false, message: "Nome e criador são obrigatórios" };
    const existing = readTeams();
    const id = Date.now();
    const newTeam: Team = {
      id,
      nome,
      tag: tag || nome.slice(0, 3).toUpperCase(),
      creatorId,
      members: [],
    };
    existing.unshift(newTeam);
    writeTeams(existing);
    setTeams(existing);
    return { success: true, team: newTeam };
  };

  const findUserByEmail = (email: string) => {
    if (!email) return null;
    const users = readUsers();
    return (
      users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null
    );
  };

  const findUserById = (id?: string) => {
    if (!id) return null;
    const users = readUsers();
    return users.find((u) => u.id === id) || null;
  };

  const addMemberByEmail = async (
    teamId: number,
    email: string,
    byUserId: string,
  ) => {
    const teamList = readTeams();
    const team = teamList.find((t) => t.id === teamId);
    if (!team) return { success: false, message: "Time não encontrado" };
    if (team.creatorId !== byUserId)
      return {
        success: false,
        message: "Apenas o criador pode adicionar membros",
      };
    const user = findUserByEmail(email);
    if (!user) return { success: false, message: "Usuário não encontrado" };
    if (team.members.some((m) => m.id === user.id)) {
      return { success: false, message: "Usuário já é membro do time" };
    }

    

    const newMember: Member = {
      id: user.id,
      name: user.name,
    };

    team.members.push(newMember);

    writeTeams(teamList);
    setTeams(teamList);

    return { success: true };
  };

  const addMemberByNameTag = async (
      teamId: number,
      riotId: { name: string; tag: string },
      byUserId: string,
    ) => {
      const teamList = readTeams();
      const team = teamList.find((t) => t.id === teamId);

      if (!team) {
        return { success: false, message: "Time não encontrado" };
      }

      if (team.creatorId !== byUserId) {
        return { success: false, message: "Sem permissão" };
      }

      const user = await findRiotUser(riotId.name, riotId.tag);

      if (!user) {
        return { success: false, message: "Jogador não encontrado" };
      }

      if (team.members.some((m) => m.id === user.id)) {
        return { success: false, message: "Jogador já está no time" };
      }

      const newMember: Member = {
        id: user.id,
        name: user.name,
        tag: user.tag,
        winrate: user.winrate,
        kda: user.kda,
        aggression: user.aggression,
      };

      team.members.push(newMember);

      writeTeams(teamList);
      setTeams(teamList);

      return { success: true };
    };

  const getTeamsForUser = (userId?: string) => {
    if (!userId) return [] as Team[];
    return teams.filter((t) => t.members.some((m) => m.id === userId));
  };

  return {
    teams,
    refresh,
    createTeam,
    addMemberByEmail,
    addMemberByNameTag,
    findUserByEmail,
    findUserById,
    getTeamsForUser,
  } as const;
}

export default useTeams;
