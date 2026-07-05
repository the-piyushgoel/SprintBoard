import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Alert box primitive supporting semantic border highlight variants.
 */
const Alert = forwardRef(({
  className,
  title,
  description,
  variant = 'neutral',
  icon,
  ...props
}, ref) => {
  const baseClasses = 'p-4 rounded-xl border flex gap-3 text-sm leading-relaxed';

  const variants = {
    neutral: 'bg-zinc-50 text-zinc-800 border-zinc-200',
    success: 'bg-success-50 text-success-800 border-success-200',
    warning: 'bg-warning-50 text-warning-800 border-warning-200',
    danger: 'bg-danger-50 text-danger-800 border-danger-200',
  };

  const textColors = {
    neutral: 'text-zinc-900',
    success: 'text-success-900',
    warning: 'text-warning-900',
    danger: 'text-danger-900',
  };

  return (
    <div
      ref={ref}
      className={cn(baseClasses, variants[variant], className)}
      role="alert"
      {...props}
    >
      {icon && <div className="text-lg shrink-0 select-none leading-none mt-0.5">{icon}</div>}
      <div className="flex flex-col gap-1 text-left">
        {title && (
          <h4 className={cn('font-bold tracking-tight', textColors[variant])}>
            {title}
          </h4>
        )}
        {description && <p className="text-xs opacity-90">{description}</p>}
      </div>
    </div>
  );
});

Alert.displayName = 'Alert';

export default Alert;
