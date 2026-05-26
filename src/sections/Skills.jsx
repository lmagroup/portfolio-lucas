import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { skillCategories, softSkills } from '../data/skills'
import SectionHeader from '../components/ui/SectionHeader'
import { cn } from '../utils/cn'

const levelConfig = {
  Maîtrisé: {
    label: 'Maîtrisé',
    className: 'bg-brand-100 text-brand-700 border-brand-200',
  },
  Confirmé: {
    label: 'Confirmé',
    className: 'bg-neutral-100 text-neutral-700 border-neutral-200',
  },
  'En apprentissage': {
    label: 'En apprentissage',
    className: 'bg-accent-500/10 text-accent-500 border-accent-500/20',
  },
}

const revealVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

function SkillBadge({ skill }) {
  const config = levelConfig[skill.level] ?? levelConfig['Confirmé']

  return (
    <li className="flex items-center justify-between gap-3 py-2.5 border-b border-neutral-100 last:border-0 group/skill">
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Dot couleur techno */}
        <span
          className="flex-shrink-0 w-2.5 h-2.5 rounded-full ring-2 ring-offset-1 ring-transparent group-hover/skill:ring-current transition-all duration-200"
          style={{ backgroundColor: skill.color, color: skill.color }}
          aria-hidden="true"
        />
        <span className="text-sm font-medium text-neutral-800 truncate">{skill.name}</span>
      </div>
      <span
        className={cn(
          'flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border',
          config.className
        )}
      >
        {config.label}
      </span>
    </li>
  )
}

SkillBadge.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string.isRequired,
    level: PropTypes.oneOf(['Maîtrisé', 'Confirmé', 'En apprentissage']).isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
}

function CategoryCard({ category, index }) {
  const prefersReduced = useReducedMotion()

  return (
    <m.article
      variants={revealVariants}
      initial={prefersReduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
      transition={{ delay: index * 0.08 }}
      aria-labelledby={`cat-title-${category.id}`}
      className="bg-neutral-0 rounded-xl border border-neutral-200 shadow-card p-6 hover:shadow-pop hover:border-brand-200 hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-center gap-3 mb-5">
        <span
          className="w-10 h-10 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center text-lg"
          aria-hidden="true"
        >
          {category.icon}
        </span>
        <h3 id={`cat-title-${category.id}`} className="text-base font-bold text-neutral-900">
          {category.title}
        </h3>
      </div>

      <ul aria-label={`Compétences ${category.title}`}>
        {category.skills.map((skill) => (
          <SkillBadge key={skill.name} skill={skill} />
        ))}
      </ul>
    </m.article>
  )
}

CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        level: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
}

function SoftSkillItem({ item }) {
  return (
    <li className="flex gap-3 items-start">
      <span
        className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-400 mt-2"
        aria-hidden="true"
      />
      <div>
        <span className="text-sm font-semibold text-neutral-800">{item.label}</span>
        <span className="text-sm text-neutral-500"> — {item.description}</span>
      </div>
    </li>
  )
}

SoftSkillItem.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
}

export default function Skills() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="competences"
      aria-labelledby="skills-heading"
      className="py-20 lg:py-28 bg-neutral-0"
    >
      <div className="container-main">
        <SectionHeader
          eyebrow="Compétences"
          title="Ma boîte à outils"
          lead="Des technos choisies pour leur pertinence, pas pour leur popularité."
          titleAs="h2"
          id="skills-heading"
        />

        {/* Légende des niveaux */}
        <div className="flex flex-wrap gap-3 mb-10" aria-label="Légende des niveaux">
          {Object.values(levelConfig).map((config) => (
            <span
              key={config.label}
              className={cn(
                'text-xs font-medium px-2.5 py-1 rounded-full border',
                config.className
              )}
            >
              {config.label}
            </span>
          ))}
        </div>

        {/* Grille de catégories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* Soft skills */}
        <m.div
          variants={revealVariants}
          initial={prefersReduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-8%' }}
          className="bg-brand-50 border border-brand-100 rounded-xl p-6 lg:p-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <span
              className="w-10 h-10 rounded-lg bg-brand-100 border border-brand-200 flex items-center justify-center text-lg"
              aria-hidden="true"
            >
              🤝
            </span>
            <h3 className="text-base font-bold text-neutral-900">Soft skills</h3>
          </div>
          <ul
            className="grid sm:grid-cols-2 gap-x-8 gap-y-3"
            aria-label="Compétences comportementales"
          >
            {softSkills.map((item) => (
              <SoftSkillItem key={item.label} item={item} />
            ))}
          </ul>
        </m.div>
      </div>
    </section>
  )
}
