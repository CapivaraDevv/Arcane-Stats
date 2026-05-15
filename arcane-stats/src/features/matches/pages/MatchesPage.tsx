import { motion, LayoutGroup } from 'framer-motion'
import { useState, useMemo } from 'react'
import ScrollReveal from '../../../components/ScrollReveal'
import { Link } from "react-router-dom";
import { useAssets } from '../../../hooks/useAssets'
import { useImageFallback } from '../../../shared/hooks/useImageFallback'
import { Users } from 'lucide-react';
import MatchDebrief from '../MatchDebrief';


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
];

const estatisticas = {
  total: partidas.length,
  vitorias: partidas.filter((p) => p.resultado === 'Vitória').length,
  derrotas: partidas.filter((p) => p.resultado === 'Derrota').length,
  winrate: Math.round((partidas.filter((p) => p.resultado === 'Vitória').length / partidas.length) * 100),
};

const MatchesPage = () => {
  const [filtro, setFiltro] = useState<'Todas' | 'Vitória' | 'Derrota'>('Todas')
  const { imageErrors, markImageError } = useImageFallback()
  const { getChampionIcon, getItemIcon } = useAssets()
  const [selectedMatch, setSelectedMatch] = useState<Partida | null>(null)

  const partidasFiltradas = useMemo(
    () => filtro === 'Todas' ? partidas : partidas.filter((p) => p.resultado === filtro),
    [filtro],
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background hextech */}
      <div className="pointer-events-none absolute inset-0 bg-hero" />
      <div className="pointer-events-none absolute inset-0 bg-hex opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[hsl(var(--primary)/0.2)] blur-3xl" />

      <header className="sticky top-0 z-30 border-b border-[hsl(var(--border)/0.6)] bg-[hsl(var(--background)/0.7)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.1)] text-primary shadow-glow">
                <Users className="h-5 w-5" />
              </div>
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-glow-pulse rounded-full bg-primary-glow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl font-bold tracking-tight">
                  Partidas
                </h1>
              </div>
              <p className="text-xs text-muted-foreground">
                Histórico completo de suas partidas
              </p>
            </div>
          </div>
          <Link
            to="/analisar"
            className=""
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition cursor-pointer"
            >
              Analisar Partidas
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-[hsl(0_0%_100%/0.3)] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </motion.button>
          </Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <ScrollReveal preset="up" delay={0} duration={0.5}>
            <div className="bg-card-glass p-4 rounded-xl border border-border/60 shadow-lg">
              <div className="text-2xl font-bold text-foreground">{estatisticas.total}</div>
              <div className="text-sm text-muted-foreground">Total de Partidas</div>
            </div>
          </ScrollReveal>
          <ScrollReveal preset="up" delay={0.1} duration={0.5}>
            <div className="bg-card-glass p-4 rounded-xl border border-border/60 shadow-lg">
              <div className="text-2xl font-bold text-[#4CAF50]">{estatisticas.vitorias}</div>
              <div className="text-sm text-muted-foreground">Vitórias</div>
            </div>
          </ScrollReveal>
          <ScrollReveal preset="up" delay={0.2} duration={0.5}>
            <div className="bg-card-glass p-4 rounded-xl border border-border/60 shadow-lg">
              <div className="text-2xl font-bold text-[#F44336]">{estatisticas.derrotas}</div>
              <div className="text-sm text-muted-foreground">Derrotas</div>
            </div>
          </ScrollReveal>
          <ScrollReveal preset="up" delay={0.3} duration={0.5}>
            <div className="bg-card-glass p-4 rounded-xl border border-border/60 shadow-lg">
              <div className="text-2xl font-bold text-primary">{estatisticas.winrate}%</div>
              <div className="text-sm text-muted-foreground">Winrate</div>
            </div>
          </ScrollReveal>
        </div>

        <div className="flex gap-2 mb-6">
          {(['Todas', 'Vitória', 'Derrota'] as const).map((opcao) => (
            <button
              key={opcao}
              onClick={() => setFiltro(opcao)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${filtro === opcao
                ? 'bg-gradient-primary text-primary-foreground shadow-glow'
                : 'bg-[hsl(var(--secondary)/0.5)] text-muted-foreground hover:text-foreground border border-border'
                }`}
            >
              {opcao}
            </button>
          ))}
        </div>

        <LayoutGroup>

          <div className="space-y-4"
          >
            {partidasFiltradas.map((partida, idx) => (
              <ScrollReveal key={partida.id} preset="up" delay={idx * 0.1} duration={0.6}>
                <motion.div
                  layoutId={`match-${partida.id}`}
                  onClick={() => setSelectedMatch(partida)}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-card-glass p-6 rounded-xl border shadow-lg transition-all cursor-pointer ${partida.resultado === 'Vitória'
                    ? 'border-[#4CAF50]/30 hover:border-[#4CAF50]/50'
                    : 'border-[#F44336]/30 hover:border-[#F44336]/50'
                    }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`relative w-16 h-16 rounded-lg overflow-hidden ${partida.resultado === 'Vitória'
                        ? 'ring-2 ring-[#4CAF50]/50'
                        : 'ring-2 ring-[#F44336]/50'
                        }`}>
                        {imageErrors.has(partida.campeao) ? (
                          <div className={`w-full h-full flex items-center justify-center text-2xl font-bold ${partida.resultado === 'Vitória' ? 'bg-[#4CAF50]/20 text-[#4CAF50]' : 'bg-[#F44336]/20 text-[#F44336]'
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
                        <div className={`absolute inset-0 ${partida.resultado === 'Vitória' ? 'bg-[#4CAF50]/10' : 'bg-[#F44336]/10'
                          }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-display text-lg font-semibold text-foreground">
                            {partida.campeao} - {partida.role}
                          </h3>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${partida.resultado === 'Vitória' ? 'bg-[#4CAF50]/20 text-[#4CAF50]' : 'bg-[#F44336]/20 text-[#F44336]'
                            }`}>
                            {partida.resultado}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {partida.modo} • {partida.data} • {partida.duracao}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 text-center">Build in-game</div>
                      <div className="flex gap-1">
                        {partida.build.map((itemId, bIdx) => (
                          <img
                            key={bIdx}
                            src={getItemIcon(itemId)}
                            alt={`item-${itemId}`}
                            title={`#${itemId}`}
                            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md object-contain bg-background/20 border border-white/10 hover:scale-110 transition-all"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">KDA</div>
                        <div className="text-sm font-semibold text-foreground">{partida.kda}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Gold</div>
                        <div className="text-sm font-semibold text-[#F4A261]">{partida.gold.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Dano</div>
                        <div className="text-sm font-semibold text-foreground">{partida.dano.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Visão</div>
                        <div className="text-sm font-semibold text-primary">{partida.visao}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </LayoutGroup>
      </div>
      {selectedMatch && (
        <MatchDebrief
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}

    </div>
  )
}

export default MatchesPage
