import './App.css'
import Home from './pages/Home'
import Header from './pages/Header'
import Sidebar from './pages/Sidebar'

function App() {

  return (
    <>
      <div className='flex min-h-screen'>
        <Sidebar />
        <div className='flex-1 flex flex-col'>
          <Header />
          <Home />
        </div>
      </div>
    </>
  )
}

export default App
