export type StoredUser = {
  id: string
  name: string
  email: string
  password?: string
}

export type Lane = 'Top' | 'Jungle' | 'Mid' | 'ADC' | 'Support'

export interface Member {
  id: string
  nome: string
  tag?: string
  lane?: Lane
  winrate?: number
  kda?: number
  aggression?: number
  mainChampion?: string
}

export interface Team {
  id: number
  nome: string
  creatorId: string
  members: Member[] 
  tag?: string
}

export type TeamWithMembers = {
  id: number
  nome: string
  tag: string
  creatorId: string
  members: Member[] // 👈 UI
  createdAt: number
}