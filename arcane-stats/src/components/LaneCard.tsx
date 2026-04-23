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
    <div className="bg-[#1D2D50] rounded-lg p-3 sm:p-4 shadow-lg border border-white/5 hover:border-[#00B4D8]/50 transition-all relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#00B4D8]">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="absolute inset-0 animate-shimmer" />
      </div>

      <div className="relative z-10 space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between mb-2 sm:mb-3 pb-1 sm:pb-2 border-b border-white/10">
          <h3 className="space-grotesk-title text-base sm:text-lg font-bold text-[#E0E0E0]">{lane.lane}</h3>
          {lane.icon && lane.icon.startsWith('/') ? (
            <img src={lane.icon} alt={lane.lane} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
          ) : (
            <span className="text-lg sm:text-2xl">{lane.icon}</span>
          )}
        </div>

        <div>
          <div className="text-xs font-semibold text-[#00B4D8] uppercase tracking-wide mb-1">Top Champions</div>
          <div className="flex gap-1">
            {lane.champions.map((champ: string, cIdx: number) => (
              <img
                key={cIdx}
                src={getChampionIcon(champ)}
                alt={champ}
                title={champ}
                loading="lazy"
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md object-cover bg-[#0077B6]/20 border border-white/5 hover:scale-110 cursor-pointer transition-all"
              />
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-[#A8A8A8] uppercase tracking-wide mb-1">Winrate</div>
          <div className="flex items-center gap-2">
            <div className="text-lg sm:text-xl font-bold text-[#00B4D8]">{lane.winrate}%</div>
            <div className="flex-1 h-2 bg-[#0B132B] rounded-full overflow-hidden">
              <div className="h-full bg-[#00B4D8]" style={{ width: `${lane.winrate}%` }} />
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-[#A8A8A8] uppercase tracking-wide mb-1">Agressividade</div>
          <div className="flex items-center gap-2">
            <div className="sora-text text-xs sm:text-sm font-bold text-[#fc5353]">{lane.firstBloodInvolvement}%</div>
            <div className="flex-1 h-2 bg-[#0B132B] rounded-full overflow-hidden">
              <div className="h-full bg-[#fc5353]" style={{ width: `${lane.firstBloodInvolvement}%` }} />
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-[#A8A8A8] uppercase tracking-wide mb-1">Build Ideal</div>
          <div className="flex gap-1">
            {lane.bestBuild.map((itemId: number, bIdx: number) => (
              <img
                key={bIdx}
                src={getItemIcon(itemId)}
                alt={`item-${itemId}`}
                title={`#${itemId}`}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md object-contain bg-[#0B132B]/20 border border-white/10"
              />
            ))}
          </div>
        </div>

        <div className="pt-2 sm:pt-3 border-t border-white/10">
          <div className="text-xs font-semibold text-[#A8A8A8] uppercase tracking-wide mb-1">Média de Farm</div>
          <div className="text-base sm:text-lg font-bold text-[#00B4D8]">{lane.avgCS} CS</div>
          <p className="text-xs text-[#A8A8A8] italic">por 30 min</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(LaneCardInner);
