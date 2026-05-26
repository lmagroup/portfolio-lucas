# Portfolio — Lucas Marie-Anne

Portfolio développeur Front-End React, conçu pour être premium, performant et accessible (WCAG AA).

**Stack :** React 18 · Vite 5 · TailwindCSS 3 · Framer Motion 11 · React Router 6

---

## Fonctionnalités

- Design system complet (tokens couleur, typographie, espacement)
- Sections : Hero, À propos, Compétences, Projets, Parcours, Certifications, Contact
- Formulaire de contact avec envoi e-mail via Mailjet (fonction serverless Vercel)
- SEO avancé : Open Graph, Twitter Cards, JSON-LD, sitemap, robots.txt
- Accessibilité WCAG AA (focus visible, ARIA, skip link, `prefers-reduced-motion`)
- Animations Framer Motion avec LazyMotion pour bundle optimisé
- Code splitting par route (React.lazy + Suspense)

---

## Installation

### Prérequis

- Node.js >= 18
- npm >= 9

### Cloner et installer les dépendances

```bash
git clone https://github.com/lmagroup/portfolio-lucas.git
cd portfolio-lucas
npm install
```

### Variables d'environnement

Copie le fichier d'exemple et remplis tes propres valeurs :

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_SITE_URL` | URL publique du site (ex : `https://www.tondomaine.com`) |
| `MAILJET_API_KEY` | Clé API Mailjet |
| `MAILJET_API_SECRET` | Secret API Mailjet |
| `MAILJET_FROM_EMAIL` | Adresse expéditrice |
| `MAILJET_TO_EMAIL` | Adresse destinataire des messages du formulaire |

> Ne jamais committer le fichier `.env` — il est déjà dans `.gitignore`.

### Lancer en développement

Le formulaire de contact nécessite [Vercel CLI](https://vercel.com/docs/cli) pour exécuter les fonctions serverless en local :

```bash
npm install -g vercel
vercel dev
```

Le site est alors disponible sur **http://localhost:3000**.

Pour un développement sans le formulaire, `npm run dev` suffit (port 5173).

### Build de production

```bash
npm run build
npm run preview
```

---

## Tests

```bash
npm test
```

Les tests couvrent les composants `Button`, `FormField`, le schéma de validation du formulaire et le composant `Seo`.

---

## Déploiement

Le projet est configuré pour Vercel. Connecte ton repo GitHub à Vercel, renseigne les variables d'environnement dans le dashboard, et chaque push sur `main` déclenche un déploiement automatique.

---

## Licence

Code source disponible à titre de référence. Contenu (textes, visuels) © Lucas Marie-Anne — tous droits réservés.
