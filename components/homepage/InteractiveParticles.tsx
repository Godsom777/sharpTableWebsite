'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@mui/material';

interface InteractiveParticlesProps {
  imageUrl?: string;
  fallbackImageUrl?: string;
  height?: string | number;
  particleCount?: number;
  color?: string;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  color: string;
}

/**
 * InteractiveParticles — Signature Interaction: Chaos → Calm
 * 
 * Sourced from Creative Direction Section 26:
 * - Intro animation: Particles start scattered in high-velocity chaos and settle into calm order
 * - Interactive: Repels smoothly around cursor and springs back to resting matrix
 * - Highly performant 60fps canvas renderer with crisp DPI scaling
 */
export const InteractiveParticles: React.FC<InteractiveParticlesProps> = ({
  fallbackImageUrl = '/assets/restaurant-moment.jpg',
  height = '60vh',
  particleCount = 1800,
  color = '#f5c57a',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean; radius: number }>({
    x: -1000,
    y: -1000,
    active: false,
    radius: 120,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let heightPx = (canvas.height = container.clientHeight);

    // Setup high DPI
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = heightPx * dpr;
    ctx.scale(dpr, dpr);

    const particles: Particle[] = [];
    const cols = Math.floor(Math.sqrt(particleCount * (width / heightPx)));
    const rows = Math.floor(particleCount / cols);
    const spacingX = width / (cols + 1);
    const spacingY = heightPx / (rows + 1);

    const colors = [
      '#f59e0b', // Amber 500
      '#fbbf24', // Amber 400
      '#d97706', // Amber 600
      '#fde68a', // Amber 200
      '#ffffff', // Crisp white accent
    ];

    // Initialize particles: scattered in chaos
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const originX = (c + 1) * spacingX + (Math.random() - 0.5) * (spacingX * 0.4);
        const originY = (r + 1) * spacingY + (Math.random() - 0.5) * (spacingY * 0.4);

        // Start far away (scattered chaos)
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * Math.max(width, heightPx) * 0.8;
        const startX = originX + Math.cos(angle) * dist;
        const startY = originY + Math.sin(angle) * dist;

        particles.push({
          x: startX,
          y: startY,
          originX,
          originY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          size: Math.random() * 1.8 + 0.8,
          baseAlpha: Math.random() * 0.5 + 0.35,
          alpha: Math.random() * 0.5 + 0.35,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    let progress = 0; // 0 = chaos, 1 = calm settled state
    let lastTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      heightPx = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = heightPx * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Chaos -> calm progress over 2.5 seconds
      if (progress < 1) {
        progress = Math.min(1, progress + dt * 0.45);
      }

      // Ease out cubic
      const settleFactor = 1 - Math.pow(1 - progress, 3);

      ctx.clearRect(0, 0, width, heightPx);

      const mouse = mouseRef.current;
      const mouseRadiusSq = mouse.radius * mouse.radius;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Target location is origin modulated by subtle ambient breathing
        const timeOffset = time * 0.001 + i * 0.1;
        const ambientX = p.originX + Math.sin(timeOffset) * 4;
        const ambientY = p.originY + Math.cos(timeOffset * 0.8) * 4;

        // Pull towards settled position
        const targetX = p.originX + (ambientX - p.originX) * settleFactor;
        const targetY = p.originY + (ambientY - p.originY) * settleFactor;

        // Spring force towards target
        const springStrength = 0.08 * settleFactor + 0.02;
        const fx = (targetX - p.x) * springStrength;
        const fy = (targetY - p.y) * springStrength;

        p.vx = (p.vx + fx) * 0.88; // Damping
        p.vy = (p.vy + fy) * 0.88;

        // Interactive mouse repulsion
        if (mouse.active && progress > 0.4) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseRadiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / mouse.radius) * 12;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.4 + settleFactor * 0.6);
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = p.size > 1.5 ? 8 : 4;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [mounted, particleCount, color]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        height,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '1.25rem',
        border: '1px solid rgba(245,158,11,0.15)',
        bgcolor: '#080808',
        boxShadow: '0 20px 60px rgba(0,0,0,0.8), inset 0 0 80px rgba(245,158,11,0.03)',
      }}
    >
      {/* Background ambient restaurant photo layer */}
      {fallbackImageUrl && (
        <Box
          component="img"
          src={fallbackImageUrl}
          alt="Restaurant service background"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.35,
            filter: 'brightness(0.65) saturate(0.85) contrast(1.1)',
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            transition: 'opacity 0.5s ease',
          }}
        />
      )}

      {/* Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: 'crosshair',
        }}
      />

      {/* Vignette & cinematic gradient overlays */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.8) 100%), ' +
            'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 40%, rgba(0,0,0,0.6) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle indicator badge */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 1.5,
          py: 0.5,
          borderRadius: '9999px',
          bgcolor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(245,158,11,0.2)',
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: 'var(--color-accent)',
            boxShadow: '0 0 8px var(--color-accent)',
          }}
        />
        <Box
          component="span"
          sx={{
            fontSize: '0.7rem',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.8)',
            letterSpacing: '0.04em',
          }}
        >
          Hover to interact
        </Box>
      </Box>
    </Box>
  );
};

export default InteractiveParticles;
