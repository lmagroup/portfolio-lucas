export const projects = [
  {
    id: 1,
    slug: 'dashboard-analytics',
    title: 'Dashboard Analytics RH',
    tagline: 'Visualisation de données RH en temps réel pour 500+ collaborateurs',
    description:
      'Application web de reporting RH permettant aux managers de suivre les KPIs de leur équipe — turnover, absentéisme, performances — sur une interface claire et accessible.',
    stack: ['React', 'TypeScript', 'TailwindCSS', 'Recharts', 'Node.js', 'REST API'],
    problem:
      "Le service RH utilisait des exports Excel manuels actualisés une fois par mois. Les managers n'avaient pas de visibilité temps réel sur les indicateurs clés, ce qui ralentissait la prise de décision et générait des erreurs de consolidation.",
    solution:
      "Conception d'un dashboard React connecté à une API REST existante. Architecture composants réutilisables, gestion d'état avec Context API, graphiques Recharts optimisés pour le rendu mobile. Mise en place de rôles utilisateur (admin / manager / lecteur) et d'un système de filtres persistants via URL.",
    results: [
      'Réduction de 80 % du temps de génération des rapports mensuels',
      'Adoption par 45 managers dès la première semaine',
      'Score Lighthouse Performance : 97 / Accessibilité : 100',
      '0 régression signalée après 3 mois en production',
    ],
    links: {
      github: 'https://github.com',
      demo: 'https://example.com',
    },
    featured: true,
    color: '#2E9461',
    year: '2024',
  },
  {
    id: 2,
    slug: 'plateforme-elearning',
    title: 'Plateforme e-Learning',
    tagline: 'Parcours de formation interactifs pour organismes de formation certifiés',
    description:
      "Interface front-end d'une plateforme de formation en ligne : lecteur de cours, quiz interactifs, suivi de progression et certificats automatisés — conforme WCAG AA.",
    stack: ['React', 'Framer Motion', 'TailwindCSS', 'React Router', 'Vitest', 'Vite'],
    problem:
      "L'organisme de formation utilisait un LMS générique peu accessible et impossible à personnaliser. Les apprenants malvoyants ne pouvaient pas utiliser les quiz, et le taux de complétion des parcours stagnait à 34 %.",
    solution:
      "Développement d'une interface sur mesure mobile-first. Navigation clavier complète, lecteur de cours avec contrôles accessibles (aria-live, focus management), animations Framer Motion respectant prefers-reduced-motion. Suite de tests Vitest couvrant les composants critiques (quiz, progression, certificat).",
    results: [
      'Taux de complétion des parcours : de 34 % à 71 % en 2 mois',
      'Accessibilité WCAG AA certifiée — 0 violation axe DevTools',
      'Lighthouse Accessibilité : 100 sur toutes les pages',
      'NPS apprenant : +42 points après refonte',
    ],
    links: {
      github: 'https://github.com',
      demo: 'https://example.com',
    },
    featured: true,
    color: '#0EA5A4',
    year: '2024',
  },
]

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) ?? null
}

export function getAdjacentProjects(slug) {
  const index = projects.findIndex((p) => p.slug === slug)
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  }
}
