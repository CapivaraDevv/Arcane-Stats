import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

type EfficiencyDatum = { lane: string; winrate: number; kdaAvg: number };

export default function EfficiencyChart({ data }: { data: EfficiencyDatum[] }) {

  return (
    <div className="relative z-10 w-full">
      <ResponsiveContainer width="100%" height={200} minHeight={180}>
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 60, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#0077B6" opacity={0.08} />
          <XAxis type="number" domain={[0, 'dataMax']} stroke="#A8A8A8" />
          <YAxis dataKey="lane" type="category" width={50} stroke="#A8A8A8" style={{ fontSize: '11px' }} />
          <Tooltip
            cursor={{ fill: '#0B132B', opacity: 0.6 }}
            contentStyle={{ backgroundColor: '#0B132B', border: '1px solid #0077B6', borderRadius: 8, color: '#E0E0E0' }}
            formatter={(value: number, name: string) => name === 'Winrate' ? `${value}%` : value.toFixed(1)}
          />
          <Legend wrapperStyle={{ color: '#E0E0E0' }} />

          <Bar dataKey="winrate" name="Winrate" barSize={14} fill="#00B4D8">
            {data.map((_, i) => (
              <Cell key={`cell-win-${i}`} style={{ cursor: 'pointer' }} />
            ))}
          </Bar>

          <Bar dataKey="kdaAvg" name="KDA" barSize={10} fill="#F4A261">
            {data.map((_, i) => (
              <Cell key={`cell-kda-${i}`} style={{ cursor: 'pointer' }} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
