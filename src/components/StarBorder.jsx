import { useMemo } from 'react'

export default function StarBorder({
  as: Component = 'button',
  className = '',
  color = 'white',
  speed = '5s',
  children,
  ...rest
}) {
  const gradientId = useMemo(() => 'star-grad-' + Math.random().toString(36).slice(2, 8), [])

  return (
    <Component
      className={className}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: '8px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        ...rest.style,
      }}
      {...(() => { const { style, ...r } = rest; return r })()}
    >
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        viewBox="0 0 200 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="transparent" />
            <stop offset="50%" stopColor={color} />
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-1 0"
              to="1 0"
              dur={speed}
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>
        <rect
          x="0.5"
          y="0.5"
          width="199"
          height="99"
          rx="6"
          ry="6"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '8px',
          border: `1px solid rgba(255,255,255,0.08)`,
          pointerEvents: 'none',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </Component>
  )
}
