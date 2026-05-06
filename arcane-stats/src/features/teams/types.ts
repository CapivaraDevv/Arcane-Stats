// types.ts
export type Member = {
  id: string;
  name: string;
  tag?: string;
  lane?: "Top" | "Jungle" | "Mid" | "ADC" | "Support";
  winrate?: number;
  kda?: number;
  aggression?: number;
  mainChampion?: string;

  // opcional: se quiser linkar com usuário do sistema
  userId?: string;
};

export type Team = {
  id: number;
  nome: string;
  creatorId: string;
  members: Member[];
  tag?: string;
};

export type SortKey = "winrate" | "kda" | "aggression";