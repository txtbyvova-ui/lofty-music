import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollFloat({
  children,
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
}) {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const text = el.innerText;
    el.innerHTML = '';
    elementsRef.current = [];

    [...text].forEach((char) => {
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.style.willChange = 'transform, opacity';
      span.textContent = char === ' ' ? '\u00A0' : char;
      el.appendChild(span);
      elementsRef.current.push(span);
    });

    gsap.fromTo(
      elementsRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: animationDuration,
        ease,
        stagger,
        scrollTrigger: {
          trigger: el,
          start: scrollStart,
          end: scrollEnd,
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <div ref={containerRef} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
}
