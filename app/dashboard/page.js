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
          await new Promise(r => setTimeout(r, 500))
          router.push('/rapport')
          return
        }
        if (job.status === 'failed') throw new Error(job.error || 'Analyse échouée')
      }
    } catch (err) {
      setError('Erreur : ' + err.message)
      setAnalyzing(false)
    }
  }

  const fieldStyle = { width: '100%', background: 'rgba(0,245,255,0.03)', border: '1px solid var(--border)', outline: 'none', padding: '11px 14px', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.95rem', color: '#c8dde8' }
  const labelStyle = { display: 'block', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4a7a8a', marginBottom: '6px' }

  return (
    <>
      <Navbar />
      {showAuth && (
        <div onClick={() => setShowAuth(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'var(--dark2)', border: '1px solid var(--border)', padding: '2.5rem', width: '100%', maxWidth: '400px', position: 'relative' }}>
            <button onClick={() => setShowAuth(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#4a7a8a', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.3rem' }}>MVP.COACHING</div>
            <div style={{ fontSize: '0.82rem', color: '#4a7a8a', marginBottom: '1.8rem' }}>Accède à ton coach IA personnel</div>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '1.8rem' }}>
              {['login', 'register'].map(t => (
                <button key={t} onClick={() => setAuthTab(t)} style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer', color: authTab === t ? 'var(--cyan)' : '#4a7a8a', borderBottom: authTab === t ? '2px solid var(--cyan)' : '2px solid transparent', marginBottom: '-1px' }}>{t === 'login' ? 'Connexion' : 'Créer un compte'}</button>
              ))}
            </div>
            {authTab === 'login' ? <LoginForm onSubmit={login} fieldStyle={fieldStyle} labelStyle={labelStyle} /> : <RegisterForm onSubmit={register} games={GAMES} fieldStyle={fieldStyle} labelStyle={labelStyle} />}
          </div>
        </div>
      )}
      <main style={{ minHeight: '100vh', paddingTop: '70px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 5%' }}>
          <span className="section-tag">// MON COACH IA</span>
          <h1 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', marginBottom: '3rem' }}>Analyse ta <span style={{ color: '#3a5a6a' }}>replay</span></h1>
          {!user ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '1px dashed rgba(0,245,255,0.12)' }}>
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1.2rem', opacity: 0.5 }}>🎮</span>
              <p style={{ color: '#4a7a8a', marginBottom: '1.5rem' }}>Connecte-toi pour uploader une replay et recevoir ton rapport de coaching IA.</p>
              <button onClick={() => setShowAuth(true)} className="btn-primary">Se connecter</button>
            </div>
          ) : (
            <>
              {!analyzing && (
                <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {GAMES.map(g => (
                    <button key={g} onClick={() => setGame(g)} style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.1em', padding: '7px 14px', background: (user?.game || game) === g ? 'rgba(0,245,255,0.1)' : 'transparent', border: `1px solid ${(user?.game || game) === g ? 'var(--cyan)' : 'var(--border)'}`, color: (user?.game || game) === g ? 'var(--cyan)' : '#4a7a8a', cursor: 'pointer', textTransform: 'uppercase' }}>{g}</button>
                  ))}
                </div>
              )}
              {!analyzing && !videoUrl && (
                <div onClick={() => fileRef.current?.click()} onDragEnter={e => { e.preventDefault(); setDragover(true) }} onDragOver={e => { e.preventDefault(); setDragover(true) }} onDragLeave={() => setDragover(false)} onDrop={e => { e.preventDefault(); setDragover(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]) }} style={{ border: `1px dashed ${dragover ? 'var(--cyan)' : 'rgba(0,245,255,0.2)'}`, background: dragover ? 'rgba(0,245,255,0.03)' : 'transparent', padding: '4rem 2rem', textAlign: 'center', cursor: 'pointer', marginBottom: '1.5rem' }}>
                  <input ref={fileRef} type="file" accept="video/*" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) handleFile(e.target.files[0]); e.target.value = '' }} />
                  <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem', opacity: 0.5 }}>📥</span>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.8rem', color: '#4a7a8a', letterSpacing: '0.08em' }}>Clique ou glisse ta replay ici</div>
                  <div style={{ fontSize: '0.75rem', color: '#2a4a5a', marginTop: '0.4rem' }}>MP4, WebM, MOV, MKV — max 2 Go</div>
                </div>
              )}
              {error && <div style={{ background: 'rgba(255,0,80,0.08)', border: '1px solid rgba(255,0,80,0.2)', color: '#ff6080', padding: '10px 14px', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</div>}
              {videoUrl && !analyzing && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <video src={videoUrl} controls style={{ width: '100%', maxHeight: '400px', background: '#000', border: '1px solid var(--border)', display: 'block' }} />
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--cyan)' }}>✓ {file?.name}</span>
                    <button onClick={() => { setFile(null); setVideoUrl(null) }} style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.6rem', background: 'none', border: 'none', color: '#4a7a8a', cursor: 'pointer' }}>Changer</button>
                  </div>
                </div>
              )}
              {videoUrl && !analyzing && <button onClick={analyze} className="btn-primary">⚡ Lancer l'analyse IA</button>}
              {analyzing && (
                <div style={{ marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.14em', color: 'var(--cyan)', marginBottom: '8px' }}>
                    <span>ANALYSE EN COURS</span><span>{progress}%</span>
                  </div>
                  <div style={{ height: '3px', background: 'rgba(0,245,255,0.08)' }}>
                    <div style={{ height: '100%', background: 'var(--cyan)', width: `${progress}%`, transition: 'width 0.5s ease', boxShadow: '0 0 10px rgba(0,245,255,0.4)' }} />
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#4a7a8a', marginTop: '10px' }}>{progressMsg}</div>
                  <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {[
                      { label: 'Upload & réception', done: progress >= 15 },
                      { label: 'Extraction des frames vidéo', done: progress >= 45 },
                      { label: 'Analyse Claude Vision', done: progress >= 65 },
                      { label: 'Génération du rapport', done: progress >= 85 },
                    ].map((step, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: step.done ? 'var(--cyan)' : 'rgba(0,245,255,0.1)', border: `1px solid ${step.done ? 'var(--cyan)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.55rem', color: 'var(--dark)' }}>{step.done ? '✓' : ''}</span>
                        <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.1em', color: step.done ? '#7fa8c0' : '#2a4a5a', textTransform: 'uppercase' }}>{step.label}</span>
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

function LoginForm({ onSubmit, fieldStyle, labelStyle }) {
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
      <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ton@email.com" style={fieldStyle} /></div>
      <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Mot de passe</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={fieldStyle} /></div>
      <button type="submit" className="btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block', marginTop: '0.5rem' }}>Se connecter</button>
    </form>
  )
}

function RegisterForm({ onSubmit, games, fieldStyle, labelStyle }) {
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
      <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Pseudo</label><input type="text" value={pseudo} onChange={e => setPseudo(e.target.value)} placeholder="ProPlayer99" style={fieldStyle} /></div>
      <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ton@email.com" style={fieldStyle} /></div>
      <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Mot de passe</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={fieldStyle} /></div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={labelStyle}>Jeu principal</label>
        <select value={game} onChange={e => setGame(e.target.value)} style={fieldStyle}>
          {games.map(g => <option key={g} value={g} style={{ background: '#060d14' }}>{g}</option>)}
        </select>
      </div>
      <button type="submit" className="btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block', marginTop: '0.5rem' }}>Créer mon compte</button>
    </form>
  )
}