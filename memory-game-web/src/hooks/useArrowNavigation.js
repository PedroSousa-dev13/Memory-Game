import { useEffect } from 'react';

/**
 * Hook to enable arrow key navigation for focusable elements within a container.
 * @param {string} containerSelector - CSS selector for the container holding the buttons.
 * @param {boolean} active - Whether the navigation is currently active.
 */
export function useArrowNavigation(containerSelector, active = true) {
  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (e) => {
      const isArrowKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key);
      if (!isArrowKey) return;

      const container = document.querySelector(containerSelector);
      if (!container) return;

      // Find all focusable elements within the container
      const focusableElements = Array.from(
        container.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
      );

      if (focusableElements.length === 0) return;

      const currentIndex = focusableElements.indexOf(document.activeElement);
      let nextIndex = 0;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % focusableElements.length;
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
      }

      focusableElements[nextIndex].focus();
      e.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [containerSelector, active]);

  // Auto-focus first element on mount if active
  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        const container = document.querySelector(containerSelector);
        const first = container?.querySelector('button, input, [tabindex]:not([tabindex="-1"])');
        if (first && document.activeElement === document.body) {
          first.focus();
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [containerSelector, active]);
}
