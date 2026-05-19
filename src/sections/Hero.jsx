import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import HeroIllustration from '../assets/HeroIllustration'
import Badge from '../components/ui/Badge'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const illustrationVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
}

export default function Hero() {
  const prefersReduced = useReducedMotion()

  const animate = prefersReduced ? 'visible' : undefined

  return (
    <section
      id="accueil"
      aria-label="Présentation"
      className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-neutral-0"
    >
      {/* Grille de fond subtile */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Gradient radial doux */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 60% 50%, rgba(46,148,97,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container-main relative z-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Colonne texte */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={animate ?? 'visible'}
            className="order-2 lg:order-1"
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="mb-5">
              <Badge variant="brand" className="text-sm px-3 py-1">
                Disponible pour de nouvelles opportunités
              </Badge>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-[1.05] tracking-tight mb-6"
            >
              Lucas Marie-Anne
              <span className="block mt-2 text-brand-500">— Développeur</span>
              <span className="block text-neutral-700 text-3xl sm:text-4xl lg:text-5xl mt-1 font-semibold">
                Front-End
              </span>
            </motion.h1>

            {/* Accroche */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-neutral-500 leading-relaxed mb-8 max-w-lg"
            >
              Je conçois des interfaces{' '}
              <strong className="text-neutral-700 font-semibold">premium</strong>,{' '}
              <strong className="text-neutral-700 font-semibold">performantes</strong> et{' '}
              <strong className="text-neutral-700 font-semibold">accessibles</strong> — du prototype
              au déploiement.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-10">
              <a
                href="/#projets"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-brand-500 text-white font-semibold text-base hover:bg-brand-600 transition-all duration-200 shadow-soft hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                Voir mes projets
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-neutral-0 text-neutral-800 font-semibold text-base border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 transition-all duration-200 shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                Me contacter
              </a>
            </motion.div>

            {/* Stats / preuves sociales */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6 pt-8 border-t border-neutral-100"
            >
              {[
                { value: '2+', label: "ans d'expérience" },
                { value: '100', label: 'score Lighthouse' },
                { value: 'WCAG AA', label: 'accessibilité' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-neutral-900">{value}</p>
                  <p className="text-sm text-neutral-500 mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Colonne illustration */}
          <motion.div
            variants={illustrationVariants}
            initial="hidden"
            animate={animate ?? 'visible'}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-sm lg:max-w-md">
              {/* Halo décoratif */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-20 bg-brand-400 scale-75"
                aria-hidden="true"
              />
              <HeroIllustration className="relative w-full h-auto drop-shadow-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
