import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Lucas Marie-Anne'
const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://www.lucasmarieanne.dev'
const DEFAULT_IMAGE = `${SITE_URL}/og/default.jpg`

export default function Seo({
  title,
  description,
  canonical = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Développeur Front-End React`
  const url = `${SITE_URL}${canonical}`
  const desc =
    description ||
    'Développeur Front-End spécialisé React. Interfaces premium, performantes et accessibles. Disponible pour missions freelance et postes CDI.'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  canonical: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.oneOf(['website', 'article']),
  jsonLd: PropTypes.object,
}
