import Link from 'next/link'
import Navbar from './components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '140px 5% 100px', position: 'relative', zIndex: 2
      }}>
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '500px',
          background: 'radial-gradient(ellipse at top, rgba(0,245,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <span style={{
          fontFamily: 'Share Tech Mono, monospace', fontSize: '0.68rem',
          letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--cyan)',
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          border: '1px solid rgba(0,245,255,0.3)', padding: '6px 18px',
          background: 'rgba(0,245,255,0.05)', marginBottom: '2rem'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)' }} />
          BÊTA OUVERTE — Accès gratuit limité
        </span>

        <h1 style={{
          fontFamily: 'Orbitron, monospace', fontWeight: 900,
          fontSize: 'clamp(3rem, 8vw, 6.5rem)', lineHeight: 0.92,
          color: '#fff', marginBottom: '1.5rem', letterSpacing: '-0.01em'
        }}>
          <span style={{ color: 'var(--cyan)' }}>MVP</span>.COACHING<br />
          <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.8rem)', fontWeight: 400, letterSpacing: '0.35em', color: '#4a7a94', display: 'block', marginTop: '0.5rem' }}>
            YOUR PERSONAL AI COACH
          </span>
        </h1>

        <p style={{
          maxWidth: '580px', fontSize: '1.1rem', color: '#7fa8c0',
          lineHeight: 1.75, marginBottom: '2.5rem'
        }}>
          Upload ta replay. L'IA analyse chaque frame et te dit <strong style={{ color: '#c8dde8' }}>exactement quoi corriger</strong> — prise de décision, placement, mécanique, lecture du jeu.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/dashboard" className="btn-primary">Analyser ma première replay</Link>
          <a href="#exemple" className="btn-secondary">Voir un exemple de rapport</a>
        </div>

        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          borderTop: '1px solid var(--border)', background: 'rgba(2,4,8,0.7)',
          backdropFilter: 'blur(10px)'
        }}>
          {[
            { val: 'BÊTA', label: 'Accès gratuit limité' },
            { val: '6+', label: 'Jeux supportés' },
            { val: '2-3 min', label: 'Par analyse complète' },
            { val: 'IA Vision', label: 'Analyse image réelle' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, maxWidth: '220px', padding: '20px 24px', textAlign: 'center',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none'
            }}>
              <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.8rem', fontWeight: 900, color: 'var(--cyan)', display: 'block', lineHeight: 1 }}>{s.val}</span>
              <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3a5a6a', display: 'block', marginTop: '4px' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="how" style={{ padding: '100px 5%', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span className="section-tag">// PROTOCOLE</span>
          <h2 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', marginBottom: '3rem' }}>
            Comment ça <span style={{ color: '#3a5a6a' }}>fonctionne</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
            {[
              { num: '01', icon: '📥', title: 'Upload', desc: 'Importe ta replay MP4 directement depuis ton PC.' },
              { num: '02', icon: '🔍', title: 'Scan IA', desc: 'Claude Vision analyse 8 captures extraites de ta partie.' },
              { num: '03', icon: '📊', title: 'Rapport', desc: '4 modules avec erreurs précises et corrections concrètes.' },
              { num: '04', icon: '🎯', title: 'Plan', desc: '3 exercices ciblés sur tes vraies faiblesses.' },
            ].map((step, i) => (
              <div key={i} className="card" style={{ padding: '2.5rem 1.8rem' }}>
                <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.14em', color: 'rgba(0,245,255,0.3)', display: 'block', marginBottom: '1.5rem' }}>{step.num}</span>
                <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '1rem', opacity: 0.7 }}>{step.icon}</span>
                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.85rem', fontWeight: 700, color: '#fff', display: 'block', marginBottom: '0.6rem' }}>{step.title}</span>
                <p style={{ fontSize: '0.85rem', color: '#4a7a8a', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 5%', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span className="section-tag">// LA TRANSFORMATION</span>
          <h2 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', marginBottom: '3rem' }}>
            Avant vs <span style={{ color: '#3a5a6a' }}>Après MVP.coaching</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
            <div style={{ background: 'var(--dark2)', padding: '2.5rem 2rem' }}>
              <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.18em', color: '#ff4060', marginBottom: '1.5rem', textTransform: 'uppercase' }}>// AVANT</div>
              {['Tu stagnes au même rang depuis des semaines', 'Tu sais pas pourquoi tu perds des rounds', 'Tu répètes les mêmes erreurs sans t\'en rendre compte', 'Tu grind sans direction ni plan précis', 'Tes replays restent non analysées'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '1rem' }}>
                  <span style={{ color: '#ff4060', flexShrink: 0 }}>✕</span>
                  <span style={{ fontSize: '0.88rem', color: '#4a6a7a', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--dark3)', padding: '2.5rem 2rem', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--cyan)' }} />
              <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.18em', color: 'var(--cyan)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>// APRÈS MVP.COACHING</div>
              {['Un plan hebdomadaire ciblé sur tes vraies faiblesses', 'Chaque erreur identifiée avec correction concrète', 'Tes patterns d\'erreurs récurrents sont détectés', 'Tu progresses avec une direction claire', 'Chaque replay devient une leçon de coaching'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--cyan)', flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: '0.88rem', color: '#7fa8c0', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="exemple" style={{ padding: '80px 5%', background: 'linear-gradient(180deg, var(--dark) 0%, var(--dark2) 50%, var(--dark) 100%)', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span className="section-tag">// EXEMPLE DE RAPPORT</span>
          <h2 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', marginBottom: '0.8rem' }}>
            Ce que tu reçois <span style={{ color: '#3a5a6a' }}>après chaque replay</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#4a7a8a', marginBottom: '2.5rem' }}>Exemple réel généré sur une partie Valorant.</p>
          <div style={{ border: '1px solid var(--border)', background: 'var(--dark2)' }}>
            <div style={{ padding: '1.2rem 1.8rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', background: 'var(--dark)' }}>
              <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.16em', color: 'var(--cyan)' }}>// RAPPORT IA — MVP.COACHING</span>
              <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.58rem', color: '#2a4a5a' }}>Valorant · Score 61/100</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', borderBottom: '1px solid var(--border)' }}>
              <div style={{ padding: '2rem', textAlign: 'center', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '3.5rem', fontWeight: 900, color: 'var(--gold)', lineHeight: 1 }}>61</span>
                <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.55rem', color: '#2a4a5a' }}>/100</span>
              </div>
              <div style={{ padding: '2rem' }}>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginBottom: '0.8rem' }}>VALORANT — Rapport de performance</div>
                <div style={{ fontSize: '0.88rem', color: '#5a8a9a', lineHeight: 1.6, marginBottom: '1rem' }}>Performance moyenne avec des bases mécaniques correctes. Les pertes de rounds viennent principalement de décisions hâtives sans information préalable.</div>
                <div style={{ fontSize: '0.82rem', marginBottom: '0.4rem' }}><span style={{ color: 'var(--gold)' }}>⭐</span> <span style={{ color: '#8ab8cc' }}>Bon crosshair placement naturel au niveau de la tête</span></div>
                <div style={{ fontSize: '0.82rem' }}><span style={{ color: '#ff4060' }}>⚡</span> <span style={{ color: '#8ab8cc' }}>Arrêter les peeks sans info — priorité absolue</span></div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)', borderBottom: '1px solid var(--border)' }}>
              {[
                { num: '01', title: 'Prise de décision', score: 52, color: 'var(--gold)', points: [
                  { type: 'critique', text: 'Tu peek sec sans info → jiggle d\'abord → tu perds 60% de tes duels inutilement' },
                  { type: 'alerte', text: 'Tu re-peek après un duel perdu → repositionne-toi toujours avant de retenter' },
                  { type: 'info', text: 'Tes rotations post-plant sont solides → continue à jouer le timing' },
                ]},
                { num: '02', title: 'Placement & Map', score: 58, color: 'var(--cyan)', points: [
                  { type: 'critique', text: 'Tu joues trop proche des entrées → recule de 2-3m pour avoir le temps de réagir' },
                  { type: 'alerte', text: 'Tes angles sont prévisibles → varie les off-angles' },
                  { type: 'info', text: 'Ton jiggle peek post-plant est bien exécuté → exploite-le davantage' },
                ]},
              ].map((mod, i) => (
                <div key={i} style={{ background: 'var(--dark2)', padding: '1.6rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.52rem', color: '#2a4a5a', marginBottom: '4px' }}>MODULE {mod.num}</div>
                      <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.78rem', fontWeight: 700, color: '#fff' }}>{mod.title}</div>
                    </div>
                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.8rem', fontWeight: 900, color: mod.color, lineHeight: 1 }}>{mod.score}</span>
                  </div>
                  <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)', marginBottom: '1.2rem' }}>
                    <div style={{ height: '100%', width: `${mod.score}%`, background: mod.color }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {mod.points.map((p, j) => (
                      <div key={j} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span className={`pill-${p.type}`} style={{ marginTop: '2px' }}>{p.type}</span>
                        <span style={{ fontSize: '0.8rem', color: '#4a7a8a', lineHeight: 1.4 }}>{p.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '1.5rem 1.8rem', textAlign: 'center', background: 'var(--dark)' }}>
              <Link href="/dashboard" className="btn-primary">Recevoir mon rapport IA</Link>
              <p style={{ marginTop: '0.8rem', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.6rem', color: '#2a4a5a', letterSpacing: '0.1em' }}>Gratuit · Sans inscription · 2-3 minutes</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 5%', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span className="section-tag">// JEUX SUPPORTÉS</span>
          <div style={{ display: 'flex', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', marginTop: '2rem', flexWrap: 'wrap' }}>
            {[
              { icon: '🎯', name: 'Valorant', status: 'LIVE' },
              { icon: '⚔️', name: 'League of Legends', status: 'LIVE' },
              { icon: '💥', name: 'CS2', status: 'LIVE' },
              { icon: '🌀', name: 'Overwatch 2', status: 'LIVE' },
              { icon: '🏆', name: 'Apex Legends', status: 'BÊTA' },
              { icon: '🔥', name: 'Fortnite', status: 'BÊTA' },
            ].map((g, i) => (
              <div key={i} className="card" style={{ flex: 1, minWidth: '130px', padding: '2rem 1.5rem', textAlign: 'center' }}>
                <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '0.8rem', opacity: 0.7 }}>{g.icon}</span>
                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.62rem', fontWeight: 700, color: '#4a7a8a', display: 'block' }}>{g.name}</span>
                <span style={{ display: 'inline-block', marginTop: '0.5rem', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.12em', padding: '2px 8px', border: '1px solid rgba(0,245,255,0.2)', color: 'rgba(0,245,255,0.4)' }}>{g.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" style={{ padding: '80px 5% 100px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span className="section-tag">// ACCÈS</span>
          <h2 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', marginBottom: '0.8rem' }}>Choisis ton niveau</h2>
          <p style={{ fontSize: '0.95rem', color: '#4a7a8a', marginBottom: '3rem' }}>Un coach humain coûte 50-150€/h. MVP.coaching analyse autant de replays que tu veux, 24h/24.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
            {[
              { tier: 'RECRUIT', price: '0', billing: 'Gratuit pendant la bêta', features: ['3 analyses / mois', 'Rapport 4 modules IA', 'Vision IA réelle', 'Plan d\'entraînement', null, null], cta: 'Analyser ma replay', featured: false },
              { tier: 'DIAMOND', price: '19', billing: '≈ 3€/analyse · 6× moins cher qu\'un coach', features: ['Analyses illimitées', 'Rapport 6 modules IA', 'Historique illimité', 'Heatmaps avancées', 'Plan hebdomadaire', 'IA 24h/24 7j/7'], cta: 'Tester gratuitement', featured: true, badge: 'BIENTÔT' },
              { tier: 'CHALLENGER', price: '49', billing: 'Pour les équipes · jusqu\'à 5 joueurs', features: ['Tout Diamond inclus', 'Analyses équipe', 'Coach IA dédié', 'VOD review groupe', 'Intégrations Discord', 'Support prioritaire'], cta: 'Liste d\'attente', featured: false },
            ].map((plan, i) => (
              <div key={i} style={{ background: plan.featured ? 'var(--dark3)' : 'var(--dark2)', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {plan.featured && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--cyan)', boxShadow: '0 0 20px rgba(0,245,255,0.4)' }} />}
                {plan.badge && <span style={{ display: 'inline-block', alignSelf: 'flex-start', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.14em', background: 'rgba(0,245,255,0.1)', color: 'var(--cyan)', border: '1px solid rgba(0,245,255,0.2)', padding: '3px 10px', marginBottom: '1rem' }}>{plan.badge}</span>}
                <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.18em', color: 'var(--cyan)', display: 'block', marginBottom: '1rem' }}>// {plan.tier}</span>
                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '3rem', fontWeight: 900, color: '#fff', lineHeight: 1, display: 'block', marginBottom: '0.3rem' }}>
                  <sup style={{ fontSize: '1.2rem', color: '#3a5a6a' }}>€</sup>{plan.price}<span style={{ fontSize: '1rem', color: '#3a5a6a', fontWeight: 400 }}>/mois</span>
                </span>
                <span style={{ fontSize: '0.78rem', color: '#3a5a6a', display: 'block', marginBottom: '1.5rem' }}>{plan.billing}</span>
                <div style={{ height: '1px', background: 'var(--border)', marginBottom: '1.5rem' }} />
                <ul style={{ listStyle: 'none', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', color: f ? '#5a8a9a' : '#2a4a5a' }}>
                      <span style={{ color: f ? 'var(--cyan)' : '#2a4a5a', flexShrink: 0 }}>▸</span>
                      {f || '—'}
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard" className={plan.featured ? 'btn-primary' : 'btn-secondary'} style={{ textAlign: 'center', display: 'block' }}>{plan.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 5%', textAlign: 'center', position: 'relative', zIndex: 2, borderTop: '1px solid var(--border)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(0,245,255,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.2em', color: 'var(--cyan)', display: 'block', marginBottom: '1.5rem', textTransform: 'uppercase' }}>// REJOINS LA BÊTA</span>
        <h2 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', lineHeight: 1.05, marginBottom: '1.2rem' }}>
          Arrête de stagner.<br /><span style={{ color: 'var(--cyan)' }}>Commence à dominer.</span>
        </h2>
        <p style={{ fontSize: '1rem', color: '#4a7a8a', marginBottom: '2.5rem' }}>Gratuit pendant la bêta — Analyse ta première replay maintenant.</p>
        <Link href="/dashboard" className="btn-primary" style={{ fontSize: '0.85rem', padding: '16px 40px' }}>Analyser ma première replay</Link>
        <p style={{ marginTop: '1rem', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.6rem', color: '#2a4a5a', letterSpacing: '0.1em' }}>Sans inscription · Accès immédiat · 2-3 minutes</p>
      </section>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 2, background: 'rgba(2,4,8,0.9)' }}>
        <span style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '1rem', color: '#fff' }}>MVP<span style={{ color: 'var(--cyan)' }}>.</span>COACHING</span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Confidentialité', 'CGU', 'Contact', 'Discord'].map(l => (
            <a key={l} href="#" style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2a4a5a', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
        <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.6rem', color: '#1a2a34', letterSpacing: '0.1em' }}>© 2025 MVP.coaching</span>
      </footer>
    </>
  )
}