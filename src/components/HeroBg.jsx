import { useEffect, useRef } from 'react'

const SPACING = 64  // grid cell size in px

export default function HeroBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const mouse = { x: -9999, y: -9999 }
    let raf
    let cols, rows, pts

    const setup = () => {
      const W = canvas.clientWidth
      const H = canvas.clientHeight
      const dpr = window.devicePixelRatio || 1
      canvas.width  = W * dpr
      canvas.height = H * dpr
      ctx.scale(dpr, dpr)
      cols = Math.ceil(W / SPACING) + 2
      rows = Math.ceil(H / SPACING) + 2
      pts  = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = (c - 0.5) * SPACING
          const oy = (r - 0.5) * SPACING
          pts.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0 })
        }
      }
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const draw = () => {
      const W = canvas.clientWidth
      const H = canvas.clientHeight
      ctx.clearRect(0, 0, W, H)

      // ── physics ──────────────────────────────────
      for (const p of pts) {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d  = Math.sqrt(dx * dx + dy * dy) || 1
        const R  = 180
        if (d < R) {
          const f = (1 - d / R) * 4.5
          p.vx += (dx / d) * f
          p.vy += (dy / d) * f
        }
        p.vx += (p.ox - p.x) * 0.045
        p.vy += (p.oy - p.y) * 0.045
        p.vx *= 0.82
        p.vy *= 0.82
        p.x  += p.vx
        p.y  += p.vy
      }

      // ── draw grid lines ───────────────────────────
      ctx.lineCap = 'round'
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p  = pts[r * cols + c]
          const disp = Math.sqrt((p.x - p.ox) ** 2 + (p.y - p.oy) ** 2)
          const glow = Math.min(disp / 25, 1)

          // Right neighbour
          if (c + 1 < cols) {
            const pr = pts[r * cols + (c + 1)]
            const alpha = 0.07 + glow * 0.25
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(pr.x, pr.y)
            ctx.strokeStyle = `rgba(196,168,130,${alpha})`
            ctx.lineWidth   = 0.6 + glow * 0.6
            ctx.stroke()
          }
          // Bottom neighbour
          if (r + 1 < rows) {
            const pb = pts[(r + 1) * cols + c]
            const alpha = 0.07 + glow * 0.25
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(pb.x, pb.y)
            ctx.strokeStyle = `rgba(196,168,130,${alpha})`
            ctx.lineWidth   = 0.6 + glow * 0.6
            ctx.stroke()
          }

          // Node dot
          ctx.beginPath()
          ctx.arc(p.x, p.y, 1.5 + glow * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(196,168,130,${0.18 + glow * 0.7})`
          ctx.fill()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('resize', setup)
    setup()
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', setup)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
