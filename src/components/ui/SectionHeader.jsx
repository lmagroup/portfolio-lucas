import PropTypes from 'prop-types'
import { cn } from '../../utils/cn'

export default function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'left',
  className,
  titleAs: TitleTag = 'h2',
}) {
  return (
    <div
      className={cn(
        'mb-12',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        className
      )}
    >
      {eyebrow && (
        <p className="text-sm font-semibold text-brand-600 uppercase tracking-widest mb-3">
          {eyebrow}
        </p>
      )}
      <TitleTag className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
        {title}
      </TitleTag>
      {lead && <p className="mt-4 text-lg text-neutral-500 max-w-2xl leading-relaxed">{lead}</p>}
    </div>
  )
}

SectionHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.node.isRequired,
  lead: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string,
  titleAs: PropTypes.elementType,
}
