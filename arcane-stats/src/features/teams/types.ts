export type StoredUser = {
  id: string
  name: string
  email: string
  password?: string
}

export type Member = {
  id: string
  nome: string
  tag?: string
  lane?: "Top" | "Jungle" | "Mid" | "ADC" | "Support"
  winrate?: number
  kda?: number
  aggression?: number
}

export type Team = {
  id: number
  nome: string
  tag: string
  creatorId: string
  members: string[] // 👈 storage (IDs)
  createdAt: number
  winrate?: number
  partidas?: number
  vitorias?: number
  derrotas?: number
}

export type TeamWithMembers = {
  id: number
  nome: string
  tag: string
  creatorId: string
  members: Member[] // 👈 UI
  createdAt: number
}