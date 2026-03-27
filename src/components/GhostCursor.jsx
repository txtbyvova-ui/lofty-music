import { useEffect, useRef } from 'react';

export default function GhostCursor({
  color = '#3a015c',
  brightness = 2,
  edgeIntensity = 0,
  trailLength = 50,
  inertia = 0.5,
  grainIntensity = 0.05,
  bloomStrength = 0.1,
  bloomRadius = 1,
  bloomThreshold = 0.025,
  fadeDelayMs = 1000,
  fadeDurationMs = 1500,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const br = Math.min(255, Math.round(r * brightness));
    const bg = Math.min(255, Math.round(g * brightness));
    const bb = Math.min(255, Math.round(b * brightness));

    let width, height, dpr;
    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const trail = [];
    let mouseX = -9999, mouseY = -9999;
    let smoothX = -9999, smoothY = -9999;
    let lastMoveTime = 0;
    let isInside = false;
    let frameId;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      lastMoveTime = performance.now();
      if (!isInside) {
        smoothX = mouseX;
        smoothY = mouseY;
      }
      isInside = true;
    };
    const onMouseEnter = () => { isInside = true; };
    const onMouseLeave = () => {
      isInside = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', resize);

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (isInside && mouseX > -999) {
        smoothX += (mouseX - smoothX) * (1 - inertia);
        smoothY += (mouseY - smoothY) * (1 - inertia);
        trail.push({ x: smoothX, y: smoothY });
      }

      while (trail.length > trailLength) trail.shift();

      const now = performance.now();
      const timeSinceMove = now - lastMoveTime;
      let fadeAlpha = 1;
      if (timeSinceMove > fadeDelayMs) {
        fadeAlpha = Math.max(0, 1 - (timeSinceMove - fadeDelayMs) / fadeDurationMs);
      }

      ctx.clearRect(0, 0, width, height);
      if (trail.length < 2 || fadeAlpha <= 0) return;

      ctx.globalCompositeOperation = 'lighter';

      // Bloom layer
      if (bloomStrength > 0) {
        for (let i = 1; i < trail.length; i++) {
          const t = i / trail.length;
          const p = trail[i];
          const alpha = t * fadeAlpha * bloomStrength * 0.4;
          if (alpha < bloomThreshold) continue;
          const size = (6 + t * 24) * bloomRadius;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
          grad.addColorStop(0, `rgba(${br},${bg},${bb},${Math.min(alpha, 1)})`);
          grad.addColorStop(0.4, `rgba(${r},${g},${b},${Math.min(alpha * 0.4, 1)})`);
          grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Core trail with connecting lines
      for (let i = 1; i < trail.length; i++) {
        const t = i / trail.length;
        const p = trail[i];
        const prev = trail[i - 1];
        const alpha = t * fadeAlpha * 0.7;
        const size = 1.5 + t * 5;

        // Line segment
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(${br},${bg},${bb},${Math.min(alpha * 0.9, 1)})`;
        ctx.lineWidth = size * 0.6;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Core glow dot
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 1.8);
        grad.addColorStop(0, `rgba(${br},${bg},${bb},${Math.min(alpha, 1)})`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${Math.min(alpha * 0.4, 1)})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Edge highlight
        if (edgeIntensity > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,255,255,${Math.min(alpha * edgeIntensity * 0.5, 1)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      ctx.globalCompositeOperation = 'source-over';

      // Lightweight grain
      if (grainIntensity > 0 && fadeAlpha > 0) {
        const count = Math.floor(width * height * 0.0005 * grainIntensity);
        for (let i = 0; i < count; i++) {
          const gx = Math.random() * width;
          const gy = Math.random() * height;
          const ga = Math.random() * grainIntensity * fadeAlpha * 0.15;
          ctx.fillStyle = `rgba(${br},${bg},${bb},${ga})`;
          ctx.fillRect(gx, gy, 1, 1);
        }
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
      ro.disconnect();
    };
  }, [color, brightness, edgeIntensity, trailLength, inertia, grainIntensity, bloomStrength, bloomRadius, bloomThreshold, fadeDelayMs, fadeDurationMs]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
    </div>
  );
}
