import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

interface Point {
  x: number;
  y: number;
}

export const Cursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Mouse Position (1:1 Instant Tracking)
  // We use MotionValues directly to avoid React render loop overhead for position updates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Physics state for the tail
  const trailLength = 20;
  // Use a ref for points to manage mutable state without re-renders
  const points = useRef<Point[]>([]);
  const mousePos = useRef<Point>({ x: -100, y: -100 });
  const hoverTarget = useRef<DOMRect | null>(null);

  // Initialize points with distinct objects
  useEffect(() => {
    points.current = Array(trailLength).fill(null).map(() => ({ x: 0, y: 0 }));
  }, []);

  // Handle Magnetic Snap Animation
  useEffect(() => {
    if (isHovering && hoverTarget.current) {
        const rect = hoverTarget.current;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Snap to center with spring physics when hovering
        // This overrides the 1:1 tracking temporarily
        animate(mouseX, centerX, { type: "spring", stiffness: 300, damping: 20 });
        animate(mouseY, centerY, { type: "spring", stiffness: 300, damping: 20 });
    }
  }, [isHovering]);

  useEffect(() => {
    // Check if device is likely touch/mobile based on screen width
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (isDesktop) {
        document.body.style.cursor = 'none';
    }

    // 1. Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      // If cursor was invisible/outside, snap it to current pos to prevent "streaking"
      if (!isVisible) {
         setIsVisible(true);
         points.current.forEach(p => { p.x = e.clientX; p.y = e.clientY; });
         mouseX.set(e.clientX);
         mouseY.set(e.clientY);
      }
      
      // Always update physics reference for the tail (it creates tension even when locked)
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Update Head position 1:1 if NOT hovering (locked)
      // If hovering, the useEffect above handles the position (snap to center)
      if (!isHovering) {
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target is clickable
      const clickable = target.closest('a, button, input, textarea, [role="button"]');
      
      if (clickable) {
        const rect = clickable.getBoundingClientRect();
        hoverTarget.current = rect;
        setIsHovering(true);
      } else {
        hoverTarget.current = null;
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    const handleMouseEnter = (e: MouseEvent) => {
        setIsVisible(true);
        // Snap points on entry
        points.current.forEach(p => { p.x = e.clientX; p.y = e.clientY; });
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver, { capture: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('resize', handleResize);
    handleResize();

    // 2. Animation Loop for Canvas (The Tail)
    let animationFrameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      
      if (canvas && ctx && points.current.length > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update Physics (Rope effect)
        let leaderX = mousePos.current.x;
        let leaderY = mousePos.current.y;
        
        // Only animate/draw tail if NOT hovering and is visible
        if (!isHovering && isVisible) {
            // The "Leader" point follows mouse with a slight easing for smoother start
            points.current[0] = {
                x: points.current[0].x + (leaderX - points.current[0].x) * 0.3, 
                y: points.current[0].y + (leaderY - points.current[0].y) * 0.3
            };

            // Subsequent points follow the previous point (Chain/Rope physics)
            for (let i = 1; i < points.current.length; i++) {
                const prev = points.current[i - 1];
                const curr = points.current[i];
                
                // Lerp factor determines "lag" or "weight" of the tail
                points.current[i] = {
                    x: curr.x + (prev.x - curr.x) * 0.25, 
                    y: curr.y + (prev.y - curr.y) * 0.25
                };
            }

            // Draw Filament
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            for (let i = 0; i < points.current.length - 1; i++) {
                const p1 = points.current[i];
                const p2 = points.current[i + 1];

                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                
                // Color Gradient: Cyan (#00FFFF) to Deep Purple (#8A2BE2)
                const progress = i / points.current.length;
                
                // Cyan: 0, 255, 255
                // Purple: 138, 43, 226
                const r = 0 + (138 - 0) * progress;
                const g = 255 + (43 - 255) * progress;
                const b = 255 + (226 - 255) * progress;
                const a = 1 - progress; // Fade opacity towards end

                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
                ctx.lineWidth = 3 * (1 - progress); // Taper width
                
                ctx.stroke();
            }
        } else {
             // When hovering or invisible, collapse tail to mouse position instantly
             // This prevents the tail from "jumping" when leaving a button
             for (let i = 0; i < points.current.length; i++) {
                 points.current[i] = { x: leaderX, y: leaderY };
             }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      document.body.style.cursor = 'auto'; // Restore default cursor
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver, { capture: true });
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovering, isVisible]); 

  return (
    <>
      <canvas 
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none z-[55] hidden md:block ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      />

      <motion.div
        className={`fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[60] mix-blend-difference hidden md:block ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          x: mouseX, 
          y: mouseY, 
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          width: isHovering ? 40 : 8,
          height: isHovering ? 40 : 8,
          backgroundColor: isHovering ? "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, 1)",
          border: isHovering ? "1px solid white" : "0px solid white",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.5
        }}
      />
    </>
  );
};