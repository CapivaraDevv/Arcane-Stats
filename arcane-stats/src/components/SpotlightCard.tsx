import { useRef, useState, useCallback } from "react";
import type { ReactNode, MouseEvent } from "react";
import { cn } from "../lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

/** Card with a soft cursor-tracking glow + subtle 3D tilt. */
const SpotlightCard = ({
  children,
  className,
  glowColor = "hsl(var(--primary) / 0.18)",
}: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  const handleMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      setPos({
        x: ((clientX - rect.left) / rect.width) * 100,
        y: ((clientY - rect.top) / rect.height) * 100,
      });
      rafId.current = null;
    });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card-glass transition-colors duration-300 hover:border-[hsl(var(--primary)/0.4)]",
        className,
      )}
      style={{
        backgroundImage: active
          ? `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, ${glowColor}, transparent 55%)`
          : undefined,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(220px circle at ${pos.x}% ${pos.y}%, hsl(var(--primary-glow) / 0.10), transparent 60%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default SpotlightCard;