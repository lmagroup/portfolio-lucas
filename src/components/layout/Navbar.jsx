import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Accueil', href: '/#accueil' },
  { label: 'À propos', href: '/#a-propos' },
  { label: 'Compétences', href: '/#competences' },
  { label: 'Projets', href: '/#projets' },
  { label: 'Parcours', href: '/#parcours' },
  { label: 'Certifications', href: '/#certifications' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-neutral-0/80 backdrop-blur-md">
      <nav
        className="container-main flex items-center justify-between h-16"
        aria-label="Navigation principale"
      >
        <NavLink
          to="/"
          className="text-lg font-bold text-neutral-900 hover:text-brand-500 transition-colors"
          aria-label="Portfolio — retour à l'accueil"
        >
          LM<span className="text-brand-500">.</span>
        </NavLink>

        <ul className="hidden md:flex items-center gap-6" aria-label="Liens de navigation">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-neutral-600 hover:text-brand-600 transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/#contact"
          className="hidden md:inline-flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-600 transition-colors"
        >
          Contact
        </a>

        {/* Menu mobile — implémenté à l'étape 5 */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md text-neutral-700 hover:bg-neutral-100 transition-colors"
          aria-label="Ouvrir le menu"
          aria-expanded="false"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  )
}
