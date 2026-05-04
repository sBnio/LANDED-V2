import { useEffect, useState } from "react";

export function StarsBackground() {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; opacity: number; animationDelay: string; animationDuration: string }[]>([]);

  useEffect(() => {
    // Generate stars only on client side to avoid hydration mismatch
    const starCount = 150;
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      opacity: Math.random() * 0.8 + 0.2,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 3 + 4}s`
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration,
            boxShadow: `0 0 ${star.size} rgba(255, 255, 255, 0.8)`
          }}
        />
      ))}
    </div>
  );
}
