import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Partida {
  id: number;
  data: string;
  resultado: 'Vitória' | 'Derrota';
  duracao: string;
  modo: string;
  kda: string;
  campeao: string;
  role: string;
  gold: number;
  dano: number;
  visao: number;
}

const Partidas = () => {
  const [filtro, setFiltro] = useState<'Todas' | 'Vitória' | 'Derrota'>('Todas');
  const [ddragonVersion, setDdragonVersion] = useState<string>('latest');
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Função para buscar a versão mais recente da API
  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
        const versions = await response.json();
        if (versions && versions.length > 0) {
          setDdragonVersion(versions[0]);
        }
      } catch (error) {
        console.error('Erro ao buscar versão da API:', error);
      }
    };
    fetchVersion();
  }, []);

  // Função utilitária para construir URL da imagem do campeão
  const getChampionImageUrl = (championName: string) => {
    const formattedName = championName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '')
      .replace(/'/g, '');

    return `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${formattedName}.png`;
  };

  // Função para lidar com erro no carregamento da imagem
  const handleImageError = (championName: string) => {
    setImageErrors(prev => new Set(prev).add(championName));
  };

  const partidas: Partida[] = [
    {
      id: 1,
      data: '2024-01-15',
      resultado: 'Vitória',
      duracao: '32:15',
      modo: 'Ranqueada Solo/Duo',
      kda: '12/3/8',
      campeao: 'Vayne',
      role: 'ADC',
      gold: 15200,
      dano: 45200,
      visao: 18
    },
    {
      id: 2,
      data: '2024-01-14',
      resultado: 'Vitória',
      duracao: '28:42',
      modo: 'Ranqueada Solo/Duo',
      kda: '8/2/12',
      campeao: 'Jinx',
      role: 'ADC',
      gold: 13800,
      dano: 38900,
      visao: 15
    },
    {
      id: 3,
      data: '2024-01-13',
      resultado: 'Derrota',
      duracao: '35:20',
      modo: 'Ranqueada Solo/Duo',
      kda: '5/7/4',
      campeao: 'Caitlyn',
      role: 'ADC',
      gold: 12100,
      dano: 28900,
      visao: 22
    },
    {
      id: 4,
      data: '2024-01-12',
      resultado: 'Vitória',
      duracao: '25:10',
      modo: 'Ranqueada Solo/Duo',
      kda: '15/1/6',
      campeao: 'Lucian',
      role: 'ADC',
      gold: 14500,
      dano: 52100,
      visao: 12
    },
    {
      id: 5,
      data: '2024-01-11',
      resultado: 'Derrota',
      duracao: '40:05',
      modo: 'Ranqueada Solo/Duo',
      kda: '7/9/11',
      campeao: 'Ezreal',
      role: 'ADC',
      gold: 16800,
      dano: 41200,
      visao: 28
    },
    {
      id: 6,
      data: '2024-01-10',
      resultado: 'Vitória',
      duracao: '30:30',
      modo: 'Ranqueada Solo/Duo',
      kda: '10/4/9',
      campeao: 'Draven',
      role: 'ADC',
      gold: 14200,
      dano: 39800,
      visao: 20
    }
  ];

  const partidasFiltradas = filtro === 'Todas' 
    ? partidas 
    : partidas.filter(p => p.resultado === filtro);

  const estatisticas = {
    total: partidas.length,
    vitorias: partidas.filter(p => p.resultado === 'Vitória').length,
    derrotas: partidas.filter(p => p.resultado === 'Derrota').length,
    winrate: Math.round((partidas.filter(p => p.resultado === 'Vitória').length / partidas.length) * 100)
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3 }
    })
  };

  return (
    <main className="flex-1 p-8 bg-[#0B132B] min-h-screen">
      <div className="mb-6">
        <h2 className="space-grotesk-title text-3xl font-bold mb-2 text-[#E0E0E0]">Partidas</h2>
        <p className="sora-text text-[#A8A8A8]">Histórico completo de suas partidas</p>
      </div>

      {/* Estatísticas Resumidas */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#1D2D50] p-4 rounded-lg border border-white/5 shadow-lg"
        >
          <div className="text-2xl font-bold text-[#E0E0E0]">{estatisticas.total}</div>
          <div className="text-sm text-[#A8A8A8]">Total de Partidas</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1D2D50] p-4 rounded-lg border border-white/5 shadow-lg"
        >
          <div className="text-2xl font-bold text-[#4CAF50]">{estatisticas.vitorias}</div>
          <div className="text-sm text-[#A8A8A8]">Vitórias</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1D2D50] p-4 rounded-lg border border-white/5 shadow-lg"
        >
          <div className="text-2xl font-bold text-[#F44336]">{estatisticas.derrotas}</div>
          <div className="text-sm text-[#A8A8A8]">Derrotas</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1D2D50] p-4 rounded-lg border border-white/5 shadow-lg"
        >
          <div className="text-2xl font-bold text-[#00B4D8]">{estatisticas.winrate}%</div>
          <div className="text-sm text-[#A8A8A8]">Winrate</div>
        </motion.div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-6">
        {(['Todas', 'Vitória', 'Derrota'] as const).map((opcao) => (
          <button
            key={opcao}
            onClick={() => setFiltro(opcao)}
            className={`px-4 py-2 rounded-lg transition-all ${
              filtro === opcao
                ? 'bg-[#0077B6] text-[#E0E0E0] shadow-lg'
                : 'bg-[#1D2D50] text-[#A8A8A8] hover:bg-[#0077B6]/50 border border-white/5'
            }`}
          >
            {opcao}
          </button>
        ))}
      </div>

      {/* Lista de Partidas */}
      <div className="space-y-4">
        {partidasFiltradas.map((partida, idx) => (
          <motion.div
            key={partida.id}
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className={`bg-[#1D2D50] p-6 rounded-lg border shadow-lg transition-all ${
              partida.resultado === 'Vitória'
                ? 'border-[#4CAF50]/30 hover:border-[#4CAF50]/50'
                : 'border-[#F44336]/30 hover:border-[#F44336]/50'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`relative w-16 h-16 rounded-lg overflow-hidden ${
                  partida.resultado === 'Vitória' 
                    ? 'ring-2 ring-[#4CAF50]/50' 
                    : 'ring-2 ring-[#F44336]/50'
                }`}>
                  {imageErrors.has(partida.campeao) ? (
                    <div className={`w-full h-full flex items-center justify-center text-2xl font-bold ${
                      partida.resultado === 'Vitória' ? 'bg-[#4CAF50]/20 text-[#4CAF50]' : 'bg-[#F44336]/20 text-[#F44336]'
                    }`}>
                      {partida.resultado === 'Vitória' ? '✓' : '✗'}
                    </div>
                  ) : (
                    <img
                      src={getChampionImageUrl(partida.campeao)}
                      alt={partida.campeao}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(partida.campeao)}
                    />
                  )}
                  {/* Overlay sutil para indicar resultado */}
                  <div className={`absolute inset-0 ${
                    partida.resultado === 'Vitória' 
                      ? 'bg-[#4CAF50]/10' 
                      : 'bg-[#F44336]/10'
                  }`}></div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="space-grotesk-title text-lg font-semibold text-[#E0E0E0]">
                      {partida.campeao} - {partida.role}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      partida.resultado === 'Vitória' ? 'bg-[#4CAF50]/20 text-[#4CAF50]' : 'bg-[#F44336]/20 text-[#F44336]'
                    }`}>
                      {partida.resultado}
                    </span>
                  </div>
                  <div className="sora-text text-sm text-[#A8A8A8]">
                    {partida.modo} • {partida.data} • {partida.duracao}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-[#A8A8A8] mb-1">KDA</div>
                  <div className="text-sm font-semibold text-[#E0E0E0]">{partida.kda}</div>
                </div>
                <div>
                  <div className="text-xs text-[#A8A8A8] mb-1">Gold</div>
                  <div className="text-sm font-semibold text-[#F4A261]">{partida.gold.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-[#A8A8A8] mb-1">Dano</div>
                  <div className="text-sm font-semibold text-[#E0E0E0]">{partida.dano.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-[#A8A8A8] mb-1">Visão</div>
                  <div className="text-sm font-semibold text-[#00B4D8]">{partida.visao}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default Partidas;

