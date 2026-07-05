import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Dropdown Select primitive matching shadcn visual style.
 */
const Select = forwardRef(({
  className,
  label,
  error,
  id,
  options = [],
  disabled = false,
  children,
  ...props
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex flex-col gap-2 w-full text-left">
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-semibold text-zinc-700 select-none"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          className={cn(
            'w-full px-3 py-2 text-sm bg-white border rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary-500/25 focus:border-primary-500 disabled:opacity-50 disabled:bg-zinc-50 transition-all duration-200 shadow-premium-sm border-zinc-200 appearance-none cursor-pointer pr-10',
            error && 'border-danger-500 focus:ring-danger-500/20 focus:border-danger-500',
            className
          )}
          aria-invalid={!!error}
          {...props}
        >
          {children || options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Custom Chevron Icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-zinc-400 select-none">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p
          id={`${selectId}-error`}
          className="text-xs font-medium text-danger-600 animate-fade-in"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
