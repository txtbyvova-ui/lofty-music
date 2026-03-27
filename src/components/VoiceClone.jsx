const USE_CASES = [
  { title: 'Brand Voice', desc: 'Единый голос бренда на всех точках контакта' },
  { title: 'Подкасты', desc: 'Генерация эпизодов без записи' },
  { title: 'IVR / Поддержка', desc: 'Телефонное меню на любом языке' },
  { title: 'Вокал', desc: 'AI-пение с моделями на основе согласия' },
]

export default function VoiceClone() {
  return (
    <section className="vc-sec" id="voice-clone">
      <div className="vc-inner">
        <div className="sec-lbl">Voices</div>
        <div className="sec-title">AI Voice for Business & Creators</div>
        <p className="sec-sub">Клонируй любой голос из 30-секундного сэмпла. Генерируй озвучку, подкасты, IVR-системы и вокальные партии на 12+ языках.</p>

        <div className="vc-cols">
          {/* Left: Your Voice */}
          <div>
            <div className="vc-col-title">Your Voice</div>
            <div className="vc-drop">
              <div className="vc-drop-icon">↑</div>
              <div className="vc-drop-title">Upload 30s voice sample</div>
              <div className="vc-drop-sub">WAV, MP3, FLAC · up to 50 MB · or record directly</div>
            </div>
            <div className="vc-avatar-wrap">
              <div className="vc-avatar-ring"><div className="vc-avatar-ring-inner"></div></div>
              <div className="vc-avatar"><span className="vc-avatar-mic">MIC</span></div>
            </div>
            <div className="vc-profile">Voice Profile: Alex</div>
            <div className="vc-profile-sub">Male · Baritone · Warm Tone · Analyzed</div>
            <div className="vc-bars">
              <div className="vc-bar-row">
                <span className="vc-bar-label">Pitch Range</span>
                <div className="vc-bar-track"><div className="vc-bar-fill vc-bar-fill--pitch"></div></div>
                <span className="vc-bar-val">78%</span>
              </div>
              <div className="vc-bar-row">
                <span className="vc-bar-label">Timbre</span>
                <div className="vc-bar-track"><div className="vc-bar-fill vc-bar-fill--timbre"></div></div>
                <span className="vc-bar-val">65%</span>
              </div>
              <div className="vc-bar-row">
                <span className="vc-bar-label">Warmth</span>
                <div className="vc-bar-track"><div className="vc-bar-fill vc-bar-fill--warmth"></div></div>
                <span className="vc-bar-val">88%</span>
              </div>
              <div className="vc-bar-row">
                <span className="vc-bar-label">Clarity</span>
                <div className="vc-bar-track"><div className="vc-bar-fill vc-bar-fill--clarity"></div></div>
                <span className="vc-bar-val">92%</span>
              </div>
            </div>
          </div>

          {/* Right: Use Cases */}
          <div>
            <div className="vc-col-title">Use Cases</div>
            <div className="vc-songs">
              {USE_CASES.map((uc, i) => (
                <div key={i} className="vc-song" style={{ cursor: 'default' }}>
                  <span className="vc-song-num">{i + 1}</span>
                  <div className="vc-song-info">
                    <div className="vc-song-artist">{uc.title}</div>
                    <div className="vc-song-name" style={{ color: 'var(--muted)' }}>{uc.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Generate + Result */}
        <div className="vc-bottom">
          <button className="vc-gen-btn">Create Voice Profile</button>

          <div className="vc-pipeline">
            <div className="vc-pipe-label">Pipeline</div>
            <div className="vc-pipe-steps">
              <div className="vc-pipe-step">
                <div className="vc-pipe-dot done">✓</div>
                <span className="vc-pipe-txt">Voice Analysis</span>
              </div>
              <span className="vc-pipe-arrow">→</span>
              <div className="vc-pipe-step">
                <div className="vc-pipe-dot done">✓</div>
                <span className="vc-pipe-txt">Profile Creation</span>
              </div>
              <span className="vc-pipe-arrow">→</span>
              <div className="vc-pipe-step">
                <div className="vc-pipe-dot active">3</div>
                <span className="vc-pipe-txt">Synthesis</span>
              </div>
              <span className="vc-pipe-arrow">→</span>
              <div className="vc-pipe-step">
                <div className="vc-pipe-dot">4</div>
                <span className="vc-pipe-txt">Mixing</span>
              </div>
              <span className="vc-pipe-arrow">→</span>
              <div className="vc-pipe-step">
                <div className="vc-pipe-dot">5</div>
                <span className="vc-pipe-txt">Export</span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '.8rem', color: 'var(--muted)' }}>
            Обязательное согласие для всех голосовых моделей · Compliant with EU AI Act & ELVIS Act (TN)
          </div>

          <div className="vc-result">
            <div className="vc-result-label">Result</div>
            <div className="vc-result-title">Voice Profile: <span>Ready for deployment</span></div>
            <audio controls></audio>
          </div>
        </div>
      </div>
    </section>
  )
}
