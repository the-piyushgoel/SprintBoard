/**
 * Reusable Alert component for showing system actions, statuses, or block messages.
 */
const Alert = ({
  title,
  description,
  variant = 'info',
  icon = null,
  onClose = null,
  className = '',
  ...props
}) => {
  const baseClasses = 'flex p-4 rounded-md border text-sm gap-3 relative';

  const variants = {
    info: 'bg-primary-50 border-primary-100 text-primary-800',
    success: 'bg-success-50 border-success-100 text-success-800',
    warning: 'bg-warning-50 border-warning-100 text-warning-800',
    danger: 'bg-danger-50 border-danger-100 text-danger-800',
  };

  return (
    <div
      role="alert"
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && <div className="shrink-0 flex items-center justify-center h-5 w-5">{icon}</div>}
      <div className="flex-1 flex flex-col gap-1">
        {title && <span className="font-semibold leading-none">{title}</span>}
        {description && <div className="text-xs leading-relaxed opacity-90">{description}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 inline-flex items-center justify-center rounded-md p-1 hover:bg-black/5 outline-none cursor-pointer h-5 w-5"
          aria-label="Dismiss alert"
        >
          <svg
            className="h-3 w-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;
