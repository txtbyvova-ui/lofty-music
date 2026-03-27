import { useState } from 'react'
import TargetCursor from './TargetCursor'

const VENUE_CONFIG = {
  'Café': {
    scenarios: ['Утренний кофе', 'Бизнес ланч', 'Поздний бранч', 'Рабочий понедельник', 'Субботний вечер'],
    moods: ['Warm', 'Cozy', 'Minimal', 'Lively', 'Premium'],
    defaultScenario: 'Утренний кофе'
  },
  'Restaurant': {
    scenarios: ['Бизнес ланч', 'Лёгкий ужин', 'Ужин при свечах', 'Happy Hour', 'Полная посадка', 'Субботний вечер', 'Вечеринка'],
    moods: ['Warm', 'Premium', 'Romantic', 'Cozy', 'Lively'],
    defaultScenario: 'Бизнес ланч'
  },
  'Bar': {
    scenarios: ['Happy Hour', 'Вечеринка', 'Субботний вечер', 'Живая музыка', 'Поздний бар', 'Коктейльный вечер'],
    moods: ['Energetic', 'Lively', 'Cozy', 'Premium', 'Dark'],
    defaultScenario: 'Happy Hour'
  },
  'Coworking': {
    scenarios: ['Deep Focus', 'Brainstorm-сессия', 'Обеденный перерыв', 'Вечерний нетворкинг', 'Тихий час'],
    moods: ['Minimal', 'Focused', 'Creative', 'Ambient', 'Dynamic'],
    defaultScenario: 'Deep Focus'
  },
  'Home Office': {
    scenarios: ['Утренний разгон', 'Deep Work', 'Фоновый поток', 'Вечернее затухание', 'Созвон-перерыв'],
    moods: ['Minimal', 'Focused', 'Ambient', 'Warm', 'Creative'],
    defaultScenario: 'Deep Work'
  },
  'Hotel Lobby': {
    scenarios: ['Check-in час пик', 'Тихое утро', 'Вечерний лаунж', 'VIP-приём', 'Конференция'],
    moods: ['Premium', 'Elegant', 'Warm', 'Sophisticated', 'Calm'],
    defaultScenario: 'Вечерний лаунж'
  },
  'Retail': {
    scenarios: ['Утреннее открытие', 'Распродажа', 'Премиум-шопинг', 'Предпраздничный ажиотаж', 'Тихий будний день'],
    moods: ['Trendy', 'Upbeat', 'Premium', 'Seasonal', 'Neutral'],
    defaultScenario: 'Премиум-шопинг'
  },
  'Gym': {
    scenarios: ['Утренняя кардио', 'Силовая тренировка', 'Групповое занятие', 'Растяжка / йога', 'Пиковая нагрузка'],
    moods: ['Energetic', 'Powerful', 'Motivating', 'Intense', 'Chill'],
    defaultScenario: 'Силовая тренировка'
  }
}

const VENUE_KEYS = Object.keys(VENUE_CONFIG)

