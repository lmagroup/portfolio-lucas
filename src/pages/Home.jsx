import {
  Button,
  Badge,
  Tag,
  Card,
  SectionHeader,
  Input,
  Textarea,
  FormField,
  AppLink,
} from '../components/ui'

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 py-16">
      <div className="container-main space-y-20">
        {/* BUTTONS */}
        <section aria-labelledby="section-buttons">
          <SectionHeader
            id="section-buttons"
            eyebrow="Composants"
            title="Boutons"
            lead="4 variantes × 3 tailles, avec état loading et disabled."
          />
          <div className="space-y-6">
            {['primary', 'secondary', 'ghost'].map((variant) => (
              <div key={variant} className="flex flex-wrap items-center gap-3">
                {['sm', 'md', 'lg'].map((size) => (
                  <Button key={size} variant={variant} size={size}>
                    {variant} {size}
                  </Button>
                ))}
                <Button variant={variant} loading>
                  Chargement…
                </Button>
                <Button variant={variant} disabled>
                  Désactivé
                </Button>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="link" size="sm">
                Lien sm
              </Button>
              <Button variant="link">Lien md</Button>
              <Button variant="link" size="lg">
                Lien lg
              </Button>
            </div>
          </div>
        </section>

        {/* BADGES & TAGS */}
        <section aria-labelledby="section-badges">
          <SectionHeader id="section-badges" eyebrow="Composants" title="Badges & Tags" />
          <div className="flex flex-wrap gap-3 mb-6">
            <Badge variant="brand">Brand</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="success">Success</Badge>
          </div>
          <div className="flex flex-wrap gap-3">
            <Tag>React</Tag>
            <Tag>TypeScript</Tag>
            <Tag>TailwindCSS</Tag>
            <Tag>Framer Motion</Tag>
          </div>
        </section>

        {/* CARDS */}
        <section aria-labelledby="section-cards">
          <SectionHeader id="section-cards" eyebrow="Composants" title="Cards" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <p className="text-sm font-semibold text-neutral-900 mb-1">Card standard</p>
              <p className="text-sm text-neutral-500">Ombrage doux, fond blanc, border neutre.</p>
            </Card>
            <Card hoverable>
              <p className="text-sm font-semibold text-neutral-900 mb-1">Card hoverable</p>
              <p className="text-sm text-neutral-500">Élévation + border brand au survol.</p>
            </Card>
            <Card className="border-brand-200 bg-brand-50">
              <Badge variant="brand" className="mb-3">
                Premium
              </Badge>
              <p className="text-sm font-semibold text-neutral-900 mb-1">Card customisée</p>
              <p className="text-sm text-neutral-500">Classes additionnelles via className.</p>
            </Card>
          </div>
        </section>

        {/* FORMULAIRE */}
        <section aria-labelledby="section-form">
          <SectionHeader id="section-form" eyebrow="Composants" title="Formulaire" />
          <div className="max-w-lg space-y-5">
            <FormField label="Nom" htmlFor="demo-name" required>
              <Input id="demo-name" placeholder="Votre nom" />
            </FormField>

            <FormField label="Email" htmlFor="demo-email" required error="Format d'email invalide.">
              {({ errorId }) => (
                <Input
                  id="demo-email"
                  type="email"
                  placeholder="vous@exemple.com"
                  error
                  aria-describedby={errorId}
                />
              )}
            </FormField>

            <FormField label="Message" htmlFor="demo-message" hint="Entre 20 et 2000 caractères.">
              <Textarea id="demo-message" placeholder="Votre message…" />
            </FormField>

            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Envoyer le message
            </Button>
          </div>
        </section>

        {/* LIENS */}
        <section aria-labelledby="section-links">
          <SectionHeader id="section-links" eyebrow="Composants" title="Liens" />
          <div className="flex flex-wrap gap-6">
            <AppLink to="/mentions-legales">Lien interne (Router)</AppLink>
            <AppLink href="https://github.com">Lien externe (GitHub)</AppLink>
          </div>
        </section>
      </div>
    </div>
  )
}
