import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColor;
uniform float uHBeamOffset, uVBeamOffset;
uniform float uHSizing, uVSizing;
uniform float uWispDensity, uWispSpeed, uWispIntensity;
uniform float uFlowSpeed, uFlowStrength;
uniform float uFogIntensity, uFogScale, uFogFallSpeed;
uniform float uDecay, uFalloffStart;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 p = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
  float t = uTime;

  vec2 flow = vec2(
    fbm(p * 3.0 + vec2(t * uFlowSpeed, 0.0)),
    fbm(p * 3.0 + vec2(0.0, t * uFlowSpeed * 0.7) + 5.0)
  ) * uFlowStrength;
  vec2 dp = p + flow;

  float hBeam = 0.0;
  for (float i = 0.0; i < 3.0; i++) {
    float yOff = uHBeamOffset + (i - 1.0) * 0.06;
    float n = fbm(vec2(dp.x * 4.0 + t * 0.5 + i * 7.3, i * 3.0)) * 0.04;
    hBeam += exp(-pow(abs(dp.y - yOff + n) * uVSizing, 1.5) * 10.0) * (1.0 - i * 0.2);
  }

  float vBeam = 0.0;
  for (float i = 0.0; i < 2.0; i++) {
    float xOff = uVBeamOffset + (i - 0.5) * 0.1;
    float n = fbm(vec2(dp.y * 4.0 + t * 0.4 + i * 5.1, i * 2.0 + 20.0)) * 0.04;
    vBeam += exp(-pow(abs(dp.x - xOff + n) * uHSizing, 1.5) * 10.0) * 0.5;
  }

  float wisps = 0.0;
  for (float i = 0.0; i < 4.0; i++) {
    vec2 wp = dp * uWispDensity + vec2(t * uWispSpeed * 0.05 * (i * 0.4 + 0.3), i * 2.1 + 3.0);
    wisps += max(noise(wp) - 0.35, 0.0) * uWispIntensity * 0.12;
  }

  float fog = fbm(dp * uFogScale * 4.0 + vec2(t * 0.08, -t * uFogFallSpeed)) * uFogIntensity;

  float dist = length(p);
  float falloff = smoothstep(uFalloffStart, uFalloffStart * 0.2, dist);

  float intensity = (hBeam + vBeam + wisps + fog) * falloff * uDecay;
  intensity = max(intensity, 0.0);

  vec3 col = uColor * intensity * 2.0;
  col += uColor * wisps * 0.4;

  float alpha = clamp(max(col.r, max(col.g, col.b)), 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`;

export default function LaserFlow({
  color = '#3a015c',
  horizontalBeamOffset = 0.0,
  verticalBeamOffset = 0.0,
  horizontalSizing = 0.9,
  verticalSizing = 4.2,
  wispDensity = 3.6,
  wispSpeed = 15,
  wispIntensity = 5,
  flowSpeed = 0.35,
  flowStrength = 0.25,
  fogIntensity = 0.45,
  fogScale = 0.3,
  fogFallSpeed = 0.6,
  decay = 1.1,
  falloffStart = 1.2,
  speed = 1,
}) {
  const mountRef = useRef(null);
  const propsRef = useRef(null);

  propsRef.current = {
    color, horizontalBeamOffset, verticalBeamOffset,
    horizontalSizing, verticalSizing, wispDensity, wispSpeed,
    wispIntensity, flowSpeed, flowStrength, fogIntensity,
    fogScale, fogFallSpeed, decay, falloffStart, speed,
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true });
    } catch {
      return;
    }

    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    camera.position.z = 1;

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2() },
      uColor: { value: new THREE.Color() },
      uHBeamOffset: { value: 0 },
      uVBeamOffset: { value: 0 },
      uHSizing: { value: 0 },
      uVSizing: { value: 0 },
      uWispDensity: { value: 0 },
      uWispSpeed: { value: 0 },
      uWispIntensity: { value: 0 },
      uFlowSpeed: { value: 0 },
      uFlowStrength: { value: 0 },
      uFogIntensity: { value: 0 },
      uFogScale: { value: 0 },
      uFogFallSpeed: { value: 0 },
      uDecay: { value: 0 },
      uFalloffStart: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    scene.add(quad);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setSize(w, h);
      renderer.setPixelRatio(dpr);
      uniforms.uResolution.value.set(w * dpr, h * dpr);
    };
    resize();
    window.addEventListener('resize', resize);
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let frameId;
    const animate = (t) => {
      frameId = requestAnimationFrame(animate);
      const p = propsRef.current;
      uniforms.uTime.value = t * 0.001 * p.speed;
      uniforms.uColor.value.set(p.color);
      uniforms.uHBeamOffset.value = p.horizontalBeamOffset;
      uniforms.uVBeamOffset.value = p.verticalBeamOffset;
      uniforms.uHSizing.value = p.horizontalSizing;
      uniforms.uVSizing.value = p.verticalSizing;
      uniforms.uWispDensity.value = p.wispDensity;
      uniforms.uWispSpeed.value = p.wispSpeed;
      uniforms.uWispIntensity.value = p.wispIntensity;
      uniforms.uFlowSpeed.value = p.flowSpeed;
      uniforms.uFlowStrength.value = p.flowStrength;
      uniforms.uFogIntensity.value = p.fogIntensity;
      uniforms.uFogScale.value = p.fogScale;
      uniforms.uFogFallSpeed.value = p.fogFallSpeed;
      uniforms.uDecay.value = p.decay;
      uniforms.uFalloffStart.value = p.falloffStart;
      renderer.render(scene, camera);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      ro.disconnect();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
