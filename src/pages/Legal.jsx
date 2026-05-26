import Seo from '../components/seo/Seo'

export default function Legal() {
  return (
    <>
      <Seo
        title="Mentions légales"
        description="Mentions légales et politique de confidentialité du portfolio de Lucas Marie-Anne, développeur Front-End React."
        canonical="/mentions-legales"
      />
      <div className="container-main py-24 max-w-3xl">
        <h1 className="text-4xl font-bold text-neutral-900 mb-8">Mentions légales</h1>
        <p className="text-neutral-500">
          Le contenu des mentions légales sera complété à l&apos;étape 18 (polish final).
        </p>
      </div>
    </>
  )
}
