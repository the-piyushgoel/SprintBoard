/**
 * Reusable SectionHeading component with titles, optional action slots, subtexts, and layout borders.
 */
const SectionHeading = ({
  title,
  description = '',
  actions = null,
  divider = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`flex flex-col gap-1.5 pb-4 ${
        divider ? 'border-b border-surface-200' : ''
      } ${className}`}
      {...props}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-bold text-surface-900 tracking-tight leading-tight">
          {title}
        </h2>
        {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
      </div>
      {description && (
        <p className="text-sm text-surface-500 max-w-2xl leading-normal">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
