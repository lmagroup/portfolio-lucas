import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { MapPin, Calendar } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { timelineEntries, typeConfig } from '../data/timeline'
import SectionHeader from '../components/ui/SectionHeader'
import Tag from '../components/ui/Tag'
import { cn } from '../utils/cn'

const revealVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

function TimelineDot({ color }) {
  return (
    <div
      className="relative z-10 flex items-center justify-center w-4 h-4 rounded-full ring-4 ring-neutral-50 flex-shrink-0"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  )
}

TimelineDot.propTypes = {
  color: PropTypes.string.isRequired,
}

function TimelineCard({ entry, isEven }) {
  const prefersReduced = useReducedMotion()
  const config = typeConfig[entry.type]

  return (
    <m.div
      variants={revealVariants}
      initial={prefersReduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
      className={cn('lg:grid lg:grid-cols-2 lg:gap-8 items-center', isEven ? 'lg:text-right' : '')}
    >
      {/* Contenu carte — ordre inversé sur desktop pour les pairs */}
      <div className={cn(isEven ? 'lg:order-1' : 'lg:order-2')}>
        <article
          className={cn(
            'group relative bg-neutral-0 rounded-2xl p-6 shadow-soft border border-neutral-200',
            'hover:shadow-card hover:border-brand-200 transition-all duration-200'
          )}
          aria-label={`${entry.title} — ${entry.organization}`}
        >
          {/* Type badge */}
          <span
            className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md mb-3"
            style={{ backgroundColor: `${config.color}15`, color: config.color }}
          >
            {config.label}
          </span>

          <h3 className="text-lg font-bold text-neutral-900 leading-snug mb-1">{entry.title}</h3>
          <p className="text-sm font-semibold text-brand-600 mb-3">{entry.organization}</p>

          {/* Meta */}
          <div
            className={cn('flex flex-wrap gap-x-4 gap-y-1 mb-4', isEven ? 'lg:justify-end' : '')}
          >
            <span className="flex items-center gap-1.5 text-xs text-neutral-400">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              {entry.period}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-neutral-400">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              {entry.location}
            </span>
          </div>

          <p className="text-sm text-neutral-600 leading-relaxed mb-4">{entry.description}</p>

          {/* Highlights */}
          <div className={cn('flex flex-wrap gap-1.5', isEven ? 'lg:justify-end' : '')}>
            {entry.highlights.map((h) => (
              <Tag key={h} className="text-xs px-2 py-0.5">
                {h}
              </Tag>
            ))}
          </div>
        </article>
      </div>

      {/* Connecteur central — visible en desktop uniquement */}
      <div
        className={cn(
          'hidden lg:flex items-center',
          isEven ? 'lg:order-2 justify-start' : 'lg:order-1 justify-end'
        )}
        aria-hidden="true"
      >
        <div className={cn('flex items-center gap-0', isEven ? 'flex-row' : 'flex-row-reverse')}>
          <div className="w-8 h-px bg-brand-200" />
          <TimelineDot color={config.color} />
          <div className="w-8 h-px bg-brand-200" />
        </div>
      </div>
    </m.div>
  )
}

TimelineCard.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['formation', 'experience', 'milestone']).isRequired,
    title: PropTypes.string.isRequired,
    organization: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    highlights: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  isEven: PropTypes.bool.isRequired,
}

export default function Timeline() {
  return (
    <section
      id="parcours"
      aria-labelledby="timeline-heading"
      className="py-20 lg:py-28 bg-neutral-0"
    >
      <div className="container-main">
        <SectionHeader
          eyebrow="Parcours"
          title="Mon chemin jusqu'ici"
          lead="Formations, expériences et étapes clés qui ont forgé ma pratique du développement front-end."
          titleAs="h2"
          id="timeline-heading"
        />

        {/* Légende */}
        <div className="flex flex-wrap gap-4 mb-12" aria-label="Légende du parcours">
          {Object.entries(typeConfig).map(([key, { label, color }]) => (
            <span key={key} className="flex items-center gap-2 text-sm text-neutral-500">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
              {label}
            </span>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Ligne verticale centrale — desktop */}
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-brand-100 -translate-x-1/2"
            aria-hidden="true"
          />

          {/* Ligne verticale gauche — mobile */}
          <div
            className="lg:hidden absolute left-2 top-0 bottom-0 w-px bg-brand-100"
            aria-hidden="true"
          />

          <ol className="space-y-10 lg:space-y-6" aria-label="Entrées du parcours">
            {timelineEntries.map((entry, index) => (
              <li key={entry.id} className="relative pl-8 lg:pl-0">
                {/* Dot mobile */}
                <div
                  className="lg:hidden absolute left-0 top-6 -translate-x-1/4"
                  aria-hidden="true"
                >
                  <TimelineDot color={typeConfig[entry.type].color} />
                </div>

                <TimelineCard entry={entry} isEven={index % 2 === 0} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
