import PropTypes from 'prop-types'
import { cn } from '../../utils/cn'
import ErrorMessage from './ErrorMessage'

export default function FormField({ label, htmlFor, error, required, hint, className, children }) {
  const errorId = error ? `${htmlFor}-error` : undefined

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-neutral-700">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {hint && <p className="text-xs text-neutral-500 -mt-0.5">{hint}</p>}

      {typeof children === 'function' ? children({ errorId }) : children}

      <ErrorMessage id={errorId}>{error}</ErrorMessage>
    </div>
  )
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  hint: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
}
