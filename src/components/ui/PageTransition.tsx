import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  show: boolean;
  onComplete: () => void;
}

export function PageTransition({ show, onComplete }: PageTransitionProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!show) {
      setStage(0);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    setStage(0);
    const timers = [
      setTimeout(() => setStage(1), 200),
      setTimeout(() => setStage(2), 600),
      setTimeout(() => setStage(3), 1000),
      setTimeout(() => {
        onComplete();
      }, 1800)
    ];

    return () => timers.forEach(clearTimeout);
  }, [show, onComplete]);

  if (!show) return null;

  return createPortal(
    <div 
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-300 bg-black",
        stage >= 4 ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      )}
    >
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1000_0%,#000000_70%)]" />
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[300px]">
        {/* Logo */}
        <div 
          style={{ transitionDuration: '400ms' }}
          className={cn(
            "font-bold text-[28px] text-white transition-opacity ease-in-out flex items-center tracking-tighter lowercase font-heading",
            stage >= 1 ? "opacity-100" : "opacity-0"
          )}
        >
          landed.
          <span className="w-[0.3em] h-[0.3em] bg-[#F59E0B] rounded-full ml-[0.05em] mb-[0.05em]"></span>
        </div>

        {/* Tagline */}
        <div 
          style={{ transitionDuration: '400ms' }}
          className={cn(
            "mt-2 text-[16px] text-[#94A3B8] tracking-[0.05em] transition-opacity ease-in-out font-medium",
            stage >= 2 ? "opacity-100" : "opacity-0"
          )}
        >
          Let's get you landed. 🇦🇪
        </div>

        {/* Progress bar container */}
        <div 
          className={cn(
            "mt-8 w-[200px] h-[2px] bg-[#1a1a1a] rounded-full overflow-hidden transition-opacity duration-400 ease-in-out",
            stage >= 3 ? "opacity-100" : "opacity-0"
          )}
        >
           <div 
             className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#ffffff]"
             style={{ 
               width: stage >= 3 ? '100%' : '0%',
               transitionProperty: 'width',
               transitionDuration: '700ms',
               transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
             }}
           />
        </div>
      </div>
    </div>,
    document.body
  );
}
