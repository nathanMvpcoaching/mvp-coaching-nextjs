'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../components/Navbar'

const API = 'https://mvp-coaching-server.onrender.com'

const GAMES = ['Valorant', 'League of Legends', 'CS2', 'Overwatch 2', 'Apex Legends', 'Fortnite']

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [showAuth, setShowAuth] = useState(false)
  const [authTab, setAuthTab] = useState('login')
  const [file, setFile] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null)
  const [game, setGame] = useState('Valorant')
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [progressMsg, setProgressMsg] = useState('')
  const [error, setError] = useState('')
  const [dragover, setDragover] = useState(false)
  const fileRef = useRef()

  useEffect(() => {
    const s = localStorage.getItem('mvp_session')
    if (s) setUser(JSON.parse(s))
  }, [])

  function hash(str) {
    let h = 0
    for (let i = 0; i < str.length; i++) h = ((h << 5) - h) + str.charCodeAt(i) | 0
    return String(h)
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem('mvp_users') || '[]')
    const u = users.find(x => x.email === email.toLowerCase() && x.hash === hash(password))
    if (!u) return 'Email ou mot de passe incorrect.'
    const session = { email: u.email, pseudo: u.pseudo, game: u.game }
    localStorage.setItem('mvp_session', JSON.stringify(session))
    setUser(session)
    setShowAuth(false)
    return null
  }

  function register(pseudo, email, password, g) {
    const users = JSON.parse(localStorage.getItem('mvp_users') || '[]')
    if (users.find(u => u.email === email.toLowerCase())) return 'Email déjà utilisé.'
    users.push({ pseudo, email: email.toLowerCase(), hash: hash(password), game: g })
    localStorage.setItem('mvp_users', JSON.stringify(users))
    const session = { email: email.toLowerCase(), pseudo, game: g }
    localStorage.setItem('mvp_session', JSON.stringify(session))
    setUser(session)
    setShowAuth(false)
    return null
  }

  function handleFile(f) {
    if (!f || !f.type.startsWith('video/')) { setError('Fichier vidéo requis (MP4, WebM, MOV)'); return }
    setFile(f)
    setVideoUrl(URL.createObjectURL(f))
    setError('')
  }

  async function analyze() {
    if (!file) return
    setAnalyzing(true)
    setProgress(5)
    setProgressMsg('Envoi de la replay...')
    setError('')

    try {
      const fd = new FormData()
      fd.append('file', file, file.name)
      fd.append('game', user?.game || game)

      setProgress(15)
      const created = await fetch(`${API}/v1/analyses`, { method: 'POST', body: fd }).then(r => {
        if (!r.ok) throw new Error('Erreur serveur')
        return r.json()
      })

      const aid = created.id
      const steps = [
        { at: 25, msg: 'Extraction des captures vidéo...' },
        { at: 45, msg: 'Claude Vision analyse tes frames...' },
        { at: 65, msg: 'Génération des modules de coaching...' },
        { at: 85, msg: 'Finalisation du rapport...' },
      ]
      let stepIdx = 0

      while (true) {
        await new Promise(r => setTimeout(r, 900))
        const job = await fetch(`${API}/v1/analyses/${aid}`).then(r => r.json())

        if (stepIdx < steps.length && job.progress >= steps[stepIdx].at) {
          setProgress(steps[stepIdx].at)
          setProgressMsg(steps[stepIdx].msg)
          stepIdx++
        }

        if (job.status === 'completed' && job.report) {
          setProgress(100)
          setProgressMsg('Analyse terminée !')
          sessionStorage.setItem('mvp_rapport', JSON.stringify(job.report))
          console.log('[dashboard] mvp_rapport sauvegardé:', {
            keys: Object.keys(job.report || {}),
            size: JSON.stringify(job.report).length,
            stored: sessionStorage.getItem('mvp_rapport')?.slice(0, 200),
          })
          await new Promise(r => setTimeout(r, 500))
          console.log('[dashboard] redirection vers /rapport...')
          window.location.href = '/rapport'
          return
        }
        if (job.status === 'failed') throw new Error(job.error || 'Analyse échouée')
      }
    } catch (err) {
      setError('Erreur : ' + err.message)
      setAnalyzing(false)
    }
  }

  return (
    <>
      <Navbar />

      {/* AUTH MODAL */}
      {showAuth && (
        <div onClick={() => setShowAuth(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 500,
          display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)'
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'var(--dark2)', border: '1px solid var(--border)',
            padding: '2.5rem', width: '100%', maxWidth: '400px', position: 'relative'
          }}>
            <button onClick={() => setShowAuth(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'rgba(232,240,245,0.3)', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.3rem' }}>MVP.COACHING</div>
            <div style={{ fontSize: '0.82rem', color: 'rgba(232,240,245,0.3)', marginBottom: '1.8rem' }}>Accède à ton coach IA personnel</div>

            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '1.8rem' }}>
              {['login', 'register'].map(t => (
                <button key={t} onClick={() => setAuthTab(t)} style={{
                  fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase', padding: '10px 20px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: authTab === t ? 'var(--cyan)' : 'rgba(232,240,245,0.3)',
                  borderBottom: authTab === t ? '2px solid var(--cyan)' : '2px solid transparent',
                  marginBottom: '-1px'
                }}>{t === 'login' ? 'Connexion' : 'Créer un compte'}</button>
              ))}
            </div>

            {authTab === 'login' ? (
              <LoginForm onSubmit={login} />
            ) : (
              <RegisterForm onSubmit={register} games={GAMES} />
            )}
          </div>
        </div>
      )}

      <main style={{ minHeight: '100vh', paddingTop: '70px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 5%' }}>

          {/* Header */}
          <div style={{ marginBottom: '3rem' }}>
            <span className="section-tag">// MON COACH IA</span>
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff' }}>
              Analyse ta <span style={{ color: 'rgba(232,240,245,0.25)' }}>replay</span>
            </h1>
          </div>

          {!user ? (
            /* Guest */
            <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '1px dashed rgba(0,245,255,0.12)' }}>
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1.2rem', opacity: 0.5 }}>🎮</span>
              <p style={{ color: 'rgba(232,240,245,0.35)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Connecte-toi pour uploader une replay et recevoir ton rapport de coaching IA.</p>
              <button onClick={() => setShowAuth(true)} className="btn-primary">Se connecter</button>
            </div>
          ) : (
            /* Logged in */
            <>
              {/* Game selector */}
              {!analyzing && (
                <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {GAMES.map(g => (
                    <button key={g} onClick={() => setGame(g)} style={{
                      fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.1em',
                      padding: '7px 14px', background: (user?.game || game) === g ? 'rgba(0,245,255,0.1)' : 'transparent',
                      border: `1px solid ${(user?.game || game) === g ? 'var(--cyan)' : 'var(--border)'}`,
                      color: (user?.game || game) === g ? 'var(--cyan)' : 'rgba(232,240,245,0.3)',
                      cursor: 'pointer', textTransform: 'uppercase'
                    }}>{g}</button>
                  ))}
                </div>
              )}

              {/* Upload zone */}
              {!analyzing && !videoUrl && (
                <div
                  onClick={() => fileRef.current?.click()}
                  onDragEnter={e => { e.preventDefault(); setDragover(true) }}
                  onDragOver={e => { e.preventDefault(); setDragover(true) }}
                  onDragLeave={() => setDragover(false)}
                  onDrop={e => { e.preventDefault(); setDragover(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]) }}
                  style={{
                    border: `1px dashed ${dragover ? 'var(--cyan)' : 'rgba(0,245,255,0.2)'}`,
                    background: dragover ? 'rgba(0,245,255,0.03)' : 'transparent',
                    padding: '4rem 2rem', textAlign: 'center', cursor: 'pointer',
                    marginBottom: '1.5rem', transition: 'all 0.2s'
                  }}>
                  <input ref={fileRef} type="file" accept="video/*" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) handleFile(e.target.files[0]); e.target.value = '' }} />
                  <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem', opacity: 0.5 }}>📥</span>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.8rem', color: 'rgba(232,240,245,0.35)', letterSpacing: '0.08em' }}>Clique ou glisse ta replay ici</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(232,240,245,0.2)', marginTop: '0.4rem' }}>MP4, WebM, MOV, MKV — max 2 Go</div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div style={{ background: 'rgba(255,0,80,0.08)', border: '1px solid rgba(255,0,80,0.2)', color: '#ff6080', padding: '10px 14px', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</div>
              )}

              {/* Video player */}
              {videoUrl && !analyzing && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <video src={videoUrl} controls style={{ width: '100%', maxHeight: '400px', background: '#000', border: '1px solid var(--border)', display: 'block' }} />
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--cyan)' }}>✓ {file?.name}</span>
                    <button onClick={() => { setFile(null); setVideoUrl(null) }} style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.6rem', background: 'none', border: 'none', color: 'rgba(232,240,245,0.3)', cursor: 'pointer' }}>Changer</button>
                  </div>
                </div>
              )}

              {/* Analyze button */}
              {videoUrl && !analyzing && (
                <button onClick={analyze} className="btn-primary" style={{ fontSize: '0.82rem', padding: '15px 36px' }}>
                  ⚡ Lancer l'analyse IA
                </button>
              )}

              {/* Progress */}
              {analyzing && (
                <div style={{ marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.14em', color: 'var(--cyan)', marginBottom: '8px' }}>
                    <span>ANALYSE EN COURS</span>
                    <span>{progress}%</span>
                  </div>
                  <div style={{ height: '3px', background: 'rgba(0,245,255,0.08)' }}>
                    <div style={{ height: '100%', background: 'var(--cyan)', width: `${progress}%`, transition: 'width 0.5s ease', boxShadow: '0 0 10px rgba(0,245,255,0.4)' }} />
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'rgba(232,240,245,0.35)', marginTop: '10px' }}>{progressMsg}</div>

                  {/* Steps */}
                  <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {[
                      { label: 'Upload & réception', done: progress >= 15 },
                      { label: 'Extraction des frames vidéo', done: progress >= 45 },
                      { label: 'Analyse Claude Vision', done: progress >= 65 },
                      { label: 'Génération du rapport', done: progress >= 85 },
                    ].map((step, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: step.done ? 'var(--cyan)' : 'rgba(0,245,255,0.1)', border: `1px solid ${step.done ? 'var(--cyan)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.55rem', color: 'var(--dark)' }}>{step.done ? '✓' : ''}</span>
                        <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.1em', color: step.done ? 'rgba(232,240,245,0.6)' : 'rgba(232,240,245,0.2)', textTransform: 'uppercase' }}>{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}

function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const err = onSubmit(email, password)
    if (err) setError(err)
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ background: 'rgba(255,0,80,0.08)', border: '1px solid rgba(255,0,80,0.2)', color: '#ff6080', padding: '8px 12px', fontSize: '0.8rem', marginBottom: '1rem' }}>{error}</div>}
      <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="ton@email.com" />
      <Field label="Mot de passe" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
      <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem', textAlign: 'center', display: 'block' }}>Se connecter</button>
    </form>
  )
}

function RegisterForm({ onSubmit, games }) {
  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [game, setGame] = useState('Valorant')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const err = onSubmit(pseudo, email, password, game)
    if (err) setError(err)
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ background: 'rgba(255,0,80,0.08)', border: '1px solid rgba(255,0,80,0.2)', color: '#ff6080', padding: '8px 12px', fontSize: '0.8rem', marginBottom: '1rem' }}>{error}</div>}
      <Field label="Pseudo" type="text" value={pseudo} onChange={setPseudo} placeholder="ProPlayer99" />
      <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="ton@email.com" />
      <Field label="Mot de passe" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(232,240,245,0.4)', marginBottom: '6px' }}>Jeu principal</label>
        <select value={game} onChange={e => setGame(e.target.value)} style={{ width: '100%', background: 'rgba(0,245,255,0.03)', border: '1px solid var(--border)', outline: 'none', padding: '11px 14px', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.95rem', color: 'var(--white)', color: '#e8f0f5' }}>
          {games.map(g => <option key={g} value={g} style={{ background: '#0d1318' }}>{g}</option>)}
        </select>
      </div>
      <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem', textAlign: 'center', display: 'block' }}>Créer mon compte</button>
    </form>
  )
}

function Field({ label, type, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(232,240,245,0.4)', marginBottom: '6px' }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ width: '100%', background: 'rgba(0,245,255,0.03)', border: '1px solid var(--border)', outline: 'none', padding: '11px 14px', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.95rem', color: '#e8f0f5' }} />
    </div>
  )
}
