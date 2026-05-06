import './App.css'
import { useState } from 'react'
import AppProviders from './app/providers/AppProviders'
import AppRouter from './app/router/AppRouter'
import LoadingScreen from './shared/ui/LoadingScreen'

function AppContent() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)

  return (
    <>
      <LoadingScreen onLoadingComplete={() => setIsLoadingComplete(true)} />
      <AppRouter isReady={isLoadingComplete} />
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