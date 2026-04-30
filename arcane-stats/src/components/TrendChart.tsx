import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

type TrendDatum = { partida: string; kda: number; winrate: number };

export default function TrendChart({ data }: { data: TrendDatum[] }) {
  return (
    <div className="relative z-10 w-full">
      <ResponsiveContainer width="100%" height={360} minHeight={160}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary))" fill='hsl(var(--background) / 0.7)' opacity={0.2} />
          <XAxis dataKey="partida" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '10px' }} />
          <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '10px' }} width={30} />
          <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.7)', border: '1px solid hsl(var(--primary))', borderRadius: 8, color: 'hsl(var(--foreground))' }} formatter={(v: number) => v.toFixed(1)} />
          <Line type="monotone" dataKey="kda" stroke="hsl(var(--primary-glow))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary-glow))', r: 4 }} activeDot={{ r: 6 }} name="KDA" />
          <Line type="monotone" dataKey="winrate" stroke="hsl(142 71% 45%)" strokeWidth={2} dot={{ fill: 'hsl(142 71% 45%)', r: 4 }} activeDot={{ r: 6 }} name="Winrate %" />
          <Legend wrapperStyle={{ color: 'hsl(var(--foreground))', fontSize: '12px' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
