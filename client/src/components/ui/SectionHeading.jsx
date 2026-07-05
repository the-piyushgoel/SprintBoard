import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * SectionHeading layout component displaying metadata header content.
 */
const SectionHeading = forwardRef(({
  className,
  title,
  description,
  actions,
  divider = false,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-4 text-left w-full select-none',
        divider && 'pb-6 border-b border-zinc-200/80',
        className
      )}
      {...props}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-black text-zinc-900 tracking-tight leading-none">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-zinc-500 leading-relaxed mt-1.5">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-3 shrink-0 sm:self-center">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
});

SectionHeading.displayName = 'SectionHeading';

export default SectionHeading;
