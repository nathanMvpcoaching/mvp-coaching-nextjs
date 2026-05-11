'use client'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '../../lib/supabase'

const CATEGORIES = [
  { value: 'fonctionnalite', label: 'Nouvelle fonctionnalité' },
  { value: 'amelioration',   label: 'Amélioration' },
  { value: 'bug',            label: 'Bug' },
  { value: 'autre',          label: 'Autre' },
]

const EVENT_OPEN = 'mvp:open-suggestion-modal'

export function openSuggestionModal() {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent(EVENT_OPEN))
}

const INITIAL_FORM = { titre: '', description: '', categorie: 'fonctionnalite' }

export default function SuggestionModal() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(INITIAL_FORM)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const firstFieldRef = useRef(null)

  useEffect(() => {
    function onOpen() {
      setOpen(true)
      setSent(false)
      setError('')
      setForm(INITIAL_FORM)
    }
    window.addEventListener(EVENT_OPEN, onOpen)
    return () => window.removeEventListener(EVENT_OPEN, onOpen)
  }, [])

  useEffect(() => {
    if (!open) return
    function onKey(e) { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setTimeout(() => firstFieldRef.current?.focus(), 30)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  function close() {
    setOpen(false)
  }

  async function submit(e) {
    e.preventDefault()
    if (sending) return
    const titre = form.titre.trim()
    const description = form.description.trim()
    if (!titre || !description) {
      setError('Titre et description sont obligatoires.')
      return
    }
    setError('')
    setSending(true)
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const uid = sessionData?.session?.user?.id
      if (!uid) throw new Error('Tu dois être connecté pour envoyer une suggestion.')
      const { error: insertErr } = await supabase.from('suggestions').insert({
        user_id:     uid,
        titre,
        description,
        categorie:   form.categorie,
      })
      if (insertErr) throw insertErr
      setSent(true)
    } catch (err) {
      setError(err.message || 'Envoi impossible. Réessaie dans un instant.')
    } finally {
      setSending(false)
    }
  }

  if (!open) return null

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(2,4,8,0.78)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem 1rem',
        animation: 'fadeSlideDown 0.25s var(--ease) both',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="suggestion-modal-title"
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%', maxWidth: '560px',
          background: 'var(--dark2)',
          border: '1px solid var(--border-hot)',
          boxShadow: '0 0 60px rgba(0,245,255,0.15), 0 30px 80px rgba(0,0,0,0.6)',
          maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--cyan), transparent)' }} />
        <CornerDecor />

        <button
          type="button"
          onClick={close}
          aria-label="Fermer"
          style={{
            position: 'absolute', top: '0.9rem', right: '0.9rem',
            width: 32, height: 32,
            background: 'transparent',
            border: '1px solid var(--border)',
            color: '#8ab8cc',
            cursor: 'pointer',
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.9rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'border-color 0.15s var(--ease), color 0.15s var(--ease), background 0.15s var(--ease)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)'; e.currentTarget.style.background = 'rgba(0,245,255,0.06)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = '#8ab8cc'; e.currentTarget.style.background = 'transparent' }}
        >
          ×
        </button>

        {sent ? (
          <div style={{ padding: '2.4rem 2rem' }}>
            <div id="suggestion-modal-title" style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.74rem', letterSpacing: '0.18em', color: '#00ff88', textTransform: 'uppercase', marginBottom: '1rem', textShadow: '0 0 12px rgba(0,255,136,0.4)' }}>
              // SUGGESTION REÇUE — MERCI !
            </div>
            <p style={{ fontSize: '0.92rem', color: '#8ab8cc', lineHeight: 1.6, marginBottom: '1.6rem' }}>
              On lit toutes les idées. Les plus utiles sont intégrées à la roadmap.
            </p>
            <button type="button" onClick={close} className="btn-primary" style={{ fontSize: '0.78rem', padding: '13px 28px' }}>
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={submit} style={{ padding: '2rem' }}>
            <div id="suggestion-modal-title" style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              // SOUMETTRE UNE IDÉE
            </div>
            <p style={{ fontSize: '0.85rem', color: '#5a8a9a', marginBottom: '1.6rem' }}>
              Une feature manquante, un bug, une amélioration ? Balance.
            </p>

            <FieldLabel>Titre de la suggestion</FieldLabel>
            <input
              ref={firstFieldRef}
              type="text"
              value={form.titre}
              onChange={e => setForm(f => ({ ...f, titre: e.target.value }))}
              maxLength={120}
              placeholder="Un résumé en une phrase"
              style={inputStyle}
              onFocus={focusOn}
              onBlur={focusOff}
            />

            <div style={{ height: '1.1rem' }} />

            <FieldLabel>Description</FieldLabel>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={5}
              maxLength={2000}
              placeholder="Décris ta suggestion en détail..."
              style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Rajdhani, sans-serif' }}
              onFocus={focusOn}
              onBlur={focusOff}
            />

            <div style={{ height: '1.1rem' }} />

            <FieldLabel>Catégorie</FieldLabel>
            <div style={{ position: 'relative' }}>
              <select
                value={form.categorie}
                onChange={e => setForm(f => ({ ...f, categorie: e.target.value }))}
                style={{
                  ...inputStyle,
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  paddingRight: '36px',
                  cursor: 'pointer',
                }}
                onFocus={focusOn}
                onBlur={focusOff}
              >
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value} style={{ background: 'var(--dark2)', color: '#c8dde8' }}>{c.label}</option>
                ))}
              </select>
              <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--cyan)', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', pointerEvents: 'none' }}>▼</span>
            </div>

            {error && (
              <div style={{ marginTop: '1.2rem', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.1em', color: '#ff4060', border: '1px solid rgba(255,64,96,0.3)', background: 'rgba(255,64,96,0.06)', padding: '10px 14px' }}>
                // {error}
              </div>
            )}

            <div style={{ marginTop: '1.8rem', display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                type="submit"
                className="btn-primary"
                disabled={sending}
                style={{ fontSize: '0.78rem', padding: '13px 28px', opacity: sending ? 0.55 : 1, cursor: sending ? 'wait' : 'pointer' }}
              >
                {sending ? 'Envoi...' : 'Envoyer ma suggestion'}
              </button>
              <button
                type="button"
                onClick={close}
                className="btn-secondary"
                style={{ fontSize: '0.72rem', padding: '12px 22px' }}
              >
                Annuler
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

function FieldLabel({ children }) {
  return (
    <label style={{ display: 'block', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.16em', color: '#8ab8cc', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      {children}
    </label>
  )
}

const inputStyle = {
  width: '100%',
  background: 'rgba(0,245,255,0.03)',
  border: '1px solid var(--border)',
  outline: 'none',
  padding: '12px 14px',
  fontFamily: 'Rajdhani, sans-serif',
  fontSize: '0.95rem',
  color: '#c8dde8',
  transition: 'border-color 0.2s var(--ease), background 0.2s var(--ease)',
}

function focusOn(e) {
  e.currentTarget.style.borderColor = 'var(--border-hot)'
  e.currentTarget.style.background = 'rgba(0,245,255,0.06)'
}
function focusOff(e) {
  e.currentTarget.style.borderColor = 'var(--border)'
  e.currentTarget.style.background = 'rgba(0,245,255,0.03)'
}

function CornerDecor() {
  const c = {
    position: 'absolute',
    width: 14, height: 14,
    borderColor: 'var(--cyan)',
    borderStyle: 'solid',
    pointerEvents: 'none',
  }
  return (
    <>
      <span style={{ ...c, top: -1, left: -1,  borderWidth: '2px 0 0 2px' }} />
      <span style={{ ...c, top: -1, right: -1, borderWidth: '2px 2px 0 0' }} />
      <span style={{ ...c, bottom: -1, left: -1,  borderWidth: '0 0 2px 2px' }} />
      <span style={{ ...c, bottom: -1, right: -1, borderWidth: '0 2px 2px 0' }} />
    </>
  )
}
