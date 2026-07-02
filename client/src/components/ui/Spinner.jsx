/**
 * Reusable loading Spinner component supporting sizes and custom text color inheritance.
 */
const Spinner = ({
  size = 'md',
  className = '',
  color = 'text-primary-600',
  ...props
}) => {
  const sizes = {
    sm: 'h-4 w-4 stroke-[3px]',
    md: 'h-8 w-8 stroke-[2px]',
    lg: 'h-12 w-12 stroke-[2px]',
  };

  return (
    <div
      role="status"
      aria-label="loading"
      className={`flex items-center justify-center ${className}`}
      {...props}
    >
      <svg
        className={`animate-spin ${sizes[size]} ${color}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-15"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-85"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
