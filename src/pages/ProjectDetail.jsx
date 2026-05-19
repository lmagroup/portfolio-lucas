import { useParams, Link } from 'react-router-dom'

export default function ProjectDetail() {
  const { slug } = useParams()

  return (
    <div className="container-main py-24">
      <Link
        to="/#projets"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-600 transition-colors mb-8"
      >
        ← Retour aux projets
      </Link>
      <h1 className="text-4xl font-bold text-neutral-900 mb-4">Projet : {slug}</h1>
      <p className="text-lg text-neutral-500">
        Le contenu de cette page sera complété à l&apos;étape 9.
      </p>
    </div>
  )
}
