import { motion } from 'framer-motion';
import PainelDicas from "./PainelDicas";

interface JogadorTime {
  nome: string;
  role: string;
  campeao: string;
  elo: string;
}

interface Time {
  id: number;
  nome: string;
  tag: string;
  winrate: number;
  partidas: number;
  eloMedio: string;
  jogadores: JogadorTime[];
  vitorias: number;
  derrotas: number;
  streak: number;
  status: 'Ativo' | 'Inativo';
}

const Times = () => {
  const times: Time[] = [
    {
      id: 1,
      nome: 'Dragons Elite',
      tag: 'DRE',
      winrate: 72,
      partidas: 45,
      eloMedio: 'Diamante',
      vitorias: 32,
      derrotas: 13,
      streak: 5,
      status: 'Ativo',
      jogadores: [
        { nome: 'ShadowHunter', role: 'Top', campeao: 'Jax', elo: 'Diamante II' },
        { nome: 'JungleKing', role: 'Jungle', campeao: 'Lee Sin', elo: 'Diamante IV' },
        { nome: 'FrostMage', role: 'Mid', campeao: 'Zed', elo: 'Platina I' },
        { nome: 'ADCGod', role: 'ADC', campeao: 'Jinx', elo: 'Diamante I' },
        { nome: 'SupportQueen', role: 'Support', campeao: 'Thresh', elo: 'Platina II' }
      ]
    },
    {
      id: 2,
      nome: 'Thunder Strike',
      tag: 'THS',
      winrate: 65,
      partidas: 38,
      eloMedio: 'Platina',
      vitorias: 25,
      derrotas: 13,
      streak: 3,
      status: 'Ativo',
      jogadores: [
        { nome: 'IronTank', role: 'Top', campeao: 'Malphite', elo: 'Ouro III' },
        { nome: 'WildHunter', role: 'Jungle', campeao: 'Graves', elo: 'Platina III' },
        { nome: 'MagePro', role: 'Mid', campeao: 'Lux', elo: 'Platina II' },
        { nome: 'SniperElite', role: 'ADC', campeao: 'Caitlyn', elo: 'Platina I' },
        { nome: 'Guardian', role: 'Support', campeao: 'Braum', elo: 'Platina IV' }
      ]
    },
    {
      id: 3,
      nome: 'Shadow Wolves',
      tag: 'SHW',
      winrate: 58,
      partidas: 52,
      eloMedio: 'Platina',
      vitorias: 30,
      derrotas: 22,
      streak: -2,
      status: 'Ativo',
      jogadores: [
        { nome: 'TopLaneBeast', role: 'Top', campeao: 'Darius', elo: 'Platina III' },
        { nome: 'NightStalker', role: 'Jungle', campeao: 'Kha\'Zix', elo: 'Platina II' },
        { nome: 'AssassinPro', role: 'Mid', campeao: 'Talon', elo: 'Mestre I' },
        { nome: 'VayneMaster', role: 'ADC', campeao: 'Vayne', elo: 'Diamante III' },
        { nome: 'HealBot', role: 'Support', campeao: 'Soraka', elo: 'Platina I' }
      ]
    },
    {
      id: 4,
      nome: 'Phoenix Rising',
      tag: 'PHR',
      winrate: 68,
      partidas: 41,
      eloMedio: 'Diamante',
      vitorias: 28,
      derrotas: 13,
      streak: 4,
      status: 'Ativo',
      jogadores: [
        { nome: 'FlameTop', role: 'Top', campeao: 'Riven', elo: 'Diamante III' },
        { nome: 'FireJungle', role: 'Jungle', campeao: 'Elise', elo: 'Diamante IV' },
        { nome: 'InfernoMid', role: 'Mid', campeao: 'Brand', elo: 'Diamante II' },
        { nome: 'BlazeADC', role: 'ADC', campeao: 'Lucian', elo: 'Diamante I' },
        { nome: 'SparkSupport', role: 'Support', campeao: 'Nami', elo: 'Platina I' }
      ]
    }
  ];

  const getEloColor = (elo: string) => {
    if (elo.includes('Diamante')) return '#B9F2FF';
    if (elo.includes('Mestre')) return '#FF69B4';
    if (elo.includes('Platina')) return '#00D4FF';
    if (elo.includes('Ouro')) return '#FFD700';
    return '#E0E0E0';
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  return (
    <main className="flex-1 p-8 bg-[#0B132B] min-h-screen">
      <div className="mb-6">
        <h2 className="space-grotesk-title text-3xl font-bold mb-2 text-[#E0E0E0]">Times</h2>
        <p className="sora-text text-[#A8A8A8]">Gerencie e visualize informações dos times</p>
      </div>

      {/* Grid de Times */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {times.map((time, idx) => (
          <motion.div
            key={time.id}
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-[#1D2D50] rounded-lg border border-white/5 shadow-lg hover:border-[#00B4D8]/50 transition-all relative overflow-hidden group"
          >
            {/* Efeito shimmer no hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="absolute inset-0 animate-shimmer"></div>
            </div>

            <div className="p-6 relative z-10">
              {/* Header do Time */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="space-grotesk-title text-2xl font-bold text-[#E0E0E0]">
                      {time.nome}
                    </h3>
                    <span className="px-2 py-1 bg-[#0077B6]/20 text-[#00B4D8] text-xs font-semibold rounded">
                      {time.tag}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      time.status === 'Ativo' 
                        ? 'bg-[#4CAF50]/20 text-[#4CAF50]' 
                        : 'bg-[#A8A8A8]/20 text-[#A8A8A8]'
                    }`}>
                      {time.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#A8A8A8]">
                    <span>Elo Médio: <span className="text-[#E0E0E0] font-semibold">{time.eloMedio}</span></span>
                    <span>•</span>
                    <span className={time.streak > 0 ? 'text-[#4CAF50]' : 'text-[#F44336]'}>
                      {time.streak > 0 ? '↑' : '↓'} {Math.abs(time.streak)} streak
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl mb-1">🏆</div>
                </div>
              </div>

              {/* Estatísticas do Time */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="text-center p-3 bg-[#0B132B] rounded border border-white/5">
                  <div className="text-xl font-bold text-[#4CAF50]">{time.winrate}%</div>
                  <div className="text-xs text-[#A8A8A8]">Winrate</div>
                </div>
                <div className="text-center p-3 bg-[#0B132B] rounded border border-white/5">
                  <div className="text-xl font-bold text-[#E0E0E0]">{time.partidas}</div>
                  <div className="text-xs text-[#A8A8A8]">Partidas</div>
                </div>
                <div className="text-center p-3 bg-[#0B132B] rounded border border-white/5">
                  <div className="text-xl font-bold text-[#4CAF50]">{time.vitorias}</div>
                  <div className="text-xs text-[#A8A8A8]">Vitórias</div>
                </div>
                <div className="text-center p-3 bg-[#0B132B] rounded border border-white/5">
                  <div className="text-xl font-bold text-[#F44336]">{time.derrotas}</div>
                  <div className="text-xs text-[#A8A8A8]">Derrotas</div>
                </div>
              </div>

              {/* Lista de Jogadores */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#A8A8A8] mb-2 uppercase tracking-wide">
                  Roster
                </div>
                {time.jogadores.map((jogador, jIdx) => (
                  <div
                    key={jIdx}
                    className="flex items-center justify-between p-2 bg-[#0B132B] rounded border border-white/5 hover:border-[#0077B6]/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#0077B6]/20 flex items-center justify-center text-xs font-bold text-[#00B4D8]">
                        {jogador.role.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#E0E0E0]">{jogador.nome}</div>
                        <div className="text-xs text-[#A8A8A8]">{jogador.campeao}</div>
                      </div>
                    </div>
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded"
                      style={{
                        backgroundColor: `${getEloColor(jogador.elo)}20`,
                        color: getEloColor(jogador.elo)
                      }}
                    >
                      {jogador.elo}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <PainelDicas />
    </main>
  );
};

export default Times;

