import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import SkillsDotBg from './SkillsDotBg'

const ease = [0.22, 1, 0.36, 1]

const skills = [
  { icon: '⌨️', name: 'VS Code',        level: 'Avanzado',   pct: 90 },
  { icon: '🎬', name: 'CapCut',          level: 'Avanzado',   pct: 92 },
  { icon: '🖊️', name: 'Illustrator',     level: 'Avanzado',   pct: 88 },
  { icon: '🖼️', name: 'Photoshop',       level: 'Avanzado',   pct: 88 },
  { icon: '🎞️', name: 'Adobe Premiere',  level: 'Intermedio', pct: 72 },
  { icon: '✨', name: 'After Effects',   level: 'Intermedio', pct: 68 },
]

// Detect touch device once at module level
const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

function SkillRow({ skill, index, inView }) {
  const [active, setActive] = useState(false)

  // On touch devices: auto-reveal bar when section is in view
  useEffect(() => {
    if (!isTouch || !inView) return
    const t = setTimeout(() => setActive(true), 300 + index * 120)
    return () => clearTimeout(t)
  }, [inView, index])

  return (
    <motion.div
      className="skill-row"
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.09, ease }}
      onMouseEnter={() => !isTouch && setActive(true)}
      onMouseLeave={() => !isTouch && setActive(false)}
    >
      {/* Icon */}
      <motion.span
        className="skill-row__icon"
        animate={{ scale: active ? 1.2 : 1, rotate: active ? -8 : 0 }}
        transition={{ duration: 0.3, ease }}
      >
        {skill.icon}
      </motion.span>

      {/* Name */}
      <span className="skill-row__name">{skill.name}</span>

      {/* Bar track */}
      <div className="skill-row__track">
        <motion.div
          className="skill-row__fill"
          animate={{ scaleX: active ? skill.pct / 100 : 0.02 }}
          transition={{
            duration: active ? 0.85 : 0.45,
            ease:     active ? ease : [0.37, 0, 0.63, 1],
          }}
          style={{ transformOrigin: 'left' }}
        />
      </div>

      {/* Percentage */}
      <motion.span
        className="skill-row__pct"
        animate={{ opacity: active ? 1 : 0.3, y: active ? 0 : 4 }}
        transition={{ duration: 0.3 }}
      >
        {skill.pct}%
      </motion.span>

      {/* Level label — hidden on mobile via CSS */}
      <span className="skill-row__level">{skill.level}</span>
    </motion.div>
  )
}

export default function Skills() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="skills" ref={ref}>
      <SkillsDotBg />

      <div className="container skills__inner">
        <div className="skills__header">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease }}
          >
            <span className="label">Herramientas</span>
            <h2>Lo que domino</h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease }}
          >
            {isTouch
              ? 'Las barras se revelan automáticamente.'
              : 'Pasa el cursor sobre cada herramienta para revelar el nivel.'}
          </motion.p>
        </div>

        {!isTouch && (
          <motion.p
            className="skills__hint"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.4, ease }}
          >
            ↗ hover para ver
          </motion.p>
        )}

        <div className="skills__rows">
          {skills.map((s, i) => (
            <SkillRow key={s.name} skill={s} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}