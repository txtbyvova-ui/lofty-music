const STEMS = [
  {
    cls: 'rx-stem--vox', icon: '', name: 'Vocals', tag: 'Lead Voice',
    heights: [45,72,38,90,55,80,30,65,95,42,78,50,88,35,60,82,48,70,92,40,75,58,85,32,68,52,78,44,62,88,36,74,56,80,46,70,90,38,66,54],
    mute: false, solo: true, vol: 85,
  },
  {
    cls: 'rx-stem--drm', icon: '', name: 'Drums', tag: 'Percussion',
    heights: [90,20,15,85,18,12,92,22,10,88,16,14,95,20,11,86,24,13,90,18,15,82,22,12,94,16,10,88,20,14,92,18,11,84,24,13,90,16,15,86],
    mute: false, solo: false, vol: 72,
  },
  {
    cls: 'rx-stem--bas', icon: '', name: 'Bass', tag: 'Low End',
    heights: [60,58,65,55,70,52,62,68,50,64,56,72,48,66,54,60,70,52,68,58,64,50,72,56,62,66,48,70,54,60,68,52,64,58,72,50,66,56,62,70],
    mute: true, solo: false, vol: 60,
  },
  {
    cls: 'rx-stem--mel', icon: '', name: 'Melody', tag: 'Instruments',
    heights: [40,55,75,50,82,45,68,90,35,60,78,42,72,88,38,65,52,80,46,70,58,85,32,62,76,44,56,82,48,74,36,66,92,40,58,78,50,70,86,34],
    mute: false, solo: false, vol: 78,
  },
]

export default function Remix() {
  return (
    <section className="rx" id="remix">
      <div className="rx-inner">
        <div className="sec-lbl">Remix</div>
        <div className="sec-title">Stem Separation &amp; Style Transfer</div>
        <p className="sec-sub">Раздели трек на стемы и перенеси в любой стиль одним кликом.</p>

        <div className="rx-layout">
          <div className="rx-stems">
            {STEMS.map((stem, i) => (
              <div key={i} className={`rx-stem ${stem.cls}`}>
                <div className="rx-stem-icon">{stem.icon}</div>
                <div className="rx-stem-info">
                  <div className="rx-stem-name">{stem.name}</div>
                  <div className="rx-stem-tag">{stem.tag}</div>
                </div>
                <div className="rx-wave">
                  {stem.heights.map((h, j) => (
                    <span key={j} style={{ height: h + '%' }} />
                  ))}
                </div>
                <div className="rx-ctrls">
                  <button className={`rx-btn${stem.mute ? ' active-m' : ''}`} title="Mute">M</button>
                  <button className={`rx-btn${stem.solo ? ' active-s' : ''}`} title="Solo">S</button>
                  <input className="rx-vol" type="range" min="0" max="100" defaultValue={stem.vol} />
                </div>
              </div>
            ))}

            <div className="rx-info">
              <span className="rx-info-badge">4 Stems</span>
              <span className="rx-info-badge">44.1 kHz</span>
              <span className="rx-info-badge">Demucs v4</span>
              <span className="rx-info-badge">GPU H100</span>
            </div>
          </div>

          <div className="rx-panel">
            <div className="rx-pcard">
              <div className="rx-pcard-title">Style Transfer</div>
              <div className="rx-field">
                <span className="rx-field-label">Original Style</span>
                <div className="rx-field-val">Rock</div>
              </div>
              <div className="rx-field">
                <span className="rx-field-label">Target Style</span>
                <select className="vs-select" defaultValue="Lo-Fi">
                  <option>Lo-Fi</option>
                  <option>Jazz</option>
                  <option>Electronic</option>
                  <option>Classical</option>
                  <option>R&amp;B</option>
                  <option>Ambient</option>
                </select>
              </div>
              <button className="rx-transform">Transform</button>
            </div>
            <div className="rx-pcard">
              <div className="rx-pcard-title">Preview</div>
              <div className="rx-field">
                <span className="rx-field-label">Compare</span>
                <div className="rx-toggle">
                  <button className="on">Before</button>
                  <button>After</button>
                </div>
              </div>
            </div>
            <div className="rx-pcard">
              <div className="rx-pcard-title">Analysis</div>
              <div className="rx-field">
                <span className="rx-field-label">Separation Quality</span>
                <div style={{ fontFamily: 'monospace', fontSize: '.88rem', color: '#00e87a' }}>96.2% SDR</div>
              </div>
              <div className="rx-field">
                <span className="rx-field-label">Processing Time</span>
                <div style={{ fontFamily: 'monospace', fontSize: '.88rem', color: 'var(--txt)' }}>1.8s</div>
              </div>
              <div className="rx-field">
                <span className="rx-field-label">Style Match</span>
                <div style={{ fontFamily: 'monospace', fontSize: '.88rem', color: 'var(--acc)' }}>89%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
