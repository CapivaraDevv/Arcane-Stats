import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { useConfig } from '../hooks/useConfig';

import KPICard from '../components/KPICard';
import EfficiencyChart from '../components/EfficiencyChart';
import TrendChart from '../components/TrendChart';
import LaneCard from '../components/LaneCard';

export default function Dashboard() {
  const { configs } = useConfig();
  // Estado para armazenar a versão da API Data Dragon
  const [ddragonVersion, setDdragonVersion] = useState<string>('latest');
  // Estado para controlar falhas no carregamento de imagens
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Função para buscar a versão mais recente da API
  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
        const versions = await response.json();
        if (versions && versions.length > 0) {
          setDdragonVersion(versions[0]); // Pega a versão mais recente
        }
      } catch (error) {
        console.error('Erro ao buscar versão da API:', error);
        // Mantém 'latest' como fallback
      }
    };
    fetchVersion();
  }, []);

  // Função utilitária para construir URL da imagem do campeão
  const getChampionImageUrl = (championName: string) => {
    // Remove acentos e espaços, converte para o formato da API
    const formattedName = championName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '');

    return `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${formattedName}.png`;
  };

  // Função para lidar com erro no carregamento da imagem
  const handleImageError = (championName: string) => {
    setImageErrors(prev => {
      const next = new Set(prev);
      next.add(championName);
      return next;
    });
  };
  // Dados mockados para KPIs
  const kpis = [
    { title: 'Taxa de Vitória', value: '62%', feedback: "+5% últimos 7 jogos" },
    { title: 'KDA Médio', value: '4.8', feedback: "Acima da média da rota" },
    { title: 'Partidas Analisadas', value: '124', feedback: "Últimos 30 dias" },
    { title: 'Melhor Campeão', value: 'Vayne', feedback: "65% de Winrate" },
  ];

  // Dados para tendência de performance (últimas 7 partidas)
  const tendenciaPerformance = [
    { partida: 'P1', kda: 3.2, winrate: 45 },
    { partida: 'P2', kda: 4.1, winrate: 55 },
    { partida: 'P3', kda: 3.8, winrate: 50 },
    { partida: 'P4', kda: 5.2, winrate: 70 },
    { partida: 'P5', kda: 4.5, winrate: 60 },
    { partida: 'P6', kda: 4.8, winrate: 65 },
    { partida: 'P7', kda: 5.5, winrate: 75 },
  ];


  // Dados detalhados por rota
  const laneAnalysis = [
    {
      lane: 'Top',
      champions: ['Jax', 'Darius', 'Riven'],
      winrate: 6,
      kdaAvg: 3.8,
      firstBloodInvolvement: 34,
      bestBuild: ['Força Tríade', 'Cutelo', 'Escudo de Sterak'],
      avgCS: 286,
      icon: '/IconeTop.png'
    },
    {
      lane: 'Jungle',
      champions: ['Lee Sin', 'Elise', 'Graves'],
      winrate: 12,
      kdaAvg: 4.0,
      firstBloodInvolvement: 62,
      bestBuild: ['Sinal de sterak', 'Cutelo', 'Hidra Raivosa'],
      avgCS: 165,
      icon: '/IconeJungle.png'
    },
    {
      lane: 'Mid',
      champions: ['Zed', 'Talon', 'Lux'],
      winrate: 31,
      kdaAvg: 4.5,
      firstBloodInvolvement: 48,
      bestBuild: ['Eclipse', 'Presa de Serpente', 'Cajado do Vazio'],
      avgCS: 312,
      icon: '/IconeMID.png'
    },
    {
      lane: 'ADC',
      champions: ['Jinx', 'Caitlyn', 'Vayne'],
      winrate: 55,
      kdaAvg: 5.0,
      firstBloodInvolvement: 18,
      bestBuild: ['Mata-Cráquens', 'Gume do infinito', 'Lembrança do lorde dominik'],
      avgCS: 336,
      icon: '/IconeADC.webp'
    },
    {
      lane: 'Support',
      champions: ['Thresh', 'Braum', 'Leona'],
      winrate: 3,
      kdaAvg: 3.2,
      firstBloodInvolvement: 41,
      bestBuild: ['Tanque Turbo Químico', 'Escudo de Kaenic', 'Armadura de Espinhos'],
      avgCS: 18,
      icon: '/IconeSuporte.png'
    },
  ];

  return (
    <div className="p-6 flex flex-col gap-8 bg-[#0B132B] min-h-screen relative overflow-hidden">
      {/* Background animado sutil */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-[#0077B6] via-[#00B4D8] to-[#0077B6] animate-gradient"></div>
      </div>

      {/* GRID DE INDICADORES (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {kpis.map((kpi, idx) => (
          <ScrollReveal key={idx} delay={idx * 0.1} preset="up" duration={0.6}>
            <KPICard kpi={kpi} idx={idx} getChampionImageUrl={getChampionImageUrl} imageErrors={imageErrors} handleImageError={handleImageError} />
          </ScrollReveal>
        ))}
      </div>

      {/* GRÁFICO DE DISTRIBUIÇÃO DE ROLES */}
      {configs.mostrarGraficos && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 relative z-10">

          <div className="md:col-span-2">
            <ScrollReveal preset="left" delay={0.2} duration={0.7}>
              <motion.div whileHover={{ scale: 1.02 }} className="bg-[#1D2D50] rounded-xl p-4 flex flex-col items-center justify-center border border-white/5 shadow-lg hover:border-[#00B4D8]/50 transition-all relative overflow-hidden group">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="absolute inset-0 animate-shimmer"></div>
                </div>

                <div className="relative z-10 w-full">
                  <h2 className="space-grotesk-title text-lg font-semibold mb-4 text-[#E0E0E0]">Eficiência por rota</h2>
                  <EfficiencyChart data={laneAnalysis} />
                </div>
              </motion.div>
            </ScrollReveal>
          </div>

          <div className="md:col-span-2">
            <ScrollReveal preset="right" delay={0.3} duration={0.7}>
              <motion.div whileHover={{ scale: 1.02 }} className="bg-[#1D2D50] rounded-xl p-4 flex flex-col border border-white/5 shadow-lg hover:border-[#00B4D8]/50 transition-all relative overflow-hidden group">
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

      {/* ANÁLISE DETALHADA POR ROTA */}
      <div className="relative z-10">
        <h2 className="space-grotesk-title text-2xl font-bold mb-4 text-[#E0E0E0]">Análise por Rota</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {laneAnalysis.map((lane, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1} preset="up" duration={0.6}>
              <motion.div whileHover={{ scale: 1.02, y: -4 }} className="relative">
                <LaneCard lane={lane} getChampionImageUrl={getChampionImageUrl} />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div >
  );
}

