'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { supabase } from '../../lib/supabase'

const TYPE_STYLES = {
  critique: { bg: 'rgba(255,64,96,0.12)', border: 'rgba(255,64,96,0.3)', color: '#ff4060', label: 'CRITIQUE' },
  alerte:   { bg: 'rgba(255,215,0,0.08)', border: 'rgba(255,215,0,0.25)', color: 'var(--gold)', label: 'ALERTE' },
  info:     { bg: 'rgba(0,245,255,0.06)', border: 'rgba(0,245,255,0.2)',  color: 'var(--cyan)', label: 'INFO' },
}

function scoreColor(score) {
  if (score >= 75) return 'var(--cyan)'
  if (score >= 55) return 'var(--gold)'
  return '#ff4060'
}

export default function Rapport() {
  const router = useRouter()
  const [report, setReport] = useState(null)
  const [analyseId, setAnalyseId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [history, setHistory] = useState([])

  useEffect(() => {
    const raw = sessionStorage.getItem('mvp_rapport')
    if (raw) {
      try { setReport(JSON.parse(raw)) } catch (e) { console.error('[rapport] JSON.parse a échoué:', e) }
    }
    const aid = sessionStorage.getItem('mvp_analyse_id')
    if (aid) setAnalyseId(aid)
    setLoading(false)

    ;(async () => {
      const { data: sessionData } = await supabase.auth.getSession()
      const uid = sessionData?.session?.user?.id
      if (!uid) return
      const { data, error } = await supabase
        .from('analyses')
        .select('id, jeu, score_global, created_at, report')
        .eq('user_id', uid)
        .order('created_at', { ascending: false })
        .limit(5)
      if (error) { console.warn('[rapport] history fetch failed:', error.message); return }
      setHistory(data || [])
    })()
  }, [])

  function openAnalysis(item) {
    if (item?.report) sessionStorage.setItem('mvp_rapport', JSON.stringify(item.report))
    if (item?.id) sessionStorage.setItem('mvp_analyse_id', item.id)
    window.location.href = '/rapport'
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: '100vh', paddingTop: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.75rem', color: 'var(--cyan)', letterSpacing: '0.16em' }}>// CHARGEMENT DU RAPPORT...</div>
        </main>
      </>
    )
  }

  if (!report) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: '100vh', paddingTop: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '420px', border: '1px dashed rgba(0,245,255,0.2)', padding: '3rem 2rem' }}>
            <span style={{ fontSize: '2.4rem', display: 'block', marginBottom: '1rem', opacity: 0.5 }}>📊</span>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.95rem', color: '#fff', marginBottom: '0.6rem' }}>Aucun rapport en mémoire</div>
            <p style={{ color: 'rgba(232,240,245,0.4)', fontSize: '0.85rem', marginBottom: '1.6rem' }}>Lance d'abord une analyse depuis ton dashboard pour générer un rapport.</p>
            <button onClick={() => router.push('/dashboard')} className="btn-primary">Aller au dashboard</button>
          </div>
        </main>
      </>
    )
  }

  const { score_global, jeu, resume, point_fort, priorite, modules = [], plan_semaine = [], riot_stats } = report

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '70px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '60px 5%' }}>

          <div style={{ marginBottom: '2.5rem' }}>
            <span className="section-tag">// RAPPORT IA — MVP.COACHING</span>
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff' }}>
              Ton rapport <span style={{ color: 'rgba(232,240,245,0.25)' }}>{jeu}</span>
            </h1>
          </div>

          {/* Header card: score + résumé */}
          <div style={{ border: '1px solid var(--border)', background: 'var(--dark2)', marginBottom: '1.5rem' }}>
            <div style={{ padding: '1.2rem 1.8rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--dark)' }}>
              <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.16em', color: 'var(--cyan)' }}>// SCORE GLOBAL</div>
              <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.58rem', color: '#2a4a5a' }}>{jeu} · Score {score_global}/100</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr' }}>
              <div style={{ padding: '2rem', textAlign: 'center', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '3.5rem', fontWeight: 900, color: scoreColor(score_global), lineHeight: 1 }}>{score_global}</span>
                <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.55rem', color: '#3a5a6a', letterSpacing: '0.12em' }}>/100</span>
              </div>
              <div style={{ padding: '2rem' }}>
                {resume && (
                  <div style={{ fontSize: '0.9rem', color: '#5a8a9a', lineHeight: 1.6, marginBottom: '1.2rem' }}>{resume}</div>
                )}
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  {point_fort && (
                    <div style={{ fontSize: '0.82rem' }}>
                      <span style={{ color: 'var(--gold)' }}>⭐</span>{' '}
                      <span style={{ color: '#8ab8cc' }}>{point_fort}</span>
                    </div>
                  )}
                  {priorite && (
                    <div style={{ fontSize: '0.82rem' }}>
                      <span style={{ color: '#ff4060' }}>⚡</span>{' '}
                      <span style={{ color: '#8ab8cc' }}>{priorite}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Riot stats */}
          {riot_stats && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
              {[
                ['KDA', riot_stats.kda],
                ['WINRATE', riot_stats.winrate],
                ['HEADSHOT %', riot_stats.hs_percent],
                ['PARTIES', riot_stats.matches],
              ].filter(([, v]) => v !== undefined && v !== null).map(([label, val]) => (
                <div key={label} style={{ background: 'var(--dark2)', padding: '1.4rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.4rem', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: '6px' }}>{val}</div>
                  <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.55rem', color: '#3a5a6a', letterSpacing: '0.14em' }}>{label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Modules */}
          {modules.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
              {modules.map((mod, i) => (
                <div key={mod.id || i} style={{ background: 'var(--dark2)', padding: '1.6rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.52rem', color: '#2a4a5a', marginBottom: '4px', letterSpacing: '0.14em' }}>
                        MODULE {String(i + 1).padStart(2, '0')}
                        {mod.niveau && ` · ${mod.niveau.toUpperCase()}`}
                      </div>
                      <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>{mod.label}</div>
                    </div>
                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.6rem', fontWeight: 900, color: scoreColor(mod.score), lineHeight: 1 }}>{mod.score}</span>
                  </div>
                  <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)', marginBottom: '1.2rem' }}>
                    <div style={{ height: '100%', width: `${mod.score}%`, background: scoreColor(mod.score), transition: 'width 0.6s ease' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                    {(mod.points || []).map((p, j) => {
                      const s = TYPE_STYLES[p.type] || TYPE_STYLES.info
                      return (
                        <div key={j} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                          <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.48rem', padding: '2px 6px', background: s.bg, border: `1px solid ${s.border}`, color: s.color, flexShrink: 0, marginTop: '2px', letterSpacing: '0.1em' }}>{s.label}</span>
                          <span style={{ fontSize: '0.82rem', color: '#5a8a9a', lineHeight: 1.5 }}>{p.texte}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Plan de la semaine */}
          {plan_semaine.length > 0 && (
            <div style={{ border: '1px solid var(--border)', background: 'var(--dark2)', padding: '1.8rem', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.16em', color: 'var(--cyan)', marginBottom: '1rem' }}>// PLAN DE LA SEMAINE</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {plan_semaine.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(0,245,255,0.08)', border: '1px solid var(--cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'Share Tech Mono, monospace', fontSize: '0.6rem', color: 'var(--cyan)' }}>{i + 1}</span>
                    <span style={{ fontSize: '0.9rem', color: '#8ab8cc', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mes analyses précédentes */}
          {history.length > 0 && (
            <div style={{ marginTop: '2.5rem', border: '1px solid var(--border)', background: 'var(--dark2)', padding: '1.8rem' }}>
              <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.16em', color: 'var(--cyan)', marginBottom: '1rem' }}>// MES ANALYSES PRÉCÉDENTES</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {history.map(h => (
                  <button key={h.id} onClick={() => openAnalysis(h)} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '1rem', alignItems: 'center', background: 'transparent', border: '1px solid rgba(0,245,255,0.15)', padding: '12px 16px', cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.15s, background 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,245,255,0.5)'; e.currentTarget.style.background = 'rgba(0,245,255,0.04)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,245,255,0.15)'; e.currentTarget.style.background = 'transparent' }}>
                    <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.1em', color: '#e8f0f5', textTransform: 'uppercase' }}>{h.jeu}</span>
                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.95rem', fontWeight: 700, color: scoreColor(h.score_global ?? 0) }}>{h.score_global ?? '—'}</span>
                    <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem', color: 'rgba(232,240,245,0.4)' }}>{new Date(h.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.14em', color: 'var(--cyan)', textTransform: 'uppercase' }}>Revoir →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Feedback sur le rapport IA */}
          <FeedbackForm analyseId={analyseId} />

          {/* Footer actions */}
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/dashboard" className="btn-primary" style={{ fontSize: '0.78rem', padding: '13px 28px' }}>⚡ Analyser une autre replay</Link>
            <Link href="/history" style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '13px 28px', background: 'transparent', color: 'var(--cyan)', border: '1px solid var(--cyan)', textDecoration: 'none' }}>Tout l'historique</Link>
          </div>
        </div>
      </main>
    </>
  )
}

// ── FEEDBACK ──────────────────────────────────────────────────────────────
const CRITERES = [
  { key: 'note_pertinence', label: 'Pertinence' },
  { key: 'note_clarte',     label: 'Clarté'     },
  { key: 'note_precision',  label: 'Précision'  },
]

function StarRow({ label, value, onChange }) {
  const [hover, setHover] = useState(0)
  const active = hover || value
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '1rem', alignItems: 'center' }}>
      <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.14em', color: '#8ab8cc', textTransform: 'uppercase' }}>{label}</span>
      <div style={{ display: 'flex', gap: '4px' }} onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map(n => {
          const filled = n <= active
          return (
            <button
              key={n}
              type="button"
              aria-label={`${label} : ${n} sur 5`}
              onMouseEnter={() => setHover(n)}
              onClick={() => onChange(n)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 2px',
                fontSize: '1.5rem',
                lineHeight: 1,
                color: filled ? 'var(--cyan)' : 'rgba(0,245,255,0.18)',
                textShadow: filled ? '0 0 10px rgba(0,245,255,0.5)' : 'none',
                transition: 'color 0.15s var(--ease), transform 0.15s var(--ease), text-shadow 0.15s var(--ease)',
                transform: hover === n ? 'translateY(-2px)' : 'none',
              }}
            >
              {filled ? '★' : '☆'}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function FeedbackForm({ analyseId }) {
  const [notes, setNotes] = useState({ note_pertinence: 0, note_clarte: 0, note_precision: 0 })
  const [commentaire, setCommentaire] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const canSubmit = CRITERES.every(c => notes[c.key] >= 1) && !sending

  async function submit(e) {
    e.preventDefault()
    if (!canSubmit) return
    setError('')
    setSending(true)
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const uid = sessionData?.session?.user?.id
      if (!uid) throw new Error('Tu dois être connecté pour envoyer un retour.')
      const { error: insertErr } = await supabase.from('feedbacks').insert({
        user_id: uid,
        analyse_id: analyseId || null,
        note_pertinence: notes.note_pertinence,
        note_clarte:     notes.note_clarte,
        note_precision:  notes.note_precision,
        commentaire: commentaire.trim() || null,
      })
      if (insertErr) throw insertErr
      setSent(true)
    } catch (err) {
      setError(err.message || 'Envoi impossible. Réessaie dans un instant.')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div style={{ marginTop: '3rem', border: '1px solid rgba(0,255,136,0.35)', background: 'rgba(0,255,136,0.04)', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #00ff88, transparent)' }} />
        <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.18em', color: '#00ff88', textTransform: 'uppercase', marginBottom: '0.6rem' }}>// RETOUR ENREGISTRÉ</div>
        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1rem', color: '#fff', marginBottom: '0.4rem' }}>Merci pour ton feedback ✓</div>
        <div style={{ fontSize: '0.88rem', color: '#8ab8cc' }}>Chaque retour aide l'IA à devenir plus précise sur tes prochaines analyses.</div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} style={{ marginTop: '3rem', border: '1px solid var(--border)', background: 'var(--dark2)', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--cyan), transparent)' }} />
      <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.18em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>// NOTER CETTE ANALYSE</div>
      <p style={{ fontSize: '0.85rem', color: '#5a8a9a', marginBottom: '1.6rem' }}>Ton retour entraîne l'IA à mieux te coacher la prochaine fois.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.6rem' }}>
        {CRITERES.map(c => (
          <StarRow
            key={c.key}
            label={c.label}
            value={notes[c.key]}
            onChange={n => setNotes(prev => ({ ...prev, [c.key]: n }))}
          />
        ))}
      </div>

      <label style={{ display: 'block', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.14em', color: '#8ab8cc', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Commentaire (optionnel)</label>
      <textarea
        value={commentaire}
        onChange={e => setCommentaire(e.target.value)}
        rows={4}
        maxLength={1000}
        placeholder="Ce qui t'a marqué, ce qui manquait, ce qui ne colle pas..."
        style={{
          width: '100%',
          background: 'rgba(0,245,255,0.03)',
          border: '1px solid var(--border)',
          outline: 'none',
          padding: '12px 14px',
          fontFamily: 'Rajdhani, sans-serif',
          fontSize: '0.95rem',
          color: '#c8dde8',
          resize: 'vertical',
          transition: 'border-color 0.2s var(--ease), background 0.2s var(--ease)',
        }}
        onFocus={e => { e.currentTarget.style.borderColor = 'var(--border-hot)'; e.currentTarget.style.background = 'rgba(0,245,255,0.06)' }}
        onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(0,245,255,0.03)' }}
      />

      {error && (
        <div style={{ marginTop: '1rem', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.1em', color: '#ff4060', border: '1px solid rgba(255,64,96,0.3)', background: 'rgba(255,64,96,0.06)', padding: '10px 14px' }}>
          // {error}
        </div>
      )}

      <div style={{ marginTop: '1.6rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          type="submit"
          className="btn-primary"
          disabled={!canSubmit}
          style={{ fontSize: '0.78rem', padding: '13px 28px', opacity: canSubmit ? 1 : 0.45, cursor: canSubmit ? 'pointer' : 'not-allowed' }}
        >
          {sending ? 'Envoi...' : 'Envoyer mon retour'}
        </button>
        {!CRITERES.every(c => notes[c.key] >= 1) && (
          <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.12em', color: 'rgba(232,240,245,0.35)' }}>
            // Note les 3 critères pour envoyer
          </span>
        )}
      </div>
    </form>
  )
}
