import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

type TerminalMockupProps = {
  lines: string[]
  className?: string
}

export default function TerminalMockup({ lines, className = "" }: TerminalMockupProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  // Typewriter: avança um caractere por tick
  useEffect(() => {
    if (!isInView) return
    if (currentLine >= lines.length) return

    const line = lines[currentLine]

    if (currentChar < line.length) {
      const timer = setTimeout(() => setCurrentChar((c) => c + 1), 60)
      return () => clearTimeout(timer)
    }

    // Linha completa — pausa antes de ir para a próxima
    const timer = setTimeout(() => {
      setCurrentLine((l) => l + 1)
      setCurrentChar(0)
    }, 260)
    return () => clearTimeout(timer)
  }, [isInView, currentLine, currentChar, lines])

  // Cursor piscante
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 530)
    return () => clearInterval(blink)
  }, [])

  function lineColor(line: string) {
    if (line.startsWith("→")) return "text-foreground font-semibold"
    if (line.startsWith(">")) return "text-primary"
    return "text-muted-foreground"
  }

  return (
    <div
      ref={ref}
      className={`rounded-2xl border border-border/60 bg-background/70 p-6 font-mono text-sm backdrop-blur-sm ${className}`}
    >
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
      </div>
      <div className="space-y-1.5">
        {lines.map((line, i) => {
          if (i > currentLine) return null
          const text = i < currentLine ? line : line.slice(0, currentChar)
          const isActive = i === currentLine
          return (
            <p key={i} className={lineColor(line)}>
              {text}
              {isActive && (
                <span className={`ml-0.5 ${showCursor ? "opacity-100" : "opacity-0"}`}>▋</span>
              )}
            </p>
          )
        })}
        {currentLine >= lines.length && (
          <p className="text-primary">
            <span className={showCursor ? "opacity-100" : "opacity-0"}>▋</span>
          </p>
        )}
      </div>
    </div>
  )
}
