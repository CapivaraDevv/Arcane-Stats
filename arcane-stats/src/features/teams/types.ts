// types.ts
export const LANES = ["Top", "Jungle", "Mid", "ADC", "Support"] as const;

export type Lane = (typeof LANES)[number];

export type Member = {
  id: string;
  name: string;
  tag?: string;
  lane?: Lane;
  winrate?: number;
  kda?: number;
  aggression?: number;
  mainChampion?: string;
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