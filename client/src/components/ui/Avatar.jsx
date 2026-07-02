/**
 * Reusable premium user Avatar supporting sizes, image loads, and dynamic name initial fallbacks.
 */
const Avatar = ({
  src = '',
  name = '',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-16 w-16 text-xl',
  };

  // Get first letter of the name
  const initials = name
    ? name.trim().split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : '?';

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-primary-100 text-primary-700 font-semibold rounded-full select-none shrink-0 border border-primary-200 ${sizes[size]} ${className}`}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={name ? `${name}'s avatar` : 'User avatar'}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <span className="leading-none">{initials}</span>
      )}
    </div>
  );
};

export default Avatar;
