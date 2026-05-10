'use client'
import Link from 'next/link'
import Navbar from '../components/Navbar'

const guides = [
  {
    slug: 'valorant',
    game: 'Valorant',
    icon: '🎯',
    rank: 'Silver → Diamond',
    desc: 'Crosshair placement, gestion des utilitaires, rotations et prise de décision. Tout ce qu\'il faut pour franchir les paliers compétitifs.',
    tags: ['Aim', 'Utilitaires', 'Rotations', 'Économie'],
    color: '#ff4655',
  },
  {
    slug: 'lol',
    game: 'League of Legends',
    icon: '⚔️',
    rank: 'Bronze → Platine',
    desc: 'Wave management, vision control, macro game et décisions de teamfight. La roadmap complète pour climb en solo queue.',
    tags: ['Wave Management', 'Vision', 'Macro', 'Teamfight'],
    color: '#c89b3c',
  },
  {
    slug: 'cs2',
    game: 'CS2',
    icon: '💥',
    rank: 'Silver → MG2',
    desc: 'Utilisation des smokes, angles de prise, économie et communication. Les fondamentaux qui séparent les bons joueurs des grands.',
    tags: ['Smokes', 'Angles', 'Économie', 'Communication'],
    color: '#f0a500',
  },
  {
    slug: 'overwatch',
    game: 'Overwatch 2',
    icon: '🌀',
    rank: 'Bronze → Diamond',
    desc: 'Gestion des ultimates, positioning selon le rôle, communication et lecture du teamfight. Progresser dans chaque rôle.',
    tags: ['Ultimates', 'Positioning', 'Rôles', 'Teamfight'],
    color: '#fa9c1e',
  },
]

export default function GuidesPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '70px', position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <section style={{ padding: '80px 5% 60px', textAlign: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse at top, rgba(0,245,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--cyan)', display: 'block', marginBottom: '1rem' }}>// GUIDES PRO</span>
          <h1 style={{ fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', lineHeight: 1.05, marginBottom: '1.2rem' }}>
            Comment sortir de son <span style={{ color: 'var(--cyan)' }}>ELO</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#5a8a9a', maxWidth: '560px', margin: '0 auto 1rem', lineHeight: 1.7 }}>
            Guides détaillés rédigés par des coaches professionnels. Chaque guide couvre les erreurs les plus communes à ton rang et les corrections concrètes pour progresser.
          </p>
          <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.14em', color: '#2a4a5a', textTransform: 'uppercase' }}>
            Combine ces guides avec l'analyse IA de tes replays pour progresser 2× plus vite
          </p>
        </section>

        {/* Guides grid */}
        <section style={{ padding: '0 5% 100px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
            {guides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--dark2)', padding: '2.5rem', position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--dark3)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--dark2)'}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${g.color}, transparent)` }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '2.5rem', opacity: 0.8 }}>{g.icon}</span>
                      <div>
                        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '3px' }}>{g.game}</div>
                        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: g.color, textTransform: 'uppercase' }}>{g.rank}</div>
                      </div>
                    </div>
                    <span style={{ color: 'var(--cyan)', fontSize: '1.2rem', opacity: 0.5 }}>→</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#5a8a9a', lineHeight: 1.65, marginBottom: '1.5rem' }}>{g.desc}</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {g.tags.map(tag => (
                      <span key={tag} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.1em', padding: '3px 10px', background: 'rgba(0,245,255,0.05)', border: '1px solid rgba(0,245,255,0.12)', color: 'rgba(0,245,255,0.4)', textTransform: 'uppercase' }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ marginTop: '1.5rem', fontFamily: "'Orbitron', monospace", fontSize: '0.72rem', fontWeight: 700, color: 'var(--cyan)', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Lire le guide <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div style={{ maxWidth: '1100px', margin: '2rem auto 0', padding: '2rem', background: 'var(--dark2)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>Passe à la vitesse supérieure</div>
              <div style={{ fontSize: '0.88rem', color: '#5a8a9a' }}>Ces guides + l'analyse IA de tes replays = progression 2× plus rapide</div>
            </div>
            <Link href="/dashboard" className="btn-primary">Analyser ma replay gratuitement</Link>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-logo">MVP<span>.</span>COACHING</div>
        <ul className="footer-links">
          {['Confidentialité', 'CGU', 'Contact', 'Discord'].map(l => <li key={l}><a href="#">{l}</a></li>)}
        </ul>
        <div className="footer-copy">© 2025 MVP.COACHING — ALL SYSTEMS ONLINE</div>
      </footer>
    </>
  )
}
