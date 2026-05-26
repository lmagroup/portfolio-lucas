import { renderToStaticMarkup } from 'react-dom/server'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { HelmetProvider } from 'react-helmet-async'
import Seo from '../components/seo/Seo'

/**
 * En environnement happy-dom, window est défini donc react-helmet-async
 * s'initialise en mode client (canUseDOM = true) et écrit dans le DOM via
 * useLayoutEffect au lieu de peupler helmetContext.
 *
 * On force canUseDOM = false pour activer le mode SSR : helmetContext.helmet
 * est alors peuplé de façon synchrone pendant renderToStaticMarkup.
 */
const originalCanUseDOM = HelmetProvider.canUseDOM

beforeAll(() => {
  HelmetProvider.canUseDOM = false
})

afterAll(() => {
  HelmetProvider.canUseDOM = originalCanUseDOM
})

function renderSeo(props = {}) {
  const helmetContext = {}
  renderToStaticMarkup(
    <HelmetProvider context={helmetContext}>
      <Seo {...props} />
    </HelmetProvider>
  )
  return helmetContext.helmet
}

describe('Seo', () => {
  // ─── title ─────────────────────────────────────────────────────────────────

  it('génère un titre par défaut quand aucun title fourni', () => {
    const helmet = renderSeo()
    expect(helmet.title.toString()).toMatch(/Lucas Marie-Anne/)
  })

  it('préfixe le title fourni avec le nom du site', () => {
    const helmet = renderSeo({ title: 'ArgentBank' })
    expect(helmet.title.toString()).toContain('ArgentBank | Lucas Marie-Anne')
  })

  // ─── meta description ──────────────────────────────────────────────────────

  it('injecte la meta description par défaut', () => {
    const helmet = renderSeo()
    expect(helmet.meta.toString()).toMatch(/Développeur Front-End/)
  })

  it('injecte la meta description fournie', () => {
    const helmet = renderSeo({ description: 'Un projet React premium.' })
    expect(helmet.meta.toString()).toContain('Un projet React premium.')
  })

  // ─── canonical ─────────────────────────────────────────────────────────────

  it('injecte le lien canonical', () => {
    const helmet = renderSeo()
    expect(helmet.link.toString()).toContain('canonical')
  })

  it('injecte le canonical avec le chemin fourni', () => {
    const helmet = renderSeo({ canonical: '/projets/argentbank' })
    expect(helmet.link.toString()).toContain('/projets/argentbank')
  })

  // ─── Open Graph ────────────────────────────────────────────────────────────

  it('injecte og:type "website" par défaut', () => {
    const helmet = renderSeo()
    const metaStr = helmet.meta.toString()
    expect(metaStr).toContain('og:type')
    expect(metaStr).toContain('website')
  })

  it('injecte og:type "article" quand fourni', () => {
    const helmet = renderSeo({ type: 'article' })
    expect(helmet.meta.toString()).toContain('article')
  })

  it('injecte og:title cohérent avec le site name', () => {
    const helmet = renderSeo({ title: 'Kasa' })
    expect(helmet.meta.toString()).toContain('Kasa | Lucas Marie-Anne')
  })

  it('injecte og:description avec la valeur fournie', () => {
    const helmet = renderSeo({ description: 'Plateforme de location.' })
    expect(helmet.meta.toString()).toContain('Plateforme de location.')
  })

  it('injecte og:site_name "Lucas Marie-Anne"', () => {
    const helmet = renderSeo()
    expect(helmet.meta.toString()).toContain('Lucas Marie-Anne')
  })

  // ─── Twitter Cards ─────────────────────────────────────────────────────────

  it('injecte twitter:card en "summary_large_image"', () => {
    const helmet = renderSeo()
    expect(helmet.meta.toString()).toContain('summary_large_image')
  })

  it('twitter:title reprend le même titre que og:title', () => {
    const helmet = renderSeo({ title: 'Portfolio' })
    const metaStr = helmet.meta.toString()
    const occurrences = (metaStr.match(/Portfolio \| Lucas Marie-Anne/g) || []).length
    expect(occurrences).toBeGreaterThanOrEqual(2)
  })

  // ─── JSON-LD ────────────────────────────────────────────────────────────────

  it("n'injecte pas de balise script JSON-LD quand jsonLd est absent", () => {
    const helmet = renderSeo()
    expect(helmet.script.toString()).not.toContain('application/ld+json')
  })

  it('injecte le JSON-LD sérialisé quand jsonLd est fourni', () => {
    const jsonLd = { '@context': 'https://schema.org', '@type': 'Person', name: 'Lucas' }
    const helmet = renderSeo({ jsonLd })
    const scriptStr = helmet.script.toString()
    expect(scriptStr).toContain('application/ld+json')
    expect(scriptStr).toContain('"@type":"Person"')
    expect(scriptStr).toContain('"name":"Lucas"')
  })
})
