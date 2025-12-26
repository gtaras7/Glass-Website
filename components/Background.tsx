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
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50 dark:bg-[#050511] transition-colors duration-500">
      {/* Animated Mesh Gradients */}
      {/* Opacity and mix-blend adjusted for Light Mode */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400/30 dark:bg-purple-700/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] animate-blob transition-colors duration-500" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/30 dark:bg-blue-700/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] animate-blob animation-delay-2000 transition-colors duration-500" />
      <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-indigo-400/30 dark:bg-indigo-600/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000 transition-colors duration-500" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-teal-400/20 dark:bg-teal-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] animate-blob animation-delay-3000 transition-colors duration-500" />

      {/* Noise Overlay */}
      <canvas 
        ref={canvasRef} 
        className={`absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-500 ${isDark ? 'opacity-30 mix-blend-overlay' : 'opacity-10 mix-blend-multiply'}`}
      />
    </div>
  );
};