import PropTypes from 'prop-types'

export default function HeroIllustration({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 480 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration développeur front-end"
    >
      {/* Fond cercle */}
      <circle cx="240" cy="240" r="220" fill="#F1FAF5" />
      <circle cx="240" cy="240" r="180" fill="#DCF2E5" opacity="0.5" />

      {/* Fenêtre éditeur de code */}
      <rect x="80" y="120" width="320" height="220" rx="12" fill="white" />
      <rect x="80" y="120" width="320" height="32" rx="12" fill="#2E9461" />
      <rect x="80" y="140" width="320" height="12" fill="#2E9461" />

      {/* Boutons fenêtre */}
      <circle cx="104" cy="136" r="6" fill="#FF6058" />
      <circle cx="124" cy="136" r="6" fill="#FFBD2E" />
      <circle cx="144" cy="136" r="6" fill="#28CA41" />

      {/* Lignes de code */}
      <rect x="104" y="168" width="60" height="8" rx="4" fill="#86CDA6" />
      <rect x="172" y="168" width="100" height="8" rx="4" fill="#2E9461" />
      <rect x="280" y="168" width="40" height="8" rx="4" fill="#A1A1AA" />

      <rect x="120" y="188" width="80" height="8" rx="4" fill="#0EA5A4" />
      <rect x="208" y="188" width="60" height="8" rx="4" fill="#D4D4D8" />

      <rect x="104" y="208" width="40" height="8" rx="4" fill="#86CDA6" />
      <rect x="152" y="208" width="120" height="8" rx="4" fill="#2E9461" />
      <rect x="280" y="208" width="30" height="8" rx="4" fill="#A1A1AA" />

      <rect x="120" y="228" width="100" height="8" rx="4" fill="#0EA5A4" />
      <rect x="228" y="228" width="50" height="8" rx="4" fill="#D4D4D8" />

      <rect x="104" y="248" width="55" height="8" rx="4" fill="#86CDA6" />
      <rect x="167" y="248" width="90" height="8" rx="4" fill="#2E9461" />

      <rect x="120" y="268" width="140" height="8" rx="4" fill="#D4D4D8" />
      <rect x="268" y="268" width="60" height="8" rx="4" fill="#0EA5A4" />

      {/* Curseur clignotant */}
      <rect x="336" y="268" width="3" height="14" rx="1" fill="#2E9461" />

      {/* Badge flottant LCP */}
      <rect x="290" y="300" width="120" height="40" rx="10" fill="white" />
      <rect x="290" y="300" width="120" height="40" rx="10" stroke="#E4E4E7" strokeWidth="1" />
      <circle cx="312" cy="320" r="8" fill="#2E9461" opacity="0.15" />
      <circle cx="312" cy="320" r="4" fill="#2E9461" />
      <rect x="326" y="314" width="50" height="6" rx="3" fill="#18181B" />
      <rect x="326" y="324" width="36" height="5" rx="2.5" fill="#71717A" />

      {/* Badge flottant score */}
      <rect x="68" y="290" width="110" height="40" rx="10" fill="white" />
      <rect x="68" y="290" width="110" height="40" rx="10" stroke="#E4E4E7" strokeWidth="1" />
      <rect x="84" y="306" width="30" height="6" rx="3" fill="#71717A" />
      <rect x="84" y="316" width="20" height="8" rx="3" fill="#2E9461" />
      <rect x="110" y="318" width="52" height="4" rx="2" fill="#DCF2E5" />

      {/* Étoiles déco */}
      <circle cx="60" cy="160" r="6" fill="#2E9461" opacity="0.3" />
      <circle cx="420" cy="200" r="8" fill="#0EA5A4" opacity="0.3" />
      <circle cx="380" cy="360" r="5" fill="#2E9461" opacity="0.2" />
      <circle cx="100" cy="380" r="7" fill="#0EA5A4" opacity="0.2" />
    </svg>
  )
}

HeroIllustration.propTypes = {
  className: PropTypes.string,
}
