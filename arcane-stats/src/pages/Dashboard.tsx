
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

  // Paleta roxo/azul Arcane
  const cores = ['#8b5cf6', '#a78bfa', '#3b82f6', '#60a5fa', '#06b6d4'];

  return (
    <div className="p-6 flex flex-col gap-8 bg-[#1a0b2e] min-h-screen">
      {/* GRID DE INDICADORES (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-[#4a2c6d] rounded-lg p-6 shadow-lg flex flex-col items-start gap-2 transition-all hover:scale-105 hover:bg-[#6b46c1] hover:shadow-[#8b5cf6] hover:shadow-xl duration-200 border border-[#6b46c1]/30">
            <div className="text-3xl mb-2 animate-pulse">{kpi.icon}</div>
            <div className="text-xl font-bold text-white">{kpi.value}</div>
            <div className="text-sm text-[#a78bfa]">{kpi.title}</div>
            <div className="text-xs text-[#c4b5fd] italic">{kpi.description}</div>
          </div>
        ))}
      </div>

      {/* GRÁFICO DE DISTRIBUIÇÃO DE ROLES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-[#2d1b4e] rounded-xl p-4 flex flex-col items-center justify-center border border-[#6b46c1]/30 shadow-lg">
          <h1 className="titulo-grafico pb-2 space-grotesk-title text-white mb-4">Quantidade de partidas por rota</h1>
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
                  backgroundColor: '#1a0b2e', 
                  border: '1px solid #6b46c1',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Legend 
                wrapperStyle={{ color: '#ffffff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-[#2d1b4e] rounded-xl h-64 flex items-center justify-center text-[#a78bfa] text-lg border border-[#6b46c1]/30 shadow-lg">
          {/* Futuro: Destaque de Partida ou Recorde */}
          [ Card de Destaque aqui ]
        </div>
      </div>
    </div>
  );
}

