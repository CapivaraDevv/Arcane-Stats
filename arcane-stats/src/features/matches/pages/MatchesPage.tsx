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
    <main className="flex-1 p-8 bg-[hsl(var(--background))] min-h-screen">
      <div className="mb-6">
        <h2 className="space-grotesk-title text-3xl font-bold mb-2 text-[hsl(var(--foreground))]">Partidas</h2>
        <p className="sora-text text-[hsl(var(--muted-foreground))]">Histórico completo de suas partidas</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <ScrollReveal preset="up" delay={0} duration={0.5}>
          <div className="bg-[hsl(var(--secondary))] p-4 rounded-lg border border-white/5 shadow-lg">
            <div className="text-2xl font-bold text-[hsl(var(--foreground))]">{estatisticas.total}</div>
            <div className="text-sm text-[hsl(var(--muted-foreground))]">Total de Partidas</div>
          </div>
        </ScrollReveal>
        <ScrollReveal preset="up" delay={0.1} duration={0.5}>
          <div className="bg-[hsl(var(--secondary))] p-4 rounded-lg border border-white/5 shadow-lg">
            <div className="text-2xl font-bold text-[hsl(142 71% 45%)]">{estatisticas.vitorias}</div>
            <div className="text-sm text-[hsl(var(--muted-foreground))]">Vitórias</div>
          </div>
        </ScrollReveal>
        <ScrollReveal preset="up" delay={0.2} duration={0.5}>
          <div className="bg-[hsl(var(--secondary))] p-4 rounded-lg border border-white/5 shadow-lg">
            <div className="text-2xl font-bold text-[hsl(var(--destructive))]">{estatisticas.derrotas}</div>
            <div className="text-sm text-[hsl(var(--muted-foreground))]">Derrotas</div>
          </div>
        </ScrollReveal>
        <ScrollReveal preset="up" delay={0.3} duration={0.5}>
          <div className="bg-[hsl(var(--secondary))] p-4 rounded-lg border border-white/5 shadow-lg">
            <div className="text-2xl font-bold text-[hsl(var(--primary-glow))]">{estatisticas.winrate}%</div>
            <div className="text-sm text-[hsl(var(--muted-foreground))]">Winrate</div>
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
                ? 'bg-[hsl(var(--primary))] text-[hsl(var(--foreground))] shadow-lg'
                : 'bg-[hsl(var(--secondary))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--primary))]/50 border border-white/5'
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
              className={`bg-[hsl(var(--secondary))] p-6 rounded-lg border shadow-lg transition-all ${
                partida.resultado === 'Vitória'
                  ? 'border-[hsl(142 71% 45%)]/30 hover:border-[hsl(142 71% 45%)]/50'
                  : 'border-[hsl(var(--destructive))]/30 hover:border-[hsl(var(--destructive))]/50'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`relative w-16 h-16 rounded-lg overflow-hidden ${
                    partida.resultado === 'Vitória'
                      ? 'ring-2 ring-[hsl(142 71% 45%)]/50'
                      : 'ring-2 ring-[hsl(var(--destructive))]/50'
                  }`}>
                    {imageErrors.has(partida.campeao) ? (
                      <div className={`w-full h-full flex items-center justify-center text-2xl font-bold ${
                        partida.resultado === 'Vitória' ? 'bg-[hsl(142 71% 45%)]/20 text-[hsl(142 71% 45%)]' : 'bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))]'
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
                      partida.resultado === 'Vitória' ? 'bg-[hsl(142 71% 45%)]/10' : 'bg-[hsl(var(--destructive))]/10'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="space-grotesk-title text-lg font-semibold text-[hsl(var(--foreground))]">
                        {partida.campeao} - {partida.role}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        partida.resultado === 'Vitória' ? 'bg-[hsl(142 71% 45%)]/20 text-[hsl(142 71% 45%)]' : 'bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))]'
                      }`}>
                        {partida.resultado}
                      </span>
                    </div>
                    <div className="sora-text text-sm text-[hsl(var(--muted-foreground))]">
                      {partida.modo} • {partida.data} • {partida.duracao}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-1 text-center">Build in-game</div>
                  <div className="flex gap-1">
                    {partida.build.map((itemId, bIdx) => (
                      <img
                        key={bIdx}
                        src={getItemIcon(itemId)}
                        alt={`item-${itemId}`}
                        title={`#${itemId}`}
                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md object-contain bg-[hsl(var(--background))]/20 border border-white/10 hover:scale-110 transition-all"
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">KDA</div>
                    <div className="text-sm font-semibold text-[hsl(var(--foreground))]">{partida.kda}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Gold</div>
                    <div className="text-sm font-semibold text-[hsl(28 87% 67%)]">{partida.gold.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Dano</div>
                    <div className="text-sm font-semibold text-[hsl(var(--foreground))]">{partida.dano.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Visão</div>
                    <div className="text-sm font-semibold text-[hsl(var(--primary-glow))]">{partida.visao}</div>
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
