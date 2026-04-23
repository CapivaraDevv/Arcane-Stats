type StoredUser = { id: string; name: string; email: string; password: string }
type SessionUser = { id: string; name: string; email: string }

const USERS_KEY = 'arcane_users_v1'
const SESSION_KEY = 'arcane_session_v1'

function safeRead<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export const authStorage = {
  readUsers(): StoredUser[] {
    return safeRead<StoredUser[]>(USERS_KEY, [])
  },
  writeUsers(users: StoredUser[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  },
  readSession(): SessionUser | null {
    return safeRead<SessionUser | null>(SESSION_KEY, null)
  },
  writeSession(user: SessionUser) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  },
  clearSession() {
    localStorage.removeItem(SESSION_KEY)
  },
}
