import PropTypes from 'prop-types'
import { cn } from '../../utils/cn'

export default function Tag({ className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-md',
        'bg-neutral-100 text-neutral-700 text-sm font-medium',
        'border border-neutral-200',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

Tag.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}
