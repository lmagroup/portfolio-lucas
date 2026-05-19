import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { cn } from '../../utils/cn'

const Input = forwardRef(function Input({ className, error, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full h-10 px-3 rounded-lg text-sm bg-neutral-0 text-neutral-900',
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

Input.propTypes = {
  className: PropTypes.string,
  error: PropTypes.bool,
}

export default Input
