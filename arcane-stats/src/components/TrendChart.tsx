import { memo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

type TrendDatum = { partida: string; kda: number; winrate: number };

const TrendChart = memo(function TrendChart({ data }: { data: TrendDatum[] }) {
  return (
    <div className="relative z-10 w-full">
      <ResponsiveContainer width="100%" height={360} minHeight={160}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#0077B6" fill='#05080fb3' opacity={0.2} />
          <XAxis dataKey="partida" stroke="#A8A8A8" style={{ fontSize: '10px' }} />
          <YAxis stroke="#A8A8A8" style={{ fontSize: '10px' }} width={30} />
          <Tooltip contentStyle={{ backgroundColor: '#05080fb3', border: '1px solid #0077B6', borderRadius: 8, color: '#E0E0E0' }} formatter={(v: number) => v.toFixed(1)} />
          <Line type="monotone" dataKey="kda" stroke="#00B4D8" strokeWidth={2} dot={{ fill: '#00B4D8', r: 4 }} activeDot={{ r: 6 }} name="KDA" />
          <Line type="monotone" dataKey="winrate" stroke="#4CAF50" strokeWidth={2} dot={{ fill: '#4CAF50', r: 4 }} activeDot={{ r: 6 }} name="Winrate %" />
          <Legend wrapperStyle={{ color: '#E0E0E0', fontSize: '12px' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

export default TrendChart;
