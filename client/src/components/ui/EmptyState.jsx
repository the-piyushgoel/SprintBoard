import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Standard empty state presentation.
 */
const EmptyState = forwardRef(({
  className,
  title,
  description,
  icon,
  action,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center border border-dashed border-zinc-300 rounded-2xl bg-white select-none',
        className
      )}
      {...props}
    >
      {icon && (
        <div className="w-16 h-16 rounded-full bg-zinc-50 border border-zinc-200/80 flex items-center justify-center text-3xl mb-4 shrink-0 select-none">
          {icon}
        </div>
      )}
      <h3 className="text-base font-bold text-zinc-900 leading-snug tracking-tight">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-zinc-500 max-w-sm mt-2 leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
});

EmptyState.displayName = 'EmptyState';

export default EmptyState;
