import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { useState } from 'react'
import Header from './pages/Header'
import Sidebar from './pages/Sidebar'
import AnimatedRoutes from './pages/AnimatedRoutes'
import LoadingScreen from './pages/LoadingScreenn'

function App() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)

  return (
    <BrowserRouter>
      <LoadingScreen onLoadingComplete={() => setIsLoadingComplete(true)} />      
      <div className='flex min-h-screen'>
        <Sidebar />
        <div className='flex-1 flex flex-col'>
          <Header />
          <AnimatedRoutes isReady={isLoadingComplete} />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
