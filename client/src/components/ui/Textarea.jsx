import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Textarea primitive following shadcn API guidelines.
 */
const Textarea = forwardRef(({
  className,
  label,
  error,
  helperText,
  id,
  disabled = false,
  rows = 3,
  ...props
}, ref) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex flex-col gap-2 w-full text-left">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-xs font-semibold text-zinc-700 select-none"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        disabled={disabled}
        rows={rows}
        className={cn(
          'w-full px-3 py-2 text-sm bg-white border rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary-500/25 focus:border-primary-500 disabled:opacity-50 disabled:bg-zinc-50 transition-all duration-200 shadow-premium-sm border-zinc-200 resize-y',
          error && 'border-danger-500 focus:ring-danger-500/20 focus:border-danger-500',
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${textareaId}-error`}
          className="text-xs font-medium text-danger-600 animate-fade-in"
          role="alert"
        >
          {error}
        </p>
      )}
      {!error && helperText && (
        <p
          id={`${textareaId}-helper`}
          className="text-xs text-zinc-500 leading-normal"
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
