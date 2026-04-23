import type { ConfigType } from '../../../hooks/useConfig'

const STORAGE_KEY = 'arcane-stats-config'

export const configStorage = {
  read<T>(fallback: T): T {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return fallback
      return JSON.parse(raw) as T
    } catch {
      return fallback
    }
  },
  write(config: ConfigType) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  },
  clear() {
    localStorage.removeItem(STORAGE_KEY)
  },
}
