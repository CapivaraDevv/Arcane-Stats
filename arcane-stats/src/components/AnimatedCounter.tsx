import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const AnimatedCounter = ({
  to,
  from = 0,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const value = useMotionValue(from);
  const display = useTransform(value, (v) =>
    `${prefix}${v.toFixed(decimals)}${suffix}`,
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, duration, decimals, prefix, suffix, value]);

  return (
    <span ref={ref} className={className}>
      {`${prefix}${from.toFixed(decimals)}${suffix}`}
    </span>
  );
};

export default AnimatedCounter;