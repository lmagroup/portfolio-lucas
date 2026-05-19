import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

const baseStyles =
  'text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-sm'

export default function AppLink({ href, to, className, children, external, ...props }) {
  const isExternal = external || (href && (href.startsWith('http') || href.startsWith('mailto')))

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseStyles, className)}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <Link to={to || href} className={cn(baseStyles, className)} {...props}>
      {children}
    </Link>
  )
}

AppLink.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  external: PropTypes.bool,
}
