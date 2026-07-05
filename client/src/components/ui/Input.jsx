import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Text-based Input primitive matching shadcn API design.
 */
const Input = forwardRef(({
  className,
  label,
  error,
  helperText,
  id,
  type = 'text',
  disabled = false,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex flex-col gap-2 w-full text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-zinc-700 select-none"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        disabled={disabled}
        className={cn(
          'w-full px-3 py-2 text-sm bg-white border rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary-500/25 focus:border-primary-500 disabled:opacity-50 disabled:bg-zinc-50 transition-all duration-200 shadow-premium-sm border-zinc-200',
          error && 'border-danger-500 focus:ring-danger-500/20 focus:border-danger-500',
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          className="text-xs font-medium text-danger-600 animate-fade-in"
          role="alert"
        >
          {error}
        </p>
      )}
      {!error && helperText && (
        <p
          id={`${inputId}-helper`}
          className="text-xs text-zinc-500 leading-normal"
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
