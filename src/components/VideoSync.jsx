import LaserFlow from './LaserFlow'

export default function VideoSync() {
  return (
    <section className="vs" id="video-sync">
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <LaserFlow
          horizontalBeamOffset={0.1}
          verticalBeamOffset={0.0}
          color="#3a015c"
          horizontalSizing={0.9}
          verticalSizing={4.2}
          wispDensity={3.6}
          wispSpeed={15}
          wispIntensity={5}
          flowSpeed={0.35}
          flowStrength={0.25}
          fogIntensity={0.45}
          fogScale={0.3}
          fogFallSpeed={0.6}
          decay={1.1}
          falloffStart={1.2}
        />
      </div>
      <div className="vs-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="sec-lbl">Sync</div>
        <div className="sec-title">AI Soundtrack for Video</div>
        <p className="sec-sub">Загрузи видео — AI проанализирует монтажные склейки, темп, цветовое настроение и эмоциональную арку. Затем сочинит идеально синхронизированный саундтрек.</p>

        <div className="vs-drop">
          <div className="vs-drop-icon"></div>
          <div className="vs-drop-title">Drop your video here</div>
          <div className="vs-drop-sub">MP4, MOV, WebM · до 500 MB · или нажми для выбора</div>
        </div>

        <div className="vs-layout">
          <div>
            <div className="vs-timeline">
              <div className="vs-ruler">
                <span>0:00</span><span>0:30</span><span>1:00</span><span>1:30</span><span>2:00</span><span>2:30</span><span>3:00</span>
              </div>

              <div className="vs-track">
                <div className="vs-track-label">V1</div>
                <div className="vs-clips">
                  <div className="vs-clip vs-clip--a"></div>
                  <div className="vs-clip vs-clip--b"></div>
                  <div className="vs-clip vs-clip--c"></div>
                  <div className="vs-clip vs-clip--d"></div>
                </div>
              </div>

              <div className="vs-markers">
                <div className="vs-track-label" style={{ fontSize: '.5rem' }}>MRK</div>
                <div className="vs-marker vs-marker--1">
                  <div className="vs-marker-dot"></div>
                  <div className="vs-marker-txt">climax 0:34</div>
                </div>
                <div className="vs-marker vs-marker--2">
                  <div className="vs-marker-dot"></div>
                  <div className="vs-marker-txt">mood shift 1:12</div>
                </div>
                <div className="vs-marker vs-marker--3">
                  <div className="vs-marker-dot"></div>
                  <div className="vs-marker-txt">fade out 2:48</div>
                </div>
              </div>

              <div className="vs-audio">
                <div className="vs-track-label">A1</div>
                <div className="vs-wave">
                  <div className="vs-wave-inner"></div>
                  <div className="vs-wave-grad"></div>
                </div>
              </div>

              <div className="vs-playhead"></div>
            </div>

            <div className="vs-badges">
              <span className="vs-badge vs-badge--sync">● Synced</span>
              <span className="vs-badge vs-badge--ai">AI Scored</span>
            </div>
          </div>

          <div className="vs-panel">
            <div className="vs-pcard">
              <div className="vs-pcard-title">Parameters</div>
              <div className="vs-field">
                <span className="vs-field-label">Mood</span>
                <select className="vs-select" defaultValue="Cinematic · Dramatic">
                  <option>Cinematic · Dramatic</option>
                  <option>Ambient · Calm</option>
                  <option>Energetic · Upbeat</option>
                  <option>Dark · Tense</option>
                  <option>Happy · Playful</option>
                  <option>Melancholic · Sad</option>
                </select>
              </div>
              <div className="vs-field">
                <span className="vs-field-label">Energy</span>
                <div className="vs-slider-wrap">
                  <input type="range" min="0" max="100" defaultValue="72" />
                  <span className="vs-slider-val">72</span>
                </div>
              </div>
              <div className="vs-field">
                <span className="vs-field-label">Duration</span>
                <div className="vs-auto">
                  <span className="vs-auto-dot"></span>
                  <span className="vs-auto-txt">Auto-detect</span>
                  <span className="vs-auto-sub">3:12</span>
                </div>
              </div>
            </div>
            <div className="vs-pcard">
              <div className="vs-pcard-title">Analysis</div>
              <div className="vs-field">
                <span className="vs-field-label">Detected cuts</span>
                <div style={{ fontFamily: 'monospace', fontSize: '.88rem', color: 'var(--txt)' }}>14 cuts</div>
              </div>
              <div className="vs-field">
                <span className="vs-field-label">Avg. scene length</span>
                <div style={{ fontFamily: 'monospace', fontSize: '.88rem', color: 'var(--txt)' }}>4.2s</div>
              </div>
              <div className="vs-field">
                <span className="vs-field-label">Suggested BPM</span>
                <div style={{ fontFamily: 'monospace', fontSize: '.88rem', color: 'var(--acc)' }}>118 BPM</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '.85rem', color: 'var(--muted)', fontStyle: 'italic' }}>
          50M+ креаторов нуждаются в музыке для контента. Epidemic Sound берёт $15/мес за библиотеку. Мы генерируем уникальный трек под каждое видео.
        </div>
      </div>
    </section>
  )
}
