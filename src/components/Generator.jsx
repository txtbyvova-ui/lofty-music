import { useState, useRef, useEffect } from 'react'
import Antigravity from './Antigravity'

const API_URL = 'https://lofty-music-backend.onrender.com'

const PRESETS = [
  { id: 'rock', name: 'Rock', icon: '🎸' },
  { id: 'rap', name: 'Rap', icon: '🎤' },
  { id: 'pop', name: 'Pop', icon: '🎵' },
  { id: 'electronic', name: 'Electronic', icon: '🎛️' },
  { id: 'jazz', name: 'Jazz', icon: '🎷' },
  { id: 'lofi', name: 'Lo-Fi', icon: '☕' },
  { id: 'classical', name: 'Classical', icon: '🎻' },
  { id: 'metal', name: 'Metal', icon: '🤘' },
  { id: 'ambient', name: 'Ambient', icon: '🌊' },
  { id: 'indie', name: 'Indie', icon: '🍂' },
]


const PIPELINE_STEPS = [
  'Анализ текста и фонетики',
  'Композиция мелодии и гармонии',
  'Аранжировка инструментов',
  'Сведение и мастеринг',
]

const DEFAULT_LYRICS = `[intro]
(гитарный перебор, нарастание)

[verse]
Во дворах, где сохнет бельё на ветру,
Мы чертили мелом свою карту миру.
Фонари качались — кривые часовые,
А мы считали звёзды, молодые, злые.

[chorus]
Дворовый свет не гаснет до утра,
Мы уходили — значит, нам пора.
Кто не вернулся — тот нашёл свой путь,
А кто остался — тем не повернуть.

[verse]
Подъезды пахли кошками и краской,
Мы верили, что жизнь — не пересказка.
Ноябрь стучал по крышам, как слепой,
А мы несли друг друга до пивной.

[chorus]
Дворовый свет не гаснет до утра,
Мы уходили — значит, нам пора.
Кто не вернулся — тот нашёл свой путь,
А кто остался — тем не повернуть.

[bridge]
И город спит, и город ждёт кого-то,
Кто выйдет утром за его ворота.

[outro]
(гитара затихает, эхо последней строки)`


