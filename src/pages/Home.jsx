import { lazy, Suspense } from 'react'
import Seo from '../components/seo/Seo'
import Hero from '../sections/Hero'

// Sections below-the-fold : chargées en différé pour ne pas bloquer le premier paint.
// Le navigateur les télécharge immédiatement mais ne bloque pas le rendu du Hero.
const About = lazy(() => import('../sections/About'))
const Skills = lazy(() => import('../sections/Skills'))
const Projects = lazy(() => import('../sections/Projects'))
const Timeline = lazy(() => import('../sections/Timeline'))
const Certifications = lazy(() => import('../sections/Certifications'))
const Contact = lazy(() => import('../sections/Contact'))

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Lucas Marie-Anne',
  jobTitle: 'Développeur Front-End',
  url: 'https://www.lucasmarieanne.dev',
  email: 'business.lucasmarieanne@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Paris',
    addressCountry: 'FR',
  },
  sameAs: ['https://github.com', 'https://linkedin.com'],
  knowsAbout: ['React', 'TypeScript', 'TailwindCSS', 'Accessibilité web', 'JavaScript', 'Node.js'],
}

// Fallback invisible : la section occupe sa hauteur minimum pour éviter les sauts de layout
function SectionFallback() {
  return <div className="min-h-[200px]" aria-hidden="true" />
}

export default function Home() {
  return (
    <>
      <Seo
        description="Développeur Front-End React basé à Paris. Spécialisé en interfaces premium, performantes et accessibles WCAG AA. Disponible pour missions freelance et postes CDI."
        canonical="/"
        jsonLd={personJsonLd}
      />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Timeline />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Certifications />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
    </>
  )
}
