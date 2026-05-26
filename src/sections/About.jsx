import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { aboutActs } from '../data/about'
import SectionHeader from '../components/ui/SectionHeader'

const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

function ActCard({ act, index }) {
  const prefersReduced = useReducedMotion()
  const isEven = index % 2 === 0

  return (
    <m.article
      variants={revealVariants}
      initial={prefersReduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      aria-labelledby={`act-title-${act.id}`}
      className="group"
    >
      {/* ── Mobile : empilement vertical simple ── */}
      <div className="flex items-start gap-4 md:hidden">
        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-xl shadow-soft">
          <span aria-hidden="true">{act.icon}</span>
        </div>
        <div>
          <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-1">
            {act.eyebrow}
          </p>
          <h3
            id={`act-title-${act.id}`}
            className="text-xl font-bold text-neutral-900 mb-2 leading-snug"
          >
            {act.title}
          </h3>
          <p className="text-base text-neutral-600 leading-relaxed">{act.body}</p>
        </div>
      </div>

      {/* ── Desktop : 3 colonnes [contenu | icône | contenu] ── */}
      <div className="hidden md:grid md:grid-cols-[1fr_80px_1fr] md:gap-x-6 items-center">
        {/* Colonne gauche — contenu pour les impairs, vide pour les pairs */}
        <div className={isEven ? '' : 'text-right pr-2'}>
          {!isEven && (
            <>
              <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-2">
                {act.eyebrow}
              </p>
              <h3
                id={`act-title-${act.id}`}
                className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 leading-snug"
              >
                {act.title}
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">{act.body}</p>
            </>
          )}
        </div>

        {/* Colonne centrale — icône toujours centrée sur la ligne */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-2xl shadow-soft group-hover:bg-brand-100 transition-colors duration-200 z-10 relative">
            <span aria-hidden="true">{act.icon}</span>
          </div>
          <span className="text-xs font-mono text-neutral-400 tabular-nums">0{index + 1}</span>
        </div>

        {/* Colonne droite — contenu pour les pairs, vide pour les impairs */}
        <div className={isEven ? 'pl-2' : ''}>
          {isEven && (
            <>
              <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-2">
                {act.eyebrow}
              </p>
              <h3
                id={`act-title-${act.id}`}
                className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 leading-snug"
              >
                {act.title}
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">{act.body}</p>
            </>
          )}
        </div>
      </div>
    </m.article>
  )
}

ActCard.propTypes = {
  act: PropTypes.shape({
    id: PropTypes.string.isRequired,
    eyebrow: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
}

export default function About() {
  return (
    <section id="a-propos" aria-labelledby="about-heading" className="py-20 lg:py-28 bg-neutral-50">
      <div className="container-main">
        <SectionHeader
          eyebrow="À propos"
          title="Un développeur, une histoire"
          lead="Six angles pour me comprendre — qui je suis, d'où je viens et où je vais."
          titleAs="h2"
          id="about-heading"
        />

        {/* Timeline verticale */}
        <div className="relative">
          {/* Ligne verticale — centrée sur la colonne icône (1fr + 40px = calc(50% + 0px)) */}
          <div
            className="absolute top-0 bottom-0 w-px bg-brand-100 hidden md:block"
            style={{ left: 'calc(50%)' }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-12 md:gap-16">
            {aboutActs.map((act, index) => (
              <ActCard key={act.id} act={act} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
