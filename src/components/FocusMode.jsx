import { useState } from 'react'
import PixelTrail from './PixelTrail'

const MODES = {
  'Deep Focus · 60-70 BPM': { title: 'Deep Focus Mode', timer: '24:37', ringSpeed: '4s', coreColor: '#3a015c' },
  'Light Work · 80-90 BPM': { title: 'Light Work Mode', timer: '15:00', ringSpeed: '6s', coreColor: '#5a189a' },
  'Creative Flow · Variable': { title: 'Creative Flow', timer: '45:00', ringSpeed: '3s', coreColor: '#220135' },
  'Power Nap · 40-50 BPM': { title: 'Power Nap Mode', timer: '20:00', ringSpeed: '8s', coreColor: '#001233' },
}
const MODE_KEYS = Object.keys(MODES)

export default function FocusMode() {
  const [activeMode, setActiveMode] = useState(0)
  const current = MODES[MODE_KEYS[activeMode]]

  return (
    <section className="focus-mode" id="focus-mode">
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <PixelTrail
          gridSize={50}
          trailSize={0.1}
          maxAge={250}
          interpolate={5}
          color="#3a015c"
          gooeyFilter={{ id: "focus-goo-filter", strength: 2 }}
          gooeyEnabled
          gooStrength={2}
        />
      </div>
      <div className="fm-particles">
        <div className="fm-p"></div><div className="fm-p"></div><div className="fm-p"></div>
        <div className="fm-p"></div><div className="fm-p"></div><div className="fm-p"></div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
        <div className="sec-lbl">Focus</div>
        <div className="sec-title">Adaptive Productivity Soundscapes</div>
        <p className="sec-sub" style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '520px' }}>
          AI генерирует бесконечные, неповторяющиеся саундскейпы, адаптирующиеся к ритму вашей работы в реальном времени. В отличие от плейлистов — не зацикливается, не отвлекает.
        </p>
      </div>

      <div className="fm-header">
        <div className="fm-label" style={{ transition: 'all .4s ease' }}>Now Playing — Session Active</div>
        <div className="fm-title" style={{ transition: 'all .4s ease' }}>{current.title}</div>
        <div className="fm-timer" style={{ transition: 'all .4s ease' }}>{current.timer}</div>
      </div>

      <div className="fm-sphere-wrap">
        <div className="fm-ring fm-ring--outer" style={{ animationDuration: current.ringSpeed, transition: 'animation-duration .6s ease' }}></div>
        <div className="fm-ring fm-ring--mid" style={{ animationDuration: current.ringSpeed, transition: 'animation-duration .6s ease' }}></div>
        <div className="fm-ring fm-ring--inner" style={{ animationDuration: current.ringSpeed, transition: 'animation-duration .6s ease' }}></div>
        <div
          className="fm-core"
          style={{
            background: `radial-gradient(circle, ${current.coreColor}66, ${current.coreColor}26 60%, transparent 80%)`,
            boxShadow: `0 0 60px ${current.coreColor}40, 0 0 120px ${current.coreColor}1a`,
            animationDuration: current.ringSpeed,
            transition: 'background .6s ease, box-shadow .6s ease',
          }}
        ></div>
      </div>

      <div className="fm-pills">
        {MODE_KEYS.map((m, i) => (
          <span
            key={i}
            className={`fm-pill${activeMode === i ? ' active' : ''}`}
            onClick={() => setActiveMode(i)}
          >{m}</span>
        ))}
      </div>

      <div className="fm-metrics">
        <div className="fm-metric">
          <div className="fm-metric-val gr-text">87%</div>
          <div className="fm-metric-label">Focus Score</div>
        </div>
        <div className="fm-metric">
          <div className="fm-metric-val gr-text">47 min</div>
          <div className="fm-metric-label">Session</div>
        </div>
        <div className="fm-metric">
          <div className="fm-metric-val gr-text">+34%</div>
          <div className="fm-metric-label">Est. Boost</div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '.85rem', color: 'var(--muted)', position: 'relative', zIndex: 1 }}>
        B2B: командные тарифы от $5/сотрудник/мес · Интеграции: Slack · Notion · Calendar
      </div>
    </section>
  )
}
