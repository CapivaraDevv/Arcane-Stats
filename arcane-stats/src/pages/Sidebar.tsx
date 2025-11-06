import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="bg-[#000434] min-h-screen w-56 flex flex-col gap-4 px-4 py-8 shadow-lg">
      <h2 className="space-grotesk-title flex text-white px-3 py-4 text-2xl font-bold mb-8">Arcane Stats</h2>
      <nav className="sora-text text-white flex flex-col gap-2">
        <Link 
          to="/dashboard" 
          className={`px-3 py-2 rounded hover:scale-95 transition-all ${
            isActive('/dashboard') || isActive('/') 
              ? 'bg-zinc-700 font-semibold' 
              : 'hover:bg-zinc-700'
          }`}
        >
          Dashboard
        </Link>
        <Link 
          to="/times" 
          className={`px-3 py-2 rounded hover:scale-95 transition-all ${
            isActive('/times') 
              ? 'bg-zinc-700 font-semibold' 
              : 'hover:bg-zinc-700'
          }`}
        >
          Times
        </Link>
        <Link 
          to="/jogadores" 
          className={`px-3 py-2 rounded hover:scale-95 transition-all ${
            isActive('/jogadores') 
              ? 'bg-zinc-700 font-semibold' 
              : 'hover:bg-zinc-700'
          }`}
        >
          Jogadores
        </Link>
        <Link 
          to="/partidas" 
          className={`px-3 py-2 rounded hover:scale-95 transition-all ${
            isActive('/partidas') 
              ? 'bg-zinc-700 font-semibold' 
              : 'hover:bg-zinc-700'
          }`}
        >
          Partidas
        </Link>
        <Link 
          to="/configuracoes" 
          className={`px-3 py-2 rounded hover:scale-95 transition-all ${
            isActive('/configuracoes') 
              ? 'bg-zinc-700 font-semibold' 
              : 'hover:bg-zinc-700'
          }`}
        >
          Configurações
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;