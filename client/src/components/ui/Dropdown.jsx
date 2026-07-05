import { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Accessible Dropdown primitive wrapper.
 */
const Dropdown = ({
  trigger,
  children,
  align = 'right',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Esc keydown
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const aligns = {
    left: 'left-0 origin-top-left',
    right: 'right-0 origin-top-right',
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            'absolute mt-2 w-56 rounded-xl bg-white border border-zinc-200/80 shadow-premium-md z-[80] focus:outline-none p-1.5 animate-scale-in flex flex-col gap-1',
            aligns[align],
            className
          )}
          role="menu"
          aria-orientation="vertical"
        >
          <div onClick={() => setIsOpen(false)}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
