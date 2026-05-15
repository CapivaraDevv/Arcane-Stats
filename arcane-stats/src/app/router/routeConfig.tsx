import type { ReactElement } from 'react'
import { matchPath } from "react-router-dom";



import HomePage from '../../features/home/pages/HomePage'
import DashboardPage from '../../features/dashboard/pages/DashboardPage'
import TeamsPage from '../../features/teams/pages/TeamsPage'
import TeamsSimulate from '../../features/teams/pages/TeamsSimulate'
import PlayersPage from '../../features/players/pages/PlayersPage'
import MatchesPage from '../../features/matches/pages/MatchesPage'
import AnalyzePage from '../../features/matches/pages/AnalyzePage'
import SettingsPage from '../../features/settings/pages/SettingsPage'
import ProfilePage from '../../features/profile/pages/ProfilePage'
import LoginPage from '../../features/auth/pages/LoginPage'
import RegisterPage from '../../features/auth/pages/RegisterPage'

export type RouteMeta = {
  auth: 'public' | 'private'
  layout: 'blank' | 'shell'
}

export type AppRoute = {
  path: string
  element: ReactElement
  meta: RouteMeta
}

export const appRoutes: AppRoute[] = [
  { path: '/', element: <HomePage />, meta: { auth: 'public', layout: 'blank'} },
  { path: '/login', element: <LoginPage />, meta: { auth: 'public', layout: 'blank'} },
  { path: '/register', element: <RegisterPage />, meta: { auth: 'public', layout: 'blank'} },

  { path: '/dashboard', element: <DashboardPage />, meta: { auth: 'private', layout: 'shell'} },

  { path: '/times', element: <TeamsPage />, meta: { auth: 'private', layout: 'shell'} },
  { path: '/times/:id/simulate', element: <TeamsSimulate />, meta: { auth: 'private', layout: 'shell'} },

  { path: '/jogadores', element: <PlayersPage />, meta: { auth: 'private', layout: 'shell'} },
  { path: '/partidas', element: <MatchesPage />, meta: { auth: 'private', layout: 'shell'} },
  { path: '/analisar', element: <AnalyzePage />, meta: { auth: 'private', layout: 'shell'} },
  { path: '/perfil', element: <ProfilePage />, meta: { auth: 'private', layout: 'shell'} },
  { path: '/configuracoes', element: <SettingsPage />, meta: { auth: 'private', layout: 'shell'} },
]

const sortedRoutes = [...appRoutes].sort(
  (a, b) => b.path.length - a.path.length
)

export function getRouteMeta(pathname: string): RouteMeta {
  return (
    sortedRoutes.find((route) =>
      matchPath({ path: route.path, end: false }, pathname)
    )?.meta ?? { auth: 'public', layout: 'blank' }
  )
}

export const usesShell = (meta?: RouteMeta) =>
  meta?.layout === "shell";

export const isPrivateRoute = (meta?: RouteMeta) =>
  meta?.auth === 'private'

