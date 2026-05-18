import { useState, useEffect } from "react"

const DarkVeilBackground = () => {
  const [mp, setMp] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMp({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    })
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-hero">
      <div className="absolute inset-0 bg-hex opacity-40" />
      <div className="absolute inset-0 bg-scanlines" />

      <div
        className="absolute top-45 left-22 h-20 w-120 rounded-full bg-primary/20 blur-2xl animate-orb-1"
        style={{ translate: `${mp.x * 40}px ${mp.y * 20}px` }}
      />
      <div
        className="absolute top-45 left-22 h-120 w-20 rounded-full bg-primary/20 blur-2xl animate-orb-1"
        style={{ translate: `${mp.x * 40}px ${mp.y * 20}px` }}
      />
      <div
        className="absolute top-1/3 -right-40 h-160 w-160 rounded-full bg-[hsl(var(--primary)/0.12)] blur-3xl animate-orb-2"
        style={{ translate: `${mp.x * -40}px ${mp.y * -30}px` }}
      />
      {/* <div
        className="absolute bottom-0 left-1/3 h-120 w-100 rounded-full bg-[hsl(var(--primary-glow)/0.15)] blur-3xl animate-orb-3"
        style={{ translate: `${mp.x * 10}px ${mp.y * 8}px` }}
      /> */}

      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
    </div>
  )
}

export default DarkVeilBackground
