import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Checkbox component supporting standard styling.
 */
const Checkbox = forwardRef(({
  className,
  label,
  id,
  disabled = false,
  error,
  ...props
}, ref) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex items-start gap-2 text-left">
      <div className="flex items-center h-5">
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          disabled={disabled}
          className={cn(
            'h-4 w-4 rounded border-zinc-300 text-primary-600 focus:ring-primary-500/25 disabled:opacity-50 cursor-pointer',
            error && 'border-danger-500',
            className
          )}
          {...props}
        />
      </div>
      {label && (
        <div className="text-sm select-none">
          <label
            htmlFor={checkboxId}
            className={cn(
              'font-medium text-zinc-700 cursor-pointer',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {label}
          </label>
          {error && (
            <p className="text-xs font-medium text-danger-600 mt-1">{error}</p>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
