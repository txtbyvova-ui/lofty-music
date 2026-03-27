import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uHue;
uniform float uXOffset;
uniform float uSpeed;
uniform float uIntensity;
uniform float uSize;

vec3 hsl2rgb(float h, float s, float l) {
  vec3 rgb = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  return l + s * (rgb - 0.5) * (1.0 - abs(2.0 * l - 1.0));
}

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

float lightning(vec2 uv, float t, float seed) {
  float x = uv.x + seed * 3.7;
  float path = sin(uv.y * 3.0 + t * 2.0 + seed * 10.0) * 0.15;
  path += sin(uv.y * 7.0 + t * 3.0 + seed * 5.0) * 0.08;
  path += sin(uv.y * 13.0 + t * 5.0 + seed * 8.0) * 0.04;
  
  float n = fbm(vec2(uv.y * 4.0 + t * 2.0, seed * 20.0)) * 0.12;
  path += n;
  
  float dist = abs(x - path);
  float width = uSize * 0.008;
  float bolt = exp(-dist * dist / (width * width)) * uIntensity;
  
  float glow = exp(-dist * dist / (width * 12.0 * width)) * uIntensity * 0.3;
  
  float flicker = smoothstep(0.3, 0.7, noise(vec2(t * 8.0 + seed * 100.0, seed * 50.0)));
  flicker = mix(0.2, 1.0, flicker);
  
  float branch = 0.0;
  for (float j = 0.0; j < 3.0; j++) {
    float by = fract(uv.y * 2.0 + seed + j * 0.33);
    float bx = path + sin(by * 10.0 + t * 4.0 + j * 7.0) * 0.1;
    float bd = abs(x - bx);
    branch += exp(-bd * bd / (width * 0.5 * width * 0.5)) * uIntensity * 0.15 * smoothstep(0.0, 0.3, by) * smoothstep(1.0, 0.5, by);
  }
  
  return (bolt + glow + branch) * flicker;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  uv.x = uv.x * (uResolution.x / uResolution.y);
  float t = uTime * uSpeed;
  
  vec2 center = vec2((0.5 + uXOffset) * (uResolution.x / uResolution.y), 0.5);
  vec2 p = uv - center;
  
  float total = 0.0;
  for (float i = 0.0; i < 4.0; i++) {
    float seed = i * 0.25 + 0.1;
    vec2 bp = p * (1.0 + i * 0.15);
    bp.x += sin(t * 0.5 + i * 1.5) * 0.1;
    total += lightning(bp, t, seed);
  }
  
  float h = uHue / 360.0;
  vec3 col = hsl2rgb(h, 0.8, 0.6) * total;
  col += hsl2rgb(h + 0.05, 0.9, 0.8) * total * total * 2.0;
  col += hsl2rgb(h - 0.05, 0.6, 0.4) * total * 0.3;
  
  float fog = fbm(p * 3.0 + vec2(t * 0.1, 0.0)) * 0.04 * uIntensity;
  col += hsl2rgb(h, 0.3, 0.3) * fog;
  
  float alpha = clamp(max(col.r, max(col.g, col.b)), 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`;

export default function Lightning({
  hue = 262,
  xOffset = 0,
  speed = 0.8,
  intensity = 0.8,
  size = 0.4,
}) {
  const mountRef = useRef(null);
  const propsRef = useRef(null);

  propsRef.current = { hue, xOffset, speed, intensity, size };

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
      uHue: { value: 0 },
      uXOffset: { value: 0 },
      uSpeed: { value: 0 },
      uIntensity: { value: 0 },
      uSize: { value: 0 },
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
      uniforms.uTime.value = t * 0.001;
      uniforms.uHue.value = p.hue;
      uniforms.uXOffset.value = p.xOffset;
      uniforms.uSpeed.value = p.speed;
      uniforms.uIntensity.value = p.intensity;
      uniforms.uSize.value = p.size;
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
