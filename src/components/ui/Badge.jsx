import PropTypes from 'prop-types'
import { cn } from '../../utils/cn'

const variants = {
  brand: 'bg-brand-100 text-brand-700',
  accent: 'bg-accent-500/10 text-accent-500',
  neutral: 'bg-neutral-100 text-neutral-700',
  success: 'bg-green-100 text-green-700',
}

export default function Badge({ variant = 'neutral', className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

Badge.propTypes = {
  variant: PropTypes.oneOf(['brand', 'accent', 'neutral', 'success']),
  className: PropTypes.string,
  children: PropTypes.node,
}
