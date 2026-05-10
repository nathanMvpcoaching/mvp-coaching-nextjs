'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'

export default function Home() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } })
    }, { threshold: 0.15 })
    reveals.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const tickerItems = ['Analyse de rediffusion','Prise de décision','Mécanique & aim','Positionnement sur la map','Gestion des ressources','Lecture des infos','Timing & rotations','Vision & control','Communication équipe','Analyse de statistiques']

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">IA COACH ESPORT // NEXT GEN</div>
        <h1 className="hero-title">
          <span className="glitch" data-text="MVP">MVP</span><span className="accent">.</span><br />
          <span className="glitch" data-text="COACHING">COACHING</span>
          <span className="sub-word">YOUR PERSONAL AI COACH</span>
        </h1>
        <p className="hero-desc">
          Ton <strong>coach IA</strong> analyse chaque seconde de tes rediffusions.<br />
          Prise de décision, mécanique, placement, lecture de jeu —<br />
          <strong>progresse plus vite que jamais</strong>.
        </p>
        <div className="hero-actions">
          <Link href="/dashboard" className="btn-primary">Analyser ma première replay</Link>
          <a href="#exemple" className="btn-secondary">Voir un exemple de rapport</a>
        </div>
        <div className="hero-stats">
          {[['BÊTA','Accès gratuit limité'],['6+','Jeux supportés'],['2-3 min','Par analyse complète'],['IA Vision','Analyse image réelle']].map(([val,label],i) => (
            <div className="hero-stat" key={i}>
              <span className="hero-stat-number">{val}</span>
              <span className="hero-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker">
          {[...tickerItems,...tickerItems].map((item,i) => <span className="ticker-item" key={i}>{item}</span>)}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <div className="section-header reveal">
          <span className="section-tag">// PROTOCOLE</span>
          <h2 className="section-title">Comment ça <span className="dim">fonctionne</span></h2>
          <p className="section-sub">De la rediffusion brute au plan d'entraînement personnalisé en 4 étapes.</p>
        </div>
        <div className="pipeline reveal">
          {[
            {num:'01 / IMPORT',icon:'📥',title:'Upload ta Replay',desc:'Importe ta VOD ou connecte ton compte directement. Toutes plateformes supportées.'},
            {num:'02 / SCAN',icon:'🔍',title:'Analyse IA Complète',desc:'Notre modèle traite chaque frame : positions, actions, décisions, timings.'},
            {num:'03 / REPORT',icon:'📊',title:'Rapport de Performance',desc:'Rapport détaillé par domaine avec scores, erreurs identifiées et exemples clips.'},
            {num:'04 / GRIND',icon:'🎯',title:"Plan d'Entraînement",desc:"Exercices ciblés et objectifs hebdomadaires générés par l'IA pour ta progression."},
          ].map((s,i) => (
            <div className="pipeline-step" key={i}>
              <span className="step-num">{s.num}</span>
              <span className="step-icon">{s.icon}</span>
              <div className="step-title">{s.title}</div>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <div className="section-header reveal">
          <span className="section-tag">// MODULES IA</span>
          <h2 className="section-title">Ce que l'IA <span className="dim">analyse</span></h2>
          <p className="section-sub">6 modules spécialisés couvrant tous les aspects du jeu compétitif.</p>
        </div>
        <div className="features-grid reveal">
          {[
            {num:'01',icon:'🧠',title:'Prise de Décision',desc:"Chaque décision est scorée et comparée aux meilleurs joueurs de ton rang. L'IA identifie les patterns de mauvais choix répétés.",tag:'DECISION_TREE_AI'},
            {num:'02',icon:'🎮',title:'Mécanique & Aim',desc:'Analyse frame-par-frame de ta précision, timing, mouvements et exécution technique. Comparaison avec les benchmarks du rang cible.',tag:'MECHANIC_SCAN'},
            {num:'03',icon:'📊',title:'Statistiques Avancées',desc:'Tendances sur 50+ parties. Win rate par agent/hero, performance selon les maps, KDA selon le rôle. Tableaux de bord dynamiques.',tag:'STAT_ANALYSIS'},
            {num:'04',icon:'🗺️',title:'Positionnement Map',desc:"Heatmaps de tes positions, angles pris, contrôle du territoire, rotations. Visualisation claire de tes zones de confort et d'évitement.",tag:'SPATIAL_ANALYSIS'},
            {num:'05',icon:'👁️',title:"Lecture de l'Environnement",desc:"L'IA mesure ta capacité à lire les signaux : son, mini-map, pings alliés, comportement ennemi. Information non utilisée = opportunité perdue.",tag:'INFO_AWARENESS'},
            {num:'06',icon:'📈',title:'Plan de Progression',desc:'Roadmap personnalisée semaine par semaine. Exercices ciblés, drills mécaniques, focus mental. Ton parcours vers le rang supérieur.',tag:'GROWTH_ENGINE'},
          ].map((f,i) => (
            <div className="feature-card" key={i}>
              <span className="feature-number">MODULE // {f.num}</span>
              <div className="feature-icon-wrap">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <p className="feature-desc">{f.desc}</p>
              <span className="feature-tag">{f.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* GAMES */}
      <section className="games-section" id="games">
        <div className="section-header reveal">
          <span className="section-tag">// JEUX SUPPORTÉS</span>
          <h2 className="section-title">Ton <span className="dim">arsenal</span></h2>
        </div>
        <div className="games-list reveal">
          {[['🎯','VALORANT','LIVE'],['⚔️','LEAGUE OF LEGENDS','LIVE'],['💥','CS2','LIVE'],['🌀','OVERWATCH 2','LIVE'],['🏆','APEX LEGENDS','BETA'],['🔥','FORTNITE','BETA']].map(([icon,name,status],i) => (
            <div className="game-tile" key={i}>
              <span className="game-emoji">{icon}</span>
              <span className="game-name">{name}</span>
              <span className="game-status">{status}</span>
            </div>
          ))}
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section style={{padding:'80px 5%',position:'relative',zIndex:2}}>
        <div className="reveal" style={{maxWidth:'1080px',margin:'0 auto'}}>
          <span className="section-tag">// LA TRANSFORMATION</span>
          <h2 className="section-title" style={{marginBottom:'3rem'}}>Avant vs <span className="dim">Après MVP.coaching</span></h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:'var(--border)',border:'1px solid var(--border)'}}>
            <div style={{background:'var(--dark2)',padding:'2.5rem 2rem'}}>
              <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'0.62rem',letterSpacing:'0.18em',color:'#ff4060',marginBottom:'1.5rem',textTransform:'uppercase'}}>// AVANT</div>
              {["Tu te souviens pas de tes erreurs après la partie","Tu sais pas pourquoi tu perds des rounds","Tu répètes les mêmes erreurs sans t'en rendre compte","Tu stagnes au même rang depuis des semaines","Tu grind sans direction ni plan précis"].map((item,i) => (
                <div key={i} style={{display:'flex',gap:'12px',alignItems:'flex-start',marginBottom:'1rem'}}>
                  <span style={{color:'#ff4060',flexShrink:0,fontSize:'0.8rem'}}>✕</span>
                  <span style={{fontSize:'0.88rem',color:'#5a7a8a'}}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{background:'var(--dark3)',padding:'2.5rem 2rem',position:'relative'}}>
              <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:'var(--cyan)'}}/>
              <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'0.62rem',letterSpacing:'0.18em',color:'var(--cyan)',marginBottom:'1.5rem',textTransform:'uppercase'}}>// APRÈS MVP.COACHING</div>
              {["Chaque erreur est identifiée avec le timestamp précis","Tu sais exactement ce qui t'a coûté le round","Tes patterns d'erreurs récurrents sont détectés","Un plan hebdomadaire ciblé sur tes vraies faiblesses","Tu progresses avec une direction claire à chaque session"].map((item,i) => (
                <div key={i} style={{display:'flex',gap:'12px',alignItems:'flex-start',marginBottom:'1rem'}}>
                  <span style={{color:'var(--cyan)',flexShrink:0,fontSize:'0.8rem'}}>✓</span>
                  <span style={{fontSize:'0.88rem',color:'#7fa8c0'}}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXEMPLE */}
      <section id="exemple" style={{padding:'80px 5%',background:'linear-gradient(180deg,var(--dark) 0%,var(--dark2) 50%,var(--dark) 100%)',position:'relative',zIndex:2}}>
        <div className="reveal" style={{maxWidth:'1080px',margin:'0 auto'}}>
          <span className="section-tag">// EXEMPLE DE RAPPORT</span>
          <h2 className="section-title" style={{marginBottom:'0.8rem'}}>Ce que tu reçois <span className="dim">après chaque replay</span></h2>
          <p className="section-sub" style={{marginBottom:'2.5rem',textAlign:'left'}}>Voici un exemple réel de rapport généré par MVP.coaching sur une partie Valorant.</p>
          <div style={{border:'1px solid var(--border)',background:'var(--dark2)'}}>
            <div style={{padding:'1.2rem 1.8rem',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center',background:'var(--dark)'}}>
              <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'0.62rem',letterSpacing:'0.16em',color:'var(--cyan)'}}>// RAPPORT IA — MVP.COACHING</div>
              <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'0.58rem',color:'#2a4a5a'}}>Valorant · Score 61/100</div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'140px 1fr',borderBottom:'1px solid var(--border)'}}>
              <div style={{padding:'2rem',textAlign:'center',borderRight:'1px solid var(--border)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <span style={{fontFamily:"'Orbitron',monospace",fontSize:'3.5rem',fontWeight:900,color:'var(--gold)',lineHeight:1}}>61</span>
                <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'0.55rem',color:'#3a5a6a',letterSpacing:'0.12em'}}>/100</span>
              </div>
              <div style={{padding:'2rem'}}>
                <div style={{fontFamily:"'Orbitron',monospace",fontSize:'0.8rem',fontWeight:700,color:'#fff',marginBottom:'0.8rem'}}>VALORANT — Rapport de performance</div>
                <div style={{fontSize:'0.85rem',color:'#5a8a9a',lineHeight:1.6,marginBottom:'1rem'}}>Performance moyenne avec des bases mécaniques correctes. Les pertes de rounds viennent principalement de décisions hâtives sans information préalable.</div>
                <div style={{display:'flex',gap:'1.5rem',flexWrap:'wrap'}}>
                  <div style={{fontSize:'0.8rem'}}><span style={{color:'var(--gold)'}}>⭐</span> <span style={{color:'#8ab8cc'}}>Bon crosshair placement naturel au niveau de la tête</span></div>
                  <div style={{fontSize:'0.8rem'}}><span style={{color:'#ff4060'}}>⚡</span> <span style={{color:'#8ab8cc'}}>Arrêter les peeks sans info — priorité absolue</span></div>
                </div>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:'var(--border)',borderBottom:'1px solid var(--border)'}}>
              {[
                {num:'01',title:'Prise de décision',score:52,color:'var(--gold)',points:[
                  {type:'CRITIQUE',bg:'rgba(255,64,96,0.12)',border:'rgba(255,64,96,0.3)',color:'#ff4060',text:"Tu peek sec sans info → jiggle d'abord → tu perds 60% de tes duels inutilement"},
                  {type:'ALERTE',bg:'rgba(255,215,0,0.08)',border:'rgba(255,215,0,0.25)',color:'var(--gold)',text:"Tu re-peek après un duel perdu → repositionne-toi toujours avant de retenter"},
                  {type:'INFO',bg:'rgba(0,245,255,0.06)',border:'rgba(0,245,255,0.2)',color:'var(--cyan)',text:"Tes rotations post-plant sont solides → continue à jouer le timing"},
                ]},
                {num:'02',title:'Placement & Map',score:58,color:'var(--cyan)',points:[
                  {type:'CRITIQUE',bg:'rgba(255,64,96,0.12)',border:'rgba(255,64,96,0.3)',color:'#ff4060',text:"Tu joues trop proche des entrées → recule de 2-3m pour avoir le temps de réagir"},
                  {type:'ALERTE',bg:'rgba(255,215,0,0.08)',border:'rgba(255,215,0,0.25)',color:'var(--gold)',text:"Tes angles sont prévisibles → varie les off-angles"},
                  {type:'INFO',bg:'rgba(0,245,255,0.06)',border:'rgba(0,245,255,0.2)',color:'var(--cyan)',text:"Ton jiggle peek post-plant est bien exécuté → exploite-le davantage"},
                ]},
              ].map((mod,i) => (
                <div key={i} style={{background:'var(--dark2)',padding:'1.6rem'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1rem'}}>
                    <div>
                      <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'0.52rem',color:'#2a4a5a',marginBottom:'4px'}}>MODULE {mod.num}</div>
                      <div style={{fontFamily:"'Orbitron',monospace",fontSize:'0.75rem',fontWeight:700,color:'#fff'}}>{mod.title}</div>
                    </div>
                    <span style={{fontFamily:"'Orbitron',monospace",fontSize:'1.6rem',fontWeight:900,color:mod.color,lineHeight:1}}>{mod.score}</span>
                  </div>
                  <div style={{height:'2px',background:'rgba(255,255,255,0.05)',marginBottom:'1.2rem'}}>
                    <div style={{height:'100%',width:`${mod.score}%`,background:mod.color}}/>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:'0.6rem'}}>
                    {mod.points.map((p,j) => (
                      <div key={j} style={{display:'flex',gap:'8px',alignItems:'flex-start'}}>
                        <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'0.48rem',padding:'2px 6px',background:p.bg,border:`1px solid ${p.border}`,color:p.color,flexShrink:0,marginTop:'2px'}}>{p.type}</span>
                        <span style={{fontSize:'0.8rem',color:'#5a8a9a',lineHeight:1.4}}>{p.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{padding:'1.5rem 1.8rem',borderTop:'1px solid var(--border)',textAlign:'center',background:'var(--dark)'}}>
              <Link href="/dashboard" className="btn-primary" style={{display:'inline-block'}}>Recevoir mon rapport IA</Link>
              <p style={{marginTop:'0.8rem',fontFamily:"'Share Tech Mono',monospace",fontSize:'0.6rem',color:'#2a4a5a',letterSpacing:'0.1em'}}>Gratuit · Sans inscription requise · 2-3 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section" id="pricing">
        <div className="section-header reveal">
          <span className="section-tag">// ACCÈS</span>
          <h2 className="section-title">Choisis ton <span className="dim">niveau</span></h2>
          <p className="section-sub">Un coach humain coûte 50-150€/h. MVP.coaching analyse autant de replays que tu veux, 24h/24.</p>
        </div>
        <div className="pricing-grid reveal">
          <div className="pricing-card">
            <span className="pricing-tier">// RECRUIT</span>
            <span className="pricing-price"><sup>€</sup>0<span>/mois</span></span>
            <span className="pricing-billing">Gratuit pendant la bêta</span>
            <div className="pricing-divider"></div>
            <ul className="pricing-features">
              <li>3 analyses de replay / mois</li><li>Rapport complet — 4 modules IA</li>
              <li>Vision IA — analyse image réelle</li><li>Plan d'entraînement hebdomadaire</li>
              <li className="dim">Historique des analyses</li><li className="dim">Comparaison avec les pros</li>
            </ul>
            <Link href="/dashboard" className="pricing-btn outline">Analyser ma replay</Link>
          </div>
          <div className="pricing-card featured">
            <div className="pricing-featured-badge">BIENTÔT</div>
            <span className="pricing-tier">// DIAMOND</span>
            <span className="pricing-price"><sup>€</sup>19<span>/mois</span></span>
            <span className="pricing-billing">≈ 3€/analyse · 6× moins cher qu'un vrai coach</span>
            <div className="pricing-divider"></div>
            <ul className="pricing-features">
              <li>Analyses illimitées</li><li>Rapport complet — 6 modules IA</li>
              <li>Historique illimité + tendances</li><li>Heatmaps & positionnement avancé</li>
              <li>Plan de progression hebdomadaire</li><li>IA disponible 24h/24, 7j/7</li>
            </ul>
            <Link href="/dashboard" className="pricing-btn solid">Tester gratuitement</Link>
          </div>
          <div className="pricing-card">
            <span className="pricing-tier">// CHALLENGER</span>
            <span className="pricing-price"><sup>€</sup>49<span>/mois</span></span>
            <span className="pricing-billing">Pour les équipes · jusqu'à 5 joueurs</span>
            <div className="pricing-divider"></div>
            <ul className="pricing-features">
              <li>Tout Diamond inclus</li><li>Analyses équipe — synergie & draft</li>
              <li>Rapport stratégique de composition</li><li>Coach IA dédié par joueur</li>
              <li>Sessions VOD review en groupe</li><li>Intégrations Discord & Twitch</li>
            </ul>
            <a href="#cta" className="pricing-btn outline">Rejoindre la liste d'attente</a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="section-header reveal">
          <span className="section-tag">// RETOURS BÊTA</span>
          <h2 className="section-title">Premiers <span className="dim">testeurs</span></h2>
          <p className="section-sub">Retours de joueurs qui ont testé MVP.coaching pendant la bêta privée.</p>
        </div>
        <div className="testimonials-grid reveal">
          {[
            {rank:'VALORANT // PLATINE 2 — EU WEST',text:"« L'IA a détecté que je re-peek systématiquement après avoir pris des dégâts. Je savais même pas que je faisais ça. En une semaine j'ai arrêté et mes duels ont changé. »",avatar:'T',name:'Testeur bêta #1',game:'Duelliste — bêta privée Mai 2025'},
            {rank:'OVERWATCH 2 // GOLD — EU',text:"« Le rapport était vraiment basé sur ma replay, pas du générique. Il a vu que je sortais trop loin de ma tank line. C'est exactement ce que mon coach m'avait dit il y a 6 mois. »",avatar:'M',name:'Testeur bêta #2',game:'Support — bêta privée Mai 2025'},
            {rank:'CS2 // SILVER ELITE — FR',text:"« J'étais sceptique mais le plan d'entraînement était précis. 3 exercices ciblés sur mes vraies faiblesses, pas des conseils génériques. Je vais continuer à tester. »",avatar:'N',name:'Testeur bêta #3',game:'Entry Fragger — bêta privée Mai 2025'},
          ].map((t,i) => (
            <div className="testimonial" key={i}>
              <span className="testimonial-rank">{t.rank}</span>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.avatar}</div>
                <div><div className="testimonial-name">{t.name}</div><div className="testimonial-game">{t.game}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{padding:'80px 5%',position:'relative',zIndex:2}} id="faq">
        <div style={{maxWidth:'800px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'3rem'}}>
            <span className="section-tag">// FAQ</span>
            <h2 className="section-title">Questions <span className="dim">fréquentes</span></h2>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'1px',background:'var(--border)',border:'1px solid var(--border)'}}>
            {[
              {q:"Comment fonctionne l'analyse IA ?",a:"Tu uploades ta replay en MP4. Notre IA extrait 8 captures d'écran réparties sur toute la partie et les envoie à Claude Vision. L'IA analyse chaque frame — minimap, positions, HUD — et génère un rapport de coaching personnalisé avec des corrections concrètes."},
              {q:"Quels formats de replay sont acceptés ?",a:"MP4, WebM, MOV et MKV. Toute vidéo enregistrée avec OBS, Shadowplay, Xbox Game Bar ou directement depuis le client du jeu fonctionne. Taille maximale : 2 Go."},
              {q:"Combien de temps dure une analyse ?",a:"Entre 2 et 4 minutes selon la taille de la vidéo. L'upload prend environ 30 secondes, l'extraction des frames 20 secondes, et Claude Vision analyse les images en 1-2 minutes."},
              {q:"L'IA regarde vraiment ma vidéo ou c'est du générique ?",a:"Elle regarde vraiment ta vidéo. On extrait 8 captures d'écran de ta replay et on les envoie directement à Claude Vision. Le rapport mentionne ce qu'il observe réellement — ta minimap, tes positions, tes angles. Ce n'est pas du contenu générique."},
              {q:"Sur quels jeux fonctionne MVP.coaching ?",a:"Actuellement Valorant, League of Legends, CS2 et Overwatch 2 sont en Live. Apex Legends et Fortnite sont en bêta. D'autres jeux seront ajoutés selon les retours de la communauté."},
              {q:"Mes replays sont-elles stockées sur vos serveurs ?",a:"Non. Ta vidéo est automatiquement supprimée dès que l'analyse est terminée. On ne conserve aucun fichier vidéo — seulement le rapport généré."},
              {q:"L'analyse fonctionne pour tous les niveaux ?",a:"Oui, du débutant au Diamond. L'IA adapte ses conseils selon ce qu'elle observe. Plus tu joues et plus tu uploades de replays, plus les conseils seront précis et ciblés sur tes vrais patterns d'erreurs."},
              {q:"C'est vraiment gratuit pendant la bêta ?",a:"Oui, complètement gratuit pendant toute la durée de la bêta. Aucune carte bancaire requise. On te préviendra bien à l'avance avant de passer en mode payant."},
              {q:"Combien d'analyses puis-je faire par mois ?",a:"Pendant la bêta : 3 analyses par mois sur le plan gratuit. C'est suffisant pour identifier tes principaux patterns d'erreurs et commencer à progresser sérieusement."},
              {q:"En combien de temps vais-je progresser ?",a:"Ça dépend de toi. Les joueurs qui appliquent les conseils du plan d'entraînement voient généralement des résultats en 2 à 4 semaines. L'IA identifie tes erreurs — c'est à toi de les corriger en jeu."},
              {q:"🤔 Est-ce que l'IA va me juger si je joue vraiment mal ?",a:"L'IA ne juge pas, elle coache. Elle a vu des joueurs faire des choses bien pires que toi — crois-nous. Son seul objectif c'est d'identifier tes erreurs et te donner les outils pour les corriger. Bonne nouvelle : plus tu joues mal, plus elle a de choses à dire. 😄"},
            ].map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="cta">
        <div className="cta-corner tl"></div>
        <div className="cta-corner tr"></div>
        <div className="cta-corner bl"></div>
        <div className="cta-corner br"></div>
        <span className="cta-pre">// REJOINS LA BETA</span>
        <h2 className="cta-title">Arrête de stagner.<br />Commence à <span style={{color:'var(--cyan)'}}>dominer</span>.</h2>
        <p className="cta-sub">Analyse ta première replay gratuitement maintenant.</p>
        <Link href="/dashboard" className="btn-primary" style={{fontSize:'0.85rem',padding:'16px 40px'}}>Analyser ma première replay</Link>
        <div className="cta-note">// Sans inscription · Accès immédiat · 2-3 minutes</div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">MVP<span>.</span>COACHING</div>
        <ul className="footer-links">
          {['Confidentialité','CGU','Contact','Discord'].map(l => <li key={l}><a href="#">{l}</a></li>)}
        </ul>
        <div className="footer-copy">© 2025 MVP.COACHING — ALL SYSTEMS ONLINE</div>
      </footer>
    </>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = require('react').useState(false)
  return (
    <div style={{background: open ? 'var(--dark3)' : 'var(--dark2)', transition:'background 0.2s'}}>
      <button onClick={() => setOpen(!open)} style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1.4rem 1.8rem',background:'transparent',border:'none',cursor:'pointer',textAlign:'left',gap:'1rem'}}>
        <span style={{fontFamily:"'Orbitron',monospace",fontSize:'0.82rem',fontWeight:700,color:'#fff',letterSpacing:'0.03em'}}>{q}</span>
        <span style={{color:'var(--cyan)',fontSize:'1.2rem',flexShrink:0,transform:open?'rotate(45deg)':'rotate(0)',transition:'transform 0.2s'}}>+</span>
      </button>
      {open && (
        <div style={{padding:'0 1.8rem 1.4rem',fontSize:'0.9rem',color:'#5a8a9a',lineHeight:1.7,borderTop:'1px solid var(--border)'}}>
          {a}
        </div>
      )}
    </div>
  )
}
