import Antigravity from './Antigravity'

export default function Footer() {
  return (
    <footer style={{ position: 'relative', minHeight: '400px' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Antigravity
          count={200}
          color="#3a015c"
          particleSize={1.5}
          magnetRadius={12}
          ringRadius={8}
          waveSpeed={0.3}
          autoAnimate={true}
        />
      </div>
      <div style={{ position: 'relative', zIndex: 1, paddingTop: '60px' }}>
        <div className="ft-brand">Lofty Music</div>
        <div>AI Music Platform · Proof of Concept</div>
        <div style={{ marginTop: '8px', color: 'var(--muted)', fontSize: '.85rem' }}>Модель: YuE (Tencent) + custom fine-tuning · Инфра: RunPod Serverless · Стек: React + FastAPI + PostgreSQL</div>
        <div className="ft-pow">
          <a href="#">GitHub</a> · <a href="#api">API Docs</a> · <a href="#">Архитектура</a>
        </div>
        <div style={{ marginTop: '16px', fontSize: '.75rem', color: 'var(--muted)' }}>Built by Вова Егоров · 2025</div>
      </div>
    </footer>
  )
}
