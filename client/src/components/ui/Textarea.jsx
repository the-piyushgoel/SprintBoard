import { forwardRef } from 'react';

/**
 * Reusable premium textarea field supporting labels, helpers, error states, and react-hook-form integration.
 */
const Textarea = forwardRef(({
  label,
  helperText,
  error,
  className = '',
  disabled = false,
  id,
  rows = 3,
  ...props
}, ref) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const helperId = `${textareaId}-helper`;

  // Determine border styles based on state
  const borderClass = error
    ? 'border-danger-500 focus:border-danger-500 focus:ring-1 focus:ring-danger-500'
    : 'border-surface-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500';

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-surface-700 select-none cursor-pointer"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        disabled={disabled}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={helperText || error ? helperId : undefined}
        className={`w-full text-sm px-3 py-2 rounded-md border bg-white text-surface-900 transition-shadow outline-none placeholder:text-surface-400 disabled:bg-surface-100 disabled:text-surface-400 disabled:cursor-not-allowed resize-y ${borderClass}`}
        {...props}
      />
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

Textarea.displayName = 'Textarea';

export default Textarea;
