import PropTypes from 'prop-types'
import { cn } from '../../utils/cn'

export default function Container({ className, children, as: Tag = 'div', ...props }) {
  return (
    <Tag className={cn('container-main', className)} {...props}>
      {children}
    </Tag>
  )
}

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  as: PropTypes.elementType,
}
