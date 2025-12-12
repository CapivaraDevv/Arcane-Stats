import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
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
    setImageErrors(prev => new Set(prev).add(championName));
  };
  // Dados mockados para KPIs
  const kpis = [
    { title: 'Taxa de Vitória', value: '62%', description: 'Porcentagem de vitórias totais', icon: '🏆' },
    { title: 'KDA Médio', value: '4.8', description: 'Kill/Death/Assistência média', icon: '⚔️' },
    { title: 'Partidas Analisadas', value: '124', description: 'Total de jogos cadastrados', icon: '🎮' },
    { title: 'Campeão', value: 'Vayne', description: 'Campeão com maior winrate', icon: '🔥' },
  ];

  // Agora o campo é 'name', não mais 'role'
  const dadosRoles = [
    { name: 'Top', value: 25 },
    { name: 'Jungle', value: 21 },
    { name: 'Mid', value: 30 },
    { name: 'ADC', value: 22 },
    { name: 'Support', value: 26 },
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

  // Paleta Arcane Tech Style (ajustada para melhor contraste no gráfico de pizza)
  const cores = ['#00B4D8', '#0077B6', '#F4A261', '#FF6B6B', '#A8DADC'];

  // Dados detalhados por rota
  const laneAnalysis = [
    {
      lane: 'Top',
      champions: ['Jax', 'Darius', 'Riven'],
      winrate: 6,
      firstBloodInvolvement: 34,
      bestBuild: ['Força Tríade', 'Cutelo', 'Escudo de Sterak'],
      avgCS: 286,
      icon: '/IconeTop.png'
    },
    {
      lane: 'Jungle',
      champions: ['Lee Sin', 'Elise', 'Graves'],
      winrate: 12,
      firstBloodInvolvement: 62,
      bestBuild: ['Sinal de sterak', 'Cutelo', 'Hidra Raivosa'],
      avgCS: 165,
      icon: '/IconeJungle.png'
    },
    {
      lane: 'Mid',
      champions: ['Zed', 'Talon', 'Lux'],
      winrate: 31,
      firstBloodInvolvement: 48,
      bestBuild: ['Eclipse', 'Presa de Serpente', 'Cajado do Vazio'],
      avgCS: 312,
      icon: '/IconeMID.png'
    },
    {
      lane: 'ADC',
      champions: ['Jinx', 'Caitlyn', 'Vayne'],
      winrate: 55,
      firstBloodInvolvement: 18,
      bestBuild: ['Mata-Cráquens', 'Gume do infinito', 'Lembrança do lorde dominik'],
      avgCS: 336,
      icon: '/IconeADC.webp'
    },
    {
      lane: 'Support',
      champions: ['Thresh', 'Braum', 'Leona'],
      winrate: 3,
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
              className="bg-[#1D2D50] rounded-lg p-6 shadow-lg flex flex-col items-start gap-2 transition-all hover:bg-[#0077B6] duration-100 border border-white/5 relative overflow-hidden group"
            >
            {/* Efeito shimmer no hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="absolute inset-0 animate-shimmer"></div>
            </div>

            {kpi.title === 'Campeão' ? (
              <div className="relative z-10 mb-1 flex items-center justify-center">
                {imageErrors.has(kpi.value) ? (
                  <motion.div
                    className="text-3xl mb-2"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.2
                    }}
                  >
                    {kpi.icon}
                  </motion.div>
                ) : (
                  <img
                    src={getChampionImageUrl(kpi.value)}
                    alt={kpi.value}
                    className="w-10 h-10 rounded-lg object-cover border border-[#00B4D8]/40 transition-all"
                    onError={() => handleImageError(kpi.value)}
                  />
                )}
              </div>
            ) : (
              <motion.div
                className="text-3xl mb-2 relative z-10"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.2
                }}
              >
                {kpi.icon}
              </motion.div>
            )}
            <div className="space-grotesk-title text-xl font-bold text-[#E0E0E0] relative z-10">{kpi.value}</div>
            <div className="sora-text text-sm text-[#00B4D8] relative z-10">{kpi.title}</div>
            <div className="sora-text text-xs text-[#A8A8A8] italic relative z-10">{kpi.description}</div>
          </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* GRÁFICO DE DISTRIBUIÇÃO DE ROLES */}
      {configs.mostrarGraficos && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 relative z-10">
        <ScrollReveal preset="left" delay={0.2} duration={0.7}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#1D2D50] rounded-xl p-4 flex flex-col items-center justify-center border border-white/5 shadow-lg hover:border-[#00B4D8]/50 transition-all relative overflow-hidden group"
          >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="absolute inset-0 animate-shimmer"></div>
          </div>

          <div className="relative z-10 w-full">
            <h2 className="space-grotesk-title text-lg font-semibold mb-4 text-[#E0E0E0]">Quantidade de partidas por rota</h2>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={dadosRoles}
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  // render labels in light color to avoid default black SVG text on hover
                  label={{ fill: '#E0E0E0', fontSize: 12 }}
                  labelLine={false}
                >
                  {dadosRoles.map((_, idx) => (
                    <Cell key={`cell-${idx}`} fill={cores[idx % cores.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B132B',
                    border: '1px solid #0077B6',
                    borderRadius: '8px',
                    color: '#E0E0E0'
                  }}
                  // ensure tooltip text is light as well
                  itemStyle={{ color: '#E0E0E0' } as any}
                />
                <Legend
                  wrapperStyle={{ color: '#E0E0E0' }}
                />
              </PieChart>
            </ResponsiveContainer>
        </div>
      </motion.div>
        </ScrollReveal>
        
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
              <span className="text-2xl">📈</span>
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
                      <div className="text-xl font-bold text-[#4CAF50]">{lane.winrate}%</div>
                      <div className="flex-1 h-2 bg-[#0B132B] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-[#4CAF50] to-[#00B4D8]"
                          style={{ width: `${lane.winrate}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Agressividade (First Blood Involvement) */}
                  <div>
                    <div className="text-xs font-semibold text-[#A8A8A8] uppercase tracking-wide mb-1">Agressividade</div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-bold text-[#F4A261]">{lane.firstBloodInvolvement}%</div>
                      <div className="flex-1 h-2 bg-[#0B132B] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-[#F4A261] to-[#FF6B6B]"
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
    </div>
  );
}

