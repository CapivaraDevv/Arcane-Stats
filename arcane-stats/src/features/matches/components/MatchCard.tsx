import { motion } from 'framer-motion';
import { useAssets } from '../../../hooks/useAssets';
import { useImageFallback } from '../../../shared/hooks/useImageFallback';
import type { Partida } from '../types';

type MatchCardProps = {
  partida: Partida;
  onSelect: (p: Partida) => void;
};

export default function MatchCard({ partida, onSelect }: MatchCardProps) {
  const { imageErrors, markImageError } = useImageFallback();
  const { getChampionIcon, getItemIcon } = useAssets();

  return (
    <motion.div
      layoutId={`match-${partida.id}`}
      onClick={() => onSelect(partida)}
      whileHover={{ scale: 1.02 }}
      className={`bg-card-glass p-6 rounded-xl border shadow-lg cursor-pointer ${
        partida.resultado === 'Vitória'
          ? 'border-[#4CAF50]/30 hover:border-[#4CAF50]/50'
          : 'border-[#F44336]/30 hover:border-[#F44336]/50'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`relative w-16 h-16 rounded-lg overflow-hidden ${
              partida.resultado === 'Vitória'
                ? 'ring-2 ring-[#4CAF50]/50'
                : 'ring-2 ring-[#F44336]/50'
            }`}
          >
            {imageErrors.has(partida.campeao) ? (
              <div
                className={`w-full h-full flex items-center justify-center text-2xl font-bold ${
                  partida.resultado === 'Vitória'
                    ? 'bg-[#4CAF50]/20 text-[#4CAF50]'
                    : 'bg-[#F44336]/20 text-[#F44336]'
                }`}
              >
                {partida.resultado === 'Vitória' ? '✓' : '✗'}
              </div>
            ) : (
              <img
                src={getChampionIcon(partida.campeao)}
                alt={partida.campeao}
                className="w-full h-full object-cover"
                onError={() => markImageError(partida.campeao)}
              />
            )}
            <div
              className={`absolute inset-0 ${
                partida.resultado === 'Vitória' ? 'bg-[#4CAF50]/10' : 'bg-[#F44336]/10'
              }`}
            />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-display text-lg font-semibold text-foreground">
                {partida.campeao} - {partida.role}
              </h3>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  partida.resultado === 'Vitória'
                    ? 'bg-[#4CAF50]/20 text-[#4CAF50]'
                    : 'bg-[#F44336]/20 text-[#F44336]'
                }`}
              >
                {partida.resultado}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              {partida.modo} • {partida.data} • {partida.duracao}
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 text-center">
            Build in-game
          </div>
          <div className="flex gap-1">
            {partida.build.map((itemId, bIdx) => (
              <img
                key={bIdx}
                src={getItemIcon(itemId)}
                alt={`item-${itemId}`}
                title={`#${itemId}`}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md object-contain bg-background/20 border border-white/10 hover:scale-110 transition-all"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">KDA</div>
            <div className="text-sm font-semibold text-foreground">{partida.kda}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Gold</div>
            <div className="text-sm font-semibold text-[#F4A261]">
              {partida.gold.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Dano</div>
            <div className="text-sm font-semibold text-foreground">
              {partida.dano.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Visão</div>
            <div className="text-sm font-semibold text-primary">{partida.visao}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
