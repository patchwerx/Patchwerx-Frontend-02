import { useMemo } from 'react'

/**
 * Shared "Patchwerx" look & feel — cozy (Paper & Ink + Sunset Softness).
 * Oatmeal/cream surfaces, espresso text, amber/sage accents, pill buttons, soft shadows.
 */
export function useBrandStyles({ loading = false } = {}) {
  return useMemo(
    () => ({
      page: {
        minHeight: '100vh',
        display: 'grid',
        justifyItems: 'center',
        alignContent: 'start',
        padding: '18px 18px 28px',
        fontFamily: 'var(--font-body), Georgia, serif',
        color: 'var(--ink)',
        background: 'var(--bg-page)',
      },

      shell: {
        width: '100%',
        maxWidth: '1060px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '16px',
      },

      appBar: {
        width: '100%',
        maxWidth: '1060px',
        position: 'sticky',
        top: 10,
        zIndex: 50,
        padding: '12px 16px',
        borderRadius: 'var(--radius)',
        marginBottom: '14px',
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-card)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      },

      navInner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        minHeight: '44px',
      },

      brandLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        minWidth: 0,
      },

      logo: {
        width: '34px',
        height: '34px',
        borderRadius: '12px',
        background: 'var(--accent-soft)',
        border: '1px solid var(--border)',
        display: 'grid',
        placeItems: 'center',
        flex: '0 0 auto',
      },

      brandText: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        minWidth: 0,
      },

      title: {
        fontSize: '1.1rem',
        lineHeight: 1.05,
        margin: 0,
        letterSpacing: '0.02em',
        color: 'var(--ink)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },

      subtitle: {
        margin: 0,
        fontSize: '0.82rem',
        lineHeight: 1.2,
        color: 'var(--ink-muted)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },

      nav: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
      },

      navLink: {
        textDecoration: 'none',
        fontSize: '0.86rem',
        fontWeight: 600,
        letterSpacing: '0.01em',
        color: 'var(--ink-muted)',
        padding: '8px 10px',
        borderRadius: '999px',
        border: '1px solid transparent',
        background: 'transparent',
        transition: 'color 140ms ease, background 140ms ease, border-color 140ms ease',
        WebkitTapHighlightColor: 'transparent',
      },

      navLinkHover: {
        color: 'var(--ink)',
        background: 'var(--accent-soft)',
        border: '1px solid var(--border)',
      },

      navLinkActive: {
        color: 'var(--accent)',
        border: '1px solid var(--border)',
        background: 'var(--accent-soft)',
      },

      navCta: {
        textDecoration: 'none',
        fontSize: '0.86rem',
        fontWeight: 700,
        letterSpacing: '0.01em',
        color: '#1c1916',
        padding: '8px 12px',
        borderRadius: '999px',
        border: '1px solid var(--accent)',
        background: 'var(--accent)',
        boxShadow: '0 4px 14px rgba(201, 169, 98, 0.25)',
        transition: 'transform 140ms ease, filter 140ms ease',
      },

      navCtaHover: {
        transform: 'translateY(-1px)',
        filter: 'brightness(1.1)',
      },

      card: {
        width: '100%',
        maxWidth: '720px',
        justifySelf: 'center',
        borderRadius: 'var(--radius)',
        padding: '32px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-card)',
      },

      form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      },

      label: {
        display: 'block',
        fontSize: '0.9rem',
        fontWeight: 600,
        color: 'var(--ink-muted)',
        marginBottom: '6px',
      },

      field: {
        borderRadius: 'var(--radiusSm)',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--bg-elevated)',
        color: 'var(--ink)',
        padding: '12px 14px',
        outline: 'none',
        fontSize: '1rem',
        width: '100%',
      },

      twoColRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
      },

      button: {
        borderRadius: 'var(--radius-pill)',
        border: '1px solid var(--accent)',
        padding: '12px 18px',
        fontSize: '1rem',
        fontWeight: 700,
        cursor: loading ? 'not-allowed' : 'pointer',
        color: '#1c1916',
        background: 'var(--accent)',
        boxShadow: '0 2px 12px var(--accent-glow), inset 0 1px 0 rgba(255,255,255,0.2)',
        transition: 'transform 120ms ease, filter 120ms ease, opacity 120ms ease',
        opacity: loading ? 0.85 : 1,
      },

      buttonHint: {
        marginTop: '10px',
        fontSize: '0.85rem',
        color: 'var(--ink-faint)',
      },

      error: {
        marginTop: '8px',
        padding: '12px 14px',
        borderRadius: 'var(--radiusSm)',
        background: 'rgba(184, 84, 80, 0.1)',
        border: '1px solid rgba(184, 84, 80, 0.3)',
        color: 'var(--error)',
        fontSize: '0.92rem',
      },

      footer: {
        justifySelf: 'center',
        textAlign: 'center',
        color: 'var(--ink-muted)',
        fontSize: '0.9rem',
        marginTop: '10px',
      },

      subtleText: {
        color: 'var(--ink-muted)',
        lineHeight: 1.6,
        margin: 0,
      },

      h2: {
        margin: '0 0 10px 0',
        fontSize: '1.25rem',
        fontWeight: 700,
        letterSpacing: '0.02em',
        color: 'var(--ink)',
      },
    }),
    [loading]
  )
}
