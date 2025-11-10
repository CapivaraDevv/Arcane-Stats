
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export default function Dashboard() {
  // Dados mockados para KPIs
  const kpis = [
    { title: 'Taxa de Vitória', value: '62%', description: 'Porcentagem de vitórias totais', icon: '🏆' },
    { title: 'KDA Médio', value: '4.8', description: 'Kill/Death/Assistência média', icon: '⚔️' },
    { title: 'Partidas Analisadas', value: '124', description: 'Total de jogos cadastrados', icon: '🎮' },
    { title: 'Campeão Vitória', value: 'Lucian', description: 'Campeão com maior winrate', icon: '🔥' },
  ];

  // Agora o campo é 'name', não mais 'role'
  const dadosRoles = [
    { name: 'Top', value: 25 },
    { name: 'Jungle', value: 21 },
    { name: 'Mid', value: 30 },
    { name: 'ADC', value: 22 },
    { name: 'Support', value: 26 },
  ];

  // Paleta Arcane Tech Style
  const cores = ['#0077B6', '#00B4D8', '#E0E0E0', '#F4A261', '#0B132B'];

  // Variantes de animação para os cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut" as const
      }
    })
  };

  return (
    <div className="p-6 flex flex-col gap-8 bg-[#0B132B] min-h-screen relative overflow-hidden">
      {/* Background animado sutil */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0077B6] via-[#00B4D8] to-[#0077B6] animate-gradient"></div>
      </div>

      {/* GRID DE INDICADORES (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {kpis.map((kpi, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
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
            <div className="space-grotesk-title text-xl font-bold text-[#E0E0E0] relative z-10">{kpi.value}</div>
            <div className="sora-text text-sm text-[#00B4D8] relative z-10">{kpi.title}</div>
            <div className="sora-text text-xs text-[#A8A8A8] italic relative z-10">{kpi.description}</div>
          </motion.div>
        ))}
      </div>

      {/* GRÁFICO DE DISTRIBUIÇÃO DE ROLES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
          className="bg-[#1D2D50] rounded-xl p-4 flex flex-col items-center justify-center border border-white/5 shadow-lg hover:border-[#00B4D8]/50 transition-all"
        >
          <h1 className="titulo-grafico pb-2 space-grotesk-title text-[#E0E0E0] mb-4">Quantidade de partidas por rota</h1>
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
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
          className="bg-[#1D2D50] rounded-xl h-64 flex items-center justify-center text-[#00B4D8] text-lg border border-white/5 shadow-lg hover:border-[#00B4D8]/50 transition-all relative overflow-hidden group"
        >
          {/* Efeito de brilho no hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00B4D8]/20 to-transparent animate-shimmer"></div>
          </div>
          {/* Futuro: Destaque de Partida ou Recorde */}
          <p className="sora-text relative z-10">[ Card de Destaque aqui ]</p>
        </motion.div>
      </div>
    </div>
  );
}

