import { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import PropTypes from 'prop-types'
import { cn } from '../../utils/cn'
import { useScrolled } from '../../hooks/useScrolled'
import { useReducedMotion } from '../../hooks/useReducedMotion'
const NAV_ITEMS = [
  { label: 'Accueil', href: '/#accueil' },
  { label: 'À propos', href: '/#a-propos' },
  { label: 'Compétences', href: '/#competences' },
  { label: 'Projets', href: '/#projets' },
  { label: 'Parcours', href: '/#parcours' },
  { label: 'Certifications', href: '/#certifications' },
]

function NavItem({ href, label, onClick }) {
  const { pathname } = useLocation()
  const isActive = pathname === '/' && href.startsWith('/#')

  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'text-sm font-medium transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-sm',
        isActive ? 'text-brand-600' : 'text-neutral-600 hover:text-brand-600'
      )}
    >
      {label}
    </a>
  )
}

NavItem.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

const drawerVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit: { x: '100%', opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = useScrolled()
  const prefersReduced = useReducedMotion()
  const { pathname } = useLocation()
  const menuButtonRef = useRef(null)

  // Fermeture via Esc
  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [mobileOpen])

  // Fermeture au changement de route
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Bloquer le scroll body quand le drawer est ouvert
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const closeMenu = () => {
    setMobileOpen(false)
    menuButtonRef.current?.focus()
  }

  const motionProps = prefersReduced
    ? {}
    : { variants: drawerVariants, initial: 'hidden', animate: 'visible', exit: 'exit' }

  const backdropProps = prefersReduced
    ? {}
    : { variants: backdropVariants, initial: 'hidden', animate: 'visible', exit: 'exit' }

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          scrolled
            ? 'bg-neutral-0/95 backdrop-blur-md border-b border-neutral-200 shadow-soft'
            : 'bg-transparent'
        )}
      >
        <nav
          className="container-main flex items-center justify-between h-16"
          aria-label="Navigation principale"
        >
          {/* Logo */}
          <NavLink
            to="/"
            className="text-lg font-bold text-neutral-900 hover:text-brand-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-sm"
            aria-label="Portfolio Lucas Marie-Anne — retour à l'accueil"
          >
            LM<span className="text-brand-500">.</span>
          </NavLink>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavItem href={item.href} label={item.label} />
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="/#contact"
            className={cn(
              'hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
              'bg-brand-500 text-white hover:bg-brand-600 shadow-soft hover:shadow-card',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'
            )}
          >
            Contact
          </a>

          {/* Mobile burger */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className={cn(
              'md:hidden p-2 rounded-md transition-colors',
              'text-neutral-700 hover:bg-neutral-100',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'
            )}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              {...backdropProps}
              className="fixed inset-0 z-40 bg-neutral-900/40 backdrop-blur-sm md:hidden"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navigation"
              {...motionProps}
              className="fixed top-0 right-0 z-50 h-full w-72 bg-neutral-0 shadow-pop md:hidden flex flex-col"
            >
              {/* En-tête drawer */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-neutral-100">
                <span className="text-lg font-bold text-neutral-900">
                  LM<span className="text-brand-500">.</span>
                </span>
                <button
                  type="button"
                  onClick={closeMenu}
                  className={cn(
                    'p-2 rounded-md text-neutral-700 hover:bg-neutral-100 transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500'
                  )}
                  aria-label="Fermer le menu"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Liens */}
              <nav className="flex flex-col gap-1 p-4 flex-1" aria-label="Menu mobile">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                      'text-neutral-700 hover:bg-brand-50 hover:text-brand-700',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* CTA */}
              <div className="p-4 border-t border-neutral-100">
                <a
                  href="/#contact"
                  onClick={closeMenu}
                  className={cn(
                    'flex items-center justify-center w-full px-4 py-2.5 rounded-lg',
                    'bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'
                  )}
                >
                  Me contacter
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
