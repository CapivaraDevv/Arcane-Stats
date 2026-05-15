import { useState, useMemo } from 'react';
import { LayoutGroup } from 'framer-motion';
import { User } from 'lucide-react';
import ScrollReveal from '../../../components/ScrollReveal';
import DarkVeil from '../../../components/DarkVeilBackground';
import useAuth  from '../../auth/hooks/useAuth';
import { mockMatches } from '../../matches/data/mockMatches';
import MatchCard from '../../matches/components/MatchCard';
import MatchDebrief from '../../matches/MatchDebrief';
import type { Partida } from '../../matches/types';

export default function ProfilePage() {
  const { user } = useAuth();
  const [filtro, setFiltro] = useState<'Todas' | 'Vitória' | 'Derrota'>('Todas');
  const [selectedMatch, setSelectedMatch] = useState<Partida | null>(null);

  const stats = useMemo(() => {
    const total = mockMatches.length;
    const vitorias = mockMatches.filter((p) => p.resultado === 'Vitória').length;
    const winrate = Math.round((vitorias / total) * 100);

    const freq: Record<string, number> = {};
    for (const p of mockMatches) freq[p.campeao] = (freq[p.campeao] ?? 0) + 1;
    const melhorCampeao = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];

    const kdaValues = mockMatches.map((p) => {
      const [k, d, a] = p.kda.split('/').map(Number);
      return d === 0 ? k + a : (k + a) / d;
    });
    const avgKDA = (kdaValues.reduce((a, b) => a + b, 0) / kdaValues.length).toFixed(1);

    return { total, vitorias, winrate, melhorCampeao, avgKDA };
  }, []);

  const partidasFiltradas = useMemo(
    () => filtro === 'Todas' ? mockMatches : mockMatches.filter((p) => p.resultado === filtro),
    [filtro],
  );

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <DarkVeil />

      <header className="sticky top-0 z-30 border-b border-[hsl(var(--border)/0.6)] bg-[hsl(var(--background)/0.7)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.1)] text-primary shadow-glow">
                <User className="h-5 w-5" />
              </div>
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-glow-pulse rounded-full bg-primary-glow" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold tracking-tight">Perfil</h1>
              <p className="text-xs text-muted-foreground">Seu perfil e histórico de partidas</p>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 space-y-8">

        {/* Hero */}
        <ScrollReveal preset="up" duration={0.6}>
          <div className="bg-card-glass rounded-2xl border border-border/60 p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="shrink-0 w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-glow">
              {initials}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="font-display text-2xl font-bold text-foreground">{user?.name ?? '—'}</h2>
              <p className="text-sm text-muted-foreground mt-1">{user?.email ?? '—'}</p>
              <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold bg-[hsl(var(--primary)/0.15)] text-primary border border-[hsl(var(--primary)/0.3)]">
                Ouro II
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Stats rápidos */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <ScrollReveal preset="up" delay={0} duration={0.5}>
            <div className="bg-card-glass p-4 rounded-xl border border-border/60 shadow-lg">
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total de Partidas</div>
            </div>
          </ScrollReveal>
          <ScrollReveal preset="up" delay={0.1} duration={0.5}>
            <div className="bg-card-glass p-4 rounded-xl border border-border/60 shadow-lg">
              <div className="text-2xl font-bold text-primary">{stats.winrate}%</div>
              <div className="text-sm text-muted-foreground">Taxa de Vitória</div>
            </div>
          </ScrollReveal>
          <ScrollReveal preset="up" delay={0.2} duration={0.5}>
            <div className="bg-card-glass p-4 rounded-xl border border-border/60 shadow-lg">
              <div className="text-2xl font-bold text-foreground">{stats.melhorCampeao}</div>
              <div className="text-sm text-muted-foreground">Campeão + Jogado</div>
            </div>
          </ScrollReveal>
          <ScrollReveal preset="up" delay={0.3} duration={0.5}>
            <div className="bg-card-glass p-4 rounded-xl border border-border/60 shadow-lg">
              <div className="text-2xl font-bold text-foreground">{stats.avgKDA}</div>
              <div className="text-sm text-muted-foreground">KDA Médio</div>
            </div>
          </ScrollReveal>
        </div>

        {/* Histórico de partidas */}
        <div>
          <h2 className="font-display text-xl font-bold mb-4 text-foreground">Histórico de Partidas</h2>

          <div className="flex gap-2 mb-6">
            {(['Todas', 'Vitória', 'Derrota'] as const).map((opcao) => (
              <button
                key={opcao}
                onClick={() => setFiltro(opcao)}
                className={`px-4 py-2 rounded-xl text-sm transition-all ${
                  filtro === opcao
                    ? 'bg-gradient-primary text-primary-foreground shadow-glow'
                    : 'bg-[hsl(var(--secondary)/0.5)] text-muted-foreground hover:text-foreground border border-border'
                }`}
              >
                {opcao}
              </button>
            ))}
          </div>

          <LayoutGroup>
            <div className="space-y-4">
              {partidasFiltradas.map((partida, idx) => (
                <ScrollReveal key={partida.id} preset="up" delay={idx * 0.1} duration={0.6}>
                  <MatchCard partida={partida} onSelect={setSelectedMatch} />
                </ScrollReveal>
              ))}
            </div>
          </LayoutGroup>
        </div>
      </div>

      {selectedMatch && (
        <MatchDebrief match={selectedMatch} onClose={() => setSelectedMatch(null)} />
      )}
    </div>
  );
}
