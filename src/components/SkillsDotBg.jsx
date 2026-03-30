import { useEffect, useRef } from 'react'

const SPACING = 28

export default function SkillsDotBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx    = canvas.getContext('2d')
    const mouse  = { x: -9999, y: -9999 }
    let raf

    const setup = () => {
      const dpr = window.devicePixelRatio || 1
      const W   = canvas.clientWidth
      const H   = canvas.clientHeight
      canvas.width  = W * dpr
      canvas.height = H * dpr
      ctx.scale(dpr, dpr)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const draw = () => {
      const W    = canvas.clientWidth
      const H    = canvas.clientHeight
      const cols = Math.ceil(W / SPACING) + 1
      const rows = Math.ceil(H / SPACING) + 1

      ctx.clearRect(0, 0, W, H)

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x  = c * SPACING
          const y  = r * SPACING
          const dx = x - mouse.x
          const dy = y - mouse.y
          const d  = Math.sqrt(dx * dx + dy * dy)
          const R  = 200
          const t  = Math.max(0, 1 - d / R)
          // Smooth gaussian-like falloff
          const influence = t * t * (3 - 2 * t)

          const alpha = 0.06 + influence * 0.6
          const size  = 1   + influence * 3.5

          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(26,25,22,${alpha})`
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
