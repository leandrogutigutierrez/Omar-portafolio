import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const links = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    label: 'WhatsApp', value: '+57 333 240 4326',
    href: 'https://wa.me/573332404326',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m2 7 10 7 10-7"/>
      </svg>
    ),
    label: 'Email', value: 'gutiller50@gmail.com',
    href: 'mailto:gutiller50@gmail.com',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
    label: 'Instagram', value: '@leandro_gutierrezzz',
    href: 'https://instagram.com/leandro_gutierrezzz',
  },
]

/**
 * Animated SVG beams — 21st.dev / Aceternity "Background Beams" style.
 * Diagonal lines from top to bottom with flowing stroke-dashoffset.
 */
function BeamsSvg() {
  // Generate a set of diagonal beam paths
  const beams = [
    { x1: '10%',  y1: '0%', x2: '60%',  y2: '100%', dur: '4s',   delay: '0s'   },
    { x1: '25%',  y1: '0%', x2: '75%',  y2: '100%', dur: '5s',   delay: '0.8s' },
    { x1: '40%',  y1: '0%', x2: '90%',  y2: '100%', dur: '3.5s', delay: '0.3s' },
    { x1: '55%',  y1: '0%', x2: '105%', y2: '100%', dur: '6s',   delay: '1.2s' },
    { x1: '0%',   y1: '20%', x2: '50%', y2: '100%', dur: '4.5s', delay: '0.6s' },
    { x1: '-5%',  y1: '0%', x2: '45%',  y2: '100%', dur: '5.5s', delay: '1.8s' },
    { x1: '70%',  y1: '0%', x2: '120%', y2: '100%', dur: '4.2s', delay: '0.4s' },
    { x1: '85%',  y1: '0%', x2: '135%', y2: '100%', dur: '3.8s', delay: '1s'   },
  ]

  return (
    <svg className="beams-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="beam-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="rgba(196,168,130,0)"   />
          <stop offset="40%"  stopColor="rgba(196,168,130,0.6)" />
          <stop offset="60%"  stopColor="rgba(232,217,196,0.5)" />
          <stop offset="100%" stopColor="rgba(196,168,130,0)"   />
        </linearGradient>
        <linearGradient id="beam-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0)"   />
          <stop offset="50%"  stopColor="rgba(255,255,255,0.18)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"   />
        </linearGradient>
      </defs>

      {beams.map((b, i) => (
        <line
          key={i}
          x1={b.x1} y1={b.y1}
          x2={b.x2} y2={b.y2}
          stroke={i % 2 === 0 ? 'url(#beam-grad-1)' : 'url(#beam-grad-2)'}
          strokeWidth="0.3"
          strokeLinecap="round"
          strokeDasharray="12 40"
          strokeDashoffset="0"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-52"
            dur={b.dur}
            begin={b.delay}
            repeatCount="indefinite"
          />
        </line>
      ))}
    </svg>
  )
}

export default function Contact() {
  const ref    = useRef(null)
  const orbRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    let mx = 400, my = 300, cx = 400, cy = 300, raf
    const onMove = (e) => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      mx = e.clientX - rect.left
      my = e.clientY - rect.top
    }
    const tick = () => {
      cx += (mx - cx) * 0.055
      cy += (my - cy) * 0.055
      if (orbRef.current)
        orbRef.current.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove) }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data    = new FormData(e.target)
    const name    = data.get('name')
    const email   = data.get('email')
    const message = data.get('message')
    const subject = encodeURIComponent(`Contacto desde portafolio — ${name}`)
    const body    = encodeURIComponent(`Hola Omar,\n\nMe llamo ${name} (${email}).\n\n${message}`)
    window.location.href = `mailto:gutiller50@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <>
      <section id="contact" className="contact" ref={ref}>
        {/* SVG animated beams */}
        <BeamsSvg />

        {/* Static atmospheric circles */}
        <div className="contact__bg" aria-hidden>
          <div className="contact__bg-circle contact__bg-circle--1" />
          <div className="contact__bg-circle contact__bg-circle--2" />
        </div>

        {/* Cursor-following warm orb */}
        <div ref={orbRef} className="contact-orb" aria-hidden />

        <div className="container contact__inner">
          {/* Left */}
          <motion.div
            className="contact__left"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease }}
          >
            <span className="label">Contacto</span>
            <h2>
              Hablemos de tu <em>próximo proyecto</em>
            </h2>
            <p>
              Estoy disponible para proyectos freelance, colaboraciones y oportunidades
              de trabajo. No dudes en escribirme — respondo rápido.
            </p>

            <div className="contact__links">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="contact__link"
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease }}
                >
                  <span className="contact__link-icon">{l.icon}</span>
                  <div>
                    <div style={{ fontSize: '11px', opacity: 0.45, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>
                      {l.label}
                    </div>
                    {l.value}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.15, ease }}
          >
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input id="name" name="name" type="text" placeholder="Tu nombre completo" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="tu@email.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea id="message" name="message" rows={6} placeholder="Cuéntame sobre tu proyecto..." required />
            </div>
            <button type="submit" className="form-submit">
              Enviar mensaje →
            </button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer__inner">
          <span className="footer__copy">© 2025 Omar Leandro Gutiérrez Corral · Cali, Colombia</span>
          <span className="footer__logo">OLG</span>
          <a href="#hero" className="footer__back">Volver arriba ↑</a>
        </div>
      </footer>
    </>
  )
}
