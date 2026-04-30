import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

type EfficiencyDatum = { lane: string; winrate: number; kdaAvg: number };

export default function EfficiencyChart({ data }: { data: EfficiencyDatum[] }) {

  return (
    <div className="relative z-10 w-full">
      <ResponsiveContainer width="100%" height={200} minHeight={180}>
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 60, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary))" opacity={0.08} />
          <XAxis type="number" domain={[0, 'dataMax']} stroke="hsl(var(--muted-foreground))" />
          <YAxis dataKey="lane" type="category" width={50} stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px' }} />
          <Tooltip
            cursor={{ fill: 'hsl(var(--background))', opacity: 0.6 }}
            contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.7)', border: '1px solid hsl(var(--primary))', borderRadius: 8, color: 'hsl(var(--foreground))' }}
            formatter={(value: number, name: string) => name === 'Winrate' ? `${value}%` : value.toFixed(1)}
          />
          <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />

          <Bar dataKey="winrate" name="Winrate" barSize={14} fill="hsl(var(--primary-glow))">
            {data.map((_, i) => (
              <Cell key={`cell-win-${i}`} style={{ cursor: 'pointer' }} />
            ))}
          </Bar>

          <Bar dataKey="kdaAvg" name="KDA" barSize={10} fill="hsl(28 87% 67%)">
            {data.map((_, i) => (
              <Cell key={`cell-kda-${i}`} style={{ cursor: 'pointer' }} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
