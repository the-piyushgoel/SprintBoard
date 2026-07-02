/**
 * Reusable premium status Badge/Tag supporting neutral and semantic colors.
 */
const Badge = ({
  children,
  className = '',
  variant = 'neutral',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold select-none border tracking-wide';

  const variants = {
    neutral: 'bg-surface-100 text-surface-700 border-surface-200',
    success: 'bg-success-50 text-success-700 border-success-100',
    warning: 'bg-warning-50 text-warning-700 border-warning-100',
    danger: 'bg-danger-50 text-danger-700 border-danger-100',
  };

  return (
    <span
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
