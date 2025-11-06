import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './pages/Header'
import Sidebar from './pages/Sidebar'
import Dashboard from './pages/Dashboard'
import Times from './pages/Times'
import Jogadores from './pages/Jogadores'
import Partidas from './pages/Partidas'
import Configuracoes from './pages/Configuracoes'

function App() {

  return (
    <BrowserRouter>
      <div className='flex min-h-screen'>
        <Sidebar />
        <div className='flex-1 flex flex-col'>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/times" element={<Times />} />
            <Route path="/jogadores" element={<Jogadores />} />
            <Route path="/partidas" element={<Partidas />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
