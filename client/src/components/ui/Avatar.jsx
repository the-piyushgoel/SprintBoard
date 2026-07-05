import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Generates a background color based on name string hashing.
 */
const getHashColor = (name = '') => {
  const colors = [
    'bg-indigo-500 text-white',
    'bg-violet-500 text-white',
    'bg-emerald-500 text-white',
    'bg-rose-500 text-white',
    'bg-amber-500 text-white',
    'bg-sky-500 text-white',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

/**
 * Retrieves up to 2 initials from a name string.
 */
const getInitials = (name = '') => {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Avatar primitive supporting remote images and name hash fallback initials.
 */
const Avatar = forwardRef(({
  className,
  src,
  name = '',
  size = 'md',
  ...props
}, ref) => {
  const sizes = {
    sm: 'h-8 w-8 text-xs font-bold',
    md: 'h-10 w-10 text-sm font-semibold',
    lg: 'h-14 w-14 text-lg font-bold',
  };

  const hasImage = !!src;

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full border border-zinc-200/80 items-center justify-center select-none shadow-premium-sm',
        sizes[size],
        !hasImage && getHashColor(name),
        className
      )}
      {...props}
    >
      {hasImage ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;
