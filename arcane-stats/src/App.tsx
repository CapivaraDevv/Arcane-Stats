import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Header from './pages/Header'
import Sidebar from './pages/Sidebar'
import AnimatedRoutes from './pages/AnimatedRoutes'

function App() {
  return (
    <BrowserRouter>
      <div className='flex min-h-screen'>
        <Sidebar />
        <div className='flex-1 flex flex-col'>
          <Header />
          <AnimatedRoutes />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
