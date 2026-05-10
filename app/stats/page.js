'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'

const API = 'https://mvp-coaching-server.onrender.com'
const REGIONS = ['EUW', 'EUNE', 'NA', 'KR', 'BR']

export default function StatsPage() {
  const [riotId, setRiotId] = useState('')
  const [region, setRegion] = useState('EUW')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [stats, setStats] = useState(null)

  async function analyze() {
    if (!riotId.trim() || !riotId.includes('#')) {
      setError('Format attendu : NomJoueur#TAG')
      return
    }
    setLoading(true)
    setError('')
    setStats(null)
    try {
      const url = `${API}/v1/riot/player?riot_id=${encodeURIComponent(riotId.trim())}&region=${encodeURIComponent(region)}`
      const res = await fetch(url)
      if (!res.ok) {
        if (res.status === 404) throw new Error('Joueur introuvable. Vérifie le Riot ID et la région.')
        throw new Error('Erreur serveur — réessaie dans un instant.')
      }
      const data = await res.json()
      setStats(data)
    } catch (err) {
      setError(err.message || 'Erreur inconnue.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '70px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 5%' }}>

          {/* Header */}
          <div style={{ marginBottom: '3rem' }}>
            <span className="section-tag">// STATS RIOT API</span>
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', marginBottom: '0.4rem' }}>
              Analyse ton <span style={{ color: 'rgba(232,240,245,0.25)' }}>profil</span>
            </h1>
            <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.78rem', letterSpacing: '0.08em', color: 'var(--cyan)', marginTop: '0.6rem' }}>
              Tes stats Valorant, brutes et sans filtre.
            </div>
          </div>

          {/* Form */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <div style={{ flex: '1 1 240px' }}>
              <label style={{ display: 'block', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(232,240,245,0.4)', marginBottom: '6px' }}>Riot ID</label>
              <input
                type="text"
                value={riotId}
                onChange={e => setRiotId(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !loading) analyze() }}
                placeholder="NomJoueur#TAG"
                style={{ width: '100%', background: 'rgba(0,245,255,0.03)', border: '1px solid var(--cyan)', outline: 'none', padding: '11px 14px', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.95rem', color: '#e8f0f5' }}
              />
            </div>
            <div style={{ flex: '0 0 140px' }}>
              <label style={{ display: 'block', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(232,240,245,0.4)', marginBottom: '6px' }}>Région</label>
              <select
                value={region}
                onChange={e => setRegion(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,245,255,0.03)', border: '1px solid var(--cyan)', outline: 'none', padding: '11px 14px', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.95rem', color: '#e8f0f5' }}
              >
                {REGIONS.map(r => (
                  <option key={r} value={r} style={{ background: '#0d1318' }}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={analyze}
            disabled={loading}
            className="btn-primary"
            style={{ fontSize: '0.82rem', padding: '15px 36px', opacity: loading ? 0.5 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Analyse en cours...' : '⚡ Analyser mon profil'}
          </button>

          {/* Error */}
          {error && (
            <div style={{ background: 'rgba(255,0,80,0.08)', border: '1px solid rgba(255,0,80,0.2)', color: '#ff6080', padding: '10px 14px', fontSize: '0.85rem', marginTop: '1.5rem' }}>
              ⚠ {error}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '4rem 0' }}>
              <div className="spinner-cyan" />
              <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.14em', color: 'var(--cyan)', textTransform: 'uppercase' }}>
                Récupération des stats Riot...
              </div>
            </div>
          )}

          {/* Stats */}
          {stats && !loading && <StatsView stats={stats} />}
        </div>
      </main>
    </>
  )
}

function StatsView({ stats }) {
  const kda = stats.kda ?? (stats.deaths > 0 ? ((stats.kills + stats.assists) / stats.deaths) : (stats.kills + stats.assists))
  const winrate = stats.winrate ?? (stats.matches_played ? Math.round((stats.wins / stats.matches_played) * 100) : 0)
  const hsPct = stats.hs_percent ?? stats.headshot_percent ?? 0
  const agents = Array.isArray(stats.agents) ? stats.agents : []

  return (
    <div style={{ marginTop: '2rem' }}>
      {/* Identité */}
      <div style={{ borderLeft: '2px solid var(--cyan)', paddingLeft: '14px', marginBottom: '2rem' }}>
        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.3rem', fontWeight: 700, color: '#fff' }}>
          {stats.riot_id || stats.name || 'Joueur'}
        </div>
        <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.12em', color: 'rgba(232,240,245,0.35)', marginTop: '4px' }}>
          {stats.region || ''} · {stats.matches_played ?? 0} parties analysées
        </div>
      </div>

      {/* Top metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '2rem' }}>
        <Metric label="KDA" value={kda.toFixed ? kda.toFixed(2) : kda} />
        <Metric label="Winrate" value={`${winrate}%`} />
        <Metric label="Headshot %" value={`${typeof hsPct === 'number' ? hsPct.toFixed(1) : hsPct}%`} />
        <Metric label="Parties" value={stats.matches_played ?? 0} />
      </div>

      {/* K/D/A moyens */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(232,240,245,0.4)', marginBottom: '0.8rem' }}>
          // Moyennes par partie
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
          <Metric label="Kills" value={fmt(stats.kills_avg ?? stats.kills)} accent="#00ff88" />
          <Metric label="Deaths" value={fmt(stats.deaths_avg ?? stats.deaths)} accent="#ff6080" />
          <Metric label="Assists" value={fmt(stats.assists_avg ?? stats.assists)} accent="#ffd700" />
        </div>
      </div>

      {/* Agents */}
      {agents.length > 0 && (
        <div>
          <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(232,240,245,0.4)', marginBottom: '0.8rem' }}>
            // Agents joués
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {agents.map((a, i) => {
              const name = typeof a === 'string' ? a : (a.name || a.agent || '?')
              const games = typeof a === 'object' ? (a.games ?? a.matches ?? null) : null
              return (
                <div key={i} style={{ background: 'rgba(0,245,255,0.05)', border: '1px solid rgba(0,245,255,0.3)', padding: '6px 12px', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', color: 'var(--cyan)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {name}{games !== null && <span style={{ color: 'rgba(232,240,245,0.4)', marginLeft: '6px' }}>×{games}</span>}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function Metric({ label, value, accent }) {
  return (
    <div style={{ background: 'rgba(0,245,255,0.03)', border: '1px solid rgba(0,245,255,0.15)', padding: '16px 18px' }}>
      <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(232,240,245,0.4)', marginBottom: '6px' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '1.6rem', color: accent || 'var(--cyan)' }}>
        {value}
      </div>
    </div>
  )
}

function fmt(v) {
  if (v == null) return '—'
  if (typeof v === 'number') return v.toFixed(1)
  return v
}
