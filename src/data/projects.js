export const projects = [
  {
    id: 1,
    slug: 'argentbank',
    title: 'ArgentBank — Application Bancaire',
    tagline: "Front-end React d'une application bancaire connectée à une API REST sécurisée",
    description:
      "Développement complet du front-end d'une application bancaire : tableau de bord des comptes, authentification JWT, appels API REST et documentation Swagger des routes de transactions.",
    stack: ['React', 'Redux', 'REST API', 'Swagger', 'Node.js', 'JWT'],
    image: new URL('../assets/projects/argentbank.webp', import.meta.url).href,
    imageAlt: "Capture d'écran de l'application ArgentBank — tableau de bord des comptes bancaires",
    problem:
      "L'application bancaire disposait d'un back-end fonctionnel mais d'aucune interface utilisateur. Les données des comptes et des transactions n'étaient accessibles que via des appels API bruts, sans dashboard ni gestion d'état centralisée.",
    solution:
      "Intégration du front-end React avec le back-end existant via une API REST. Mise en place de Redux pour gérer l'état global (session utilisateur, données des comptes). Implémentation de l'authentification JWT avec persistance en localStorage. Modélisation et documentation des routes de transactions avec Swagger pour formaliser le contrat d'API.",
    results: [
      'Authentification sécurisée JWT avec gestion de session persistante',
      'Dashboard responsive affichant les comptes et soldes en temps réel',
      'Routes API transactions entièrement documentées avec Swagger',
      "Architecture Redux scalable, prête pour l'ajout de nouvelles fonctionnalités",
    ],
    links: {
      github: 'https://github.com/lmagroup/front-end-react_p10',
      demo: null,
    },
    featured: true,
    color: '#2E9461',
    year: '2026',
  },
  {
    id: 2,
    slug: 'kasa',
    title: 'Kasa — Location Immobilière',
    tagline: 'Application web multi-pages de location immobilière avec React et React Router',
    description:
      "Refonte complète du front-end d'une plateforme de location : navigation multi-pages, composants réutilisables, animations CSS fluides et données chargées depuis un fichier JSON.",
    stack: ['React', 'React Router', 'Sass', 'Vite', 'Node.js'],
    image: new URL('../assets/projects/kasa.webp', import.meta.url).href,
    imageAlt:
      "Capture d'écran de l'application Kasa — page d'accueil de la plateforme de location immobilière",
    problem:
      "La plateforme Kasa fonctionnait avec un front-end vieillissant, non componentisé et sans routing côté client. Les maquettes Figma définissaient une nouvelle identité visuelle moderne que l'ancien code ne permettait pas d'implémenter proprement.",
    solution:
      "Reconstruction from scratch avec React et Vite. Mise en place de React Router pour la navigation multi-pages (accueil, fiche logement, à propos, 404). Composants réutilisables (carrousel d'images, accordéon, tags). Styles modulaires en Sass avec animations CSS pour les transitions et le carrousel. Données simulées depuis un fichier JSON.",
    results: [
      'SPA multi-pages avec routing React Router et page 404 personnalisée',
      "Carrousel d'images et accordéons entièrement animés en CSS",
      'Architecture composants conforme aux maquettes Figma',
      '100 % componentisé et maintenable, sans dépendance UI tierce',
    ],
    links: {
      github: 'https://github.com/lucasmarieanne/react_app_p7',
      demo: null,
    },
    featured: true,
    color: '#FF6060',
    year: '2026',
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
