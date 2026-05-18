import { lazy, Suspense } from "react"
import DarkVeil from "../../../components/DarkVeilBackground"
import { ChartSpline } from "lucide-react"

const AnalyzePage = lazy(() => import('../../matches/pages/AnalyzePage'))

export default function DashboardPage() {
  return (
    <div className="relative overflow-hidden m-auto flex-1 flex-col gap-8 bg-transparent min-h-screen">
      <DarkVeil />

      <header className="sticky top-0 mb-6 border-b border-[hsl(var(--border)/0.6)] bg-[hsl(var(--background)/0.7)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.1)] text-primary shadow-glow">
                <ChartSpline className="h-5 w-5" />
              </div>
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-glow-pulse rounded-full bg-primary-glow" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-xs text-muted-foreground">Análise avançada de performance</p>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10">
        <Suspense fallback={<div className="h-64 rounded-2xl bg-white/5 animate-pulse m-6" />}>
          <AnalyzePage embedded />
        </Suspense>
      </div>
    </div>
  )
}
