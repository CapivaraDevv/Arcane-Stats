import type { StoredUser, Team } from '../types'

const TEAMS_KEY = 'arcane_teams_v1'
const USERS_KEY = 'arcane_users_v1'

export function readTeams(): Team[] {
  try {
    const raw = localStorage.getItem(TEAMS_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Team[]
  } catch {
    return []
  }
}

export function writeTeams(teams: Team[]) {
  localStorage.setItem(TEAMS_KEY, JSON.stringify(teams))
}

export function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (!raw) return []
    return JSON.parse(raw) as StoredUser[]
  } catch {
    return []
  }
}