export default function Spaces() {
  const [venue, setVenue] = useState('Café')
  const [scenario, setScenario] = useState(VENUE_CONFIG['Café'].defaultScenario)

  const config = VENUE_CONFIG[venue]

  const handleVenueChange = (e) => {
    const v = e.target.value
    setVenue(v)
    setScenario(VENUE_CONFIG[v].defaultScenario)
  }

  return (
    <section className="sp" id="spaces">
      <TargetCursor
        containerSelector="#spaces"
        targetSelector=".cursor-target"
        spinDuration={2.7}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
        cornerColor="#5a189a"
        dotColor="#ffffff"
      />
      <div className="sp-inner">
        <div className="sec-lbl">Spaces</div>
        <div className="sec-title">AI Music for Business</div>
        <p className="sec-sub">Бесконечные, лицензионно чистые AI-саундскейпы для ресторанов, отелей, ритейла и коворкингов. Адаптируется под время суток, поток гостей и айдентику бренда.</p>
        <div style={{ color: '#fff', fontSize: '.95rem', fontWeight: 700, marginBottom: '32px', textAlign: 'center' }}>Без Spotify. Без РАО. Без повторяющихся плейлистов.</div>

        <div className="sp-dropdowns">
          <div>
            <span className="sp-dropdown-label">Venue Type</span>
            <select className="sp-dropdown cursor-target" value={venue} onChange={handleVenueChange}>
              {VENUE_KEYS.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <span className="sp-dropdown-label">Brand Mood</span>
            <div className="chips" style={{ marginBottom: '12px' }}>
              {config.moods.map((mood, i) => (
                <span key={mood} className="chip">{mood}</span>
              ))}
            </div>
          </div>
          <div>
            <span className="sp-dropdown-label">Scenario</span>
            <select className="sp-dropdown cursor-target" value={scenario} onChange={(e) => setScenario(e.target.value)}>
              {config.scenarios.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="sp-panels">
          <div className="sp-panel">
            <div className="sp-pcard cursor-target">
              <div className="sp-pcard-title">Time of Day</div>
              <div className="sp-tod">
                <div className="sp-tod-val">14:30</div>
                <div className="sp-tod-bar">
                  <div className="sp-tod-thumb"></div>
                </div>
                <div className="sp-tod-labels">
                  <span>06:00</span><span>12:00</span><span>18:00</span><span>00:00</span>
                </div>
                <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '8px' }}>Утренний покой → Энергия обеда → Тепло вечера → Ночной лаунж</div>
              </div>
            </div>

            <div className="sp-pcard cursor-target">
              <div className="sp-pcard-title">Now Playing</div>
              <div className="sp-np">
                <div className="sp-np-art" style={{ fontSize: '.7rem', fontWeight: 700, color: '#fff' }}>NP</div>
                <div className="sp-np-info">
                  <div className="sp-np-name">Morning Espresso</div>
                  <div className="sp-np-artist">Lofty Music AI · Café Mix</div>
                </div>
                <div className="sp-np-wave">
                  <div className="sp-np-bar"></div><div className="sp-np-bar"></div>
                  <div className="sp-np-bar"></div><div className="sp-np-bar"></div>
                  <div className="sp-np-bar"></div><div className="sp-np-bar"></div>
                  <div className="sp-np-bar"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="sp-panel">
            <div className="sp-pcard cursor-target">
              <div className="sp-pcard-title">Controls</div>
              <div className="sp-sliders">
                <div className="sp-sl">
                  <div className="sp-sl-head">
                    <span className="sp-sl-label">Energy</span>
                    <span className="sp-sl-val">42%</span>
                  </div>
                  <input type="range" min="0" max="100" defaultValue="42" />
                </div>
                <div className="sp-sl">
                  <div className="sp-sl-head">
                    <span className="sp-sl-label">Volume</span>
                    <span className="sp-sl-val">65%</span>
                  </div>
                  <input type="range" min="0" max="100" defaultValue="65" />
                </div>
                <div className="sp-sl">
                  <div className="sp-sl-head">
                    <span className="sp-sl-label">Vocal Presence</span>
                    <span className="sp-sl-val">18%</span>
                  </div>
                  <input type="range" min="0" max="100" defaultValue="18" />
                </div>
              </div>
            </div>

            <div className="sp-metric cursor-target">
              <div className="sp-metric-icon" style={{ fontSize: '.7rem', fontWeight: 700 }}>+</div>
              <div className="sp-metric-info">
                <div className="sp-metric-val">+12%</div>
                <div className="sp-metric-label">Avg. guest dwell time</div>
              </div>
            </div>

            <div className="sp-pcard cursor-target">
              <div className="sp-pcard-title">Impact Dashboard</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'monospace', color: '#00e87a', fontWeight: 700 }}>+12%</span>
                  <span style={{ color: 'var(--muted)' }}>Среднее время пребывания гостя</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'monospace', color: '#00e87a', fontWeight: 700 }}>+9.1%</span>
                  <span style={{ color: 'var(--muted)' }}>Рост выручки (музыка под бренд)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'monospace', color: '#ef4444', fontWeight: 700 }}>-4.3%</span>
                  <span style={{ color: 'var(--muted)' }}>Потери от случайных плейлистов</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'monospace', color: 'var(--acc)', fontWeight: 700 }}>₽0</span>
                  <span style={{ color: 'var(--muted)' }}>Лицензионные отчисления РАО/ВОИС</span>
                </div>
              </div>
              <div style={{ fontSize: '.7rem', color: 'var(--muted)', marginTop: '10px' }}>Данные: исследование 1.8M транзакций (HUI Research / Soundtrack Your Brand, 2024)</div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '.85rem', color: 'var(--muted)' }}>
          Тариф: от $49/мес за точку · Мультилокационный дашборд · A/B тестирование музыкальных программ
        </div>
      </div>
    </section>
  )
}
