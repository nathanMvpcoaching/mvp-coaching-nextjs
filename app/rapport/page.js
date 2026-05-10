'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'

export default function Rapport() {
  const [report, setReport] = useState(null)

  useEffect(() => {
    const r = sessionStorage.getItem('mvp_rapport')
    if (r) setReport(JSON.parse(r))
  }, [])

  function scoreColor(s) {
    if (s >= 75) return '#00ff88'
    if (s >= 55) return 'var(--cyan)'
    if (s >= 40) return 'var(--gold)'
    return '#ff4060'
  }

  if (!report) return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem', opacity: 0.4 }}>📊</span>
          <p style={{ color: '#4a7a8a', marginBottom: '1.5rem' }}>Aucun rapport disponible.</p>
          <Link href="/dashboard" className="btn-primary">Analyser une replay</Link>
        </div>
      </main>
    </>
  )

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '70px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 5%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-tag">// RAPPORT IA — MVP.COACHING</span>
              <h1 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#fff' }}>{report.jeu} — Rapport de performance</h1>
            </div>
            <Link href="/dashboard" className="btn-secondary" style={{ fontSize: '0.7rem', padding: '10px 20px' }}>+ Nouvelle analyse</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', marginBottom: '1.5rem', background: 'var(--dark2)', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${scoreColor(report.score_global)}, transparent)` }} />
            <div style={{ padding: '2.5rem 2rem', textAlign: 'center', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '4.5rem', fontWeight: 900, color: scoreColor(report.score_global), lineHeight: 1 }}>{report.score_global}</span>
              <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.58rem', color: '#2a4a5a', letterSpacing: '0.12em', marginTop: '4px' }}>/100</span>
            </div>
            <div style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.92rem', color: '#5a8a9a', lineHeight: 1.65 }}>{report.resume}</div>
              <div style={{ display: 'flex', gap: '8px' }}><span>⭐</span><span style={{ fontSize: '0.85rem', color: '#5a8a9a' }}><strong style={{ color: '#c8dde8' }}>Point fort — </strong>{report.point_fort}</span></div>
              <div style={{ display: 'flex', gap: '8px' }}><span>⚡</span><span style={{ fontSize: '0.85rem', color: '#5a8a9a' }}><strong style={{ color: '#ff8090' }}>Priorité — </strong>{report.priorite}</span></div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--dark2)', padding: '1.4rem' }}>
              <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.14em', color: 'rgba(0,255,136,0.5)', display: 'block', marginBottom: '0.6rem', textTransform: 'uppercase' }}>✦ Ce que tu fais bien</span>
              <div style={{ fontSize: '0.88rem', color: '#5a8a9a', lineHeight: 1.5 }}>{report.point_fort}</div>
            </div>
            <div style={{ background: 'var(--dark2)', padding: '1.4rem' }}>
              <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.14em', color: 'rgba(255,64,96,0.5)', display: 'block', marginBottom: '0.6rem', textTransform: 'uppercase' }}>⚡ Priorité absolue</span>
              <div style={{ fontSize: '0.88rem', color: '#5a8a9a', lineHeight: 1.5 }}>{report.priorite}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
            {(report.modules || []).map((mod, i) => (
              <div key={i} style={{ background: 'var(--dark2)', padding: '1.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.52rem', color: '#2a4a5a', marginBottom: '4px' }}>MODULE 0{i + 1}</div>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.78rem', fontWeight: 700, color: '#fff' }}>{mod.label}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.8rem', fontWeight: 900, color: scoreColor(mod.score), lineHeight: 1, display: 'block' }}>{mod.score}</span>
                    <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.52rem', color: scoreColor(mod.score), display: 'block', marginTop: '2px' }}>{mod.niveau}</span>
                  </div>
                </div>
                <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)', marginBottom: '1.2rem' }}>
                  <div style={{ height: '100%', width: `${mod.score}%`, background: scoreColor(mod.score) }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  {(mod.points || []).map((p, j) => (
                    <div key={j} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span className={`pill-${p.type}`} style={{ marginTop: '2px' }}>{p.type}</span>
                      <span style={{ fontSize: '0.82rem', color: '#4a7a8a', lineHeight: 1.5 }}>{p.texte}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--dark2)', border: '1px solid var(--border)', padding: '2rem', position: 'relative', marginBottom: '3rem' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, rgba(0,245,255,0.4), transparent)' }} />
            <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.18em', color: 'var(--cyan)', marginBottom: '1.4rem', textTransform: 'uppercase' }}>// PLAN D'ENTRAÎNEMENT — CETTE SEMAINE</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(report.plan_semaine || []).map((item, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: '12px' }}>
                  <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.65rem', fontWeight: 700, color: 'rgba(0,245,255,0.3)', paddingTop: '2px' }}>0{i + 1}</span>
                  <span style={{ fontSize: '0.88rem', color: '#7fa8c0', lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '2rem', border: '1px dashed rgba(0,245,255,0.12)' }}>
            <p style={{ color: '#4a7a8a', marginBottom: '1.2rem', fontSize: '0.9rem' }}>Analyse une autre replay pour suivre ta progression</p>
            <Link href="/dashboard" className="btn-primary">+ Nouvelle analyse</Link>
          </div>
        </div>
      </main>
    </>
  )
}