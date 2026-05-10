'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { supabase } from '../../lib/supabase'

function scoreColor(score) {
  if (score == null) return 'rgba(232,240,245,0.3)'
  if (score >= 75) return 'var(--cyan)'
  if (score >= 55) return 'var(--gold)'
  return '#ff4060'
}

function fmtDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function HistoryPage() {
  const [user, setUser] = useState(null)
  const [analyses, setAnalyses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data: sessionData } = await supabase.auth.getSession()
      if (!mounted) return
      const u = sessionData?.session?.user
      if (!u) { setUser(null); setLoading(false); return }
      setUser({ id: u.id, email: u.email, pseudo: u.user_metadata?.pseudo || u.email })

      const { data, error: fetchError } = await supabase
        .from('analyses')
        .select('id, jeu, score_global, created_at, riot_id, region, report')
        .eq('user_id', u.id)
        .order('created_at', { ascending: false })

      if (!mounted) return
      if (fetchError) setError(fetchError.message)
      else setAnalyses(data || [])
      setLoading(false)
    })()
    return () => { mounted = false }
  }, [])

  function open(item) {
    if (item?.report) sessionStorage.setItem('mvp_rapport', JSON.stringify(item.report))
    window.location.href = '/rapport'
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '70px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 5%' }}>

          <div style={{ marginBottom: '2.5rem' }}>
            <span className="section-tag">// HISTORIQUE</span>
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', marginBottom: '0.4rem' }}>
              Tes <span style={{ color: 'rgba(232,240,245,0.25)' }}>analyses</span>
            </h1>
            {user && (
              <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--cyan)', marginTop: '0.6rem' }}>
                {analyses.length} {analyses.length > 1 ? 'rapports' : 'rapport'} · {user.pseudo}
              </div>
            )}
          </div>

          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '4rem 0' }}>
              <div className="spinner-cyan" />
              <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.14em', color: 'var(--cyan)', textTransform: 'uppercase' }}>
                Chargement de l'historique...
              </div>
            </div>
          )}

          {!loading && !user && (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '1px dashed rgba(0,245,255,0.2)' }}>
              <span style={{ fontSize: '2.4rem', display: 'block', marginBottom: '1rem', opacity: 0.5 }}>🔒</span>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.95rem', color: '#fff', marginBottom: '0.6rem' }}>Connecte-toi pour voir ton historique</div>
              <p style={{ color: 'rgba(232,240,245,0.4)', fontSize: '0.85rem', marginBottom: '1.6rem' }}>Toutes tes analyses sont stockées dans ton compte.</p>
              <Link href="/dashboard" className="btn-primary">Aller au dashboard</Link>
            </div>
          )}

          {!loading && user && error && (
            <div style={{ background: 'rgba(255,0,80,0.08)', border: '1px solid rgba(255,0,80,0.2)', color: '#ff6080', padding: '10px 14px', fontSize: '0.85rem' }}>
              ⚠ {error}
            </div>
          )}

          {!loading && user && !error && analyses.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '1px dashed rgba(0,245,255,0.12)' }}>
              <span style={{ fontSize: '2.4rem', display: 'block', marginBottom: '1rem', opacity: 0.5 }}>📂</span>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.95rem', color: '#fff', marginBottom: '0.6rem' }}>Aucune analyse pour l'instant</div>
              <p style={{ color: 'rgba(232,240,245,0.4)', fontSize: '0.85rem', marginBottom: '1.6rem' }}>Lance ta première analyse depuis le dashboard.</p>
              <Link href="/dashboard" className="btn-primary">⚡ Analyser une replay</Link>
            </div>
          )}

          {!loading && user && analyses.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {analyses.map(a => (
                <div key={a.id} style={{
                  display: 'grid',
                  gridTemplateColumns: '70px 1fr auto auto',
                  alignItems: 'center',
                  gap: '1rem',
                  background: 'var(--dark2)',
                  border: '1px solid var(--border)',
                  padding: '14px 18px',
                  transition: 'border-color 0.15s, background 0.15s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,245,255,0.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
                >
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.4rem', fontWeight: 900, color: scoreColor(a.score_global), textAlign: 'center' }}>
                    {a.score_global ?? '—'}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.72rem', letterSpacing: '0.1em', color: '#e8f0f5', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {a.jeu || 'Replay'}
                    </div>
                    <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.08em', color: 'rgba(232,240,245,0.35)' }}>
                      {fmtDate(a.created_at)}
                      {a.riot_id && ` · ${a.riot_id}`}
                      {a.region && ` · ${a.region}`}
                    </div>
                  </div>
                  <button
                    onClick={() => open(a)}
                    style={{
                      fontFamily: 'Orbitron, monospace', fontSize: '0.66rem', fontWeight: 700,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '9px 18px',
                      background: 'transparent', color: 'var(--cyan)',
                      border: '1px solid var(--cyan)',
                      cursor: 'pointer'
                    }}
                  >
                    Revoir
                  </button>
                  <span style={{ color: 'var(--cyan)', fontSize: '0.9rem', opacity: 0.5 }}>→</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
