import React from 'react';

const Sidebar = () => {
  return (
    <aside className="bg-[#000434] min-h-screen w-56 flex flex-col gap-4 px-4 py-8 shadow-lg">
      <h2 className="space-grotesk-title flex text-white px-3 py-4 text-2xl font-bold mb-8">Arcane Stats</h2>
      <nav className="sora-text text-white flex flex-col gap-2">
        <a href="#" className="hover:bg-zinc-700 px-3 py-2 rounded transition">Dashboard</a>
        <a href="#" className="hover:bg-zinc-700 px-3 py-2 rounded transition">Times</a>
        <a href="#" className="hover:bg-zinc-700 px-3 py-2 rounded transition">Jogadores</a>
        <a href="#" className="hover:bg-zinc-700 px-3 py-2 rounded transition">Partidas</a>
        <a href="#" className="hover:bg-zinc-700 px-3 py-2 rounded transition">Configurações</a>
      </nav>
    </aside>
  );
};

export default Sidebar;