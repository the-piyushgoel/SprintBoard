/**
 * Reusable wrapper to enforce standard container widths, padding, and responsive breakpoints across screens.
 */
const PageContainer = ({
  children,
  className = '',
  maxWidth = '7xl',
  ...props
}) => {
  const widths = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1400px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 ${widths[maxWidth]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default PageContainer;
