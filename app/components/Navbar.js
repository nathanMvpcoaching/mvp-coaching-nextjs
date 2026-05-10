'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'

export default function Navbar() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let mounted = true
    function applySession(session) {
      if (!mounted) return
      const u = session?.user
      if (!u) { setUser(null); return }
      const meta = u.user_metadata || {}
      setUser({ id: u.id, email: u.email, pseudo: meta.pseudo || u.email, game: meta.game || 'Valorant' })
    }
    supabase.auth.getSession().then(({ data }) => applySession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => applySession(session))
    return () => { mounted = false; sub.subscription.unsubscribe() }
  }, [])

  async function logout() {
    await supabase.auth.signOut()
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
        <Link href="/#how" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(232,240,245,0.4)', textDecoration: 'none' }}>Fonctionnement</Link>
        <Link href="/#exemple" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(232,240,245,0.4)', textDecoration: 'none' }}>Exemple</Link>
        <Link href="/#pricing" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(232,240,245,0.4)', textDecoration: 'none' }}>Tarifs</Link>
        <Link href="/guides" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', textDecoration: 'none' }}>Guides</Link>
        <Link href="/stats" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', textDecoration: 'none' }}>Stats</Link>
        {user && (
          <Link href="/history" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', textDecoration: 'none' }}>Historique</Link>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {user ? (
          <>
            <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--cyan)' }}>// {user.pseudo}</span>
            <Link href="/dashboard" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.7rem' }}>Dashboard</Link>
            <button onClick={logout} style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 16px', background: 'transparent', color: 'rgba(232,240,245,0.3)', border: '1px solid var(--border)', cursor: 'pointer' }}>Déconnexion</button>
          </>
        ) : (
          <Link href="/dashboard" className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.72rem' }}>Analyser ma replay</Link>
        )}
      </div>
    </nav>
  )
}
