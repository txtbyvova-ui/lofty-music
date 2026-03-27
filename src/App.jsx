import Hero from './components/Hero'
import Generator from './components/Generator'
import FocusMode from './components/FocusMode'
import VideoSync from './components/VideoSync'
import VoiceClone from './components/VoiceClone'
import Spaces from './components/Spaces'
import ApiDocs from './components/ApiDocs'
import Footer from './components/Footer'
import GhostCursor from './components/GhostCursor'

const ghostProps = {
  color: '#3a015c',
  brightness: 2,
  edgeIntensity: 0,
  trailLength: 50,
  inertia: 0.5,
  grainIntensity: 0.05,
  bloomStrength: 0.1,
  bloomRadius: 1,
  bloomThreshold: 0.025,
  fadeDelayMs: 1000,
  fadeDurationMs: 1500,
}

const Divider = () => (
  <div style={{ height: 120, position: 'relative', background: '#0a0010' }}>
    <GhostCursor {...ghostProps} />
  </div>
)

export default function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Divider />
      <Generator />
      <Divider />
      <Spaces />
      <Divider />
      <VideoSync />
      <Divider />
      <FocusMode />
      <Divider />
      <VoiceClone />
      <Divider />
      <ApiDocs />
      <Footer />
    </div>
  )
}
