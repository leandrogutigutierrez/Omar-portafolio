import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import omarPhoto from '../assets/omar.jpg'

const ease = [0.22, 1, 0.36, 1]

const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09 } },
}
const item = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

const tools = [
  'VS Code', 'CapCut', 'Illustrator', 'Photoshop',
  'Premiere', 'After Effects',
]

const stats = [
  { num: '22',   label: 'Años'         },
  { num: '4+',   label: 'Proyectos'    },
  { num: '3+',   label: 'Años de exp.' },
]

export default function About() {
  const ref      = useRef(null)
  const glow1Ref = useRef(null)
  const glow2Ref = useRef(null)
  const inView   = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    let mx = 200, my = 200
    let c1x = 200, c1y = 200
    let c2x = 600, c2y = 400
    let raf

    const onMove = (e) => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      mx = e.clientX - rect.left
      my = e.clientY - rect.top
    }
    const tick = () => {
      c1x += (mx - c1x) * 0.06
      c1y += (my - c1y) * 0.06
      c2x += (mx * 0.3 + 400 - c2x) * 0.03
      c2y += (my * 0.3 + 200 - c2y) * 0.03
      if (glow1Ref.current)
        glow1Ref.current.style.transform = `translate(${c1x - 250}px, ${c1y - 250}px)`
      if (glow2Ref.current)
        glow2Ref.current.style.transform = `translate(${c2x - 200}px, ${c2y - 200}px)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove) }
  }, [])

  return (
    <section id="about" className="about" ref={ref}>
      <div ref={glow1Ref} className="about-glow about-glow--primary"   aria-hidden />
      <div ref={glow2Ref} className="about-glow about-glow--secondary" aria-hidden />
      <div className="about-watermark" aria-hidden>Transmedia</div>

      {/* ─────────────────── DESKTOP layout ─────────────────── */}
      <div className="container about__inner about__inner--desktop" style={{ position: 'relative', zIndex: 1 }}>

        {/* Photo column */}
        <motion.div
          className="about-photo-col"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease }}
        >
          <div className="about-photo-wrap">
            <img src={omarPhoto} alt="Omar Leandro Gutiérrez Corral" className="about-photo-blob" />
            <div className="about-photo-ring" aria-hidden />
            <div className="about-badge about-badge--1">
              <span className="about-badge__num">22</span>
              <span className="about-badge__label">años</span>
            </div>
            <div className="about-badge about-badge--2">
              <span className="about-badge__num">4+</span>
              <span className="about-badge__label">proyectos</span>
            </div>
            <div className="about-badge about-badge--3">
              <span className="about-badge__num">3+</span>
              <span className="about-badge__label">años exp.</span>
            </div>
          </div>
        </motion.div>

        {/* Text column */}
        <motion.div
          className="about__text"
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span className="label" variants={item}>Sobre mí</motion.span>
          <motion.h2 variants={item}>Creativo con <em>propósito</em></motion.h2>
          <motion.p variants={item}>
            Soy Omar Leandro Gutiérrez Corral, tecnólogo en Producción Transmedia
            con sede en Cali, Colombia. Me especializo en crear experiencias visuales
            que van desde el diseño gráfico y la edición audiovisual hasta el
            desarrollo de sitios web y aplicaciones digitales.
          </motion.p>
          <motion.p variants={item}>
            Mi enfoque es siempre el mismo: entender la identidad de cada marca y
            traducirla en piezas que comuniquen con precisión, estética y emoción.
            Cada proyecto es una oportunidad de unir tecnología y creatividad.
          </motion.p>
          <motion.div className="about__tools" variants={item}>
            {tools.map((t) => <span key={t} className="about__tool">{t}</span>)}
          </motion.div>
        </motion.div>
      </div>

      {/* ─────────────────── MOBILE layout ──────────────────── */}
      <div className="container about__mobile" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header row: small photo + name/label */}
        <motion.div
          className="about-mobile-top"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <div className="about-mobile-avatar">
            <img src={omarPhoto} alt="Omar Leandro Gutiérrez" />
          </div>
          <div className="about-mobile-id">
            <span className="label" style={{ marginBottom: 4 }}>Sobre mí</span>
            <span className="about-mobile-name">Omar Leandro<br/>Gutiérrez</span>
          </div>
        </motion.div>

        {/* Stat pills */}
        <motion.div
          className="about-mobile-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          {stats.map((s) => (
            <div key={s.label} className="about-mobile-stat">
              <span className="about-mobile-stat__num">{s.num}</span>
              <span className="about-mobile-stat__label">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Bio text */}
        <motion.div
          className="about-mobile-bio"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18, ease }}
        >
          <h2>Creativo con <em>propósito</em></h2>
          <p>
            Tecnólogo en Producción Transmedia con sede en Cali, Colombia.
            Me especializo en crear experiencias visuales: diseño gráfico,
            edición audiovisual y desarrollo web.
          </p>
          <p>
            Mi meta es traducir cada marca en piezas que comuniquen con
            precisión, estética y emoción.
          </p>
        </motion.div>

        {/* Tool chips */}
        <motion.div
          className="about__tools"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.26, ease }}
        >
          {tools.map((t) => <span key={t} className="about__tool">{t}</span>)}
        </motion.div>
      </div>
    </section>
  )
}
