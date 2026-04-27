/**
 * Light theme tokens for the Toffee docs site.
 * Warm beige/cream palette inspired by the reference design.
 */
export const t = {
  // Backgrounds
  bg: '#f5f0eb',           // warm cream page background
  bgSidebar: '#FAF8F6',   // sidebar background
  bgCard: '#ffffff',       // white cards
  bgCode: '#1e1e2e',      // dark code blocks (keeps readability)
  bgCodeHeader: '#262637',

  // Borders
  border: 'rgba(0,0,0,0.08)',
  borderCard: 'rgba(0,0,0,0.06)',

  // Text
  textPrimary: '#000000',  // text black
  textSecondary: '#6B6B6B', // text gray
  textMuted: '#999999',
  textCode: '#e4e4e7',

  // Brand colors
  orange: '#F6561A',
  yellow: '#FFA103',       // highlight color
  brown: '#642714',

  // Accent
  accent: '#F6561A',
  accentLight: '#FFA103',
  accentBg: 'rgba(246, 86, 26, 0.08)',
  accentBorder: 'rgba(246, 86, 26, 0.15)',

  // Sidebar nav
  navText: '#6b6b6b',
  navTextHover: '#1a1a1a',
  navActive: '#1a1a1a',
  navLabel: '#999999',

  // Buttons — black linear gradient with gray gradient stroke
  btnBg: 'linear-gradient(180deg, #2a2a2a 0%, #111111 100%)',
  btnBorder: 'linear-gradient(180deg, #888888 0%, #444444 100%)',
  btnText: '#ffffff',

  // Misc
  radius: 10,
  radiusLg: 14,
  font: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  fontSerif: "'Instrument Serif', Georgia, serif",
  fontMono: "'JetBrains Mono', monospace",
} as const
