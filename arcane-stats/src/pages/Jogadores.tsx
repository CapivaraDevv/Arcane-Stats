import { useState, useMemo } from 'react';
import ScrollReveal from '../components/ScrollReveal';

// interface Jogador removed (ranking uses a simpler structure)

const Jogadores = () => {
  const [filtroRole, setFiltroRole] = useState<string>('Todas');

  // ddragonVersion removed (não usado aqui)
  // Estado para controlar falhas no carregamento de imagens
  // const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // (removido) fetching ddragon version - não necessário no ranking

  // Função utilitária para construir URL da imagem do campeão
  // Função utilitária para construir URL da imagem do campeão removida (não usada)

  // Ranking de jogadores (mock com nomes de jogadores profissionais públicos e estatísticas demonstrativas)
  const ranking = [
    { rank: 1, nick: 'Faker', name: 'Lee Sang-hyeok', team: 'T1', role: 'Mid', kda: 6.2, winrate: 72, games: 210, country: 'KR' },
    { rank: 2, nick: 'Caps', name: 'Rasmus Winther', team: 'G2 Esports', role: 'Mid', kda: 5.8, winrate: 69, games: 198, country: 'EU' },
    { rank: 3, nick: 'Chovy', name: 'Jeong Ji-hoon', team: 'Gen.G', role: 'Mid', kda: 5.6, winrate: 67, games: 185, country: 'KR' },
    { rank: 4, nick: 'Rekkles', name: 'Carl Martin Erik Larsson', team: 'G2 Esports', role: 'ADC', kda: 5.4, winrate: 66, games: 220, country: 'EU' },
    { rank: 5, nick: 'Perkz', name: 'Luka Perković', team: 'Cloud9', role: 'ADC', kda: 5.1, winrate: 65, games: 205, country: 'EU' },
    { rank: 6, nick: 'Teddy', name: 'Park Jin-seong', team: 'T1', role: 'ADC', kda: 4.9, winrate: 64, games: 190, country: 'KR' },
    { rank: 7, nick: 'Doinb', name: 'Kim Tae-sang', team: 'LNG', role: 'Mid', kda: 4.8, winrate: 63, games: 176, country: 'KR' },
    { rank: 8, nick: 'Uzi', name: 'Jian Zihao', team: 'Retired', role: 'ADC', kda: 4.7, winrate: 62, games: 300, country: 'CN' },
    { rank: 9, nick: 'Nuguri', name: 'Jang Ha-gwon', team: 'DWG KIA', role: 'Top', kda: 4.6, winrate: 61, games: 160, country: 'KR' },
    { rank: 10, nick: 'ShowMaker', name: 'Heo Su', team: 'DWG KIA', role: 'Mid', kda: 4.5, winrate: 60, games: 170, country: 'KR' }
  ];

  const roles = ['Todas', 'Top', 'Jungle', 'Mid', 'ADC', 'Support'];
  const jogadoresFiltrados = filtroRole === 'Todas'
    ? ranking
    : ranking.filter(j => j.role === filtroRole);

  // Ordenação e paginação
  const [sortKey, setSortKey] = useState<'rank' | 'kda' | 'winrate' | 'games'>('rank');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const sorted = useMemo(() => {
    const arr = [...jogadoresFiltrados];
    arr.sort((a: any, b: any) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      // number
      return sortDir === 'asc' ? (aVal - bVal) : (bVal - aVal);
    });
    return arr;
  }, [jogadoresFiltrados, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  if (page > totalPages) setPage(totalPages);
  const pageItems = sorted.slice((page - 1) * pageSize, page * pageSize);

  // getEloColor removido (não usado no ranking)

  const getInitials = (nick: string) => {
    return nick.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase();
  };

  return (
    <main className="flex-1 p-8 bg-[#0B132B] min-h-screen">
      <div className="mb-6">
        <h2 className="space-grotesk-title text-3xl font-bold mb-2 text-[#E0E0E0]">Jogadores</h2>
        <p className="sora-text text-[#A8A8A8]">Gerencie e visualize estatísticas dos jogadores</p>
      </div>

      {/* Filtros por Role */}
      <div className="flex flex-wrap gap-2 mb-6">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => { setFiltroRole(role); setPage(1); }}
            className={`px-4 py-2 rounded-lg transition-all ${filtroRole === role
              ? 'bg-[#0077B6] text-[#E0E0E0] shadow-lg'
              : 'bg-[#1D2D50] text-[#A8A8A8] hover:bg-[#0077B6]/50 border border-white/5'
              }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Tabela de Ranking de Jogadores */}
      <div className="bg-[#1D2D50] rounded-lg p-4 border border-white/5 shadow-lg">
        <ScrollReveal preset="up" delay={0.05} duration={0.6}>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="text-left text-sm text-[#A8A8A8] border-b border-white/10">
                  <th className="py-3 px-4 w-12 cursor-pointer" onClick={() => { if (sortKey === 'rank') setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); else { setSortKey('rank'); setSortDir('asc'); } }}>
                    # {sortKey === 'rank' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th className="py-3 px-4">Jogador</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4 cursor-pointer" onClick={() => { if (sortKey === 'kda') setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); else { setSortKey('kda'); setSortDir('desc'); } }}>
                    KDA {sortKey === 'kda' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th className="py-3 px-4 cursor-pointer" onClick={() => { if (sortKey === 'winrate') setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); else { setSortKey('winrate'); setSortDir('desc'); } }}>
                    Winrate {sortKey === 'winrate' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th className="py-3 px-4 cursor-pointer" onClick={() => { if (sortKey === 'games') setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); else { setSortKey('games'); setSortDir('desc'); } }}>
                    Partidas {sortKey === 'games' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                  </th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((p, idx) => (
                  <tr key={p.rank} className={`border-b border-white/5 ${idx % 2 === 0 ? 'bg-[#14223A]/20' : ''}`}>
                    <td className="py-3 px-4 font-semibold text-[#E0E0E0]">{p.rank}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-linear-to-br from-[#0077B6] to-[#00B4D8] text-white font-bold">
                          {getInitials(p.nick)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#E0E0E0]">{p.nick}</div>
                          <div className="text-xs text-[#A8A8A8]">{p.name} • {p.country}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#A8A8A8]">{p.team}</td>
                    <td className="py-3 px-4 text-sm text-[#A8A8A8]">{p.role}</td>
                    <td className="py-3 px-4 text-sm text-[#00B4D8] font-semibold">{p.kda.toFixed(1)}</td>
                    <td className="py-3 px-4 text-sm text-[#4CAF50] font-semibold">{p.winrate}%</td>
                    <td className="py-3 px-4 text-sm text-[#F4A261]">{p.games}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Controles de paginação */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-[#A8A8A8]">
            Mostrando <span className="text-[#E0E0E0]">{(page - 1) * pageSize + 1}</span>–<span className="text-[#E0E0E0]">{Math.min(page * pageSize, sorted.length)}</span> de <span className="text-[#E0E0E0]">{sorted.length}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded bg-[#0B132B] text-[#A8A8A8] disabled:opacity-50"
            >Prev</button>
            <div className="text-sm text-[#A8A8A8]">Página</div>
            <input type="number" value={page} min={1} max={totalPages} onChange={(e) => setPage(Math.min(Math.max(1, Number(e.target.value || 1)), totalPages))} className="w-12 text-center bg-[#0B132B] text-[#E0E0E0] rounded" />
            <div className="text-sm text-[#A8A8A8]">de {totalPages}</div>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded bg-[#0B132B] text-[#A8A8A8] disabled:opacity-50"
            >Next</button>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm text-[#A8A8A8]">Linhas</div>
            <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="bg-[#0B132B] text-[#E0E0E0] rounded px-2 py-1">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Jogadores;

