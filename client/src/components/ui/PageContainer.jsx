import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Standard container constraint: max-w-7xl mx-auto px-6 lg:px-8.
 */
const PageContainer = forwardRef(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn('w-full mx-auto max-w-7xl px-6 lg:px-8', className)}
      {...props}
    >
      {children}
    </div>
  );
});

PageContainer.displayName = 'PageContainer';

export default PageContainer;
