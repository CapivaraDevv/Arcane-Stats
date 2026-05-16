import { lazy, type ReactElement } from 'react'
import { matchPath } from "react-router-dom";

const HomePage = lazy(() => import('../../features/home/pages/HomePage'))
const DashboardPage = lazy(() => import('../../features/dashboard/pages/DashboardPage'))
const TeamsPage = lazy(() => import('../../features/teams/pages/TeamsPage'))
const TeamsSimulate = lazy(() => import('../../features/teams/pages/TeamsSimulate'))
const PlayersPage = lazy(() => import('../../features/players/pages/PlayersPage'))
const MatchesPage = lazy(() => import('../../features/matches/pages/MatchesPage'))
const AnalyzePage = lazy(() => import('../../features/matches/pages/AnalyzePage'))
const SettingsPage = lazy(() => import('../../features/settings/pages/SettingsPage'))
const ProfilePage = lazy(() => import('../../features/profile/pages/ProfilePage'))
const LoginPage = lazy(() => import('../../features/auth/pages/LoginPage'))
const RegisterPage = lazy(() => import('../../features/auth/pages/RegisterPage'))

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
