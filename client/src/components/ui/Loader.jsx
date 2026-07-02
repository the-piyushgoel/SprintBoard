import Spinner from './Spinner.jsx';

/**
 * Reusable premium page loader supporting full-screen overlay loading states.
 */
const Loader = ({
  message = 'Loading...',
  fullScreen = true,
  ...props
}) => {
  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 bg-surface-50 flex flex-col items-center justify-center gap-4'
    : 'w-full py-12 flex flex-col items-center justify-center gap-3';

  return (
    <div
      className={containerClasses}
      role="status"
      aria-live="polite"
      {...props}
    >
      <Spinner size={fullScreen ? 'lg' : 'md'} />
      {message && (
        <p className="text-sm font-medium text-surface-500 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loader;
