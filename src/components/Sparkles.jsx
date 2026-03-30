import { useEffect, useRef, useState } from 'react'

/**
 * Sparkles — 4-pointed SVG stars that appear at random positions,
 * animate (scale + rotate + fade), and vanish.
 * Classic 21st.dev / Magic UI sparkle effect.
 */

const STAR_PATH =
  'M12 0 C12 6, 16 8, 24 12 C16 16, 12 18, 12 24 C12 18, 8 16, 0 12 C8 8, 12 6, 12 0 Z'

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

function Sparkle({ style, size, color }) {
  return (
    <svg
      className="sparkle-svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={style}
      aria-hidden
    >
      <path d={STAR_PATH} fill={color} />
    </svg>
  )
}

export default function Sparkles({ count = 14, children }) {
  const [sparks, setSparks] = useState([])
  const containerRef = useRef(null)
  const idRef = useRef(0)

  const addSpark = () => {
    const id   = idRef.current++
    const size = randomBetween(10, 22)
    const x    = randomBetween(0, 100) // %
    const y    = randomBetween(0, 100) // %
    const dur  = randomBetween(600, 1100)
    const colors = [
      'rgba(196,168,130,0.9)',
      'rgba(220,195,155,0.8)',
      'rgba(240,225,200,0.85)',
      'rgba(180,155,115,0.7)',
    ]
    const color = colors[Math.floor(Math.random() * colors.length)]

    setSparks((prev) => [...prev, { id, size, x, y, dur, color }])
    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => s.id !== id))
    }, dur + 100)
  }

  useEffect(() => {
    // Staggered initial burst
    let t = 0
    for (let i = 0; i < count; i++) {
      setTimeout(addSpark, t)
      t += randomBetween(80, 300)
    }

    // Continuous drip
    const interval = setInterval(addSpark, randomBetween(400, 700))
    return () => clearInterval(interval)
  }, []) // eslint-disable-line

  return (
    <span
      ref={containerRef}
      className="sparkles-wrap"
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {sparks.map((s) => (
        <Sparkle
          key={s.id}
          size={s.size}
          color={s.color}
          style={{
            position:   'absolute',
            top:        `${s.y}%`,
            left:       `${s.x}%`,
            transform:  'translate(-50%, -50%) scale(0) rotate(-45deg)',
            animation:  `sparkle-anim ${s.dur}ms ease-in-out forwards`,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      ))}
      {children}
    </span>
  )
}
