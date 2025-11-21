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

  // Paleta Arcane Tech Style
  const cores = ['#0077B6', '#00B4D8', '#E0E0E0', '#F4A261', '#0B132B'];


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
              <div className="relative z-10 mb-2 flex items-center justify-center">
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
                    className="w-16 h-16 rounded-lg object-cover border-2 border-[#00B4D8]/50 shadow-lg hover:border-[#00B4D8] transition-all"
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
                <Pie dataKey="value" data={dadosRoles} cx="50%" cy="50%" outerRadius={75}
                  label={({ name }) => name}>
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
    </div>
  );
}

