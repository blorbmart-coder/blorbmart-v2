import { useMemo } from 'react'

/** A small deterministic PRNG so the same seed always draws the same art. */
function prng(seed: number) {
  let s = seed >>> 0 || 1
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296
}

export function hashString(str: string) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619)
  return h >>> 0
}

/**
 * Decorative QR-style art: random modules plus the three finder squares, so
 * it reads as a QR code at a glance. It encodes nothing and is not scannable.
 */
export function QrCode({ seed, className }: { seed: number; className?: string }) {
  const d = useMemo(() => {
    const n = 21
    const rnd = prng(seed)
    const m = Array.from({ length: n }, () => Array.from({ length: n }, () => rnd() > 0.5))
    const finder = (r0: number, c0: number) => {
      for (let r = -1; r <= 7; r++)
        for (let c = -1; c <= 7; c++) {
          const rr = r0 + r
          const cc = c0 + c
          if (rr < 0 || cc < 0 || rr >= n || cc >= n) continue
          const edge = r === -1 || c === -1 || r === 7 || c === 7
          const ring = r === 0 || c === 0 || r === 6 || c === 6
          const core = r >= 2 && r <= 4 && c >= 2 && c <= 4
          m[rr][cc] = !edge && (ring || core)
        }
    }
    finder(0, 0)
    finder(0, n - 7)
    finder(n - 7, 0)
    let path = ''
    m.forEach((row, r) => row.forEach((on, c) => on && (path += `M${c} ${r}h1v1h-1z`)))
    return path
  }, [seed])

  return (
    <svg viewBox="0 0 21 21" className={className} shapeRendering="crispEdges" aria-hidden="true">
      <path d={d} fill="currentColor" />
    </svg>
  )
}

/** Decorative barcode for the team badges. */
export function Barcode({ seed, className }: { seed: number; className?: string }) {
  const bars = useMemo(() => {
    const rnd = prng(seed)
    const out: { x: number; w: number }[] = []
    let x = 0
    while (x < 96) {
      const w = 1 + Math.floor(rnd() * 3)
      out.push({ x, w })
      x += w + 1 + Math.floor(rnd() * 2)
    }
    return out
  }, [seed])

  return (
    <svg viewBox="0 0 100 24" preserveAspectRatio="none" className={className} aria-hidden="true">
      {bars.map((b) => (
        <rect key={b.x} x={b.x} y={0} width={b.w} height={24} fill="currentColor" />
      ))}
    </svg>
  )
}
