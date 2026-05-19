# CLAUDE.md — Portfolio Développeur Premium

> Cahier des charges + roadmap de développement complète pour un portfolio développeur moderne, professionnel, responsive, accessible et SEO-optimisé.
>
> Ce document sert de **source de vérité unique** pour le projet. Toute décision technique ou design doit s'y conformer.

---

## Table des matières

1. [Vision & Objectifs](#1-vision--objectifs)
2. [Stack technique](#2-stack-technique)
3. [Design System](#3-design-system)
4. [Architecture du projet](#4-architecture-du-projet)
5. [Structure des pages & sections](#5-structure-des-pages--sections)
6. [SEO avancé](#6-seo-avancé)
7. [Accessibilité (a11y)](#7-accessibilité-a11y)
8. [Responsive Design](#8-responsive-design)
9. [Animations & micro-interactions](#9-animations--micro-interactions)
10. [Performance & Core Web Vitals](#10-performance--core-web-vitals)
11. [Formulaire de contact (Mailjet)](#11-formulaire-de-contact-mailjet)
12. [Sécurité](#12-sécurité)
13. [Déploiement & hébergement](#13-déploiement--hébergement)
14. [Roadmap de développement par étapes](#14-roadmap-de-développement-par-étapes)
15. [Conventions de code](#15-conventions-de-code)
16. [Checklist finale de livraison](#16-checklist-finale-de-livraison)

---

## 1. Vision & Objectifs

### 1.1 Vision

Créer un **portfolio développeur premium** qui inspire confiance et crédibilité dès les premières secondes. L'expérience doit transmettre :

- Maîtrise technique
- Sens du détail
- Vision produit
- Professionnalisme

### 1.2 Cibles

- **Recruteurs tech** (CTO, lead dev, RH)
- **Entreprises** (startups, scale-ups, agences)
- **Clients freelance** potentiels

### 1.3 Objectifs mesurables

| Indicateur | Cible |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibilité | 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| LCP | < 2.0 s |
| CLS | < 0.05 |
| INP | < 200 ms |
| Bundle JS initial | < 200 Kb gzip |
| WCAG | AA minimum (AAA visé sur texte) |

### 1.4 Principes directeurs

1. **Mobile-first** sans compromis.
2. **Accessibilité native** : pas un patch, une fondation.
3. **Performance d'abord** : chaque dépendance se justifie.
4. **Design sobre, contenu premium** : pas de surcharge visuelle.
5. **Animations discrètes** : elles servent la lecture, jamais l'ego.

---

## 2. Stack technique

### 2.1 Front-End

| Outil | Version cible | Rôle |
|---|---|---|
| **React** | 18.x | Librairie UI |
| **Vite** | 5.x | Build tool & dev server |
| **React Router** | 6.x | Routing SPA |
| **TailwindCSS** | 3.x | Styling utility-first |
| **Framer Motion** | 11.x | Animations |
| **Lucide React** | latest | Icônes SVG |
| **React Helmet Async** | 2.x | Gestion `<head>` & SEO |
| **clsx** ou **tailwind-merge** | latest | Composition de classes |

### 2.2 Formulaire & e-mail

- **Mailjet API** pour l'envoi transactionnel
- **Serverless function** (Vercel / Netlify Function) pour cacher la clé API
- Variables sensibles dans `.env` (jamais committées)

### 2.3 Outillage qualité

- **ESLint** + config recommandée React
- **Prettier** (formatage)
- **Husky** + **lint-staged** (pre-commit)
- **Vitest** + **React Testing Library** (tests unitaires des composants critiques)
- **Playwright** (optionnel, tests E2E formulaire & navigation)

### 2.4 SEO & analytics

- `react-helmet-async`
- `vite-plugin-sitemap` (ou génération manuelle)
- `robots.txt` statique
- **Plausible** ou **Umami** (analytics respectueuses RGPD — pas de Google Analytics par défaut)

---

## 3. Design System

### 3.1 Direction artistique

- **Thème** : blanc moderne, minimaliste, élégant
- **Inspirations** : Linear, Vercel, Stripe, Apple, Framer
- **Mots-clés** : clarté, espace, précision, premium

### 3.2 Palette de couleurs

> Recommandation : **vert sapin moderne** comme couleur dominante. Connote innovation, croissance, technologie, sans tomber dans le "tech bro" agressif. Mode sombre optionnel en v2.

```css
/* tailwind.config.js — extension theme.colors */
brand: {
  50:  "#F1FAF5",
  100: "#DCF2E5",
  200: "#B7E3C9",
  300: "#86CDA6",
  400: "#52B07F",
  500: "#2E9461", /* couleur principale */
  600: "#1F7A4E",
  700: "#1A6240",
  800: "#174E35",
  900: "#13402D",
  950: "#0A241A",
},
accent: {
  500: "#0EA5A4", /* teal — CTA secondaire, liens */
},
neutral: {
  0:   "#FFFFFF",
  50:  "#FAFAFA",
  100: "#F4F4F5",
  200: "#E4E4E7",
  300: "#D4D4D8",
  400: "#A1A1AA",
  500: "#71717A",
  600: "#52525B",
  700: "#3F3F46",
  800: "#27272A",
  900: "#18181B",
  950: "#09090B",
},
```

### 3.3 Typographie

- **Titres** : `Inter` ou `General Sans` (700 / 600)
- **Corps** : `Inter` (400 / 500)
- **Code / mono** : `JetBrains Mono`
- Chargement via `@fontsource` (self-host) pour la perf et la vie privée

Échelle modulaire (ratio 1.25) :

| Token | Taille | Usage |
|---|---|---|
| `text-xs` | 12 px | Caption, légende |
| `text-sm` | 14 px | Meta, badges |
| `text-base` | 16 px | Corps |
| `text-lg` | 18 px | Intro, lead |
| `text-xl` | 20 px | Sous-titre |
| `text-2xl` | 24 px | H4 |
| `text-3xl` | 30 px | H3 |
| `text-4xl` | 36 px | H2 |
| `text-5xl` | 48 px | H1 mobile |
| `text-6xl` | 60 px | Hero desktop |

### 3.4 Espacement, rayons, ombres

```js
// Tailwind extension
spacing: { /* baseline 4 px, fluide via clamp() pour les sections */ },
borderRadius: {
  sm: "6px",
  md: "10px",
  lg: "16px",
  xl: "24px",
  "2xl": "32px",
},
boxShadow: {
  soft: "0 1px 2px rgba(15,23,42,.04), 0 1px 3px rgba(15,23,42,.06)",
  card: "0 4px 16px rgba(15,23,42,.06)",
  pop:  "0 12px 32px rgba(15,23,42,.10)",
},
```

### 3.5 Composants UI de base

- `Button` (variantes : primary, secondary, ghost, link ; tailles sm/md/lg)
- `Card`
- `Badge`
- `Tag`
- `Input`, `Textarea`, `FormField`, `ErrorMessage`
- `SectionHeader` (eyebrow + titre + lead)
- `Container` (max-width: 1200 px, padding fluide)
- `Modal`
- `Tooltip`
- `Link` (interne via React Router, externe avec `rel="noopener noreferrer"`)

Chaque composant doit être :
- **Typed** (PropTypes ou TypeScript si retenu)
- **Accessible** (focus ring visible, role, aria)
- **Composable** (`children`, slots)
- **Themable** (couleurs via tokens, pas de hardcode)

---

## 4. Architecture du projet

### 4.1 Arborescence

```
portfolio/
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   └── og/                       # images Open Graph
├── src/
│   ├── assets/                   # images, illustrations, fonts
│   ├── components/
│   │   ├── ui/                   # Button, Card, Badge, Input...
│   │   ├── layout/               # Navbar, Footer, Container
│   │   └── seo/                  # Seo.jsx (Helmet wrapper)
│   ├── sections/                 # Hero, About, Skills, Projects...
│   ├── pages/                    # Home, ProjectDetail, NotFound, Legal
│   ├── layouts/                  # RootLayout
│   ├── hooks/                    # useScrollSpy, useMediaQuery, useReducedMotion
│   ├── utils/                    # cn(), formatDate, validators
│   ├── data/                     # projects.js, skills.js, experiences.js
│   ├── styles/                   # globals.css, tailwind.css
│   ├── lib/                      # mailjet client (côté serverless), seo helpers
│   ├── routes.jsx
│   ├── main.jsx
│   └── App.jsx
├── api/                          # serverless functions (Vercel)
│   └── contact.js                # endpoint Mailjet
├── .env.example
├── .eslintrc.cjs
├── .prettierrc
├── tailwind.config.js
├── vite.config.js
├── package.json
└── CLAUDE.md
```

### 4.2 Conventions de nommage

- Composants : `PascalCase.jsx`
- Hooks : `useCamelCase.js`
- Utils : `camelCase.js`
- Données : `kebab-case.js` ou `camelCase.js`
- Une exportation par fichier pour les composants (`export default`) + exports nommés pour les helpers.

---

## 5. Structure des pages & sections

### 5.1 Pages

| Route | Composant | Description |
|---|---|---|
| `/` | `Home` | Toutes sections one-page |
| `/projets/:slug` | `ProjectDetail` | Page détail projet |
| `/mentions-legales` | `Legal` | RGPD / mentions |
| `*` | `NotFound` | 404 personnalisée |

### 5.2 Navigation principale

Sticky, transparente au top puis solide au scroll. Menu ancré (smooth scroll) sur la home, links classiques sur les autres pages.

Items :
1. Accueil
2. À propos
3. Compétences
4. Projets
5. Parcours
6. Certifications
7. Contact (CTA — bouton primaire)

### 5.3 Section Hero

**Objectifs** : impact immédiat, branding fort, CTA clair.

**Contenu** :
- Eyebrow : `Développeur Front-End`
- H1 : `Prénom Nom — interfaces premium, performantes et accessibles.`
- Phrase d'accroche (2 lignes max)
- 2 boutons : `Voir mes projets` (primary) + `Me contacter` (secondary)
- Photo pro ou illustration vectorielle (jamais d'avatar IA générique)
- Background : grille subtile ou gradient radial doux, **jamais d'animation lourde**

**Animations** : fade + translateY au mount, durée 600 ms, easing `ease-out`. Respecter `prefers-reduced-motion`.

### 5.4 Section À propos — narration en 6 actes

1. **Accroche identitaire** — qui je suis, ma spécialité, ma promesse.
2. **Parcours & légitimité** — d'où je viens, ce qui m'a amené ici.
3. **Stack & expertise** — technos maîtrisées et contexte d'usage réel.
4. **Projets marquants & impact** — défis affrontés, solutions, résultats chiffrés si possible.
5. **Approche & différenciation** — méthodologie, valeurs, façon de collaborer.
6. **Projection** — type de poste/équipe visé, ambitions à 2-3 ans.

Format : texte court (max 3 phrases par acte) + visuels d'appoint discrets.

### 5.5 Section Compétences

**Hard skills** — groupées par catégorie :
- Front : React, JavaScript, TypeScript, HTML5, CSS3, Tailwind, Framer Motion
- Back léger : Node.js, API REST
- Outillage : Git, Vite, ESLint, Vitest, Figma

**Soft skills** : autonomie, rigueur, communication, résolution de problèmes, curiosité.

**UI** :
- Cartes par catégorie
- Badges technos avec icône (Lucide / Devicon)
- Pas de jauges en pourcentage (peu crédible) — préférer un libellé `Confirmé / Maîtrisé / En apprentissage`
- Hover : élévation légère + couleur d'accent

### 5.6 Section Projets

**2 projets professionnels** mis en avant. Chaque carte projet contient :

- Titre accrocheur
- Description courte (2 lignes)
- Stack (badges)
- Screenshot HD (1600×1000, WebP/AVIF, lazy-loaded)
- Lien GitHub
- Lien live demo
- CTA `Voir le projet` → page détail

**Page détail projet** :
- Hero projet (mockup, titre, stack)
- **Problématique** (le besoin)
- **Solution** (l'approche, les choix techniques)
- **Résultats** (chiffres, retours, KPI)
- Galerie (screenshots/mockups)
- Liens GitHub + Demo
- Navigation projet suivant / précédent

**Filtres dynamiques** (optionnel si > 4 projets) par techno ou type.

### 5.7 Section Parcours — timeline

Timeline verticale, alternance gauche/droite en desktop, colonne unique en mobile.

Entrées :
- Formations
- Expériences pro
- Étapes clés (reconversion, premier client, etc.)

Animation `whileInView` au scroll, **une seule fois** (`viewport={{ once: true }}`).

### 5.8 Section Certifications

Grille de cartes : logo organisme, intitulé, date, lien de vérification si disponible.

### 5.9 Section Contact

Formulaire :
- `name` (requis, 2-80 caractères)
- `email` (requis, regex stricte)
- `subject` (requis, 4-120 caractères)
- `message` (requis, 20-2000 caractères)
- Honeypot anti-spam (`<input name="website" hidden tabIndex={-1}>`)
- Rate limiting côté serverless (1 envoi / 30 s par IP)

États UI : `idle`, `submitting`, `success`, `error`. Toujours annoncer le statut via `aria-live="polite"`.

À côté du formulaire : carte contact directe (e-mail, LinkedIn, GitHub, localisation indicative).

### 5.10 Footer

- Logo + tagline
- Plan du site
- Réseaux sociaux
- Mentions légales
- Année courante + signature `Conçu et développé avec ❤️ par Prénom Nom`

---

## 6. SEO avancé

### 6.1 SEO technique

- HTML sémantique (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`)
- Un seul `<h1>` par page
- Hiérarchie stricte H1 → H2 → H3
- `<title>` unique par page, < 60 caractères
- `<meta name="description">` unique, 140-160 caractères
- `<link rel="canonical">`
- `lang="fr"` sur `<html>` (ou `en` si version anglaise)
- `hreflang` si version multilingue

### 6.2 Fichiers à la racine

**`public/robots.txt`**
```
User-agent: *
Allow: /
Sitemap: https://www.tondomaine.com/sitemap.xml
```

**`public/sitemap.xml`** — généré au build via plugin Vite ou script Node.

### 6.3 Métadonnées sociales

`<Seo />` component (wrapper Helmet) qui injecte :

- Open Graph (`og:title`, `og:description`, `og:image` 1200×630, `og:type`, `og:url`)
- Twitter Cards (`summary_large_image`)
- `theme-color`

### 6.4 Données structurées (JSON-LD)

À injecter dans `<head>` :

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Prénom Nom",
  "jobTitle": "Développeur Front-End",
  "url": "https://www.tondomaine.com",
  "sameAs": [
    "https://github.com/handle",
    "https://www.linkedin.com/in/handle"
  ],
  "knowsAbout": ["React", "TypeScript", "TailwindCSS", "Accessibilité web"]
}
```

Pour chaque projet : `CreativeWork` ou `SoftwareApplication`.

### 6.5 Images & alt

- Tous les `alt` sont descriptifs (jamais vides sauf décoratifs avec `alt=""`)
- `loading="lazy"` sauf hero (`fetchpriority="high"`)
- Formats modernes WebP / AVIF, fallback JPEG/PNG
- `<img>` toujours avec `width` et `height` (anti-CLS)

---

## 7. Accessibilité (a11y)

### 7.1 Exigences WCAG AA

- Contraste texte/fond ≥ 4.5:1 (3:1 pour gros texte)
- Tous les éléments interactifs atteignables au clavier
- Focus visible (jamais `outline: none` sans alternative)
- Pas d'information transmise par la couleur seule
- Animations désactivables via `prefers-reduced-motion`

### 7.2 Sémantique & ARIA

- `<button>` pour actions, `<a>` pour navigation
- `aria-label` sur les boutons icône-only
- `aria-current="page"` sur l'item nav actif
- `aria-expanded` sur le menu mobile
- `aria-live="polite"` pour les feedbacks de formulaire
- Skip link `Aller au contenu principal` en début de page

### 7.3 Tests

- Lighthouse a11y = 100
- axe DevTools : 0 violation
- Test clavier complet (Tab, Shift+Tab, Enter, Esc)
- Test lecteur d'écran (VoiceOver macOS / NVDA Windows)

---

## 8. Responsive Design

### 8.1 Breakpoints Tailwind

| Nom | Largeur min |
|---|---|
| (default) | 0 — mobile-first |
| `sm` | 640 px |
| `md` | 768 px |
| `lg` | 1024 px |
| `xl` | 1280 px |
| `2xl` | 1536 px |

### 8.2 Règles

- **Mobile-first** : on écrit la version mobile puis on monte.
- Pas de scroll horizontal jamais (test à 320 px).
- Touch targets ≥ 44×44 px.
- Menu mobile : drawer ou plein écran, fermeture au clic extérieur + Esc.
- Tester sur iPhone SE, iPad, MacBook 13", écran 4K.

---

## 9. Animations & micro-interactions

### 9.1 Principes

- Toute animation dure entre **150 ms et 600 ms**.
- Easing par défaut : `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out doux).
- Respecter `prefers-reduced-motion: reduce` → désactiver toutes les transitions non-essentielles.

### 9.2 Patterns Framer Motion

- `whileInView` + `viewport={{ once: true, margin: "-10%" }}` pour les reveals
- `AnimatePresence` pour les modals et toasts
- `layoutId` pour transitions partagées (image carte → page détail)
- Hover cartes : `scale: 1.02` max, ombre + bordure

### 9.3 Liste exhaustive

- Hero : fade + slide up (stagger 80 ms)
- Reveal sections au scroll
- Hover boutons : élévation + couleur
- Hover cartes projet : élévation + accent border
- Transition de page : fade simple 200 ms
- Menu mobile : slide + fade

---

## 10. Performance & Core Web Vitals

### 10.1 Optimisations bundle

- **Code splitting** par route (`React.lazy` + `Suspense`)
- Tree-shaking activé (Vite par défaut)
- `import { Icon }` granulaire pour Lucide
- Pas de moment.js / lodash entier — préférer alternatives natives

### 10.2 Images

- Pipeline : Figma export → `sharp` ou Squoosh → AVIF + WebP
- `<picture>` avec sources multiples
- Hero image préchargée : `<link rel="preload" as="image">`
- Lazy-loading natif partout ailleurs

### 10.3 Fonts

- `@fontsource/inter` ou self-host
- `font-display: swap`
- Preload des poids critiques (400, 600, 700)
- Subset latin uniquement

### 10.4 Cibles Core Web Vitals

| Métrique | Cible | Comment |
|---|---|---|
| **LCP** | < 2.0 s | Preload hero image, fonts swap |
| **CLS** | < 0.05 | `width`/`height` sur images, pas d'injection au-dessus du contenu |
| **INP** | < 200 ms | Éviter les handlers lourds, debouncer scroll |

---

## 11. Formulaire de contact (Mailjet)

### 11.1 Architecture

```
[Form React] ──POST──▶ [/api/contact serverless] ──HTTPS──▶ [Mailjet API]
```

Jamais d'appel direct au front : la clé Mailjet reste **côté serveur uniquement**.

### 11.2 Variables d'environnement

**`.env.example`** (committé)
```
VITE_SITE_URL=https://www.tondomaine.com
MAILJET_API_KEY=
MAILJET_API_SECRET=
MAILJET_FROM_EMAIL=contact@tondomaine.com
MAILJET_TO_EMAIL=tonemail@gmail.com
```

**`.env`** (jamais committé — ajouter à `.gitignore`)

### 11.3 Endpoint serverless (Vercel)

`api/contact.js` :
- Méthode `POST` uniquement
- Validation stricte des champs (lib `zod` recommandée)
- Honeypot : si rempli → renvoyer `200` sans envoyer (piège silencieux)
- Rate limiting par IP (clé `x-forwarded-for`)
- Appel Mailjet Send v3.1
- Réponse JSON `{ ok: true }` ou `{ ok: false, error: "…" }`

### 11.4 UX du formulaire

- Validation à la perte de focus (`onBlur`) puis live à partir du premier submit
- Messages d'erreur courts, sous le champ, `role="alert"`
- Bouton désactivé pendant l'envoi avec spinner
- Succès : message confirmé visuellement + audio (`aria-live`)
- Échec : message d'erreur + lien mailto de secours

---

## 12. Sécurité

- Toutes les variables sensibles dans `.env`, jamais dans le bundle front
- En-têtes HTTP (via `vercel.json` ou config Netlify) :
  - `Content-Security-Policy`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` minimal
- Dépendances : `npm audit` régulier, Dependabot activé sur GitHub
- Liens externes : `rel="noopener noreferrer"`
- Pas de `dangerouslySetInnerHTML` sauf nécessité absolue

---

## 13. Déploiement & hébergement

### 13.1 Recommandation

- **Vercel** (recommandé) : CI/CD automatique sur push, serverless functions natives, edge network.
- Alternatives : Netlify, Cloudflare Pages.

### 13.2 Étapes

1. Repo GitHub privé puis public au moment de partager.
2. Connexion Vercel → import repo.
3. Variables d'environnement renseignées dans le dashboard Vercel.
4. Domaine custom + HTTPS automatique.
5. Preview Deployments sur chaque PR.

### 13.3 CI minimal

GitHub Actions :
- Lint
- Tests
- Build
- (optionnel) Lighthouse CI

---

## 14. Roadmap de développement par étapes

> Chaque étape contient : **Objectifs**, **Tâches**, **Bonnes pratiques**, **Critères de validation**.

---

### Étape 1 — Initialisation du projet

**Objectifs** : poser une base saine, reproductible.

**Tâches** :
- `npm create vite@latest portfolio -- --template react`
- Initialiser Git, premier commit
- Ajouter `.editorconfig`, `.nvmrc`
- Configurer ESLint + Prettier + Husky + lint-staged

**Bonnes pratiques** :
- Verrouiller la version Node dans `.nvmrc`
- Conventional Commits dès le départ

**Critères de validation** :
- [ ] `npm run dev` démarre sans warning
- [ ] `npm run lint` passe
- [ ] Pre-commit hook actif

---

### Étape 2 — Installation Tailwind + design tokens

**Objectifs** : design system fonctionnel avant tout composant.

**Tâches** :
- Installer Tailwind, PostCSS, Autoprefixer
- Configurer `tailwind.config.js` avec **tous** les tokens du §3
- Créer `src/styles/globals.css` avec resets, base typo, focus visible
- Ajouter `@fontsource/inter` (poids 400/500/600/700)

**Critères de validation** :
- [ ] Classes `bg-brand-500`, `text-neutral-900` fonctionnent
- [ ] Focus visible par défaut sur tous les interactifs
- [ ] Aucune classe arbitraire non-tokenisée dans le code

---

### Étape 3 — Architecture & routing

**Objectifs** : squelette complet avant le contenu.

**Tâches** :
- Créer l'arborescence du §4.1
- Configurer React Router + `routes.jsx`
- Créer `RootLayout` (Navbar + Outlet + Footer)
- Stubs : `Home`, `ProjectDetail`, `NotFound`, `Legal`

**Critères de validation** :
- [ ] Toutes les routes répondent
- [ ] `NotFound` correctement gérée
- [ ] Scroll restoration entre pages

---

### Étape 4 — Composants UI de base

**Objectifs** : kit réutilisable.

**Tâches** :
- Implémenter : `Button`, `Card`, `Badge`, `Tag`, `Container`, `SectionHeader`, `Input`, `Textarea`, `FormField`, `ErrorMessage`, `Link`
- Documenter chaque composant avec exemple en commentaire

**Bonnes pratiques** :
- Composants `forwardRef` quand pertinent
- Variants via `clsx`/`tailwind-merge`
- A11y : test clavier sur chaque composant

**Critères de validation** :
- [ ] Boutons : 4 variantes × 3 tailles fonctionnelles
- [ ] Focus ring visible partout
- [ ] Aucun composant n'utilise de couleur hardcodée

---

### Étape 5 — Navbar & Footer

**Objectifs** : navigation premium.

**Tâches** :
- Navbar sticky avec changement d'apparence au scroll
- Menu mobile (drawer animé Framer Motion)
- Skip link a11y
- Footer complet

**Critères de validation** :
- [ ] Navigation 100 % clavier
- [ ] Menu mobile se ferme à Esc + clic extérieur
- [ ] `aria-current` sur lien actif

---

### Étape 6 — Section Hero

**Objectifs** : première impression irréprochable.

**Tâches** :
- Layout 2 colonnes (texte + visuel) responsive
- Animations d'entrée Framer Motion (stagger)
- Image hero optimisée (AVIF/WebP, preload)

**Critères de validation** :
- [ ] LCP < 2 s en local
- [ ] H1 unique et descriptif
- [ ] CTA primaires visibles above the fold

---

### Étape 7 — Section À propos (6 actes)

**Objectifs** : storytelling structuré.

**Tâches** :
- Composer les 6 actes (§5.4) dans `data/about.js`
- Reveal au scroll
- Visuels d'appoint (timeline mini, badges)

**Critères de validation** :
- [ ] 6 actes présents et hiérarchisés
- [ ] Texte ≤ 3 phrases par acte
- [ ] Lecture fluide sans surcharge

---

### Étape 8 — Section Compétences

**Objectifs** : montrer la maîtrise sans bullshit.

**Tâches** :
- Données dans `data/skills.js`
- Cartes par catégorie
- Badges avec icônes
- Soft skills en bas, format différent

**Critères de validation** :
- [ ] Pas de pourcentages
- [ ] Hover discret et performant
- [ ] Tous les badges lisibles en mobile

---

### Étape 9 — Section Projets + page détail

**Objectifs** : pièce maîtresse du portfolio.

**Tâches** :
- `data/projects.js` (2 projets minimum)
- Composant `ProjectCard`
- Page `ProjectDetail` avec structure Problématique / Solution / Résultats
- Transitions partagées `layoutId` (carte → détail)
- Liens GitHub + Demo

**Critères de validation** :
- [ ] 2 projets affichés
- [ ] Page détail responsive et complète
- [ ] Liens externes en `rel="noopener noreferrer"`

---

### Étape 10 — Section Parcours (timeline)

**Objectifs** : crédibilité parcours.

**Tâches** :
- `data/timeline.js`
- Composant `Timeline` avec alternance desktop, colonne mobile
- Reveal au scroll (once)

**Critères de validation** :
- [ ] Lisible en mobile
- [ ] Dates et intitulés cohérents
- [ ] Animations légères

---

### Étape 11 — Section Certifications

**Tâches** :
- `data/certifications.js`
- Grille de cartes avec logos

**Critères de validation** :
- [ ] Alt text descriptifs sur logos
- [ ] Liens de vérification fonctionnels

---

### Étape 12 — Section Contact + serverless Mailjet

**Objectifs** : formulaire qui fonctionne en production.

**Tâches** :
- Formulaire React avec validation (`react-hook-form` + `zod` recommandé)
- Honeypot anti-spam
- Endpoint `api/contact.js` avec rate limiting
- Intégration Mailjet
- États UI complets

**Critères de validation** :
- [ ] Envoi réel testé en production
- [ ] Erreurs visibles et accessibles
- [ ] Variables sensibles hors du bundle

---

### Étape 13 — SEO complet

**Tâches** :
- Composant `<Seo />` (Helmet)
- Métadonnées uniques par page
- Open Graph + Twitter Cards + JSON-LD
- `robots.txt` + `sitemap.xml`

**Critères de validation** :
- [ ] Lighthouse SEO = 100
- [ ] Aperçu Open Graph testé (opengraph.xyz)
- [ ] JSON-LD validé (validator.schema.org)

---

### Étape 14 — Accessibilité finale

**Tâches** :
- Audit axe DevTools complet
- Test clavier exhaustif
- Test lecteur d'écran
- Vérification contrastes

**Critères de validation** :
- [ ] axe : 0 violation
- [ ] Lighthouse a11y = 100
- [ ] Navigation 100 % clavier sans piège

---

### Étape 15 — Performance

**Tâches** :
- Audit Lighthouse mobile & desktop
- Optimisation images (AVIF/WebP)
- Code splitting routes
- Preload des assets critiques

**Critères de validation** :
- [ ] Lighthouse Perf mobile ≥ 95
- [ ] Bundle JS initial < 200 Kb gzip
- [ ] Core Web Vitals tous au vert (PageSpeed Insights)

---

### Étape 16 — Tests

**Tâches** :
- Tests unitaires : `Button`, `FormField`, `Seo`
- Test E2E : parcours formulaire de contact
- Test responsive sur appareils réels

**Critères de validation** :
- [ ] `npm test` passe
- [ ] Pas de régression a11y

---

### Étape 17 — Déploiement

**Tâches** :
- Repo GitHub
- Connexion Vercel
- Variables d'environnement configurées
- Domaine custom + HTTPS
- Preview deployments sur PR

**Critères de validation** :
- [ ] Site en ligne et fonctionnel
- [ ] Formulaire de contact testé en production
- [ ] Lighthouse en production conforme cibles

---

### Étape 18 — Polish final

**Tâches** :
- Relecture orthographe/typographie (espaces insécables FR, guillemets « »)
- Vérification de tous les liens
- Création des images Open Graph
- Favicon multi-format
- Page mentions légales / RGPD

**Critères de validation** :
- [ ] Zéro lien mort
- [ ] Aperçu social impeccable
- [ ] Mentions légales conformes

---

## 15. Conventions de code

### 15.1 Commits

Conventional Commits :
```
feat: section hero responsive
fix: contraste bouton secondaire
chore: bump tailwind 3.4.4
docs: mise à jour CLAUDE.md
refactor: extract Container component
perf: lazy load section projets
a11y: focus visible sur Card cliquable
```

### 15.2 Branches

- `main` — production
- `feat/<scope>` — feature
- `fix/<scope>` — bugfix
- `chore/<scope>` — tooling

PR obligatoire, review systématique (même solo : passer par PR).

### 15.3 Style code

- Pas d'`any` TypeScript si TS retenu
- Pas de `console.log` en production (lint rule)
- Composants < 200 lignes : si plus, découper
- Données séparées des composants (`data/*.js`)

---

## 16. Checklist finale de livraison

### Design
- [ ] Palette respectée partout, pas de couleur orpheline
- [ ] Typographie cohérente
- [ ] Spacing harmonieux (multiples de 4)
- [ ] Ombres et rayons depuis les tokens

### Contenu
- [ ] Texte relu et corrigé
- [ ] 2 projets minimum avec résultats
- [ ] CV / parcours à jour
- [ ] Photo professionnelle

### Technique
- [ ] React + Vite + Tailwind à jour
- [ ] React Router opérationnel
- [ ] Framer Motion respecte `prefers-reduced-motion`
- [ ] ESLint + Prettier sans warning

### SEO
- [ ] Titles & meta description par page
- [ ] Open Graph + Twitter Cards
- [ ] JSON-LD Person + projets
- [ ] sitemap.xml + robots.txt
- [ ] Canonical sur chaque page

### Accessibilité
- [ ] Lighthouse a11y = 100
- [ ] axe : 0 violation
- [ ] Clavier 100 %
- [ ] Skip link présent

### Performance
- [ ] Lighthouse Perf mobile ≥ 95
- [ ] LCP < 2 s, CLS < 0.05, INP < 200 ms
- [ ] Images modernes (AVIF/WebP)
- [ ] Bundle JS initial < 200 Kb gzip

### Sécurité
- [ ] Aucune clé API dans le front
- [ ] En-têtes HTTP de sécurité
- [ ] `npm audit` clean

### Formulaire
- [ ] Envoi Mailjet testé en production
- [ ] Honeypot + rate limiting actifs
- [ ] États success / error accessibles

### Déploiement
- [ ] Domaine custom + HTTPS
- [ ] Variables d'env en production
- [ ] Preview deployments fonctionnels
- [ ] CI : lint + test + build verts

### Légal
- [ ] Mentions légales
- [ ] Politique de confidentialité
- [ ] Bandeau cookies si analytics non-anonymes

---

> **Règle d'or** : avant chaque commit, relire ce document. Avant chaque PR, cocher la checklist concernée. Avant le go-live, parcourir la checklist finale dans son intégralité.
