import React, { useEffect, useRef } from 'react';

export function DubaiSkyline({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    
    const setSize = () => {
        width = canvas.clientWidth || window.innerWidth;
        height = canvas.clientHeight || window.innerHeight;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    };
    setSize();
    window.addEventListener('resize', setSize);

    const particles: any[] = [];
    
    // Generator helpers
    const addParticle = (x: number, y: number, z: number, hue: number, sizeMul: number = 1) => {
        particles.push({
            baseX: x,
            baseY: y,
            baseZ: z,
            // Add some jitter for the organic/data look
            offsetX: (Math.random() - 0.5) * 3,
            offsetY: (Math.random() - 0.5) * 3,
            offsetZ: (Math.random() - 0.5) * 3,
            speedOffset: Math.random() * Math.PI * 2,
            size: (Math.random() * 1.5 + 0.5) * sizeMul,
            hue
        });
    };

    // 1. Ground Plane Engine Grid
    for(let x = -1600; x <= 1600; x += 40) {
        for(let z = -400; z <= 400; z += 40) {
            if (Math.random() > 0.4) {
                addParticle(x + (Math.random()-0.5)*15, 0 + (Math.random()-0.5)*5, z + (Math.random()-0.5)*15, 15, 0.4);
            }
        }
    }

    // 2. Dubai Skyline Math Models
    
    // Burj Khalifa (The Core)
    for(let i=0; i<450; i++) {
        const t = Math.pow(Math.random(), 1.5); // More particles at bottom
        const h = 450;
        const y = t * h;
        // Tiered width
        const tiers = 7;
        const tierLevel = Math.floor(t * tiers);
        const maxRadius = 40;
        const r = Math.max(2, maxRadius * (1 - tierLevel/tiers));
        const angle = Math.random() * Math.PI * 2;
        addParticle(Math.cos(angle)*r, y, Math.sin(angle)*r, 20, 1.3); // YC Orange base
    }

    // Museum of the Future (Torus)
    for(let i=0; i<250; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const R = 40; 
        const r = 15;  
        // Tilted torus
        let px = (R + r * Math.cos(v)) * Math.cos(u);
        let py = (R + r * Math.cos(v)) * Math.sin(u);
        let pz = r * Math.sin(v) * 0.4;
        
        // Tilt
        const tilt = 0.2;
        const ty = py * Math.cos(tilt) - pz * Math.sin(tilt);
        const tz = py * Math.sin(tilt) + pz * Math.cos(tilt);

        addParticle(-200 + px, 50 + ty, tz, 25, 1);
    }

    // Burj Al Arab (Sail)
    for(let i=0; i<300; i++) {
        const t = Math.random(); 
        const y = t * 200;
        const backX = 220; 
        const frontX = 220 + 70 * Math.sin(t * Math.PI); 
        const px = backX + Math.random() * (frontX - backX);
        const pz = (Math.random() - 0.5) * 25 * (1 - t*0.8); 
        addParticle(px, y, pz, 15, 1);
    }

    // Cayan Tower (Twisting)
    for(let i=0; i<200; i++) {
        const t = Math.random();
        const y = t * 220;
        const twist = t * Math.PI / 2; // 90 degree twist
        const r = 18;
        const a = Math.random() * Math.PI * 2;
        const lx = Math.cos(a) * r;
        const lz = Math.sin(a) * r;
        
        const px = -380 + lx * Math.cos(twist) - lz * Math.sin(twist);
        const pz = lx * Math.sin(twist) + lz * Math.cos(twist);
        
        addParticle(px, y, pz, 10, 1);
    }

    // Emirates Towers (Twin Triangles)
    for(let p=0; p<2; p++) {
        const height = 220 - p*40;
        const baseX = 380 + p*70;
        for(let i=0; i<150; i++) {
            const t = Math.random();
            const y = t * height;
            // Triangle base
            const side = Math.random();
            let lx, lz;
            const w = 20 * (1 - t*0.5);
            if (side < 0.33) {
                lx = -w + Math.random() * 2*w;
                lz = -w;
            } else if (side < 0.66) {
                lx = -w + Math.random() * 2*w;
                lz = lx; // slope
            } else {
                lx = -w;
                lz = -w + Math.random() * 2*w;
            }
            addParticle(baseX + lx, y, lz, 30, 1);
        }
    }

    // Dubai Frame
    for(let i=0; i<150; i++) {
        const s = Math.random();
        const isVert = Math.random() > 0.4;
        let px, py;
        if (isVert) {
            px = Math.random() > 0.5 ? -550 : -470;
            py = s * 140;
        } else {
            px = -550 + s * 80;
            py = Math.random() > 0.5 ? 0 : 140;
        }
        addParticle(px, py, (Math.random()-0.5)*10, 35, 1.2);
    }

    // Fillers (General skyscrapers)
    for(let b=0; b<80; b++) {
        const bx = -1400 + Math.random() * 2800;
        const bz = -300 + Math.random() * 600;
        const bh = 50 + Math.random() * 150;
        const bw = 12 + Math.random() * 22;
        // Don't overlap main features too closely
        if (Math.abs(bx) < 80 || (bx > 150 && bx < 280) || (bx > -250 && bx < -120)) continue;

        for(let i=0; i<50; i++) {
            const t = Math.random();
            const px = bx + (Math.random()-0.5) * bw;
            const py = t * bh;
            const pz = bz + (Math.random()-0.5) * bw;
            addParticle(px, py, pz, 10 + Math.random()*25, 0.7);
        }
    }

    let time = 0;
    let animationFrameId: number;

    const render = () => {
      time += 0.003; // Majestic, slow, cinematic rotation
      
      // Clear with trailing alpha for smooth glowing tails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      
      const cx = width / 2;
      const cy = height * 0.75; // Anchor landscape to see buildings fully

      // Keep scale balanced so buildings remain recognizable while spanning wide screens
      const scale = width < 768 ? 0.35 : Math.max(0.75, width / 2000);
      
      // AI / Data network scanning effect
      const scanX = Math.sin(time * 3) * 1200;

      const projected = particles.map(p => {
          // Floating data effect
          const fluidY = Math.sin(time * 5 + p.speedOffset * 2) * 2;
          const fluidX = Math.cos(time * 4 + p.speedOffset) * 1.5;
          
          let x = p.baseX + fluidX + p.offsetX;
          let y = p.baseY + fluidY + p.offsetY;
          let z = p.baseZ + p.offsetZ;

          // Camera pan/sway
          const angleY = Math.sin(time * 0.5) * 0.2; // Gentle orbit
          const panX = Math.cos(time * 0.3) * 60;
          
          x -= panX;

          const rotX = x * Math.cos(angleY) - z * Math.sin(angleY);
          const rotZ = x * Math.sin(angleY) + z * Math.cos(angleY);
          
          y = -y; // Canvas y inversion

          const perspective = 900 / (900 + rotZ); 
          const finalX = cx + (rotX * perspective) * scale;
          const finalY = cy + (y * perspective) * scale;

          return {
              x: finalX,
              y: finalY,
              z: rotZ,
              perspective,
              p
          };
      });

      // Draw mathematical connection webs
      ctx.lineWidth = 0.6;
      
      for (let i = 0; i < projected.length; i+=2) {
          const p1 = projected[i];
          
          for(let j = i+1; j < Math.min(i+6, projected.length); j++) {
              const p2 = projected[j];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const distSq = dx*dx + dy*dy;
              
              if (distSq < 15000 * scale * scale) { 
                  let lineOpacity = (1 - distSq / (15000 * scale * scale)) * 0.35;
                  
                  // Scanline reveal effect
                  const distToScan = Math.abs(p1.p.baseX - scanX);
                  if (distToScan < 180) {
                      lineOpacity *= 1 + (1 - distToScan/180) * 4; // Intense brightness at scan
                  }

                  // YC theme: Hues around 10-40 (Orange to Warm Orange)
                  const hue = 15 + (p1.p.hue % 20); 
                  ctx.strokeStyle = `hsla(${hue}, 100%, 65%, ${lineOpacity})`;
                  ctx.beginPath();
                  ctx.moveTo(p1.x, p1.y);
                  ctx.lineTo(p2.x, p2.y);
                  ctx.stroke();
              }
          }
      }

      // Draw individual point nodes
      projected.forEach(proj => {
          // Frustum cull
          if (proj.x < -50 || proj.x > width + 50 || proj.y < -50 || proj.y > height + 50) return; 

          const distToScan = Math.abs(proj.p.baseX - scanX);
          let brightnessMul = 1;
          if (distToScan < 120) {
              brightnessMul = 1 + (1 - distToScan/120) * 3;
          }

          // Depth fog
          const depthAlpha = Math.max(0.05, 1 - (proj.z + 300) / 800);
          const alpha = 0.7 * depthAlpha * brightnessMul;
          
          const hue = 15 + (proj.p.hue % 25); 
          ctx.fillStyle = `hsla(${hue}, 100%, 55%, ${alpha})`;
          
          const size = proj.p.size * proj.perspective * scale * brightnessMul * 0.9;

          ctx.beginPath();
          ctx.arc(proj.x, proj.y, Math.max(0.5, size), 0, Math.PI * 2);
          ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
        window.removeEventListener('resize', setSize);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
        {/* Ambient base glow to ground the city */}
        <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-orange-900/10 via-red-900/5 to-transparent mix-blend-screen pointer-events-none" />
        <canvas 
            ref={canvasRef} 
            className="block w-full h-full pointer-events-none"
            style={{ 
                filter: "drop-shadow(0 0 20px rgba(234, 88, 12, 0.4))",
            }}
        />
    </div>
  );
}
