import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines tailwind-merge and clsx for dynamic, conflicting Tailwind class merges.
 * @param  {...any} inputs - Class names, conditional objects, or arrays
 * @returns {string} Merged class list
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
