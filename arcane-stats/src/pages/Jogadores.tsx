import { motion } from 'framer-motion';
import { useState } from 'react';

interface Jogador {
  id: number;
  nome: string;
  elo: string;
  divisao: string;
  lp: number;
  winrate: number;
  partidas: number;
  kda: number;
  campeaoPrincipal: string;
  role: string;
  nivel: number;
}

const Jogadores = () => {
  const [filtroRole, setFiltroRole] = useState<string>('Todas');

  const jogadores: Jogador[] = [
    {
      id: 1,
      nome: 'ShadowHunter',
      elo: 'Diamante',
      divisao: 'II',
      lp: 1250,
      winrate: 68,
      partidas: 145,
      kda: 4.8,
      campeaoPrincipal: 'Vayne',
      role: 'ADC',
      nivel: 287
    },
    {
      id: 2,
      nome: 'FrostMage',
      elo: 'Platina',
      divisao: 'I',
      lp: 980,
      winrate: 62,
      partidas: 203,
      kda: 3.9,
      campeaoPrincipal: 'Lux',
      role: 'Mid',
      nivel: 245
    },
    {
      id: 3,
      nome: 'IronTank',
      elo: 'Ouro',
      divisao: 'III',
      lp: 450,
      winrate: 55,
      partidas: 178,
      kda: 2.8,
      campeaoPrincipal: 'Malphite',
      role: 'Top',
      nivel: 198
    },
    {
      id: 4,
      nome: 'JungleKing',
      elo: 'Diamante',
      divisao: 'IV',
      lp: 1100,
      winrate: 71,
      partidas: 167,
      kda: 5.2,
      campeaoPrincipal: 'Lee Sin',
      role: 'Jungle',
      nivel: 312
    },
    {
      id: 5,
      nome: 'SupportQueen',
      elo: 'Platina',
      divisao: 'II',
      lp: 720,
      winrate: 65,
      partidas: 192,
      kda: 1.8,
      campeaoPrincipal: 'Thresh',
      role: 'Support',
      nivel: 256
    },
    {
      id: 6,
      nome: 'AssassinPro',
      elo: 'Mestre',
      divisao: 'I',
      lp: 1850,
      winrate: 74,
      partidas: 234,
      kda: 6.1,
      campeaoPrincipal: 'Zed',
      role: 'Mid',
      nivel: 389
    },
    {
      id: 7,
      nome: 'ADCGod',
      elo: 'Diamante',
      divisao: 'I',
      lp: 1520,
      winrate: 69,
      partidas: 201,
      kda: 5.5,
      campeaoPrincipal: 'Jinx',
      role: 'ADC',
      nivel: 298
    },
    {
      id: 8,
      nome: 'TopLaneBeast',
      elo: 'Platina',
      divisao: 'III',
      lp: 680,
      winrate: 58,
      partidas: 156,
      kda: 3.2,
      campeaoPrincipal: 'Darius',
      role: 'Top',
      nivel: 223
    }
  ];

  const roles = ['Todas', 'Top', 'Jungle', 'Mid', 'ADC', 'Support'];
  const jogadoresFiltrados = filtroRole === 'Todas'
    ? jogadores
    : jogadores.filter(j => j.role === filtroRole);

  const getEloColor = (elo: string) => {
    const cores: Record<string, string> = {
      'Ferro': '#8B8B8B',
      'Bronze': '#CD7F32',
      'Prata': '#C0C0C0',
      'Ouro': '#FFD700',
      'Platina': '#00D4FF',
      'Diamante': '#B9F2FF',
      'Mestre': '#FF69B4',
      'Grão-Mestre': '#FF0000',
      'Desafiante': '#FFD700'
    };
    return cores[elo] || '#E0E0E0';
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.05, duration: 0.3 }
    })
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
            onClick={() => setFiltroRole(role)}
            className={`px-4 py-2 rounded-lg transition-all ${
              filtroRole === role
                ? 'bg-[#0077B6] text-[#E0E0E0] shadow-lg'
                : 'bg-[#1D2D50] text-[#A8A8A8] hover:bg-[#0077B6]/50 border border-white/5'
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Grid de Jogadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jogadoresFiltrados.map((jogador, idx) => (
          <motion.div
            key={jogador.id}
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-[#1D2D50] p-6 rounded-lg border border-white/5 shadow-lg hover:border-[#00B4D8]/50 transition-all relative overflow-hidden group"
          >
            {/* Efeito shimmer no hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="absolute inset-0 animate-shimmer"></div>
            </div>

            <div className="relative z-10">
              {/* Header do Card */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="space-grotesk-title text-xl font-bold text-[#E0E0E0] mb-1">
                    {jogador.nome}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-semibold px-2 py-1 rounded"
                      style={{
                        backgroundColor: `${getEloColor(jogador.elo)}20`,
                        color: getEloColor(jogador.elo)
                      }}
                    >
                      {jogador.elo} {jogador.divisao}
                    </span>
                    <span className="text-xs text-[#A8A8A8]">• {jogador.lp} LP</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl mb-1">🎮</div>
                  <div className="text-xs text-[#A8A8A8]">Nv. {jogador.nivel}</div>
                </div>
              </div>

              {/* Role e Campeão Principal */}
              <div className="mb-4 p-3 bg-[#0B132B] rounded-lg border border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#A8A8A8] mb-1">Role Principal</div>
                    <div className="text-sm font-semibold text-[#00B4D8]">{jogador.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#A8A8A8] mb-1">Campeão</div>
                    <div className="text-sm font-semibold text-[#E0E0E0]">{jogador.campeaoPrincipal}</div>
                  </div>
                </div>
              </div>

              {/* Estatísticas */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-[#0B132B] rounded border border-white/5">
                  <div className="text-lg font-bold text-[#4CAF50]">{jogador.winrate}%</div>
                  <div className="text-xs text-[#A8A8A8]">Winrate</div>
                </div>
                <div className="text-center p-2 bg-[#0B132B] rounded border border-white/5">
                  <div className="text-lg font-bold text-[#00B4D8]">{jogador.kda.toFixed(1)}</div>
                  <div className="text-xs text-[#A8A8A8]">KDA</div>
                </div>
                <div className="text-center p-2 bg-[#0B132B] rounded border border-white/5">
                  <div className="text-lg font-bold text-[#F4A261]">{jogador.partidas}</div>
                  <div className="text-xs text-[#A8A8A8]">Partidas</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default Jogadores;

