import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { useState } from 'react'
import Header from './pages/Header'
import Sidebar from './pages/Sidebar'
import AnimatedRoutes from './pages/AnimatedRoutes'
import LoadingScreen from './pages/LoadingScreenn'
import { AuthProvider } from './hooks/useAuth.tsx'
import { AssetProvider } from './hooks/useAssets.tsx'
import Home from './pages/Home'

function App() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)

  return (
    <BrowserRouter>
      <AssetProvider>
        <AuthProvider>
          <Home />
          {/* <LoadingScreen onLoadingComplete={() => setIsLoadingComplete(true)} />      
          <div className='flex min-h-screen'>
            <Sidebar />
            <div className='flex-1 flex flex-col'>
              {isLoadingComplete && <Header />}
              <AnimatedRoutes isReady={isLoadingComplete} />
            </div>
          </div> */}
        </AuthProvider>
      </AssetProvider>
    </BrowserRouter>
  )
}

export default App
