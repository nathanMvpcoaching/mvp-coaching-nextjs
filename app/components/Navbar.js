'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const s = localStorage.getItem('mvp_session')
    if (s) setUser(JSON.parse(s))
  }, [])

  function logout() {
    localStorage.removeItem('mvp_session')
    setUser(null)
    window.location.href = '/'
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: '70px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 5%',
      background: 'rgba(2,4,8,0.85)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)'
    }}>
      <Link href="/" style={{
        fontFamily: 'Orbitron, monospace', fontWeight: 900,
        fontSize: '1.2rem', color: '#fff', textDecoration: 'none',
        letterSpacing: '0.05em'
      }}>
        MVP<span style={{ color: 'var(--cyan)' }}>.</span>COACHING
      </Link>

      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {['Fonctionnement', 'Exemple', 'Tarifs'].map((l, i) => (
          <a key={i} href={`/#${['how', 'exemple', 'pricing'][i]}`} style={{
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
            fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#4a7a8a', textDecoration: 'none'
          }}>{l}</a>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {user ? (
          <>
            <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--cyan)' }}>// {user.pseudo}</span>
            <Link href="/dashboard" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.7rem' }}>Dashboard</Link>
            <button onClick={logout} style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 16px', background: 'transparent', color: '#4a7a8a', border: '1px solid var(--border)', cursor: 'pointer' }}>Déconnexion</button>
          </>
        ) : (
          <Link href="/dashboard" className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.72rem' }}>Analyser ma replay</Link>
        )}
      </div>
    </nav>
  )
}