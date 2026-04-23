import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { appRoutes } from './routeConfig'
import PageFade from '../../shared/ui/PageFade'
import ProtectedRoute from '../../shared/routing/ProtectedRoute'

type AppRouterProps = {
  isReady: boolean
}

export default function AppRouter({ isReady }: AppRouterProps) {
  const location = useLocation()
  if (!isReady) return null

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {appRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <PageFade isReady={isReady}>
                {route.requiresAuth ? <ProtectedRoute>{route.element}</ProtectedRoute> : route.element}
              </PageFade>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  )
}
