'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../components/Navbar'

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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const raw = sessionStorage.getItem('mvp_rapport')
    console.log('[rapport] sessionStorage mvp_rapport présent:', !!raw)
    if (!raw) {
      setLoading(false)
      return
    }
    try {
      const data = JSON.parse(raw)
      console.log('[rapport] report parsé:', { jeu: data.jeu, score: data.score_global, modules: data.modules?.length })
      setReport(data)
    } catch (e) {
      console.error('[rapport] JSON.parse a échoué:', e)
    }
    setLoading(false)
  }, [])

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

          {/* Footer actions */}
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/dashboard" className="btn-primary" style={{ fontSize: '0.78rem', padding: '13px 28px' }}>⚡ Analyser une autre replay</Link>
          </div>
        </div>
      </main>
    </>
  )
}
