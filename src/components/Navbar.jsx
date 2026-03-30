import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#about',    label: 'Sobre mí'  },
  { href: '#skills',   label: 'Skills'    },
  { href: '#projects', label: 'Proyectos' },
  { href: '#contact',  label: 'Contacto'  },
]

const ease = [0.22, 1, 0.36, 1]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <motion.nav
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease }}
      >
        <div className="container navbar__inner">
          <a href="#" className="navbar__logo" onClick={close}>OLG</a>

          {/* Desktop links */}
          <ul className="navbar__links">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="navbar__link">{l.label}</a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a href="#contact" className="btn btn-primary navbar__cta">
            Hablemos
          </a>

          {/* Hamburger button — mobile only */}
          <button
            className={`nav-burger${open ? ' is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            <span /><span /><span />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
            />

            {/* Drawer panel */}
            <motion.div
              className="nav-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.38, ease }}
            >
              <div className="nav-drawer__header">
                <span className="navbar__logo">OLG</span>
                <button
                  className="nav-drawer__close"
                  onClick={close}
                  aria-label="Cerrar menú"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <nav className="nav-drawer__links">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    className="nav-drawer__link"
                    onClick={close}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, ease }}
                  >
                    <span className="nav-drawer__num">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                ))}
              </nav>

              <motion.a
                href="#contact"
                className="btn btn-primary nav-drawer__cta"
                onClick={close}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, ease }}
              >
                Hablemos
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
