import { forwardRef } from 'react';

/**
 * Reusable premium input field supporting labels, helpers, error/success states, icons, and react-hook-form integration.
 */
const Input = forwardRef(({
  label,
  helperText,
  error,
  success,
  icon = null,
  type = 'text',
  className = '',
  disabled = false,
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const helperId = `${inputId}-helper`;

  // Determine border and outline styles based on state
  let borderClass = 'border-surface-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500';
  if (error) {
    borderClass = 'border-danger-500 focus:border-danger-500 focus:ring-1 focus:ring-danger-500';
  } else if (success) {
    borderClass = 'border-success-500 focus:border-success-500 focus:ring-1 focus:ring-success-500';
  }

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-surface-700 select-none cursor-pointer"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-surface-400 pointer-events-none flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          id={inputId}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={helperText || error ? helperId : undefined}
          className={`w-full text-sm px-3 py-2 rounded-md border bg-white text-surface-900 transition-shadow outline-none placeholder:text-surface-400 disabled:bg-surface-100 disabled:text-surface-400 disabled:cursor-not-allowed ${
            icon ? 'pl-9' : ''
          } ${borderClass}`}
          {...props}
        />
      </div>
      {(error || helperText) && (
        <p
          id={helperId}
          className={`text-xs select-none ${
            error ? 'text-danger-600 font-medium' : 'text-surface-500'
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
