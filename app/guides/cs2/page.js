'use client'
import Link from 'next/link'
import Navbar from '../../components/Navbar'

export default function CS2Guide() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '70px', position: 'relative', zIndex: 2 }}>
        <section style={{ padding: '80px 5% 60px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <Link href="/guides" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.14em', color: '#3a5a6a', textDecoration: 'none', textTransform: 'uppercase' }}>← Guides</Link>
              <span style={{ color: '#2a4a5a' }}>/</span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.14em', color: '#f0a500', textTransform: 'uppercase' }}>CS2</span>
            </div>
            <span className="section-tag">// GUIDE COMPÉTITIF CS2</span>
            <h1 style={{ fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', lineHeight: 1.05, marginBottom: '1.2rem' }}>
              Comment sortir de Silver<br /><span style={{ color: '#f0a500' }}>et atteindre MG2</span>
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#5a8a9a', lineHeight: 1.75, maxWidth: '640px', marginBottom: '2rem' }}>Smokes, angles, économie et communication. Les 4 piliers qui séparent les joueurs Silver des Master Guardian.</p>
          </div>
        </section>

        <section style={{ padding: '0 5% 100px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {[
              { num: '01', title: 'Économie — Acheter au bon moment', color: '#f0a500', content: "L'économie CS2 est binaire : soit tu full buy, soit tu save. Le force buy est presque toujours une erreur. Règle : full buy avec 3700+ crédits (AK/M4 + armure + grenades). En dessous, tu save sauf exception.\n\nAprès un pistol round perdu, tu as 2 options : full eco (save tout) ou eco partiel (achetez des P250/Tec-9 + armure). Ne jamais acheter un rifle sans armure — tu mourras en un clip.\n\nCommunique ton économie : 'J'ai 2000, je drop' ou 'Full eco ce round' évite que toute l'équipe achète de manière incohérente." },
              { num: '02', title: 'Smokes & Grenades — L\'utilitaire qui gagne des rounds', color: '#00f5ff', content: "Maîtriser 3-4 smokes par map suffit pour passer Silver. Tu n'as pas besoin de connaître 50 lineups — juste les smokes clés qui coupent les angles les plus dangereux.\n\nPour chaque map : apprends à smoke la CT, le window, et l'entrée principale. Ces 3 smokes changent complètement la dynamique d'attaque.\n\nLes flashs sont sous-utilisées en Silver. Une flash bien placée avant d'entrer sur un site permet à toute l'équipe d'entrer sans prendre de damage. Coordonne toujours tes flashs avec l'équipe." },
              { num: '03', title: 'Angles & Pré-visée — Gagner les duels avant qu\'ils commencent', color: '#00ff88', content: "La pré-visée est l'équivalent du crosshair placement de Valorant. Ton crosshair doit être sur l'angle exact où un ennemi pourrait apparaître avant même que tu l'aies vu.\n\nNe jamais courir vers un angle — toujours s'arrêter pour tirer (counter-strafe). CS2 est un jeu de précision statique, pas de mobilité.\n\nVarié tes timings : si tu arrives toujours à mid au même moment, l'adversaire va anticiper et te pré-viser. Change tes timings de 2-3 secondes chaque round." },
              { num: '04', title: 'Communication & Callouts — L\'arme collective', color: '#ff4655', content: "Connaître les callouts de chaque map est une priorité. 'Il y a un CT à la boîte' est inutile. 'CT short, derrière barrel' permet à ton équipe de réagir précisément.\n\nAprès chaque contact : callout immédiat de la position et de la vie estimée ('B tunnel, low', 'A site, 80HP'). Ces informations valent plus que n'importe quel skill individuel.\n\nNe parle pas en round quand ton équipier est en duel — attends qu'il ait fini pour partager des infos non urgentes." },
            ].map((s, i) => (
              <div key={i} style={{ background: 'var(--dark2)', border: '1px solid var(--border)', padding: '2.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: `${s.color}80`, flexShrink: 0, paddingTop: '4px' }}>{s.num}</span>
                  <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', fontWeight: 700, color: '#fff' }}>{s.title}</h2>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#5a8a9a', lineHeight: 1.75 }}>
                  {s.content.split('\n\n').map((p, j) => <p key={j} style={{ marginBottom: '1rem' }}>{p}</p>)}
                </div>
              </div>
            ))}

            <div style={{ background: 'var(--dark3)', border: '1px solid rgba(0,245,255,0.2)', padding: '2.5rem', textAlign: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--cyan)' }} />
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.8rem' }}>Identifie ta vraie faiblesse</div>
              <p style={{ fontSize: '0.92rem', color: '#5a8a9a', marginBottom: '1.5rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>Upload ta replay CS2 — l'IA analyse tes angles, ton économie et ton positionnement pour créer ton plan de progression.</p>
              <Link href="/dashboard" className="btn-primary">Analyser ma replay CS2</Link>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-logo">MVP<span>.</span>COACHING</div>
        <ul className="footer-links">{['Confidentialité','CGU','Contact','Discord'].map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
        <div className="footer-copy">© 2025 MVP.COACHING — ALL SYSTEMS ONLINE</div>
      </footer>
    </>
  )
}
