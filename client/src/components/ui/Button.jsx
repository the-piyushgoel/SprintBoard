import { forwardRef } from 'react';

/**
 * Button component supporting various premium styling variants, sizes, and states.
 */
const Button = forwardRef(({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  ...props
}, ref) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  // Variant classes
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-primary-600',
    secondary: 'bg-surface-100 text-surface-900 hover:bg-surface-200 focus-visible:outline-surface-200',
    outline: 'border border-surface-200 text-surface-700 bg-white hover:bg-surface-50 hover:text-surface-900 focus-visible:outline-surface-400',
    ghost: 'text-surface-700 hover:bg-surface-100 hover:text-surface-900 focus-visible:outline-surface-400',
    danger: 'bg-danger-600 text-white hover:bg-danger-700 focus-visible:outline-danger-600',
  };

  // Size classes
  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const activeDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={activeDisabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {!loading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
