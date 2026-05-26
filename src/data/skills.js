export const skillCategories = [
  {
    id: 'front',
    title: 'Front-End',
    icon: '🖥️',
    skills: [
      { name: 'React', level: 'Confirmé', color: '#61DAFB' },
      { name: 'JavaScript', level: 'Confirmé', color: '#F7DF1E' },
      { name: 'HTML5', level: 'Maîtrisé', color: '#E34F26' },
      { name: 'CSS3', level: 'Maîtrisé', color: '#1572B6' },
      { name: 'Sass', level: 'Maîtrisé', color: '#CC6699' },
      { name: 'TailwindCSS', level: 'En apprentissage', color: '#06B6D4' },
      { name: 'React Router', level: 'Maîtrisé', color: '#CA4245' },
    ],
  },
  {
    id: 'back',
    title: 'Back-End & API',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 'Confirmé', color: '#339933' },
      { name: 'API REST', level: 'Confirmé', color: '#2E9461' },
      { name: 'MySQL', level: 'Maîtrisé', color: '#4479A1' },
      { name: 'Mailjet API', level: 'Confirmé', color: '#52B07F' },
    ],
  },
  {
    id: 'tooling',
    title: 'Outillage & Méthodes',
    icon: '🛠️',
    skills: [
      { name: 'Git / GitHub', level: 'Maîtrisé', color: '#F05032' },
      { name: 'Vite', level: 'Maîtrisé', color: '#646CFF' },
      { name: 'Accessibilité WCAG', level: 'Confirmé', color: '#2E9461' },
      { name: 'SEO technique', level: 'En apprentissage', color: '#0EA5A4' },
      { name: 'CI / CD', level: 'En apprentissage', color: '#A1A1AA' },
    ],
  },
]

export const softSkills = [
  {
    label: 'Autonomie',
    description: 'Je prends des initiatives et livre sans surveillance constante.',
  },
  {
    label: 'Communication',
    description: "J'explique mes choix techniques clairement, à l'oral comme à l'écrit.",
  },
  { label: 'Rigueur', description: 'Zéro approximation : je teste, je documente, je valide.' },
  {
    label: 'Curiosité',
    description: 'Je lis des RFCs, des post-mortems et des release notes pour le plaisir.',
  },
  {
    label: 'Adaptabilité',
    description: "Je m'ajuste vite aux contextes, aux stacks et aux priorités changeantes.",
  },
  {
    label: 'Résolution de problèmes',
    description: "Je décompose, j'isole, je reproduis, je corrige.",
  },
]
