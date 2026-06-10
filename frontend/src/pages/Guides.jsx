import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageLayout, { PageHero } from '../components/layout/PageLayout'
import { fetchGuides } from '../api/guide'

const LEVELS = [
  { id: 'all', label: 'All Guides' },
  { id: 'beginner', label: '✅ Beginner' },
  { id: 'intermediate', label: '⚡ Intermediate' },
  { id: 'advanced', label: '🔥 Advanced' },
]

export default function Guides() {
  const [level, setLevel] = useState('all')
  const [guides, setGuides] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let cancelled = false
    fetchGuides()
      .then((data) => {
        if (!cancelled) setGuides(data)
      })
      .catch((err) => {
        if (!cancelled) {
          setGuides([])
          setLoadError(err.message || 'Failed to load guides')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(
    () => (level === 'all' ? guides : guides.filter((g) => g.level === level)),
    [level, guides],
  )

  return (
    <PageLayout>
      <PageHero
        badge="Learn"
        title="Step-by-step Security Guides"
        subtitle="From locking down your phone to setting up DNS-level ad blocking — practical, hands-on walkthroughs for every skill level."
      />

      <main className="page-body">
        <div className="guides-toolbar">
          <div className="faq-tabs" style={{ margin: 0 }}>
            {LEVELS.map((l) => (
              <button
                type="button"
                key={l.id}
                className={`faq-tab ${level === l.id ? 'active' : ''}`}
                onClick={() => setLevel(l.id)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <Link to="/guides/create" className="btn-create-guide">
            <span aria-hidden style={{ marginRight: 6 }}>+</span>
            New Guide
          </Link>
        </div>

        {loading ? (
          <p style={{ color: 'var(--muted)', padding: '24px 0' }}>Loading guides…</p>
        ) : loadError ? (
          <div style={{ padding: '24px 0' }}>
            <p style={{ color: '#dc2626', marginBottom: 8 }}>{loadError}</p>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
              Make sure the backend is running and catalog guides are seeded with{' '}
              <code>npm run db:seed-guides</code> in the backend folder.
            </p>
          </div>
        ) : (
          <div className="resource-grid">
            {filtered.map((g) => (
              <Link className="resource-card" key={g.slug} to={`/guides/${g.slug}`}>
                <div className={`resource-cover ${g.cover}`} aria-hidden>{g.icon}</div>
                <div className="resource-body">
                  <div className="resource-tag-row">
                    <span className={`resource-tag ${g.tagClass}`}>{g.tag}</span>
                    {g.isUserCreated && <span className="resource-tag user-tag">Yours</span>}
                  </div>
                  <h3>{g.title}</h3>
                  <p>{g.desc}</p>
                  <div className="resource-meta">
                    <span>{g.meta}</span>
                    <span className="read-more">Start guide →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </PageLayout>
  )
}
