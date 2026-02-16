import { useMemo } from 'react'

/**
 * Shared "Patchwerx" look & feel (modern glass + northern mountains/fjords vibe).
 * You can swap the image URL anytime.
 */
export function useBrandStyles({ loading = false } = {}) {
  return useMemo(
    () => ({
      page: {
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '24px',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        color: '#0b1220',
        backgroundImage: [
          // overlay for contrast
          'linear-gradient(180deg, rgba(2,6,23,0.74) 0%, rgba(2,6,23,0.52) 45%, rgba(2,6,23,0.76) 100%)',
          // fjord / northern mountains (no snow) feel
          'url("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=80")',
        ].join(', '),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      },

      shell: {
        width: '100%',
        maxWidth: '1060px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '18px',
      },

      card: {
        width: '100%',
        maxWidth: '720px',
        justifySelf: 'center',
        borderRadius: '22px',
        padding: '26px',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.90), rgba(255,255,255,0.78))',
        border: '1px solid rgba(255,255,255,0.35)',
        boxShadow:
          '0 20px 60px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.35) inset',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      },

      brandRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '10px',
      },

      brandLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      },

      logo: {
        width: '44px',
        height: '44px',
        borderRadius: '14px',
        background:
          'linear-gradient(135deg, rgba(37,99,235,0.18), rgba(16,185,129,0.18))',
        border: '1px solid rgba(2,6,23,0.08)',
        display: 'grid',
        placeItems: 'center',
      },

      logoMark: {
        width: '22px',
        height: '22px',
        borderRadius: '8px',
        background:
          'linear-gradient(135deg, rgba(37,99,235,0.95), rgba(16,185,129,0.95))',
        boxShadow: '0 10px 25px rgba(37,99,235,0.25)',
      },

      title: {
        fontSize: '1.6rem',
        lineHeight: 1.1,
        margin: 0,
        letterSpacing: '-0.02em',
        color: '#0b1220',
      },

      subtitle: {
        margin: '6px 0 0 0',
        fontSize: '0.98rem',
        lineHeight: 1.45,
        color: 'rgba(2,6,23,0.72)',
      },

      divider: {
        height: '1px',
        width: '100%',
        background:
          'linear-gradient(90deg, rgba(2,6,23,0.08), rgba(2,6,23,0.02), rgba(2,6,23,0.08))',
        margin: '16px 0 18px 0',
      },

      nav: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
      },

      navLink: {
        textDecoration: 'none',
        fontSize: '0.92rem',
        fontWeight: 650,
        color: 'rgba(2,6,23,0.78)',
        padding: '8px 10px',
        borderRadius: '12px',
        border: '1px solid rgba(2,6,23,0.10)',
        background: 'rgba(255,255,255,0.65)',
      },

      form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      },

      label: {
        display: 'block',
        fontSize: '0.85rem',
        color: 'rgba(2,6,23,0.70)',
        marginBottom: '6px',
      },

      field: {
        borderRadius: '14px',
        border: '1px solid rgba(2,6,23,0.10)',
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: '12px 12px',
        outline: 'none',
        fontSize: '1rem',
        width: '100%',
        boxShadow: '0 1px 0 rgba(255,255,255,0.6) inset',
      },

      twoColRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
      },

      button: {
        borderRadius: '14px',
        border: '1px solid rgba(255,255,255,0.35)',
        padding: '12px 14px',
        fontSize: '1rem',
        fontWeight: 700,
        cursor: loading ? 'not-allowed' : 'pointer',
        color: '#ffffff',
        background:
          'linear-gradient(135deg, rgba(37,99,235,0.95), rgba(16,185,129,0.95))',
        boxShadow:
          '0 18px 40px rgba(2,6,23,0.18), 0 1px 0 rgba(255,255,255,0.25) inset',
        transition: 'transform 120ms ease, filter 120ms ease, opacity 120ms ease',
        opacity: loading ? 0.85 : 1,
      },

      buttonHint: {
        marginTop: '10px',
        fontSize: '0.85rem',
        color: 'rgba(2,6,23,0.60)',
      },

      error: {
        marginTop: '8px',
        padding: '10px 12px',
        borderRadius: '14px',
        background: 'rgba(220,38,38,0.08)',
        border: '1px solid rgba(220,38,38,0.18)',
        color: 'rgba(153,27,27,0.95)',
        fontSize: '0.92rem',
      },

      footer: {
        justifySelf: 'center',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.85)',
        fontSize: '0.9rem',
        marginTop: '6px',
        textShadow: '0 2px 18px rgba(0,0,0,0.35)',
      },

      subtleText: {
        color: 'rgba(2,6,23,0.70)',
        lineHeight: 1.6,
        margin: 0,
      },

      h2: {
        margin: '0 0 10px 0',
        fontSize: '1.2rem',
        letterSpacing: '-0.01em',
      },
    }),
    [loading]
  )
}
