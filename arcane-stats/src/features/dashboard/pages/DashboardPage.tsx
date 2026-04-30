import { motion } from 'framer-motion'
import ScrollReveal from '../../../components/ScrollReveal'
import { useConfig } from '../../../hooks/useConfig'
import { useImageFallback } from '../../../shared/hooks/useImageFallback'
import DarkVeil from '../../../components/DarkVeilBackground'

import KPICard from '../../../components/KPICard'
import TrendChart from '../../../components/TrendChart'
import LaneCard from '../../../components/LaneCard'


export default function DashboardPage() {
  const { configs } = useConfig()
  const { imageErrors, markImageError } = useImageFallback()

  const kpis = [
    { title: 'Taxa de Vitória', value: '62%', feedback: '+5% últimos 7 jogos' },
    { title: 'KDA Médio', value: '4.8', feedback: 'Acima da média da rota' },
    { title: 'Partidas Analisadas', value: '124', feedback: 'Últimos 30 dias' },
    { title: 'Melhor Campeão', value: 'Vayne', feedback: '65% de Winrate' },
  ]

  const tendenciaPerformance = [
    { partida: 'P1', kda: 3.2, winrate: 45 },
    { partida: 'P2', kda: 4.1, winrate: 55 },
    { partida: 'P3', kda: 3.8, winrate: 50 },
    { partida: 'P4', kda: 5.2, winrate: 70 },
    { partida: 'P5', kda: 4.5, winrate: 60 },
    { partida: 'P6', kda: 4.8, winrate: 65 },
    { partida: 'P7', kda: 5.5, winrate: 75 },
  ]

  const decisionHeatMap = [
    { x: 20, y: 65, intensity: 1.2 },
    { x: 25, y: 60, intensity: 0.9 },
    { x: 55, y: 45, intensity: 1.5 },
    { x: 70, y: 30, intensity: 0.7 },
    { x: 80, y: 20, intensity: 1.3 },
  ]

  const laneAnalysis = [
    {
      lane: 'Top',
      champions: ['Jax', 'Darius', 'Riven'],
      winrate: 6,
      kdaAvg: 3.8,
      firstBloodInvolvement: 34,
      bestBuild: [3742, 3142, 3053],
      avgCS: 286,
      icon: '/IconeTop.png',
    },
    {
      lane: 'Jungle',
      champions: ['LeeSin', 'Elise', 'Graves'],
      winrate: 12,
      kdaAvg: 4.0,
      firstBloodInvolvement: 62,
      bestBuild: [3142, 3102, 3071],
      avgCS: 165,
      icon: '/IconeJungle.png',
    },
    {
      lane: 'Mid',
      champions: ['Zed', 'Talon', 'Lux'],
      winrate: 31,
      kdaAvg: 4.5,
      firstBloodInvolvement: 48,
      bestBuild: [6630, 3165, 3020],
      avgCS: 312,
      icon: '/IconeMID.png',
    },
    {
      lane: 'ADC',
      champions: ['Jinx', 'Caitlyn', 'Vayne'],
      winrate: 55,
      kdaAvg: 5.0,
      firstBloodInvolvement: 18,
      bestBuild: [6672, 3031, 3036],
      avgCS: 336,
      icon: '/IconeADC.webp',
    },
    {
      lane: 'Support',
      champions: ['Thresh', 'Braum', 'Leona'],
      winrate: 3,
      kdaAvg: 3.2,
      firstBloodInvolvement: 41,
      bestBuild: [3107, 323075, 323110],
      avgCS: 18,
      icon: '/IconeSuporte.png',
    },
  ]

  return (
    <div className="relative overflow-hidden p-6 flex-1 flex-col gap-8 bg-transparent min-h-screen ">
      <DarkVeil />
      <div className="relative z-10">
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {kpis.map((kpi, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1} preset="up" duration={0.6}>
              <KPICard kpi={kpi} idx={idx} imageErrors={imageErrors} handleImageError={markImageError} />
            </ScrollReveal>
          ))}
        </div>

        {configs.mostrarGraficos && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-12 relative z-10">
            {/* <div className="md:col-span-2">
              <ScrollReveal preset="left" delay={0.2} duration={0.7}>
                <motion.div whileHover={{ scale: 1.02 }} className="bg-[#1D2D50] rounded-xl p-4 flex flex-col items-center justify-center border border-white/5 shadow-lg hover:border-[#00B4D8]/50 transition-all relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="absolute inset-0 animate-shimmer"></div>
                  </div>

                  <div className="relative z-10 w-full">
                    <h2 className="space-grotesk-title text-lg font-semibold mb-4 text-[#E0E0E0]">Mapa de Pressão Estratégica</h2>
                    <DecisionHeatMap data={decisionHeatMap} />
                  </div>
                </motion.div>
              </ScrollReveal>
            </div> */}

            <div className="md:col-span-2">
              <ScrollReveal preset="right" delay={0.3} duration={0.7}>
                <motion.div whileHover={{ scale: 1.02 }} className="bg-background rounded-xl p-4 flex flex-col border border-white/5 shadow-lg hover:border-[#00B4D8]/50 transition-all relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="absolute inset-0 animate-shimmer" />
                  </div>

                  <div className="relative z-10 w-full">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="space-grotesk-title text-lg font-semibold text-[#E0E0E0]">Tendência de Performance</h2>
                    </div>
                    <TrendChart data={tendenciaPerformance} />

                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="sora-text text-xs text-[#A8A8A8] italic text-center">Últimas 7 partidas • Tendência: <span className="text-[#4CAF50] font-semibold">↑ Melhorando</span></p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        )}

        <div className="relative z-10">
          <h2 className="space-grotesk-title text-2xl font-bold mb-4 text-[#E0E0E0]">Análise por Rota</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {laneAnalysis.map((lane, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} preset="up" duration={0.6}>
                <motion.div whileHover={{ scale: 1.02, y: -4 }} className="relative">
                  <LaneCard lane={lane} />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
