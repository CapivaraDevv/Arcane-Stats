import type { ReactElement } from 'react'
import HomePage from '../../features/home/pages/HomePage'
import DashboardPage from '../../features/dashboard/pages/DashboardPage'
import TeamsPage from '../../features/teams/pages/TeamsPage'
import PlayersPage from '../../features/players/pages/PlayersPage'
import MatchesPage from '../../features/matches/pages/MatchesPage'
import SettingsPage from '../../features/settings/pages/SettingsPage'
import LoginPage from '../../features/auth/pages/LoginPage'
import RegisterPage from '../../features/auth/pages/RegisterPage'

export type AppRoute = {
  path: string
  element: ReactElement
  requiresAuth: boolean
  showShell: boolean
}

export const appRoutes: AppRoute[] = [
  { path: '/', element: <HomePage />, requiresAuth: false, showShell: false },
  { path: '/login', element: <LoginPage />, requiresAuth: false, showShell: false },
  { path: '/register', element: <RegisterPage />, requiresAuth: false, showShell: false },
  { path: '/dashboard', element: <DashboardPage />, requiresAuth: true, showShell: true },
  { path: '/times', element: <TeamsPage />, requiresAuth: true, showShell: true },
  { path: '/jogadores', element: <PlayersPage />, requiresAuth: true, showShell: true },
  { path: '/partidas', element: <MatchesPage />, requiresAuth: true, showShell: true },
  { path: '/configuracoes', element: <SettingsPage />, requiresAuth: true, showShell: true },
]

export function getRouteMeta(pathname: string) {
  return appRoutes.find((route) => route.path === pathname)
}
