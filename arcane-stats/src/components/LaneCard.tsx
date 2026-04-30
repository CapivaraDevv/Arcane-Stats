type Lane = {
  lane: string;
  champions: string[]; // internal names or ids, depending on data source
  winrate: number;
  kdaAvg?: number;
  firstBloodInvolvement: number;
  bestBuild: number[]; // item ids
  avgCS: number;
  icon?: string;
};

import React from 'react';
import { useAssets } from '../hooks/useAssets';

function LaneCardInner({ lane }: { lane: Lane }) {
  const { getChampionIcon, getItemIcon } = useAssets();
  return (
    <div className="bg-[hsl(var(--background)/0.3)] rounded-lg p-3 sm:p-4 shadow-lg border border-border hover:border-[hsl(var(--primary)/0.3)] transition-all relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary-glow))] cursor-pointer">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="absolute inset-0 animate-shimmer" />
      </div>

      <div className="relative z-10 space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between mb-2 sm:mb-3 pb-1 sm:pb-2 border-b border-border group-hover:border-[hsl(var(--primary)/0.3)] transition-all">
          <h3 className="space-grotesk-title text-base sm:text-lg font-bold text-[hsl(var(--foreground))]">{lane.lane}</h3>
          {lane.icon && lane.icon.startsWith('/') ? (
            <img src={lane.icon} alt={lane.lane} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
          ) : (
            <span className="text-lg sm:text-2xl">{lane.icon}</span>
          )}
        </div>

        <div>
          <div className="text-xs font-semibold text-[hsl(var(--primary-glow))] uppercase tracking-wide mb-1">Top Champions</div>
          <div className="flex gap-1">
            {lane.champions.map((champ: string, cIdx: number) => (
              <img
                key={cIdx}
                src={getChampionIcon(champ)}
                alt={champ}
                title={champ}
                loading="lazy"
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md object-cover bg-[hsl(var(--primary))]/20 border border-white/5 hover:scale-110 cursor-pointer transition-all"
              />
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-1">Winrate</div>
          <div className="flex items-center gap-2">
            <div className="text-lg sm:text-xl font-bold text-[hsl(var(--primary-glow))]">{lane.winrate}%</div>
            <div className="flex-1 h-2 bg-[hsl(var(--background))] rounded-full overflow-hidden">
              <div className="h-full bg-[hsl(var(--primary-glow))]" style={{ width: `${lane.winrate}%` }} />
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-1">Agressividade</div>
          <div className="flex items-center gap-2">
            <div className="sora-text text-lg sm:text-xl font-bold text-[hsl(var(--destructive))]">{lane.firstBloodInvolvement}%</div>
            <div className="flex-1 h-2 bg-[hsl(var(--background))] rounded-full overflow-hidden">
              <div className="h-full bg-[hsl(var(--destructive))]" style={{ width: `${lane.firstBloodInvolvement}%` }} />
            </div>
          </div>
        </div>

        {/* <div>
          <div className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-1">Build Ideal</div>
          <div className="flex gap-1">
            {lane.bestBuild.map((itemId: number, bIdx: number) => (
              <img
                key={bIdx}
                src={getItemIcon(itemId)}
                alt={`item-${itemId}`}
                title={`#${itemId}`}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md object-contain bg-[hsl(var(--background))]/20 border border-white/10"
              />
            ))}
          </div>
        </div> */}

        <div className="pt-2 sm:pt-3 border-t border-border group-hover:border-[hsl(var(--primary)/0.3)] transition-all">
          <div className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-1">Média de Farm</div>
          <div className="text-base sm:text-lg font-bold text-[hsl(var(--primary-glow))]">{lane.avgCS} CS</div>
          <p className="text-xs text-[hsl(var(--muted-foreground))] italic">por 30 min</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(LaneCardInner);
