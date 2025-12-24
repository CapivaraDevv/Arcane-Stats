import { useState, useMemo, useEffect, useRef } from 'react';
import ScrollReveal from '../components/ScrollReveal';

type Player = { rank: number; nick: string; name: string; team: string; role: string; kda: number; winrate: number; games: number; country: string };

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
    arr.sort((a: Player, b: Player) => {
      let aVal: string | number;
      let bVal: string | number;
      if (sortKey === 'rank' || sortKey === 'kda' || sortKey === 'winrate' || sortKey === 'games') {
        aVal = a[sortKey as 'rank' | 'kda' | 'winrate' | 'games'] as number;
        bVal = b[sortKey as 'rank' | 'kda' | 'winrate' | 'games'] as number;
      } else {
        aVal = a[sortKey as keyof Player] as string;
        bVal = b[sortKey as keyof Player] as string;
      }

      if (typeof aVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal as string) : (bVal as string).localeCompare(aVal);
      }
      // number
      return sortDir === 'asc' ? ((aVal as number) - (bVal as number)) : ((bVal as number) - (aVal as number));
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

  // Estado do modal
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // Mock match history por jogador
  const getMatchHistory = () => [
    { id: 1, result: 'Vitória', kda: '6/2/8', champion: 'Fake Champion', date: '5 min atrás' },
    { id: 2, result: 'Vitória', kda: '4/3/12', champion: 'Fake Champion', date: '1h atrás' },
    { id: 3, result: 'Derrota', kda: '3/5/7', champion: 'Fake Champion', date: '2h atrás' },
  ];

  // Modal ref para focus management
  const modalRef = useRef<HTMLDivElement>(null);

  // Fechar modal com ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPlayer) {
        setSelectedPlayer(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPlayer]);

  return (
    <main className="flex-1 p-8 bg-[#0B132B] min-h-screen">
      <div className="mb-6">
        <h2 className="space-grotesk-title text-3xl font-bold mb-2 text-[#E0E0E0]">Jogadores</h2>
        <p className="sora-text text-[#A8A8A8]">Gerencie e visualize estatísticas dos jogadores</p>
      </div>

      {/* Filtros por Role */}
      <fieldset className="mb-6">
        <legend className="sr-only">Filtrar por role</legend>
        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => { setFiltroRole(role); setPage(1); }}
              aria-pressed={filtroRole === role}
              aria-label={`Filtrar por role ${role}`}
              className={`px-4 py-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#00B4D8] ${filtroRole === role
                ? 'bg-[#0077B6] text-[#E0E0E0] shadow-lg'
                : 'bg-[#1D2D50] text-[#A8A8A8] hover:bg-[#0077B6]/50 border border-white/5'
                }`}
            >
              {role}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Tabela de Ranking de Jogadores */}
      <div className="bg-[#1D2D50] rounded-lg p-4 border border-white/5 shadow-lg">
        <ScrollReveal preset="up" delay={0.05} duration={0.6}>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="text-left text-sm text-[#A8A8A8] border-b border-white/10">
                  <th className="py-3 px-4 w-12" role="columnheader"><button className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00B4D8] p-1 rounded" onClick={() => { if (sortKey === 'rank') setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); else { setSortKey('rank'); setSortDir('asc'); } }} aria-label={`Ordenar por ranking ${sortKey === 'rank' ? `(${sortDir})` : ''}`}># {sortKey === 'rank' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</button></th>
                  <th className="py-3 px-4" role="columnheader">Jogador</th>
                  <th className="py-3 px-4" role="columnheader">Time</th>
                  <th className="py-3 px-4" role="columnheader">Role</th>
                  <th className="py-3 px-4" role="columnheader"><button className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00B4D8] p-1 rounded" onClick={() => { if (sortKey === 'kda') setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); else { setSortKey('kda'); setSortDir('desc'); } }} aria-label={`Ordenar por KDA ${sortKey === 'kda' ? `(${sortDir})` : ''}`}>KDA {sortKey === 'kda' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</button></th>
                  <th className="py-3 px-4" role="columnheader"><button className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00B4D8] p-1 rounded" onClick={() => { if (sortKey === 'winrate') setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); else { setSortKey('winrate'); setSortDir('desc'); } }} aria-label={`Ordenar por Winrate ${sortKey === 'winrate' ? `(${sortDir})` : ''}`}>Winrate {sortKey === 'winrate' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</button></th>
                  <th className="py-3 px-4" role="columnheader"><button className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00B4D8] p-1 rounded" onClick={() => { if (sortKey === 'games') setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); else { setSortKey('games'); setSortDir('desc'); } }} aria-label={`Ordenar por Partidas ${sortKey === 'games' ? `(${sortDir})` : ''}`}>Partidas {sortKey === 'games' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</button></th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((p, idx) => (
                  <tr key={p.rank} className={`border-b border-white/5 ${idx % 2 === 0 ? 'bg-[#14223A]/20' : ''} cursor-pointer hover:bg-[#0077B6]/20`} onClick={() => setSelectedPlayer(p)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedPlayer(p); } }} aria-label={`Ver detalhes de ${p.nick}`}>
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

          <nav className="flex items-center gap-2" aria-label="Controles de paginação">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Página anterior"
              className="px-3 py-1 rounded bg-[#0B132B] text-[#A8A8A8] disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
            >Prev</button>
            <label htmlFor="page-input" className="text-sm text-[#A8A8A8]">Página</label>
            <input id="page-input" type="number" value={page} min={1} max={totalPages} onChange={(e) => setPage(Math.min(Math.max(1, Number(e.target.value || 1)), totalPages))} aria-label="Número da página" className="w-12 text-center bg-[#0B132B] text-[#E0E0E0] rounded focus:outline-none focus:ring-2 focus:ring-[#00B4D8]" />
            <div className="text-sm text-[#A8A8A8]">de {totalPages}</div>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              aria-label="Próxima página"
              className="px-3 py-1 rounded bg-[#0B132B] text-[#A8A8A8] disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
            >Next</button>
          </nav>

          <div className="flex items-center gap-2">
            <label htmlFor="page-size-select" className="text-sm text-[#A8A8A8]">Linhas</label>
            <select id="page-size-select" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} aria-label="Quantidade de linhas por página" className="bg-[#0B132B] text-[#E0E0E0] rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>

      {/* Modal de Perfil */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPlayer(null)} role="presentation">
          <div ref={modalRef} className="bg-[#1D2D50] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl focus:outline-none" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title" tabIndex={-1}>
            {/* Cabeçalho do Modal */}
            <div className="sticky top-0 bg-[#0B132B] p-6 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-linear-to-br from-[#0077B6] to-[#00B4D8] text-white font-bold text-2xl" aria-hidden="true">
                  {getInitials(selectedPlayer.nick)}
                </div>
                <div>
                  <h2 id="modal-title" className="text-2xl font-bold text-[#E0E0E0]">{selectedPlayer.nick}</h2>
                  <p className="text-sm text-[#A8A8A8]">{selectedPlayer.name} • {selectedPlayer.country}</p>
                </div>
              </div>
              <button onClick={() => setSelectedPlayer(null)} aria-label="Fechar perfil do jogador" className="text-[#A8A8A8] hover:text-[#E0E0E0] text-2xl focus:outline-none focus:ring-2 focus:ring-[#00B4D8] rounded px-2" title="Fechar (ESC)">✕</button>
            </div>

            <div className="p-6 space-y-6">
              {/* Informações básicas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0B132B] p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#A8A8A8] mb-1">Time</div>
                  <div className="text-lg font-semibold text-[#E0E0E0]">{selectedPlayer.team}</div>
                </div>
                <div className="bg-[#0B132B] p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#A8A8A8] mb-1">Role</div>
                  <div className="text-lg font-semibold text-[#E0E0E0]">{selectedPlayer.role}</div>
                </div>
              </div>

              {/* Estatísticas em detalhe */}
              <div>
                <h3 className="text-lg font-bold text-[#E0E0E0] mb-3">Estatísticas</h3>
                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-[#0B132B] p-3 rounded-lg border border-white/5 text-center">
                    <div className="text-2xl font-bold text-[#00B4D8]">{selectedPlayer.kda.toFixed(1)}</div>
                    <div className="text-xs text-[#A8A8A8]">KDA</div>
                  </div>
                  <div className="bg-[#0B132B] p-3 rounded-lg border border-white/5 text-center">
                    <div className="text-2xl font-bold text-[#4CAF50]">{selectedPlayer.winrate}%</div>
                    <div className="text-xs text-[#A8A8A8]">Winrate</div>
                  </div>
                  <div className="bg-[#0B132B] p-3 rounded-lg border border-white/5 text-center">
                    <div className="text-2xl font-bold text-[#F4A261]">{selectedPlayer.games}</div>
                    <div className="text-xs text-[#A8A8A8]">Partidas</div>
                  </div>
                  <div className="bg-[#0B132B] p-3 rounded-lg border border-white/5 text-center">
                    <div className="text-2xl font-bold text-[#FFD700]">#1</div>
                    <div className="text-xs text-[#A8A8A8]">Posição</div>
                  </div>
                </div>
              </div>

              {/* Histórico de partidas */}
              <div>
                <h3 className="text-lg font-bold text-[#E0E0E0] mb-3">Histórico Recente</h3>
                <div className="space-y-2">
                  {getMatchHistory().map((match) => (
                    <div key={match.id} className="flex items-center justify-between bg-[#0B132B] p-3 rounded-lg border border-white/5">
                      <div>
                        <div className="text-sm font-semibold text-[#E0E0E0]">{match.champion}</div>
                        <div className="text-xs text-[#A8A8A8]">{match.date}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${match.result === 'Vitória' ? 'text-[#4CAF50]' : 'text-[#FF6B6B]'}`}>{match.result}</div>
                        <div className="text-xs text-[#A8A8A8]">{match.kda}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botões de ação */}
              <div className="grid grid-cols-2 gap-3">
                <button aria-label={`Seguir ${selectedPlayer.nick}`} className="bg-[#0077B6] hover:bg-[#00B4D8] text-[#E0E0E0] font-semibold py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:ring-offset-2 focus:ring-offset-[#1D2D50]">Seguir</button>
                <button aria-label={`Comparar com ${selectedPlayer.nick}`} className="bg-[#1D2D50] hover:bg-[#0077B6]/50 text-[#E0E0E0] font-semibold py-2 rounded-lg border border-white/10 transition focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:ring-offset-2 focus:ring-offset-[#1D2D50]">Comparar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Jogadores;

