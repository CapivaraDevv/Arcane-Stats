import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="bg-[#1a0b2e] min-h-screen w-56 flex flex-col gap-4 px-4 py-8 shadow-lg border-r border-[#6b46c1]/30">
      <h2 className="space-grotesk-title flex text-white px-3 py-4 text-2xl font-bold mb-8 bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] bg-clip-text text-transparent">Arcane Stats</h2>
      <nav className="sora-text text-white flex flex-col gap-2">
        <Link 
          to="/dashboard" 
          className={`px-3 py-2 rounded hover:scale-95 transition-all ${
            isActive('/dashboard') || isActive('/') 
              ? 'bg-[#6b46c1] font-semibold text-white shadow-lg shadow-[#8b5cf6]/50' 
              : 'hover:bg-[#4a2c6d] text-[#c4b5fd]'
          }`}
        >
          Dashboard
        </Link>
        <Link 
          to="/times" 
          className={`px-3 py-2 rounded hover:scale-95 transition-all ${
            isActive('/times') 
              ? 'bg-[#6b46c1] font-semibold text-white shadow-lg shadow-[#8b5cf6]/50' 
              : 'hover:bg-[#4a2c6d] text-[#c4b5fd]'
          }`}
        >
          Times
        </Link>
        <Link 
          to="/jogadores" 
          className={`px-3 py-2 rounded hover:scale-95 transition-all ${
            isActive('/jogadores') 
              ? 'bg-[#6b46c1] font-semibold text-white shadow-lg shadow-[#8b5cf6]/50' 
              : 'hover:bg-[#4a2c6d] text-[#c4b5fd]'
          }`}
        >
          Jogadores
        </Link>
        <Link 
          to="/partidas" 
          className={`px-3 py-2 rounded hover:scale-95 transition-all ${
            isActive('/partidas') 
              ? 'bg-[#6b46c1] font-semibold text-white shadow-lg shadow-[#8b5cf6]/50' 
              : 'hover:bg-[#4a2c6d] text-[#c4b5fd]'
          }`}
        >
          Partidas
        </Link>
        <Link 
          to="/configuracoes" 
          className={`px-3 py-2 rounded hover:scale-95 transition-all ${
            isActive('/configuracoes') 
              ? 'bg-[#6b46c1] font-semibold text-white shadow-lg shadow-[#8b5cf6]/50' 
              : 'hover:bg-[#4a2c6d] text-[#c4b5fd]'
          }`}
        >
          Configurações
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;