/**
 * Reusable Card component with clean sub-divisions and layout styles (default, outlined, interactive).
 */
export const Card = ({
  children,
  className = '',
  variant = 'default',
  ...props
}) => {
  const baseClasses = 'bg-white rounded-lg transition-all duration-200';

  const variants = {
    default: 'shadow-premium border border-surface-100',
    outlined: 'border border-surface-200',
    interactive: 'shadow-premium border border-surface-100 hover:shadow-premium-hover hover:border-surface-200 cursor-pointer',
  };

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`px-6 py-4 border-b border-surface-100 flex flex-col gap-1.5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3
      className={`text-lg font-semibold text-surface-900 leading-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p
      className={`text-sm text-surface-500 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`px-6 py-4 border-t border-surface-100 flex items-center justify-end gap-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
