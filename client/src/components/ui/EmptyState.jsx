/**
 * Reusable EmptyState component for lists, search states, or dashboards.
 */
const EmptyState = ({
  title,
  description,
  icon = null,
  action = null,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 border border-dashed border-surface-200 rounded-lg bg-white max-w-md mx-auto ${className}`}
      {...props}
    >
      {icon && (
        <div className="flex items-center justify-center p-3 rounded-full bg-surface-50 text-surface-400 mb-4 shrink-0">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-surface-900 mb-1">{title}</h3>
      <p className="text-sm text-surface-500 mb-6 max-w-xs leading-normal">{description}</p>
      {action && <div className="inline-flex shrink-0">{action}</div>}
    </div>
  );
};

export default EmptyState;
