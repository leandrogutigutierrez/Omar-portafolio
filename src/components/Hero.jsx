import { motion } from 'framer-motion'
import omarPhoto from '../assets/omar.jpg'
import HeroBg    from './HeroBg'
import AuroraBg  from './AuroraBg'
import Sparkles  from './Sparkles'

const ease = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 32 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.85, delay, ease },
})
const fadeIn = (delay = 0) => ({
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  transition: { duration: 0.85, delay, ease },
})

export default function Hero() {
  return (
    <section id="hero" className="hero">
      {/* Layer 1 — aurora blobs (deepest) */}
      <AuroraBg />

      {/* Layer 2 — interactive canvas grid mesh */}
      <HeroBg />

      {/* Layer 3 — soft radial vignette to keep text readable */}
      <div className="hero-vignette" aria-hidden />

      <div className="container hero__inner">
        {/* ── Left: text ── */}
        <div className="hero__text">
          <motion.span className="label" {...fadeUp(0.1)}>
            Portafolio 2025
          </motion.span>

          {/* Shimmer gradient name */}
          <div className="hero__name">
            <motion.h1 {...fadeUp(0.2)}>
              <Sparkles count={10}>
                <span className="hero-shimmer-text">Omar</span>
              </Sparkles>
            </motion.h1>
            <motion.h1 className="italic" {...fadeUp(0.3)}>Leandro</motion.h1>
          </div>

          <motion.div className="hero__role" {...fadeUp(0.4)}>
            <span>Tecnólogo en</span>
            <span className="dot" />
            <em>Producción Transmedia</em>
          </motion.div>

          <motion.p className="hero__bio" {...fadeUp(0.5)}>
            Diseñador visual y desarrollador creativo con base en Cali, Colombia.
            Construyo experiencias digitales que fusionan identidad de marca,
            narración audiovisual y tecnología web.
          </motion.p>

          <motion.div className="hero__actions" {...fadeUp(0.6)}>
            <a href="#projects" className="btn btn-primary hero-btn-glow">
              Ver proyectos
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contact" className="btn btn-outline">Contactar</a>
          </motion.div>

          <motion.div className="hero__socials" {...fadeUp(0.7)}>
            <a href="https://instagram.com/leandro_gutierrezzz" target="_blank" rel="noopener noreferrer" className="hero__social">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
              @leandro_gutierrezzz
            </a>
            <a href="mailto:gutiller50@gmail.com" className="hero__social">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m2 7 10 7 10-7"/>
              </svg>
              Email
            </a>
            <a href="https://wa.me/573332404326" target="_blank" rel="noopener noreferrer" className="hero__social">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </motion.div>
        </div>

        {/* ── Right: photo ── */}
        <div className="hero__visual">
          <motion.div
            className="hero__photo-wrap"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            transition={{ duration: 1.1, delay: 0.25, ease }}
          >
            {/* Spinning SVG border — 21st.dev moving border style */}
            <svg className="photo-svg-ring" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="396" height="496" rx="22"
                stroke="url(#photo-ring-grad)"
                strokeWidth="2"
                strokeDasharray="18 8"
              />
              <defs>
                <linearGradient id="photo-ring-grad" x1="0" y1="0" x2="400" y2="500" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor="#c4a882" stopOpacity="0" />
                  <stop offset="40%"  stopColor="#c4a882" stopOpacity="1" />
                  <stop offset="60%"  stopColor="#e8d9c4" stopOpacity="1" />
                  <stop offset="100%" stopColor="#c4a882" stopOpacity="0" />
                  <animateTransform
                    attributeName="gradientTransform"
                    type="rotate"
                    from="0 200 250"
                    to="360 200 250"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </linearGradient>
              </defs>
            </svg>

            <img src={omarPhoto} alt="Omar Leandro Gutiérrez Corral" className="hero__photo" />
            <div className="hero__photo-frame" aria-hidden />
          </motion.div>

          <motion.div className="hero__card hero__card--1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 1.0, ease }}>
            <span className="hero__card-num">4</span>
            <span className="hero__card-label">Proyectos<br/>completados</span>
          </motion.div>
          <motion.div className="hero__card hero__card--2" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 1.15, ease }}>
            <div className="hero__card-icon">📍</div>
            <span className="hero__card-label">Cali, Colombia</span>
          </motion.div>
          <motion.div className="hero__card hero__card--3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 1.3, ease }}>
            <div className="hero__card-icon">✦</div>
            <span className="hero__card-label">Diseño &<br/>Desarrollo</span>
          </motion.div>
        </div>
      </div>

      <motion.div className="hero__scroll" {...fadeIn(1.5)}>
        <div className="hero__scroll-line" />
        <span>Scroll</span>
      </motion.div>
    </section>
  )
}
