import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { projects } from '../data/projects'
import SectionHeader from '../components/ui/SectionHeader'
import Tag from '../components/ui/Tag'
import { GithubIcon } from '../components/ui/icons'
import { cn } from '../utils/cn'

const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

function ProjectCard({ project, index }) {
  const prefersReduced = useReducedMotion()
  const isEven = index % 2 === 0

  return (
    <motion.article
      variants={revealVariants}
      initial={prefersReduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
      transition={{ delay: index * 0.1 }}
      aria-labelledby={`project-title-${project.id}`}
      className={cn(
        'group grid lg:grid-cols-2 gap-8 lg:gap-12 items-center',
        !isEven && 'lg:direction-rtl'
      )}
    >
      {/* Visuel placeholder */}
      <div
        className={cn(
          'relative rounded-2xl overflow-hidden aspect-[16/10] shadow-pop',
          !isEven && 'lg:order-2'
        )}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: `${project.color}12` }}
          aria-hidden="true"
        >
          {/* Mockup simplifié */}
          <div className="w-4/5 bg-neutral-0 rounded-xl shadow-card p-4">
            <div className="flex gap-1.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="space-y-2">
              <div
                className="h-3 rounded"
                style={{ backgroundColor: `${project.color}30`, width: '75%' }}
              />
              <div className="h-3 rounded bg-neutral-100 w-full" />
              <div className="h-3 rounded bg-neutral-100 w-5/6" />
              <div
                className="h-3 rounded"
                style={{ backgroundColor: `${project.color}20`, width: '60%' }}
              />
            </div>
          </div>
        </div>

        {/* Badge année */}
        <span className="absolute top-3 left-3 text-xs font-mono font-medium px-2 py-1 rounded-md bg-neutral-900/70 text-neutral-100 backdrop-blur-sm">
          {project.year}
        </span>

        {/* Overlay hover */}
        <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/10 transition-colors duration-300 rounded-2xl" />
      </div>

      {/* Contenu */}
      <div className={cn(!isEven && 'lg:order-1')}>
        {/* Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.slice(0, 4).map((tech) => (
            <Tag key={tech} className="text-xs px-2 py-0.5">
              {tech}
            </Tag>
          ))}
          {project.stack.length > 4 && (
            <Tag className="text-xs px-2 py-0.5 text-neutral-400">+{project.stack.length - 4}</Tag>
          )}
        </div>

        <h3
          id={`project-title-${project.id}`}
          className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2 leading-tight"
        >
          {project.title}
        </h3>
        <p className="text-sm text-brand-600 font-medium mb-4">{project.tagline}</p>
        <p className="text-base text-neutral-600 leading-relaxed mb-6">{project.description}</p>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={`/projets/${project.slug}`}
            className={cn(
              'inline-flex items-center gap-2 h-10 px-5 rounded-lg text-sm font-semibold',
              'text-white transition-all duration-200 shadow-soft hover:shadow-card',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'
            )}
            style={{ backgroundColor: project.color }}
            aria-label={`Voir le projet ${project.title}`}
          >
            Voir le projet
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>

          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Code source de ${project.title} sur GitHub`}
              className={cn(
                'inline-flex items-center gap-2 h-10 px-4 rounded-lg text-sm font-medium',
                'text-neutral-600 border border-neutral-200 bg-neutral-0 hover:bg-neutral-100',
                'transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'
              )}
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
            </a>
          )}

          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Démo live de ${project.title}`}
              className={cn(
                'inline-flex items-center gap-2 h-10 px-4 rounded-lg text-sm font-medium',
                'text-neutral-600 border border-neutral-200 bg-neutral-0 hover:bg-neutral-100',
                'transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'
              )}
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    stack: PropTypes.arrayOf(PropTypes.string).isRequired,
    links: PropTypes.shape({
      github: PropTypes.string,
      demo: PropTypes.string,
    }).isRequired,
    color: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
}

export default function Projects() {
  return (
    <section
      id="projets"
      aria-labelledby="projects-heading"
      className="py-20 lg:py-28 bg-neutral-50"
    >
      <div className="container-main">
        <SectionHeader
          eyebrow="Projets"
          title="Ce que j'ai construit"
          lead="Des applications réelles, pour de vrais utilisateurs, avec des résultats mesurables."
          titleAs="h2"
          id="projects-heading"
        />

        <div className="flex flex-col gap-20 lg:gap-28">
          {projects
            .filter((p) => p.featured)
            .map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </div>
      </div>
    </section>
  )
}
