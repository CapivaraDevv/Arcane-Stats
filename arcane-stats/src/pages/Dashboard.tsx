import { Tooltip, Legend, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { useConfig } from '../hooks/useConfig';

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
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(0, 180, 216, 0.4)"
              }}
              className="bg-[#1D2D50] rounded-lg p-6 shadow-lg flex flex-col justify-center items-center gap-2 transition-all hover:bg-[#0077B6] duration-100 border border-white/5 relative overflow-hidden group h-30"
            >
              {/* Efeito shimmer no hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="absolute inset-0 animate-shimmer"></div>
              </div>

              <div className='flex items-center gap-3'>
                {kpi.title === 'Melhor Campeão' ? (
                  <div className="relative z-10 w-10 h-10 flex items-center justify-center">
                    {!imageErrors.has(kpi.value) ? (
                      <img
                        src={getChampionImageUrl(kpi.value)}
                        alt={kpi.value}
                        className="w-10 h-10 rounded-lg object-cover border border-[#00B4D8]/40 transition-all"
                        onError={() => handleImageError(kpi.value)}
                      />
                    ) : (
                      <motion.div
                        className="text-2xl"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                      >
                        🏆
                      </motion.div>
                    )}
                  </div>
                ) : null}

                <div className="space-grotesk-title text-[24px] font-bold text-[#E0E0E0] relative z-10">{kpi.value}</div>
              </div>
              <div className="sora-text text-sm text-[#2fd8fa] relative z-10">{kpi.title}</div>
              <div className="sora-text text-sm text-[#8ca5aa] relative z-10">{kpi.feedback}</div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* GRÁFICO DE DISTRIBUIÇÃO DE ROLES */}
      {configs.mostrarGraficos && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 relative z-10">
          <div className="md:col-span-2">
            <ScrollReveal preset="left" delay={0.2} duration={0.7}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[#1D2D50] rounded-xl p-4 flex flex-col items-center justify-center border border-white/5 shadow-lg hover:border-[#00B4D8]/50 transition-all relative overflow-hidden group"
              >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="absolute inset-0 animate-shimmer"></div>
              </div>

              <div className="relative z-10 w-full">
                <h2 className="space-grotesk-title text-lg font-semibold mb-4 text-[#E0E0E0]">Eficiência por rota</h2>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={laneAnalysis} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#0077B6" opacity={0.08} />
                    <XAxis type="number" domain={[0, 'dataMax']} stroke="#A8A8A8" />
                    <YAxis dataKey="lane" type="category" width={90} stroke="#A8A8A8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0B132B',
                        border: '1px solid #0077B6',
                        borderRadius: '8px',
                        color: '#E0E0E0'
                      }}
                      formatter={(value: number, name: string) => name === 'Winrate' ? `${value}%` : value.toFixed(1)}
                    />
                    <Legend wrapperStyle={{ color: '#E0E0E0' }} />
                    <Bar dataKey="winrate" name="Winrate" fill="#00B4D8" barSize={14} />
                    <Bar dataKey="kdaAvg" name="KDA" fill="#F4A261" barSize={10} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            </ScrollReveal>
          </div>

          <div className="md:col-span-2">
            <ScrollReveal preset="right" delay={0.3} duration={0.7}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[#1D2D50] rounded-xl p-4 flex flex-col border border-white/5 shadow-lg hover:border-[#00B4D8]/50 transition-all relative overflow-hidden group"
              >
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="absolute inset-0 animate-shimmer"></div>
              </div>

              {/* Conteúdo do Card - Tendência de Performance */}
              <div className="relative z-10 w-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="space-grotesk-title text-lg font-semibold text-[#E0E0E0]">Tendência de Performance</h2>
                </div>

                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={tendenciaPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#0077B6" opacity={0.2} />
                    <XAxis
                      dataKey="partida"
                      stroke="#A8A8A8"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      stroke="#A8A8A8"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0B132B',
                        border: '1px solid #0077B6',
                        borderRadius: '8px',
                        color: '#E0E0E0'
                      }}
                      formatter={(value: number) => value.toFixed(1)}
                    />
                    <Line
                      type="monotone"
                      dataKey="kda"
                      stroke="#00B4D8"
                      strokeWidth={2}
                      dot={{ fill: '#00B4D8', r: 4 }}
                      activeDot={{ r: 6 }}
                      name="KDA"
                    />
                    <Line
                      type="monotone"
                      dataKey="winrate"
                      stroke="#4CAF50"
                      strokeWidth={2}
                      dot={{ fill: '#4CAF50', r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Winrate %"
                    />
                    <Legend
                      wrapperStyle={{ color: '#E0E0E0', fontSize: '12px' }}
                    />
                  </LineChart>
                </ResponsiveContainer>

                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="sora-text text-xs text-[#A8A8A8] italic text-center">
                    Últimas 7 partidas • Tendência: <span className="text-[#4CAF50] font-semibold">↑ Melhorando</span>
                  </p>
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
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          className="bg-[#1D2D50] rounded-lg p-4 shadow-lg border border-white/5 hover:border-[#00B4D8]/50 transition-all relative overflow-hidden group"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="absolute inset-0 animate-shimmer" />
          </div>

          <div className="relative z-10 space-y-3">
            {/* Header com lane e icon */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <h3 className="space-grotesk-title text-lg font-bold text-[#E0E0E0]">{lane.lane}</h3>
              {lane.icon.startsWith('/') ? (
                <img src={lane.icon} alt={lane.lane} className="w-7 h-7 object-contain" />
              ) : (
                <span className="text-2xl">{lane.icon}</span>
              )}
            </div>

            {/* Campeões mais usados */}
            <div>
              <div className="text-xs font-semibold text-[#00B4D8] uppercase tracking-wide mb-1">Top Champions</div>
              <div className="flex gap-1">
                {lane.champions.map((champ, cIdx) => (
                  <img src={getChampionImageUrl(champ)} key={cIdx} className="w-15 bg-[#0077B6]/20 text-[#00B4D8] rounded" />

                ))}
              </div>
            </div>

            {/* Winrate */}
            <div>
              <div className="text-xs font-semibold text-[#A8A8A8] uppercase tracking-wide mb-1">Winrate</div>
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold text-[#00B4D8]">{lane.winrate}%</div>
                <div className="flex-1 h-2 bg-[#0B132B] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00B4D8]"
                    style={{ width: `${lane.winrate}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Agressividade (First Blood Involvement) */}
            <div>
              <div className=" text-xs font-semibold text-[#A8A8A8] uppercase tracking-wide mb-1">Agressividade</div>
              <div className="flex items-center gap-2">
                <div className="sora-text text-sm font-bold text-[#fc5353]">{lane.firstBloodInvolvement}%</div>
                <div className="flex-1 h-2 bg-[#0B132B] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#fc5353]"
                    style={{ width: `${lane.firstBloodInvolvement}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Melhor Build */}
            <div>
              <div className="text-xs font-semibold text-[#A8A8A8] uppercase tracking-wide mb-1">Build Ideal</div>
              <div className="flex flex-col gap-1">
                {lane.bestBuild.map((item, bIdx) => (
                  <div key={bIdx} className="text-xs text-[#E0E0E0] px-2 py-1 bg-[#0B132B] rounded border border-white/10">
                    {bIdx + 1}. {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Média de CS/Farm */}
            <div className="pt-2 border-t border-white/10">
              <div className="text-xs font-semibold text-[#A8A8A8] uppercase tracking-wide mb-1">Média de Farm</div>
              <div className="text-lg font-bold text-[#00B4D8]">{lane.avgCS} CS</div>
              <p className="text-xs text-[#A8A8A8] italic">por 30 min</p>
            </div>
          </div>
        </motion.div>
      </ScrollReveal>
    ))}
  </div>
</div>
    </div >
  );
}

