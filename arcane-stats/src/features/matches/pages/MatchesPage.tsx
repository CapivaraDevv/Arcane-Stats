import { LayoutGroup } from 'framer-motion'
import { useState, useMemo } from 'react'
import ScrollReveal from '../../../components/ScrollReveal'
import { Trophy } from 'lucide-react';
import MatchDebrief from '../MatchDebrief';
import MatchCard from '../components/MatchCard';
import { mockMatches } from '../data/mockMatches';
import type { Partida } from '../types';

const partidas = mockMatches;

const estatisticas = {
  total: partidas.length,
  vitorias: partidas.filter((p) => p.resultado === 'Vitória').length,
  derrotas: partidas.filter((p) => p.resultado === 'Derrota').length,
  winrate: Math.round((partidas.filter((p) => p.resultado === 'Vitória').length / partidas.length) * 100),
};

const MatchesPage = () => {
  const [filtro, setFiltro] = useState<'Todas' | 'Vitória' | 'Derrota'>('Todas')
  const [selectedMatch, setSelectedMatch] = useState<Partida | null>(null)

  const partidasFiltradas = useMemo(
    () => filtro === 'Todas' ? partidas : partidas.filter((p) => p.resultado === filtro),
    [filtro],
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background hextech */}
      <div className="pointer-events-none absolute inset-0 bg-hero" />
      <div className="pointer-events-none absolute inset-0 bg-hex opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[hsl(var(--primary)/0.2)] blur-3xl" />

      <header className="sticky top-0 z-30 border-b border-[hsl(var(--border)/0.6)] bg-[hsl(var(--background)/0.7)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.1)] text-primary shadow-glow">
                <Trophy className="h-5 w-5" />
              </div>
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-glow-pulse rounded-full bg-primary-glow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl font-bold tracking-tight">
                  Partidas
                </h1>
              </div>
              <p className="text-xs text-muted-foreground">
                Histórico completo de suas partidas
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <ScrollReveal preset="up" delay={0} duration={0.5}>
            <div className="bg-card-glass p-4 rounded-xl border border-border/60 shadow-lg">
              <div className="text-2xl font-bold text-foreground">{estatisticas.total}</div>
              <div className="text-sm text-muted-foreground">Total de Partidas</div>
            </div>
          </ScrollReveal>
          <ScrollReveal preset="up" delay={0.1} duration={0.5}>
            <div className="bg-card-glass p-4 rounded-xl border border-border/60 shadow-lg">
              <div className="text-2xl font-bold text-[#4CAF50]">{estatisticas.vitorias}</div>
              <div className="text-sm text-muted-foreground">Vitórias</div>
            </div>
          </ScrollReveal>
          <ScrollReveal preset="up" delay={0.2} duration={0.5}>
            <div className="bg-card-glass p-4 rounded-xl border border-border/60 shadow-lg">
              <div className="text-2xl font-bold text-[#F44336]">{estatisticas.derrotas}</div>
              <div className="text-sm text-muted-foreground">Derrotas</div>
            </div>
          </ScrollReveal>
          <ScrollReveal preset="up" delay={0.3} duration={0.5}>
            <div className="bg-card-glass p-4 rounded-xl border border-border/60 shadow-lg">
              <div className="text-2xl font-bold text-primary">{estatisticas.winrate}%</div>
              <div className="text-sm text-muted-foreground">Winrate</div>
            </div>
          </ScrollReveal>
        </div>

        <div className="flex gap-2 mb-6">
          {(['Todas', 'Vitória', 'Derrota'] as const).map((opcao) => (
            <button
              key={opcao}
              onClick={() => setFiltro(opcao)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${filtro === opcao
                ? 'bg-gradient-primary text-primary-foreground shadow-glow'
                : 'bg-[hsl(var(--secondary)/0.5)] text-muted-foreground hover:text-foreground border border-border'
                }`}
            >
              {opcao}
            </button>
          ))}
        </div>

        <LayoutGroup>

          <div className="space-y-4"
          >
            {partidasFiltradas.map((partida, idx) => (
              <ScrollReveal key={partida.id} preset="up" delay={Math.min(idx * 0.05, 0.3)} duration={0.4}>
                <MatchCard partida={partida} onSelect={setSelectedMatch} />
              </ScrollReveal>
            ))}
          </div>
        </LayoutGroup>
      </div>
      {selectedMatch && (
        <MatchDebrief
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}

    </div>
  )
}

export default MatchesPage
