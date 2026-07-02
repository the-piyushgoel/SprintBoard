import { useEffect } from 'react';

/**
 * Premium accessible Modal component.
 * Supports ESC to close, outside click close, body scroll locking, and keyframe animations.
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  size = 'md',
  ...props
}) => {
  // Prevent background scrolling and handle ESC close
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Handle Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-5xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/40 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      role="presentation"
      {...props}
    >
      <div
        className={`w-full bg-white rounded-lg shadow-xl border border-surface-100 flex flex-col overflow-hidden max-h-[90vh] animate-slide-up ${sizes[size]} ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100">
          <h3
            id="modal-title"
            className="text-base font-semibold text-surface-900"
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 hover:bg-surface-100 text-surface-500 hover:text-surface-700 outline-none cursor-pointer"
            aria-label="Close modal"
          >
            <svg
              className="h-4 w-4"
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
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto flex-1 text-sm text-surface-700 leading-normal">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
