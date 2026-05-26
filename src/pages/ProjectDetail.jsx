import PropTypes from 'prop-types'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { m } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react'
import { getProjectBySlug, getAdjacentProjects } from '../data/projects'
import { useReducedMotion } from '../hooks/useReducedMotion'
import Seo from '../components/seo/Seo'
import Tag from '../components/ui/Tag'
import { GithubIcon } from '../components/ui/icons'
import { cn } from '../utils/cn'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

function Section({ title, children, className }) {
  return (
    <section className={cn('mb-12', className)}>
      <h2 className="text-xl font-bold text-neutral-900 mb-4 pb-3 border-b border-neutral-100">
        {title}
      </h2>
      {children}
    </section>
  )
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const prefersReduced = useReducedMotion()
  const project = getProjectBySlug(slug)
  const { prev, next } = project ? getAdjacentProjects(slug) : { prev: null, next: null }

  useEffect(() => {
    if (!project) navigate('/404', { replace: true })
  }, [project, navigate])

  if (!project) return null

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    applicationCategory: 'WebApplication',
    dateCreated: project.year,
    creator: {
      '@type': 'Person',
      name: 'Lucas Marie-Anne',
      url: 'https://www.lucasmarieanne.dev',
    },
    ...(project.links.demo && { url: project.links.demo }),
    ...(project.links.github && { codeRepository: project.links.github }),
  }

  return (
    <article aria-labelledby="project-detail-title">
      <Seo
        title={project.title}
        description={`${project.tagline} — ${project.description.slice(0, 120)}`}
        canonical={`/projets/${project.slug}`}
        type="article"
        jsonLd={projectJsonLd}
      />
      {/* Hero projet */}
      <header
        className="relative py-16 lg:py-24 overflow-hidden"
        style={{ backgroundColor: `${project.color}0A` }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: `radial-gradient(ellipse 60% 80% at 80% 50%, ${project.color}18 0%, transparent 70%)`,
          }}
        />
        <div className="container-main relative z-10">
          {/* Retour */}
          <Link
            to="/#projets"
            className={cn(
              'inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-brand-600 transition-colors mb-8',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-sm'
            )}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Retour aux projets
          </Link>

          <m.div
            initial={prefersReduced ? false : 'hidden'}
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {/* Stack */}
            <m.div variants={fadeUp} className="flex flex-wrap gap-2 mb-5">
              {project.stack.map((tech) => (
                <Tag key={tech} className="text-xs">
                  {tech}
                </Tag>
              ))}
            </m.div>

            {/* Titre */}
            <m.h1
              id="project-detail-title"
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 leading-tight"
            >
              {project.title}
            </m.h1>

            <m.p variants={fadeUp} className="text-lg text-neutral-500 mb-8 max-w-2xl">
              {project.tagline}
            </m.p>

            {/* Liens */}
            <m.div variants={fadeUp} className="flex flex-wrap gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Code source sur GitHub"
                  className={cn(
                    'inline-flex items-center gap-2 h-10 px-5 rounded-lg text-sm font-semibold',
                    'bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-soft',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'
                  )}
                >
                  <GithubIcon className="w-4 h-4" />
                  Code source
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Voir la démo live"
                  className={cn(
                    'inline-flex items-center gap-2 h-10 px-5 rounded-lg text-sm font-semibold',
                    'text-white transition-colors shadow-soft',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'
                  )}
                  style={{ backgroundColor: project.color }}
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  Voir la démo
                </a>
              )}
            </m.div>
          </m.div>
        </div>
      </header>

      {/* Contenu détail */}
      <div className="container-main py-14 max-w-4xl">
        {/* Screenshot projet */}
        <div className="rounded-2xl overflow-hidden shadow-pop mb-14 aspect-[16/9] bg-neutral-100">
          <img
            src={project.image}
            alt={project.imageAlt}
            width={1200}
            height={675}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Problématique */}
        <Section title="🔍 Problématique">
          <p className="text-base text-neutral-600 leading-relaxed">{project.problem}</p>
        </Section>

        {/* Solution */}
        <Section title="💡 Solution technique">
          <p className="text-base text-neutral-600 leading-relaxed">{project.solution}</p>
        </Section>

        {/* Résultats */}
        <Section title="📈 Résultats">
          <ul className="space-y-3" aria-label="Résultats du projet">
            {project.results.map((result) => (
              <li key={result} className="flex items-start gap-3">
                <CheckCircle2
                  className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-base text-neutral-700">{result}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Stack complète */}
        <Section title="⚙️ Stack technique">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </Section>
      </div>

      {/* Navigation projet suivant / précédent */}
      {(prev || next) && (
        <nav
          aria-label="Navigation entre projets"
          className="border-t border-neutral-200 bg-neutral-50"
        >
          <div className="container-main py-10 grid grid-cols-2 gap-6">
            {prev ? (
              <Link
                to={`/projets/${prev.slug}`}
                className={cn(
                  'group flex flex-col gap-1 p-4 rounded-xl border border-neutral-200 hover:border-brand-200 hover:shadow-card transition-all duration-200 bg-neutral-0',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'
                )}
              >
                <span className="flex items-center gap-1 text-xs font-medium text-neutral-400 group-hover:text-brand-500 transition-colors">
                  <ArrowLeft className="w-3 h-3" aria-hidden="true" />
                  Projet précédent
                </span>
                <span className="text-sm font-semibold text-neutral-800 line-clamp-2">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                to={`/projets/${next.slug}`}
                className={cn(
                  'group flex flex-col gap-1 p-4 rounded-xl border border-neutral-200 hover:border-brand-200 hover:shadow-card transition-all duration-200 bg-neutral-0 text-right',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'
                )}
              >
                <span className="flex items-center justify-end gap-1 text-xs font-medium text-neutral-400 group-hover:text-brand-500 transition-colors">
                  Projet suivant
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-neutral-800 line-clamp-2">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      )}
    </article>
  )
}
