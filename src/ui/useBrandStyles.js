import { useMemo } from 'react'

/**
 * Shared "Patchwerx" look & feel (modern glass + calm forest vibe).
 * Uses dark text on light surfaces for contrast.
 */
export function useBrandStyles({ loading = false } = {}) {
  return useMemo(
    () => ({
      // --- Page / background ---
      page: {
        minHeight: '100vh',
        display: 'grid',
        justifyItems: 'center',
        alignContent: 'start',
        padding: '18px 18px 28px',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        color: '#07121f',

        backgroundImage: [
          'radial-gradient(1200px 800px at 20% 10%, rgba(16,185,129,0.18), rgba(16,185,129,0.02) 55%, rgba(2,6,23,0.0) 70%)',
          'linear-gradient(180deg, rgba(2,6,23,0.62) 0%, rgba(2,6,23,0.38) 40%, rgba(2,6,23,0.62) 100%)',
          'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2400&q=80")',
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
        gap: '16px',
      },

      // --- Nav (modern glass bar) ---
      appBar: {
        width: '100%',
        maxWidth: '1060px',
        position: 'sticky',
        top: 10,
        zIndex: 50,
        padding: '10px 12px',
        borderRadius: '18px',
        marginBottom: '14px',

        // Glass + subtle shine
        background: [
          'linear-gradient(180deg, rgba(255,255,255,0.86), rgba(255,255,255,0.62))',
          'radial-gradient(900px 120px at 20% 0%, rgba(16,185,129,0.16), rgba(16,185,129,0.00) 60%)',
          'radial-gradient(700px 120px at 80% 0%, rgba(59,130,246,0.14), rgba(59,130,246,0.00) 55%)',
        ].join(', '),
        border: '1px solid rgba(255,255,255,0.40)',
        boxShadow:
          '0 18px 46px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.55) inset',
        backdropFilter: 'blur(12px) saturate(140%)',
        WebkitBackdropFilter: 'blur(12px) saturate(140%)',
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
        background:
          'linear-gradient(135deg, rgba(16,185,129,0.20), rgba(59,130,246,0.18))',
        border: '1px solid rgba(2,6,23,0.10)',
        display: 'grid',
        placeItems: 'center',
        boxShadow:
          '0 10px 26px rgba(2,6,23,0.10), 0 1px 0 rgba(255,255,255,0.55) inset',
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
        letterSpacing: '-0.02em',
        color: '#07121f',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },

      subtitle: {
        margin: 0,
        fontSize: '0.82rem',
        lineHeight: 1.2,
        color: 'rgba(2,6,23,0.68)',
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

      // Base pill style (use with NavLink; see notes below for active style)
      navLink: {
        textDecoration: 'none',
        fontSize: '0.86rem',
        fontWeight: 800,
        letterSpacing: '-0.01em',
        color: 'rgba(2,6,23,0.78)',
        padding: '8px 10px',
        borderRadius: '999px',
        border: '1px solid rgba(2,6,23,0.10)',
        background: 'rgba(255,255,255,0.62)',
        boxShadow: '0 1px 0 rgba(255,255,255,0.50) inset',
        transition:
          'transform 140ms ease, box-shadow 140ms ease, background 140ms ease, border-color 140ms ease',
        WebkitTapHighlightColor: 'transparent',
      },

      navLinkHover: {
        transform: 'translateY(-1px)',
        background: 'rgba(255,255,255,0.78)',
        border: '1px solid rgba(2,6,23,0.14)',
        boxShadow:
          '0 10px 22px rgba(2,6,23,0.10), 0 1px 0 rgba(255,255,255,0.55) inset',
      },

      // For the active route (NavLink isActive)
      navLinkActive: {
        color: '#07121f',
        border: '1px solid rgba(16,185,129,0.28)',
        background:
          'linear-gradient(135deg, rgba(16,185,129,0.18), rgba(59,130,246,0.12))',
        boxShadow:
          '0 14px 30px rgba(16,185,129,0.12), 0 1px 0 rgba(255,255,255,0.60) inset',
      },

      navCta: {
        textDecoration: 'none',
        fontSize: '0.86rem',
        fontWeight: 900,
        letterSpacing: '-0.01em',
        color: '#ffffff',
        padding: '8px 12px',
        borderRadius: '999px',
        border: '1px solid rgba(255,255,255,0.28)',
        background:
          'linear-gradient(135deg, rgba(16,185,129,0.98), rgba(59,130,246,0.95))',
        boxShadow: '0 16px 34px rgba(2,6,23,0.18)',
        transition: 'transform 140ms ease, filter 140ms ease',
      },

      navCtaHover: {
        transform: 'translateY(-1px)',
        filter: 'brightness(1.03)',
      },

      // --- Content card ---
      card: {
        width: '100%',
        maxWidth: '720px',
        justifySelf: 'center',
        borderRadius: '22px',
        padding: '24px',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.80))',
        border: '1px solid rgba(255,255,255,0.38)',
        boxShadow:
          '0 22px 60px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.40) inset',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      },

      // --- Form ---
      form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      },

      label: {
        display: 'block',
        fontSize: '0.85rem',
        color: 'rgba(2,6,23,0.72)',
        marginBottom: '6px',
      },

      field: {
        borderRadius: '14px',
        border: '1px solid rgba(2,6,23,0.10)',
        backgroundColor: 'rgba(255,255,255,0.88)',
        padding: '12px 12px',
        outline: 'none',
        fontSize: '1rem',
        width: '100%',
        color: '#07121f',
        boxShadow: '0 1px 0 rgba(255,255,255,0.65) inset',
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
        fontWeight: 800,
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
        color: 'rgba(2,6,23,0.62)',
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
        color: 'rgba(255,255,255,0.88)',
        fontSize: '0.9rem',
        marginTop: '10px',
        textShadow: '0 2px 18px rgba(0,0,0,0.45)',
      },

      subtleText: {
        color: 'rgba(2,6,23,0.72)',
        lineHeight: 1.6,
        margin: 0,
      },

      h2: {
        margin: '0 0 10px 0',
        fontSize: '1.2rem',
        letterSpacing: '-0.01em',
        color: '#07121f',
      },
    }),
    [loading]
  )
}
