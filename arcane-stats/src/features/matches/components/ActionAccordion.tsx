import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { ActionStep } from '../analysisTypes'

const PRIORITY: Record<ActionStep['priority'], { badge: string; label: string }> = {
  alta: { badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30', label: 'Alta' },
  média: { badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30', label: 'Média' },
  baixa: { badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', label: 'Baixa' },
}

type Props = { steps: ActionStep[] }

export default function ActionAccordion({ steps }: Props) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="space-y-2">
      {steps.map((step, i) => {
        const isOpen = open === i
        const ps = PRIORITY[step.priority]
        return (
          <div key={i} className="bg-card-glass rounded-xl border border-border overflow-hidden">
            <button
              className="w-full flex items-center gap-4 px-5 py-4 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs flex items-center justify-center font-bold">
                {i + 1}
              </span>
              <span className="flex-1 min-w-0 text-sm font-semibold text-foreground leading-snug">
                {step.title}
              </span>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`hidden sm:inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${ps.badge}`}>
                  {ps.label}
                </span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              </div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 border-t border-border">
                    <p className="pt-3 text-sm text-muted-foreground leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
