import React, { useEffect, useRef } from 'react';

interface BackgroundProps {
  isDark: boolean;
}

export const Background: React.FC<BackgroundProps> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Noise Effect Implementation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let wWidth = window.innerWidth;
    let wHeight = window.innerHeight;

    canvas.width = wWidth;
    canvas.height = wHeight;

    const noiseData: ImageData[] = [];
    let frame = 0;
    let animationId: number;

    const createNoise = () => {
      const idata = ctx.createImageData(wWidth, wHeight);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;
      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.05) {
          // Adjust noise color based on theme: Dark noise for light mode, Light noise for dark mode (conceptually)
          // Actually, standardizing on a faint black noise usually works for "grain" on both if mixed correctly.
          // For Light mode: faint black. For Dark mode: faint white/grey.
          // Let's stick to the original implementation which was faint black (0x0f000000) - this works well in overlay mode on dark.
          // On light mode overlay, black noise darkens.
          buffer32[i] = 0x0f000000;
        }
      }
      noiseData.push(idata);
    };

    // Pre-generate 10 frames of noise
    for (let i = 0; i < 10; i++) {
      createNoise();
    }

    const paintNoise = () => {
      if (frame === 9) frame = 0;
      else frame++;
      ctx.putImageData(noiseData[frame], 0, 0);
    };

    const loop = () => {
      paintNoise();
      // Slow down the noise slightly for less chaotic flicker
      setTimeout(() => {
        animationId = requestAnimationFrame(loop);
      }, 50);
    };

    loop();

    const handleResize = () => {
      wWidth = window.innerWidth;
      wHeight = window.innerHeight;
      canvas.width = wWidth;
      canvas.height = wHeight;
      noiseData.length = 0;
      for (let i = 0; i < 10; i++) {
        createNoise();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (

    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#050511] transition-colors duration-500" style={{ zIndex: 0, minHeight: '100dvh' }}>
      {/* Aurora Background Orbs Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 1 }}>

        {/* ORB 1: Cyan/Electric Blue - Top Left */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: '-10%',
            left: '-5%',
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle at center, #22d3ee 0%, #0891b2 20%, rgba(6, 182, 212, 0.4) 40%, transparent 70%)', // More vibrant cyan
            filter: 'blur(50px)',
            animation: 'float-1 15s ease-in-out infinite',
            opacity: 0.6,
            willChange: 'transform',
          }}
        />

        {/* ORB 2: Deep Purple - Bottom Right */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            bottom: '-15%',
            right: '-5%',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle at center, #a855f7 0%, #7c3aed 20%, rgba(124, 58, 237, 0.4) 40%, transparent 70%)', // Bright neon purple
            filter: 'blur(60px)',
            animation: 'float-2 20s ease-in-out infinite',
            opacity: 0.6,
            willChange: 'transform',
          }}
        />

        {/* ORB 3: Teal/Green - Center */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: '35%',
            left: '25%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle at center, #10b981 0%, #059669 20%, rgba(16, 185, 129, 0.4) 40%, transparent 70%)', // Emerald/Green
            filter: 'blur(55px)',
            animation: 'float-3 25s ease-in-out infinite',
            opacity: 0.5,
            willChange: 'transform',
          }}
        />
      </div>

      {/* Noise Overlay */}
      <canvas
        ref={canvasRef}
        className={`absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-500`}
        style={{
          opacity: 0.15,
          mixBlendMode: 'overlay',
          zIndex: 2,
        }}
      />
    </div>
  );
};