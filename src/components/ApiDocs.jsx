const ENDPOINTS = [
  { method: 'post', path: '/api/generate',
    desc: <>Create generation task. Accepts: <code>lyrics</code>, <code>style</code>, <code>duration</code>, <code>language</code>, <code>bpm</code>, <code>key</code>. Returns: <code>task_id</code></> },
  { method: 'get', path: '/api/tasks/{id}',
    desc: <>Task status: queued → analyzing → composing → mixing → completed. Returns: <code>audio_url</code>, metadata</> },
  { method: 'get', path: '/api/tasks',
    desc: 'List all tasks. Filter by status, date, style.' },
  { method: 'post', path: '/api/voice/clone',
    desc: <>Create voice profile from audio sample. Requires: <code>consent_token</code></> },
  { method: 'get', path: '/api/spaces/stream',
    desc: <>Start adaptive music stream for venue. Params: <code>venue_type</code>, <code>mood</code>, <code>energy</code>, <code>time_of_day</code></> },
  { method: 'get', path: '/api/health',
    desc: 'Service health: queue depth, avg. generation time, model version, uptime.' },
]

export default function ApiDocs() {
  return (
    <section id="api">
      <div className="sec-lbl">API</div>
      <div className="sec-title">REST API</div>
      <p className="sec-sub">Full documentation — <a href="/docs" style={{ color: 'var(--acc2)' }}>Swagger UI ↗</a></p>
      <div className="api-list">
        {ENDPOINTS.map((ep, i) => (
          <div key={i} className="api-row">
            <span className={`mth ${ep.method}`}>{ep.method.toUpperCase()}</span>
            <span className="ep-p">{ep.path}</span>
            <span className="ep-d">{ep.desc}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
