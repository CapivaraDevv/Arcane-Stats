import './App.css'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import AppProviders from './app/providers/AppProviders'
import AppRouter from './app/router/AppRouter'
import { getRouteMeta } from './app/router/routeConfig'
import AppShell from './layouts/AppShell'
import LoadingScreen from './shared/ui/LoadingScreen'

function AppContent() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)
  const { pathname } = useLocation()
  const routeMeta = getRouteMeta(pathname)
  const showShell = routeMeta?.showShell ?? false

  return (
    <>
      <LoadingScreen onLoadingComplete={() => setIsLoadingComplete(true)} />
      <AppShell showShell={showShell && isLoadingComplete}>
        <AppRouter isReady={isLoadingComplete} />
      </AppShell>
    </>
  )
}

function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  )
}

export default App
