import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Badge status pill primitive.
 */
const Badge = forwardRef(({
  className,
  variant = 'neutral',
  children,
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold select-none border tracking-wide shrink-0 transition-all';

  const variants = {
    neutral: 'bg-zinc-100 text-zinc-700 border-zinc-200',
    success: 'bg-success-50 text-success-700 border-success-100',
    warning: 'bg-warning-50 text-warning-700 border-warning-100',
    danger: 'bg-danger-50 text-danger-700 border-danger-100',
  };

  return (
    <span
      ref={ref}
      className={cn(baseClasses, variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;
