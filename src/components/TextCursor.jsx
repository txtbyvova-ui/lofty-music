import { useEffect, useRef, useCallback } from 'react';

export default function TextCursor({
  text = '🎵',
  spacing = 80,
  followMouseDirection = true,
  randomFloat = true,
  exitDuration = 0.3,
  removalInterval = 20,
  maxPoints = 10,
}) {
  const containerRef = useRef(null);
  const pointsRef = useRef([]);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const distRef = useRef(0);
  const rafRef = useRef(null);
  const intervalRef = useRef(null);

  const createPoint = useCallback((x, y, angle) => {
    const container = containerRef.current;
    if (!container) return;

    const el = document.createElement('span');
    el.textContent = text;
    el.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      font-size: 1.2rem;
      transform: translate(-50%, -50%) rotate(${followMouseDirection ? angle : 0}deg);
      transition: opacity ${exitDuration}s ease, transform ${exitDuration}s ease;
      opacity: 1;
      z-index: 9999;
    `;
    container.appendChild(el);

    const point = { el, x, y, created: Date.now() };

    if (randomFloat) {
      const dx = (Math.random() - 0.5) * 30;
      const dy = -Math.random() * 40 - 10;
      requestAnimationFrame(() => {
        el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${followMouseDirection ? angle : 0}deg)`;
        el.style.opacity = '0';
      });
    }

    pointsRef.current.push(point);

    if (pointsRef.current.length > maxPoints) {
      const old = pointsRef.current.shift();
      old.el.remove();
    }

    return point;
  }, [text, followMouseDirection, randomFloat, exitDuration, maxPoints]);

  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      distRef.current += dist;
      lastPosRef.current = { x, y };

      if (distRef.current >= spacing) {
        distRef.current = 0;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        createPoint(x, y, angle);
      }
    };

    window.addEventListener('mousemove', onMove);

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      pointsRef.current = pointsRef.current.filter((p) => {
        if (now - p.created > removalInterval * 50) {
          p.el.remove();
          return false;
        }
        return true;
      });
    }, removalInterval * 50);

    return () => {
      window.removeEventListener('mousemove', onMove);
      clearInterval(intervalRef.current);
      pointsRef.current.forEach((p) => p.el.remove());
      pointsRef.current = [];
    };
  }, [spacing, createPoint, removalInterval]);

  return <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }} />;
}
