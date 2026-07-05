import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Card container supporting default, outlined, and interactive variants.
 */
export const Card = forwardRef(({
  className,
  variant = 'default',
  ...props
}, ref) => {
  const baseClasses = 'bg-white rounded-2xl border transition-all duration-200';

  const variants = {
    default: 'shadow-premium-sm border-zinc-200/80',
    outlined: 'border-zinc-300 shadow-none',
    interactive: 'shadow-premium-sm border-zinc-200/80 hover:shadow-premium-md hover:border-zinc-300 cursor-pointer hover:-translate-y-0.5',
  };

  return (
    <div
      ref={ref}
      className={cn(baseClasses, variants[variant], className)}
      {...props}
    />
  );
});
Card.displayName = 'Card';

export const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-6 py-5 border-b border-zinc-100 flex flex-col gap-1.5', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-bold text-zinc-900 leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-zinc-500 leading-relaxed', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-6', className)}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-6 py-4 border-t border-zinc-100 flex items-center justify-end gap-3', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';
