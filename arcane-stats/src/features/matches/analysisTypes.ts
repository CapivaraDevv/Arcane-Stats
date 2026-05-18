export type MetricBenchmark = {
  name: string
  unit: string
  value: number
  benchmark: number
  deviation: number
}

export type ChampionStat = {
  champion: string
  games: number
  winrate: number
  kda: number
  grade: string
}

export type ActionStep = {
  title: string
  detail: string
  priority: 'alta' | 'média' | 'baixa'
}

export type GoalItem = {
  metric: string
  current: number
  target: number
  unit: string
}

export type AnalysisReport = {
  gradeGlobal: string
  diagnosticoGeral: string
  metricas: MetricBenchmark[]
  pool: ChampionStat[]
  gargalos: string[]
  pontosPositivos: string[]
  trendData: { partida: string; kda: number; winrate: number }[]
  recentVsOld: { label: string; recent: number; old: number; unit: string }[]
  radarData: { subject: string; value: number; fullMark: number }[]
  planoDeAcao: ActionStep[]
  recomendacoes: { champion: string; motivo: string }[]
  metas: GoalItem[]
}
