import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { cn } from '../../utils/cn'

const variants = {
  primary:
    'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-soft hover:shadow-card',
  secondary:
    'bg-neutral-0 text-neutral-800 border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 shadow-soft',
  ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
  link: 'bg-transparent text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline p-0 h-auto',
}

const sizes = {
  sm: 'h-8 px-3 text-sm gap-1.5 rounded-md',
  md: 'h-10 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-12 px-6 text-base gap-2.5 rounded-lg',
}

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    className,
    children,
    disabled,
    loading,
    type = 'button',
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        variant !== 'link' && sizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      {loading && (
        <span
          className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  )
})

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'link']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
}

export default Button
