export type StoredUser = { id: string; name: string; email: string; password?: string }

export type Team = {
  id: number
  nome: string
  tag: string
  creatorId: string
  members: string[]
  createdAt: number
  winrate?: number
  partidas?: number
  vitorias?: number
  derrotas?: number
}
