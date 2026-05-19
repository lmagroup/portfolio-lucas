import { Link } from 'react-router-dom'

const currentYear = new Date().getFullYear()

const FOOTER_LINKS = [
  { label: 'Projets', href: '/#projets' },
  { label: 'À propos', href: '/#a-propos' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Mentions légales', href: '/mentions-legales' },
]

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
]

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="container-main py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div>
            <Link
              to="/"
              className="text-lg font-bold text-neutral-900 hover:text-brand-500 transition-colors"
              aria-label="Portfolio — retour à l'accueil"
            >
              LM<span className="text-brand-500">.</span>
            </Link>
            <p className="mt-1 text-sm text-neutral-500">Développeur Front-End</p>
          </div>

          {/* Plan du site */}
          <nav aria-label="Plan du site">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith('/') && !link.href.includes('#') ? (
                    <Link
                      to={link.href}
                      className="text-sm text-neutral-500 hover:text-brand-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-neutral-500 hover:text-brand-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Réseaux sociaux */}
          <ul className="flex gap-4" aria-label="Réseaux sociaux">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-500 hover:text-brand-600 transition-colors font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
          <p className="text-xs text-neutral-400">
            © {currentYear} Lucas Marie-Anne — Conçu et développé avec ♥
          </p>
        </div>
      </div>
    </footer>
  )
}
