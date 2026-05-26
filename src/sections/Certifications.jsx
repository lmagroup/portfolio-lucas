import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { ExternalLink, Award } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { certifications } from '../data/certifications'
import SectionHeader from '../components/ui/SectionHeader'
import Tag from '../components/ui/Tag'
import { cn } from '../utils/cn'

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

function IssuerLogo({ initials, color }) {
  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm text-white"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

IssuerLogo.propTypes = {
  initials: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

function CertificationCard({ cert, index }) {
  const prefersReduced = useReducedMotion()

  return (
    <m.article
      variants={revealVariants}
      initial={prefersReduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-6%' }}
      transition={{ delay: index * 0.07 }}
      aria-labelledby={`cert-title-${cert.id}`}
      className={cn(
        'group flex flex-col bg-neutral-0 rounded-2xl p-6 border border-neutral-200',
        'shadow-soft hover:shadow-card hover:border-brand-200 transition-all duration-200'
      )}
    >
      {/* Header : logo + date */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <IssuerLogo initials={cert.issuerInitials} color={cert.issuerColor} />
        <span className="text-xs font-mono text-neutral-400 mt-1 flex-shrink-0">{cert.date}</span>
      </div>

      {/* Titre */}
      <h3
        id={`cert-title-${cert.id}`}
        className="text-base font-bold text-neutral-900 leading-snug mb-1"
      >
        {cert.title}
      </h3>

      {/* Organisme + niveau */}
      <p className="text-sm font-semibold text-brand-600 mb-1">{cert.issuer}</p>
      <p className="text-xs text-neutral-400 mb-3">{cert.level}</p>

      {/* Description */}
      <p className="text-sm text-neutral-600 leading-relaxed mb-4 flex-1">{cert.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {cert.tags.map((tag) => (
          <Tag key={tag} className="text-xs px-2 py-0.5">
            {tag}
          </Tag>
        ))}
      </div>

      {/* Lien vérification */}
      {cert.verifyUrl ? (
        <a
          href={cert.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Vérifier la certification ${cert.title}`}
          className={cn(
            'inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700',
            'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-sm'
          )}
        >
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          Vérifier le certificat
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-xs text-neutral-300">
          <Award className="w-3.5 h-3.5" aria-hidden="true" />
          Certifié
        </span>
      )}
    </m.article>
  )
}

CertificationCard.propTypes = {
  cert: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    issuer: PropTypes.string.isRequired,
    issuerInitials: PropTypes.string.isRequired,
    issuerColor: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    verifyUrl: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
}

export default function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="py-20 lg:py-28 bg-neutral-50"
    >
      <div className="container-main">
        <SectionHeader
          eyebrow="Certifications"
          title="Formations & diplômes"
          lead="Des apprentissages structurés, validés et directement appliqués en production."
          titleAs="h2"
          id="certifications-heading"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
