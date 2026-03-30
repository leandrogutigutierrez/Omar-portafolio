import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

import mc1 from '../assets/mediaconnect1.png'
import mc2 from '../assets/mediaconnect2.png'
import qp1 from '../assets/quiron1.png'
import qp2 from '../assets/quiron2.png'
import nf1 from '../assets/nanofimed1.png'
import nf2 from '../assets/nanofimed2.png'
import cb1 from '../assets/chatbox1.png'
import cb2 from '../assets/chatbox2.png'

const ease = [0.22, 1, 0.36, 1]

const projects = [
  {
    name: 'MediaConnet',
    desc: 'Plataforma digital que conecta a estudiantes de Producción Transmedia con empresas que buscan talento creativo. Diseño de marca, UI/UX y desarrollo front-end completo.',
    tags: ['React', 'UI/UX', 'Diseño'],
    img1: mc1, img2: mc2,
    url:  'https://mediaconnet.vercel.app/',
    accent: '#4ade80',
  },
  {
    name: 'Quiron Pharma F&O',
    desc: 'Sitio web corporativo para distribuidor autorizado de insumos quirúrgicos en Colombia. Identidad visual, catálogo de productos y arquitectura de información.',
    tags: ['Web', 'Corporativo', 'Diseño'],
    img1: qp1, img2: qp2,
    url:  'https://www.quironpharmafyo.com/',
    accent: '#60a5fa',
  },
  {
    name: 'Nanofimed Laboratorio',
    desc: 'Presencia digital para laboratorio colombiano especializado en desinfección clínica con nanotecnología. Diseño web, copy y arquitectura de contenidos.',
    tags: ['Web', 'Laboratorio', 'Branding'],
    img1: nf1, img2: nf2,
    url:  'https://nanofimed.com/',
    accent: '#f87171',
  },
  {
    name: 'Dental Care Pro',
    desc: 'Landing page con chatbot inteligente integrado para clínica dental. Diseño moderno, experiencia de usuario fluida y atención automatizada 24/7.',
    tags: ['React', 'Chatbot', 'Salud'],
    img1: cb1, img2: cb2,
    url:  'https://chatbot-dental-demo.vercel.app/',
    accent: '#a78bfa',
  },
]

/**
 * Moving border card — CSS @property conic-gradient spinning border.
 * Inspired by Aceternity UI / 21st.dev moving border component.
 */
function ProjectCard({ project, index, inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="proj-outer"
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.13, ease }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Rotating gradient border — only visible on hover */}
      <div
        className="proj-border-spin"
        style={{
          '--accent': project.accent,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Card body */}
      <div className="project-card">
        <div className="project-card__images">
          <img src={project.img1} alt={project.name}               className="project-card__img project-card__img-1" />
          <img src={project.img2} alt={`${project.name} vista 2`}  className="project-card__img project-card__img-2" />

          {/* SVG shimmer sweep on hover */}
          <div className={`proj-shimmer${hovered ? ' active' : ''}`} />

          <div className="project-card__overlay">
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-card__visit">
              Visitar sitio
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 12L12 2M12 2H6M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="project-card__body">
          <div className="project-card__tags">
            {project.tags.map((t) => (
              <span key={t} className="project-card__tag">{t}</span>
            ))}
          </div>
          <h3 className="project-card__name">{project.name}</h3>
          <p className="project-card__desc">{project.desc}</p>
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-card__link">
            Ver proyecto en vivo
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H6M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref     = useRef(null)
  const glowRef = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    let mx = 400, my = 300, cx = 400, cy = 300, raf
    const onMove = (e) => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      mx = e.clientX - rect.left
      my = e.clientY - rect.top
    }
    const tick = () => {
      cx += (mx - cx) * 0.07
      cy += (my - cy) * 0.07
      if (glowRef.current)
        glowRef.current.style.transform = `translate(${cx - 300}px, ${cy - 300}px)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove) }
  }, [])

  return (
    <section id="projects" className="projects" ref={ref}>
      {/* SVG grid pattern background */}
      <svg className="projects-grid-bg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="proj-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(26,25,22,0.045)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#proj-grid)" />
      </svg>

      {/* Cursor warm glow */}
      <div ref={glowRef} className="projects-glow" aria-hidden />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="projects__header">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease }}
          >
            <span className="label">Trabajos</span>
            <h2>Proyectos seleccionados</h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease }}
          >
            Una selección de proyectos reales, desplegados y en producción.
          </motion.p>
        </div>

        <div className="projects__grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
