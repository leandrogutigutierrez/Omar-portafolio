import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -100, my = -100
    let rx = -100, ry = -100
    let rafId = null

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const tick = () => {
      rx = lerp(rx, mx, 0.1)
      ry = lerp(ry, my, 0.1)
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`
      rafId = requestAnimationFrame(tick)
    }

    const addHover = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          dot.classList.add('hovering')
          ring.classList.add('hovering')
        })
        el.addEventListener('mouseleave', () => {
          dot.classList.remove('hovering')
          ring.classList.remove('hovering')
        })
      })
    }

    document.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(tick)

    // Refresh hover listeners after short delay (DOM painted)
    const t = setTimeout(addHover, 500)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      clearTimeout(t)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
