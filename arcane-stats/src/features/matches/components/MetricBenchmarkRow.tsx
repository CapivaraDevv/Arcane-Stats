import { motion } from 'framer-motion'
import type { MetricBenchmark } from '../analysisTypes'

type Props = {
  metric: MetricBenchmark
  delay?: number
}

function barColor(dev: number) {
  if (dev >= 0) return 'from-emerald-500 to-emerald-400'
  if (dev >= -15) return 'from-amber-500 to-amber-400'
  return 'from-rose-600 to-rose-500'
}

function textColor(dev: number) {
  if (dev >= 0) return 'text-emerald-400'
  if (dev >= -15) return 'text-amber-400'
  return 'text-rose-400'
}

export default function MetricBenchmarkRow({ metric, delay = 0 }: Props) {
  const barPct = Math.min((metric.value / metric.benchmark) * 100, 100)
  const sign = metric.deviation >= 0 ? '+' : ''

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-1.5"
    >
      <div className="flex items-center justify-between text-sm">
        <span className="text-foreground font-medium">{metric.name}</span>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground tabular-nums">
            {metric.value.toFixed(2)} {metric.unit}
          </span>
          <span className={`font-bold tabular-nums text-xs w-14 text-right ${textColor(metric.deviation)}`}>
            {sign}{metric.deviation}%
          </span>
        </div>
      </div>
      <div className="relative h-2 w-full rounded-full bg-white/5 overflow-hidden">
        <div
          className="absolute top-0 right-0 h-full w-px bg-white/25 z-10"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${barPct}%` }}
          transition={{ delay: delay + 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full bg-linear-to-r ${barColor(metric.deviation)}`}
        />
      </div>
      <p className="text-[10px] text-muted-foreground text-right">
        benchmark: {metric.benchmark.toFixed(metric.benchmark % 1 === 0 ? 0 : 2)} {metric.unit}
      </p>
    </motion.div>
  )
}
