import './App.css'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Header from './pages/Header'
import Sidebar from './pages/Sidebar'
import AnimatedRoutes from './pages/AnimatedRoutes'
import LoadingScreen from './pages/LoadingScreenn'
import { AuthProvider } from './hooks/useAuth.tsx'
import { AssetProvider } from './hooks/useAssets.tsx'
import Home from './pages/Home'

const ROTAS_SEM_SIDEBAR_E_HEADER = ['/login', '/register', '/']


function AppLayout() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)
  const { pathname } = useLocation()

  const mostrarSidebareHeader = !ROTAS_SEM_SIDEBAR_E_HEADER.includes(pathname)

  return (
    <>
      <LoadingScreen onLoadingComplete={() => setIsLoadingComplete(true)} />
      <div className='flex min-h-screen'>
        {mostrarSidebareHeader && isLoadingComplete && <Sidebar />}
        <div className='flex-1 flex flex-col'>
          {mostrarSidebareHeader && isLoadingComplete && <Header />}
          <AnimatedRoutes isReady={isLoadingComplete} />
        </div>
      </div>
    </>
  )
}

function App() {

  return (

    <BrowserRouter>
      <AssetProvider>
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </AssetProvider>
    </BrowserRouter>
  )
}


export default App
