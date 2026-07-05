import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Skeleton primitive helper supporting custom height/width classes.
 */
const Skeleton = forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn('animate-pulse rounded bg-zinc-200/90', className)}
      {...props}
    />
  );
});

Skeleton.displayName = 'Skeleton';

export default Skeleton;
