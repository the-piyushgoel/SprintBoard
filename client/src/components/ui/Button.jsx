import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Button component supporting standard variants, sizes, loading, and icon indicators.
 * Follows composable shadcn API philosophy.
 */
const Button = forwardRef(({
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  ...props
}, ref) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer';

  // Variant styles matching the Zinc/Indigo theme
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-premium-sm focus-visible:outline-primary-500',
    secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:bg-zinc-300 focus-visible:outline-zinc-400',
    outline: 'border border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 hover:text-zinc-950 active:bg-zinc-100 focus-visible:outline-zinc-400 shadow-premium-sm',
    ghost: 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 active:bg-zinc-200 focus-visible:outline-zinc-400',
    danger: 'bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-700 shadow-premium-sm focus-visible:outline-danger-500',
  };

  // Size styles aligned with the typography & padding rules
  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-2',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-2.5 gap-3',
  };

  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-0.5 h-4 w-4 text-current shrink-0"
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
      {!loading && leftIcon && <span className="inline-flex shrink-0 select-none">{leftIcon}</span>}
      <span className="truncate">{children}</span>
      {!loading && rightIcon && <span className="inline-flex shrink-0 select-none">{rightIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
