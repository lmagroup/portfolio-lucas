import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
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
    <motion.article
      variants={revealVariants}
      initial={prefersReduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      aria-labelledby={`act-title-${act.id}`}
      className="grid md:grid-cols-[1fr_2fr] gap-6 md:gap-10 items-start group"
    >
      {/* Numéro + icône — côté gauche ou droit selon parité */}
      <div
        className={`flex items-center gap-4 md:flex-col md:items-center md:text-center ${isEven ? '' : 'md:order-2'}`}
      >
        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-2xl shadow-soft group-hover:bg-brand-100 transition-colors duration-200">
          <span aria-hidden="true">{act.icon}</span>
        </div>
        <div className="hidden md:flex flex-col items-center">
          <div className="w-px h-8 bg-brand-100 mt-2" aria-hidden="true" />
          <span className="text-xs font-mono text-neutral-400 mt-2 tabular-nums">0{index + 1}</span>
        </div>
      </div>

      {/* Contenu */}
      <div className={isEven ? '' : 'md:order-1'}>
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
      </div>
    </motion.article>
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
          {/* Ligne verticale décorative */}
          <div
            className="absolute left-7 md:left-1/2 top-0 bottom-0 w-px bg-brand-100 -translate-x-1/2 hidden sm:block"
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
