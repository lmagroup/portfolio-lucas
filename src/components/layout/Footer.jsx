import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'
import { GithubIcon, LinkedinIcon } from '../ui/icons'

const currentYear = new Date().getFullYear()

const NAV_SECTIONS = [
  {
    title: 'Navigation',
    links: [
      { label: 'Accueil', href: '/#accueil' },
      { label: 'À propos', href: '/#a-propos' },
      { label: 'Compétences', href: '/#competences' },
      { label: 'Projets', href: '/#projets' },
      { label: 'Parcours', href: '/#parcours' },
    ],
  },
  {
    title: 'Plus',
    links: [
      { label: 'Certifications', href: '/#certifications' },
      { label: 'Contact', href: '/#contact' },
      { label: 'Mentions légales', href: '/mentions-legales', internal: true },
    ],
  },
]

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    Icon: GithubIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    Icon: LinkedinIcon,
  },
]

const linkClass = cn(
  'text-sm text-neutral-500 hover:text-brand-600 transition-colors',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-sm'
)

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50" aria-label="Pied de page">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Colonne marque */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-block text-lg font-bold text-neutral-900 hover:text-brand-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-sm"
              aria-label="Portfolio Lucas Marie-Anne — retour à l'accueil"
            >
              LM<span className="text-brand-500">.</span>
            </Link>
            <p className="mt-2 text-sm text-neutral-500 max-w-xs leading-relaxed">
              Développeur Front-End passionné par les interfaces premium, performantes et
              accessibles.
            </p>

            {/* Réseaux sociaux */}
            <ul className="flex gap-3 mt-5" aria-label="Réseaux sociaux">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={cn(
                      'flex items-center justify-center w-9 h-9 rounded-lg',
                      'bg-neutral-200 text-neutral-600 hover:bg-brand-500 hover:text-white',
                      'transition-all duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonnes nav */}
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="text-xs font-semibold text-neutral-900 uppercase tracking-widest mb-4">
                {section.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {link.internal ? (
                      <Link to={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className={linkClass}>
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Barre basse */}
        <div className="mt-10 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-400">
            © {currentYear} Lucas Marie-Anne. Tous droits réservés.
          </p>
          <p className="text-xs text-neutral-400">
            Conçu et développé avec{' '}
            <span aria-label="amour" role="img">
              ♥
            </span>{' '}
            — React · Vite · TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  )
}
