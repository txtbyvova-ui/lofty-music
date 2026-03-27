import { useEffect, useRef, useCallback } from 'react';

export default function PixelTrail({
  gridSize = 50,
  trailSize = 0.1,
  maxAge = 250,
  interpolate = 5,
  color = '#3a015c',
  gooeyEnabled = true,
  gooStrength = 2,
  gooeyFilter = { id: 'pixel-goo-filter', strength: 2 },
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const pixelsRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const prevMouseRef = useRef({ x: -9999, y: -9999 });

  const initPixels = useCallback((cols, rows) => {
    const pixels = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        pixels.push({ x, y, age: 0, alive: false });
      }
    }
    return pixels;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, cols, rows, cellW, cellH;

    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / gridSize);
      rows = Math.ceil(height / gridSize);
      cellW = width / cols;
      cellH = height / rows;
      pixelsRef.current = initPixels(cols, rows);
    };
    resize();

    const activatePixel = (mx, my) => {
      const col = Math.floor(mx / cellW);
      const row = Math.floor(my / cellH);
      if (col < 0 || col >= cols || row < 0 || row >= rows) return;

      const radius = Math.max(1, Math.floor(trailSize * Math.max(cols, rows)));
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const nx = col + dx;
          const ny = row + dy;
          if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) continue;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > radius) continue;
          const idx = ny * cols + nx;
          const pixel = pixelsRef.current[idx];
          if (pixel) {
            pixel.alive = true;
            pixel.age = 0;
          }
        }
      }
    };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      prevMouseRef.current = { ...mouseRef.current };
      mouseRef.current = { x: mx, y: my };

      if (interpolate > 0 && prevMouseRef.current.x > -999) {
        const dx = mx - prevMouseRef.current.x;
        const dy = my - prevMouseRef.current.y;
        const steps = interpolate;
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          activatePixel(
            prevMouseRef.current.x + dx * t,
            prevMouseRef.current.y + dy * t
          );
        }
      } else {
        activatePixel(mx, my);
      }
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', resize);

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);

      const pixels = pixelsRef.current;
      for (let i = 0; i < pixels.length; i++) {
        const p = pixels[i];
        if (!p.alive) continue;

        p.age += 16;
        if (p.age >= maxAge) {
          p.alive = false;
          p.age = 0;
          continue;
        }

        const life = 1 - p.age / maxAge;
        const alpha = life * life;
        const px = p.x * cellW;
        const py = p.y * cellH;
        const size = cellW * (0.4 + life * 0.6);
        const offset = (cellW - size) / 2;

        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.beginPath();
        ctx.arc(px + cellW / 2, py + cellH / 2, size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
      ro.disconnect();
    };
  }, [gridSize, trailSize, maxAge, interpolate, color, initPixels]);

  const filterId = gooeyFilter?.id || 'pixel-goo-filter';
  const strength = gooeyFilter?.strength || gooStrength;
  const stdDev = strength * 2.5;

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      {gooeyEnabled && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id={filterId}>
              <feGaussianBlur in="SourceGraphic" stdDeviation={stdDev} result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${18 + strength * 4} -${7 + strength * 2}`}
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
      )}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          ...(gooeyEnabled ? { filter: `url(#${filterId})` } : {}),
        }}
      />
    </div>
  );
}
