import PropTypes from 'prop-types'
import { cn } from '../../utils/cn'

export default function Card({
  className,
  children,
  hoverable = false,
  as: Tag = 'div',
  ...props
}) {
  return (
    <Tag
      className={cn(
        'bg-neutral-0 rounded-xl border border-neutral-200 shadow-card p-6',
        hoverable && [
          'transition-all duration-200 cursor-pointer',
          'hover:shadow-pop hover:-translate-y-0.5 hover:border-brand-200',
        ],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  hoverable: PropTypes.bool,
  as: PropTypes.elementType,
}