export default function Generator() {
  const [style, setStyle] = useState('Russian rock, post-punk, baritone male vocal, acoustic guitar intro building to electric guitar and drums, melancholic yet powerful, nostalgic, 115 BPM, 1980s Soviet rock, reverb vocals, minor key')
  const [selectedGenre, setSelectedGenre] = useState('rock')
  const [lyrics, setLyrics] = useState(DEFAULT_LYRICS)
  const [lang, setLang] = useState('ru')
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [elapsed, setElapsed] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [error, setError] = useState('')
  const timersRef = useRef([])
  const elRef = useRef(null)
  const startRef = useRef(null)
  const abortRef = useRef(null)

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout)
      clearInterval(elRef.current)
      if (abortRef.current) abortRef.current.abort()
    }
  }, [])

  const handleGenerate = async () => {
    if (isGenerating) return
    if (!lyrics.trim()) { alert('Введи текст'); return }

    setIsGenerating(true)
    setIsComplete(false)
    setError('')
    setAudioUrl('')
    setCurrentStep(1)
    startRef.current = Date.now()
    elRef.current = setInterval(() => {
      setElapsed(((Date.now() - startRef.current) / 1000).toFixed(1) + 's')
    }, 200)

    timersRef.current = [
      setTimeout(() => setCurrentStep(2), 3000),
      setTimeout(() => setCurrentStep(3), 8000),
      setTimeout(() => setCurrentStep(4), 15000),
    ]

    const genre = selectedGenre
    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch(`${API_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ genre, description: lyrics.trim() }),
        signal: controller.signal,
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.detail || `Ошибка сервера: ${res.status}`)
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)

      timersRef.current.forEach(clearTimeout)
      setCurrentStep(5)
      setAudioUrl(url)
      setIsComplete(true)
      setIsGenerating(false)
      clearInterval(elRef.current)
      const totalTime = ((Date.now() - startRef.current) / 1000).toFixed(1)
      setElapsed(totalTime + 's ✓')
    } catch (e) {
      timersRef.current.forEach(clearTimeout)
      clearInterval(elRef.current)
      setIsGenerating(false)
      if (e.name === 'AbortError') return
      setError(e.message || 'Неизвестная ошибка')
      setCurrentStep(0)
      const totalTime = ((Date.now() - startRef.current) / 1000).toFixed(1)
      setElapsed(totalTime + 's')
    }
  }

  const handleReset = () => {
    timersRef.current.forEach(clearTimeout)
    clearInterval(elRef.current)
    if (abortRef.current) abortRef.current.abort()
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setIsGenerating(false)
    setCurrentStep(0)
    setIsComplete(false)
    setAudioUrl('')
    setError('')
    setElapsed('')
  }

  const pickChip = (id, displayName) => {
    setSelectedGenre(id)
    setStyle(displayName)
  }

  return (
    <section id="generator" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <Antigravity
          count={300}
          magnetRadius={21}
          ringRadius={10}
          waveSpeed={3.7}
          waveAmplitude={0.9}
          particleSize={1.7}
          lerpSpeed={0.09}
          color="#3a015c"
          autoAnimate
          particleVariance={0.8}
          rotationSpeed={1.6}
          depthFactor={2.4}
          pulseSpeed={4.3}
          particleShape="sphere"
          fieldStrength={10}
        />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="sec-lbl">Generate</div>
      <div className="sec-title">AI Music Generation</div>
      <p className="sec-sub">Опиши что слышишь — текст, стиль, настроение. Модель сочинит, аранжирует и сведёт готовый трек за секунды.</p>
      <div className="gen-grid">

        {/* Form */}
        <div className="gcard">
          <div className="gcard-title">Parameters</div>
          <label>Genre / Style</label>
          <input type="text" value={style} onChange={e => { setStyle(e.target.value); setSelectedGenre('') }} />
          <div className="chips">
            {PRESETS.map((s) => (
              <span
                key={s.id}
                className={`chip${selectedGenre === s.id ? ' on' : ''}`}
                onClick={() => pickChip(s.id, s.name)}
              >{s.icon} {s.name}</span>
            ))}
          </div>
          <label>Lyrics</label>
          <textarea value={lyrics} onChange={e => setLyrics(e.target.value)} />
          <label>Language</label>
          <div className="lang-tog">
            <button className={lang === 'ru' ? 'on' : ''} onClick={() => setLang('ru')}>RU</button>
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
          <button
            className="btn-gen"
            disabled={isGenerating}
            onClick={handleGenerate}
            style={isGenerating ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            {isGenerating ? 'Generating...' : 'Generate Track'}
          </button>
        </div>

        {/* Status / Pipeline */}
        <div className="gcard">
          <div className="gcard-title">Status</div>

          {currentStep === 0 && !isComplete && (
            <div className="s-idle">
              {error ? (
                <div style={{ color: '#ef4444', fontSize: '.9rem', lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 600 }}>Ошибка:</span> {error}
                  <div style={{ marginTop: '10px', color: 'var(--muted)', fontSize: '.8rem' }}>Попробуй ещё раз или выбери другой жанр</div>
                </div>
              ) : (
                <>Заполни форму и нажми <strong style={{ color: 'var(--txt)' }}>Generate Track</strong></>
              )}
            </div>
          )}

          {(currentStep > 0 || isComplete) && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '.8rem', fontWeight: 600, color: isComplete ? '#22c55e' : '#a855f7' }}>
                  {isComplete ? '✓ Завершено' : 'Генерация...'}
                </span>
                <span style={{ fontSize: '.7rem', color: 'var(--muted)' }}>{elapsed}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {PIPELINE_STEPS.map((step, i) => {
                  const stepNum = i + 1
                  const isDone = currentStep > stepNum
                  const isActive = currentStep === stepNum
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: isDone
                          ? 'rgba(34,197,94,0.1)'
                          : isActive
                            ? 'rgba(168,85,247,0.12)'
                            : 'rgba(255,255,255,0.03)',
                        transition: 'all 0.4s ease',
                        animation: isActive ? 'gen-pulse 2s ease-in-out infinite' : 'none',
                      }}
                    >
                      <div style={{
                        width: '22px', height: '22px', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '.7rem', fontWeight: 700, flexShrink: 0,
                        background: isDone ? '#22c55e' : isActive ? '#a855f7' : 'var(--brd)',
                        color: isDone || isActive ? '#fff' : 'var(--muted)',
                        transition: 'all 0.4s ease',
                      }}>
                        {isDone ? '✓' : isActive ? (
                          <span style={{ display: 'inline-block', width: '12px', height: '12px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'gen-spin 0.8s linear infinite' }} />
                        ) : stepNum}
                      </div>
                      <span style={{
                        fontSize: '.85rem',
                        color: isDone ? '#22c55e' : isActive ? '#e4e4e7' : 'var(--muted)',
                        fontWeight: isActive ? 600 : 400,
                        transition: 'all 0.4s ease',
                      }}>
                        {step}
                      </span>
                    </div>
                  )
                })}
              </div>

              {isComplete && audioUrl && (
                <div style={{
                  marginTop: '20px', padding: '20px',
                  background: 'rgba(30,30,40,0.5)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(75,85,99,0.4)', borderRadius: '12px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <div style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', animation: 'gen-pulse 2s ease-in-out infinite' }} />
                    <span style={{ fontSize: '.85rem', color: '#4ade80', fontWeight: 500 }}>Трек сгенерирован</span>
                    <span style={{ fontSize: '.85rem', color: '#6b7280' }}>· {elapsed} · {selectedGenre}</span>
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>AI Generated Track</div>
                  <div style={{ fontSize: '.85rem', color: '#9ca3af', marginBottom: '14px' }}>Lofty Music AI · {style.slice(0, 50)}{style.length > 50 ? '…' : ''}</div>
                  <audio controls style={{ width: '100%', marginBottom: '14px' }} src={audioUrl} />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a
                      href={audioUrl}
                      download="lofty-music.mp3"
                      style={{
                        flex: 1, textAlign: 'center', padding: '10px',
                        background: '#16a34a', color: '#fff', borderRadius: '8px',
                        fontWeight: 500, fontSize: '.85rem', textDecoration: 'none',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#15803d'}
                      onMouseLeave={e => e.currentTarget.style.background = '#16a34a'}
                    >
                      ↓ Скачать MP3
                    </a>
                    <button
                      onClick={handleReset}
                      style={{
                        flex: 1, textAlign: 'center', padding: '10px',
                        background: '#374151', color: '#fff', borderRadius: '8px',
                        fontWeight: 500, fontSize: '.85rem', border: 'none', cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#4b5563'}
                      onMouseLeave={e => e.currentTarget.style.background = '#374151'}
                    >
                      ↻ Сгенерировать ещё
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes gen-spin { to { transform: rotate(360deg) } }
        @keyframes gen-pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.7 } }
      `}</style>
      </div>
    </section>
  )
}
