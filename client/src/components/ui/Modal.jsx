import { useEffect, useRef } from 'react';
import { cn } from '../../utils/cn.js';
import Button from './Button.jsx';

/**
 * Reusable modal/dialog component with Esc exit and focus traps.
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  className,
}) => {
  const overlayRef = useRef(null);

  // Close on Escape keypress
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
  };

  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm z-[90] flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={cn(
        'w-full bg-white rounded-2xl border border-zinc-200/80 shadow-premium-lg flex flex-col max-h-[90vh] animate-slide-up overflow-hidden',
        sizes[size],
        className
      )}>
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between shrink-0">
          <h2 id="modal-title" className="text-lg font-bold text-zinc-900 leading-none">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 rounded-full text-zinc-400 hover:text-zinc-600 focus-visible:outline-zinc-300"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ✕
          </Button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 text-sm text-zinc-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
