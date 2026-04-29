import { motion } from 'framer-motion'
import { useState } from 'react'
import ScrollReveal from '../../../components/ScrollReveal'
import { useAssets } from '../../../hooks/useAssets'
import { useImageFallback } from '../../../shared/hooks/useImageFallback'

interface Partida {
  id: number
  data: string
  resultado: 'Vitória' | 'Derrota'
  duracao: string
  modo: string
  kda: string
  campeao: string
  build: number[]
  role: string
  gold: number
  dano: number
  visao: number
}

const MatchesPage = () => {
  const [filtro, setFiltro] = useState<'Todas' | 'Vitória' | 'Derrota'>('Todas')
  const { imageErrors, markImageError } = useImageFallback()
  const { getChampionIcon, getItemIcon } = useAssets()

  const partidas: Partida[] = [
    {
      id: 1,
      data: '2024-01-15',
      resultado: 'Vitória',
      duracao: '32:15',
      modo: 'Ranqueada Solo/Duo',
      kda: '12/3/8',
      campeao: 'Vayne',
      build: [3006, 6672, 3124, 3153, 3046, 3026],
      role: 'ADC',
      gold: 15200,
      dano: 45200,
      visao: 18,
    },
    {
      id: 2,
      data: '2024-01-14',
      resultado: 'Vitória',
      duracao: '28:42',
      modo: 'Ranqueada Solo/Duo',
      kda: '8/2/12',
      campeao: 'Jinx',
      build: [3006, 6672, 3031, 3094, 3036, 3026],
      role: 'ADC',
      gold: 13800,
      dano: 38900,
      visao: 15,
    },
    {
      id: 3,
      data: '2024-01-13',
      resultado: 'Derrota',
      duracao: '35:20',
      modo: 'Ranqueada Solo/Duo',
      kda: '5/7/4',
      campeao: 'Caitlyn',
      build: [3006, 6671, 3031, 3094, 3036, 3026],
      role: 'ADC',
      gold: 12100,
      dano: 28900,
      visao: 22,
    },
    {
      id: 4,
      data: '2024-01-12',
      resultado: 'Vitória',
      duracao: '25:10',
      modo: 'Ranqueada Solo/Duo',
      kda: '15/1/6',
      campeao: 'Lucian',
      build: [3006, 6671, 3031, 3095, 3036, 3026],
      role: 'ADC',
      gold: 14500,
      dano: 52100,
      visao: 12,
    },
    {
      id: 5,
      data: '2024-01-11',
      resultado: 'Derrota',
      duracao: '40:05',
      modo: 'Ranqueada Solo/Duo',
      kda: '7/9/11',
      campeao: 'Ezreal',
      build: [3158, 6692, 3042, 3078, 6694, 3026],
      role: 'ADC',
      gold: 16800,
      dano: 41200,
      visao: 28,
    },
    {
      id: 6,
      data: '2024-01-10',
      resultado: 'Vitória',
      duracao: '30:30',
      modo: 'Ranqueada Solo/Duo',
      kda: '10/4/9',
      campeao: 'Draven',
      build: [3006, 6672, 3031, 3095, 3036, 3026],
      role: 'ADC',
      gold: 14200,
      dano: 39800,
      visao: 20,
    },
  ]

  const partidasFiltradas = filtro === 'Todas' ? partidas : partidas.filter((p) => p.resultado === filtro)

  const estatisticas = {
    total: partidas.length,
    vitorias: partidas.filter((p) => p.resultado === 'Vitória').length,
    derrotas: partidas.filter((p) => p.resultado === 'Derrota').length,
    winrate: Math.round((partidas.filter((p) => p.resultado === 'Vitória').length / partidas.length) * 100),
  }

  return (
    <main className="flex-1 p-8 bg-[#0B132B] min-h-screen">
      <div className="mb-6">
        <h2 className="space-grotesk-title text-3xl font-bold mb-2 text-[#E0E0E0]">Partidas</h2>
        <p className="sora-text text-[#A8A8A8]">Histórico completo de suas partidas</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <ScrollReveal preset="up" delay={0} duration={0.5}>
          <div className="bg-[#1D2D50] p-4 rounded-lg border border-white/5 shadow-lg">
            <div className="text-2xl font-bold text-[#E0E0E0]">{estatisticas.total}</div>
            <div className="text-sm text-[#A8A8A8]">Total de Partidas</div>
          </div>
        </ScrollReveal>
        <ScrollReveal preset="up" delay={0.1} duration={0.5}>
          <div className="bg-[#1D2D50] p-4 rounded-lg border border-white/5 shadow-lg">
            <div className="text-2xl font-bold text-[#4CAF50]">{estatisticas.vitorias}</div>
            <div className="text-sm text-[#A8A8A8]">Vitórias</div>
          </div>
        </ScrollReveal>
        <ScrollReveal preset="up" delay={0.2} duration={0.5}>
          <div className="bg-[#1D2D50] p-4 rounded-lg border border-white/5 shadow-lg">
            <div className="text-2xl font-bold text-[#F44336]">{estatisticas.derrotas}</div>
            <div className="text-sm text-[#A8A8A8]">Derrotas</div>
          </div>
        </ScrollReveal>
        <ScrollReveal preset="up" delay={0.3} duration={0.5}>
          <div className="bg-[#1D2D50] p-4 rounded-lg border border-white/5 shadow-lg">
            <div className="text-2xl font-bold text-[#00B4D8]">{estatisticas.winrate}%</div>
            <div className="text-sm text-[#A8A8A8]">Winrate</div>
          </div>
        </ScrollReveal>
      </div>

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

      <div className="space-y-4">
        {partidasFiltradas.map((partida, idx) => (
          <ScrollReveal key={partida.id} preset="up" delay={idx * 0.1} duration={0.6}>
            <motion.div
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
                        src={getChampionIcon(partida.campeao)}
                        alt={partida.campeao}
                        className="w-full h-full object-cover"
                        onError={() => markImageError(partida.campeao)}
                      />
                    )}
                    <div className={`absolute inset-0 ${
                      partida.resultado === 'Vitória' ? 'bg-[#4CAF50]/10' : 'bg-[#F44336]/10'
                    }`} />
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

                <div>
                  <div className="text-xs font-semibold text-[#A8A8A8] uppercase tracking-wide mb-1 text-center">Build in-game</div>
                  <div className="flex gap-1">
                    {partida.build.map((itemId, bIdx) => (
                      <img
                        key={bIdx}
                        src={getItemIcon(itemId)}
                        alt={`item-${itemId}`}
                        title={`#${itemId}`}
                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md object-contain bg-[#0B132B]/20 border border-white/10 hover:scale-110 transition-all"
                      />
                    ))}
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
          </ScrollReveal>
        ))}
      </div>
    </main>
  )
}

export default MatchesPage
