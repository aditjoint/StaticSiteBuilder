import { useEffect, useRef } from 'react';

interface ScrollSnapOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

export function useScrollSnap(options: ScrollSnapOptions = {}) {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const registerSection = (index: number) => (el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current[index] = el;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Update URL hash when a section is in view
          const id = entry.target.id;
          if (id) {
            history.replaceState(null, '', `#${id}`);
          }
        }
      });
    }, {
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0.5,
    });

    // Observe all sections
    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    // Handle click events on navigation links
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash) {
        e.preventDefault();
        
        const targetElement = document.querySelector(link.hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleNavClick);

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
      document.removeEventListener('click', handleNavClick);
    };
  }, [options.rootMargin, options.threshold]);

  return { registerSection };
}
