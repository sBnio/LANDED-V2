import React, { useEffect, useRef } from 'react';

export function BiologicalHeart({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 600;
    let height = 600;
    
    // Handle high DPI displays for super crispness
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const particles: any[] = [];
    const numParticles = 400; // Dense enough for tissue, sparse enough to perform well
    
    for (let i = 0; i < numParticles; i++) {
        const t = Math.PI * 2 * Math.random();
        // Biological distribution: concentrate more particles in the 'shell'
        const distribution = Math.pow(Math.random(), 0.5);
        const thickness = distribution * 28; 
        
        // Exact parametric equation for a heart
        const baseX = 16 * Math.pow(Math.sin(t), 3);
        const baseY = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
        
        // 3D spherical noise displacement
        const angle2 = Math.PI * 2 * Math.random();
        const offsetX = Math.cos(angle2) * thickness;
        const offsetY = Math.sin(angle2) * thickness;
        const offsetZ = (Math.random() - 0.5) * 50 * distribution;

        particles.push({
            t,
            baseX,
            baseY,
            offsetX,
            offsetY,
            z: offsetZ,
            speedOffset: Math.random() * Math.PI * 2,
            size: Math.random() * 1.5 + 0.8,
            colorHue: 345 + Math.random() * 20 // Crimson to deep red
        });
    }

    // Aorta and pulmonary artery structure points
    for(let i=0; i<80; i++) {
       particles.push({
           t: 0,
           baseX: (Math.random() - 0.5) * 12,
           baseY: 14 + Math.random() * 15, 
           offsetX: (Math.random() - 0.5) * 8,
           offsetY: Math.random() * 8,
           z: (Math.random() - 0.5) * 20,
           speedOffset: Math.random() * Math.PI * 2,
           size: Math.random() * 1.5 + 0.8,
           colorHue: 350
       });
    }

    let time = 0;
    let animationFrameId: number;

    const render = () => {
      time += 0.015;
      
      // Heartbeat pattern: "Lub-Dub... Lub-Dub..."
      // Typical cardiac cycle: 0 -> Ventricular Systole -> Diastole
      const cycle = time % 1.5; // cycle length
      let pulseMultiplier = 1;
      
      // Systole 'Lub'
      if (cycle < 0.15) {
          pulseMultiplier = 1 + Math.sin(cycle * (Math.PI / 0.15)) * 0.12;
      } 
      // Systole 'Dub'
      else if (cycle > 0.25 && cycle < 0.45) {
          pulseMultiplier = 1 + Math.sin((cycle - 0.25) * (Math.PI / 0.2)) * 0.08;
      }
      
      const scale = 11; 
      const pulse = scale * pulseMultiplier;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      
      const cx = width / 2;
      const cy = height / 2 + 10;

      // Project points to 3D space
      const projected = particles.map(p => {
          // Fluid organic jitter
          const fluidX = Math.sin(time * 3 + p.speedOffset) * 1.5;
          const fluidY = Math.cos(time * 3 + p.speedOffset * 0.8) * 1.5;

          // Slow rotation around the Y-axis to give it depth
          const angleY = Math.sin(time * 0.5) * 0.4; // gentle twist back and forth
          
          let x = p.baseX * pulse + p.offsetX * (pulse/scale) + fluidX;
          let y = p.baseY * pulse + p.offsetY * (pulse/scale) + fluidY;
          let z = p.z * (pulse/scale);
          
          const rotX = x * Math.cos(angleY) - z * Math.sin(angleY);
          const rotZ = x * Math.sin(angleY) + z * Math.cos(angleY);
          
          y = -y; // Invert Y purely for canvas drawing

          const perspective = 500 / (500 + rotZ);
          const finalX = cx + rotX * perspective;
          const finalY = cy + y * perspective;

          return {
              x: finalX,
              y: finalY,
              z: rotZ,
              p
          };
      });

      // Draw vascular network connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projected.length; i++) {
          const p1 = projected[i];
          for (let j = i + 1; j < projected.length; j++) {
              const p2 = projected[j];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const distSq = dx*dx + dy*dy;
              
              if (distSq < 1500) { 
                  const opacity = (1 - distSq / 1500) * 0.3 * (pulseMultiplier * 0.9);
                  ctx.strokeStyle = `hsla(${p1.p.colorHue}, 100%, 65%, ${opacity})`;
                  ctx.beginPath();
                  ctx.moveTo(p1.x, p1.y);
                  ctx.lineTo(p2.x, p2.y);
                  ctx.stroke();
              }
          }
      }

      // Draw active blood cells / nodes
      projected.forEach(proj => {
          const perspective = 500 / (500 + proj.z);
          // Darken particles further back
          const depthAlpha = Math.max(0.1, 1 - (proj.z + 50) / 100);
          const alpha = 0.8 * depthAlpha * (pulseMultiplier > 1 ? 1 : 0.8);
          
          ctx.fillStyle = `hsla(${proj.p.colorHue}, 100%, 70%, ${alpha})`;
          
          // Nodes pulse and dilate during heartbeat
          let size = proj.p.size * perspective;
          if (pulseMultiplier > 1) {
              size *= Math.pow(pulseMultiplier, 2); 
          }

          ctx.beginPath();
          ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
          ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
        {/* Core background biological aura */}
        <div className="absolute inset-0 bg-red-900/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute w-[60%] h-[60%] bg-gradient-to-t from-rose-900/20 to-red-600/10 rounded-full blur-3xl mix-blend-screen" />
        
        <canvas 
            ref={canvasRef} 
            className="relative z-10 w-full max-w-[600px] aspect-square object-contain mx-auto"
            style={{ 
                filter: "drop-shadow(0 0 20px rgba(225, 29, 72, 0.4)) drop-shadow(0 0 60px rgba(225, 29, 72, 0.2))",
                pointerEvents: "none"
            }}
        />
    </div>
  );
}
