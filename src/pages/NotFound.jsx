import { Link } from 'react-router-dom'
import Seo from '../components/seo/Seo'

export default function NotFound() {
  return (
    <>
      <Seo title="Page introuvable" description="La page demandée n'existe pas." />
      <div className="container-main py-24 text-center">
        <p className="text-sm font-mono text-brand-600 mb-4 tracking-widest uppercase">404</p>
        <h1 className="text-5xl font-bold text-neutral-900 mb-4">Page introuvable</h1>
        <p className="text-lg text-neutral-500 mb-8 max-w-md mx-auto">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-600 transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </>
  )
}
