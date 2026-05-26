import Seo from '../components/seo/Seo'

export default function Legal() {
  return (
    <>
      <Seo
        title="Mentions légales"
        description="Mentions légales et politique de confidentialité du portfolio de Lucas Marie-Anne, développeur Front-End React."
        canonical="/mentions-legales"
      />
      <main className="container-main py-24 max-w-3xl" id="main-content">
        <h1 className="text-4xl font-bold text-neutral-900 mb-12">Mentions légales</h1>

        {/* Éditeur */}
        <section className="mb-10" aria-labelledby="editeur">
          <h2 id="editeur" className="text-xl font-semibold text-neutral-900 mb-4">
            Éditeur du site
          </h2>
          <p className="text-neutral-600 leading-relaxed">Le présent site est édité par :</p>
          <ul className="mt-3 space-y-1 text-neutral-600">
            <li>
              <span className="font-medium text-neutral-800">Nom :</span> Lucas Marie-Anne
            </li>
            <li>
              <span className="font-medium text-neutral-800">Statut :</span> Développeur Front-End
              indépendant
            </li>
            <li>
              <span className="font-medium text-neutral-800">Localisation :</span> Paris, France
            </li>
            <li>
              <span className="font-medium text-neutral-800">Contact :</span>{' '}
              <a
                href="mailto:business.lucasmarieanne@gmail.com"
                className="text-brand-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm"
              >
                business.lucasmarieanne@gmail.com
              </a>
            </li>
          </ul>
        </section>

        {/* Hébergement */}
        <section className="mb-10" aria-labelledby="hebergement">
          <h2 id="hebergement" className="text-xl font-semibold text-neutral-900 mb-4">
            Hébergement
          </h2>
          <p className="text-neutral-600 leading-relaxed">Ce site est hébergé par :</p>
          <ul className="mt-3 space-y-1 text-neutral-600">
            <li>
              <span className="font-medium text-neutral-800">Société :</span> Vercel Inc.
            </li>
            <li>
              <span className="font-medium text-neutral-800">Adresse :</span> 340 Pine Street, Suite
              701, San Francisco, CA 94104, États-Unis
            </li>
            <li>
              <span className="font-medium text-neutral-800">Site :</span>{' '}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm"
              >
                vercel.com
              </a>
            </li>
          </ul>
        </section>

        {/* Propriété intellectuelle */}
        <section className="mb-10" aria-labelledby="propriete">
          <h2 id="propriete" className="text-xl font-semibold text-neutral-900 mb-4">
            Propriété intellectuelle
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            L&rsquo;ensemble des contenus présents sur ce site (textes, images, code source,
            visuels) est la propriété exclusive de Lucas Marie-Anne, sauf mention contraire
            explicite. Toute reproduction, distribution ou utilisation sans autorisation préalable
            est interdite.
          </p>
          <p className="text-neutral-600 leading-relaxed mt-3">
            Les logos et marques de technologies tierces (React, Vite, TailwindCSS, etc.) sont la
            propriété de leurs détenteurs respectifs et sont utilisés à titre informatif uniquement.
          </p>
        </section>

        {/* Données personnelles */}
        <section className="mb-10" aria-labelledby="donnees">
          <h2 id="donnees" className="text-xl font-semibold text-neutral-900 mb-4">
            Données personnelles &amp; RGPD
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            Ce site ne collecte aucune donnée personnelle à des fins commerciales ou publicitaires.
          </p>
          <h3 className="text-base font-semibold text-neutral-800 mt-5 mb-2">
            Formulaire de contact
          </h3>
          <p className="text-neutral-600 leading-relaxed">
            Les informations saisies dans le formulaire de contact (nom, adresse e-mail, sujet,
            message) sont utilisées exclusivement pour répondre à votre demande. Elles sont
            transmises via l&rsquo;API Mailjet et ne sont ni stockées dans une base de données, ni
            cédées à des tiers.
          </p>
          <h3 className="text-base font-semibold text-neutral-800 mt-5 mb-2">
            Droits des utilisateurs
          </h3>
          <p className="text-neutral-600 leading-relaxed">
            Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679),
            vous disposez d&rsquo;un droit d&rsquo;accès, de rectification et de suppression de vos
            données. Pour exercer ces droits, contactez-moi à l&rsquo;adresse{' '}
            <a
              href="mailto:business.lucasmarieanne@gmail.com"
              className="text-brand-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm"
            >
              business.lucasmarieanne@gmail.com
            </a>
            .
          </p>
        </section>

        {/* Cookies */}
        <section className="mb-10" aria-labelledby="cookies">
          <h2 id="cookies" className="text-xl font-semibold text-neutral-900 mb-4">
            Cookies
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            Ce site n&rsquo;utilise pas de cookies de traçage ou publicitaires. Aucun outil
            d&rsquo;analyse comportementale de type Google Analytics n&rsquo;est intégré.
          </p>
        </section>

        {/* Responsabilité */}
        <section className="mb-10" aria-labelledby="responsabilite">
          <h2 id="responsabilite" className="text-xl font-semibold text-neutral-900 mb-4">
            Limitation de responsabilité
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            Lucas Marie-Anne s&rsquo;efforce de maintenir les informations publiées sur ce site
            exactes et à jour, mais ne saurait garantir l&rsquo;exhaustivité ou l&rsquo;exactitude
            des informations. La responsabilité de l&rsquo;éditeur ne pourra être engagée en cas
            d&rsquo;erreur ou d&rsquo;omission.
          </p>
        </section>

        {/* Droit applicable */}
        <section aria-labelledby="droit">
          <h2 id="droit" className="text-xl font-semibold text-neutral-900 mb-4">
            Droit applicable
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            Le présent site et les présentes mentions légales sont soumis au droit français. Tout
            litige relatif à son utilisation sera porté devant les tribunaux compétents de Paris.
          </p>
          <p className="text-neutral-500 text-sm mt-6">Dernière mise à jour&nbsp;: mai 2025</p>
        </section>
      </main>
    </>
  )
}
