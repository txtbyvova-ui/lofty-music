import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({
  count = 200, color = '#3a015c', particleSize = 1.5,
  magnetRadius = 12, ringRadius = 8, waveSpeed = 0.3,
  waveAmplitude = 0.5, autoAnimate = true, particleVariance = 0.5,
  rotationSpeed = 0, depthFactor = 1, pulseSpeed = 0,
  fieldStrength = 5, lerpSpeed = 0.05,
}) {
  const meshRef = useRef()

  const { positions, velocities, original, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    const orig = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const x = (Math.random() - 0.5) * 30
      const y = (Math.random() - 0.5) * 20
      const z = (Math.random() - 0.5) * 10 * depthFactor
      pos[i3] = x; pos[i3 + 1] = y; pos[i3 + 2] = z
      orig[i3] = x; orig[i3 + 1] = y; orig[i3 + 2] = z
      vel[i3] = 0; vel[i3 + 1] = 0; vel[i3 + 2] = 0
      sz[i] = 1 + (Math.random() - 0.5) * particleVariance * 2
    }
    return { positions: pos, velocities: vel, original: orig, sizes: sz }
  }, [count, depthFactor, particleVariance])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    return geo
  }, [positions, sizes])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const posAttr = meshRef.current.geometry.attributes.position
    const t = clock.getElapsedTime()
    const pulse = pulseSpeed > 0 ? 1 + Math.sin(t * pulseSpeed) * 0.15 : 1
    const cosR = Math.cos(t * rotationSpeed * 0.1)
    const sinR = Math.sin(t * rotationSpeed * 0.1)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      if (autoAnimate) {
        const phase = i * 0.1
        const wave = Math.sin(t * waveSpeed + phase) * waveAmplitude * 0.04
        const drift = Math.cos(t * waveSpeed * 0.5 + phase * 0.7) * waveAmplitude * 0.03
        const zWave = Math.sin(t * waveSpeed * 0.3 + phase * 1.3) * waveAmplitude * 0.02
        velocities[i3] += drift
        velocities[i3 + 1] += wave
        velocities[i3 + 2] += zWave
      }

      if (rotationSpeed > 0) {
        const ox = original[i3]
        const oz = original[i3 + 2]
        const rx = ox * cosR - oz * sinR
        const rz = ox * sinR + oz * cosR
        const dx = posAttr.array[i3] - rx
        const dy = posAttr.array[i3 + 1] - original[i3 + 1]
        const dz = posAttr.array[i3 + 2] - rz
        velocities[i3] -= dx * lerpSpeed * fieldStrength * 0.002
        velocities[i3 + 1] -= dy * lerpSpeed * fieldStrength * 0.002
        velocities[i3 + 2] -= dz * lerpSpeed * fieldStrength * 0.002
      } else {
        const dx = posAttr.array[i3] - original[i3]
        const dy = posAttr.array[i3 + 1] - original[i3 + 1]
        const dz = posAttr.array[i3 + 2] - original[i3 + 2]
        velocities[i3] -= dx * lerpSpeed * fieldStrength * 0.002
        velocities[i3 + 1] -= dy * lerpSpeed * fieldStrength * 0.002
        velocities[i3 + 2] -= dz * lerpSpeed * fieldStrength * 0.002
      }

      const damp = 0.96
      velocities[i3] *= damp
      velocities[i3 + 1] *= damp
      velocities[i3 + 2] *= damp

      posAttr.array[i3] += velocities[i3]
      posAttr.array[i3 + 1] += velocities[i3 + 1]
      posAttr.array[i3 + 2] += velocities[i3 + 2]
    }
    posAttr.needsUpdate = true

    if (meshRef.current.material) {
      meshRef.current.material.size = particleSize * 0.05 * pulse
    }
  })

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={particleSize * 0.05}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function Antigravity({
  count = 200,
  color = '#3a015c',
  particleSize = 1.5,
  magnetRadius = 12,
  ringRadius = 8,
  waveSpeed = 0.3,
  waveAmplitude = 0.5,
  autoAnimate = true,
  particleVariance = 0.5,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 0,
  particleShape = 'sphere',
  fieldStrength = 5,
  lerpSpeed = 0.05,
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 60 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ alpha: true, antialias: false }}
    >
      <Particles
        count={count}
        color={color}
        particleSize={particleSize}
        magnetRadius={magnetRadius}
        ringRadius={ringRadius}
        waveSpeed={waveSpeed}
        waveAmplitude={waveAmplitude}
        autoAnimate={autoAnimate}
        particleVariance={particleVariance}
        rotationSpeed={rotationSpeed}
        depthFactor={depthFactor}
        pulseSpeed={pulseSpeed}
        fieldStrength={fieldStrength}
        lerpSpeed={lerpSpeed}
      />
    </Canvas>
  )
}
