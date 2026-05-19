import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { cn } from '../../utils/cn'

const Textarea = forwardRef(function Textarea({ className, error, rows = 5, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        'w-full px-3 py-2.5 rounded-lg text-sm bg-neutral-0 text-neutral-900 resize-y',
        'border border-neutral-200 placeholder:text-neutral-400',
        'transition-colors duration-150',
        'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-0 focus:border-brand-500',
        error && 'border-red-400 focus:ring-red-400 focus:border-red-400',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-50',
        className
      )}
      aria-invalid={error ? 'true' : undefined}
      {...props}
    />
  )
})

Textarea.propTypes = {
  className: PropTypes.string,
  error: PropTypes.bool,
  rows: PropTypes.number,
}

export default Textarea
