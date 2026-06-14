// constants/colors.ts
// ============================================================
// CHECK-IA · Color system — derived from the brand design system.
// Brand: Navy #28348a + Green #39a935 (extracted from the logo).
// Neutrals: cool slate scale tuned toward the navy.
// Verdict hues: green (Vrai) · red (Faux) · amber (Trompeur) · slate (Non vérifié).
// ============================================================

// ── Raw scales (reach for the semantic aliases below in app code) ──
export const Palette = {
  // Brand navy
  navy50:  '#ECEEFB',
  navy100: '#D6DAF4',
  navy200: '#AEB6E8',
  navy300: '#818CD6',
  navy400: '#5965BF',
  navy500: '#3A47A6',
  navy600: '#28348A', // ← core brand navy
  navy700: '#212C74',
  navy800: '#1A2359',
  navy900: '#131941',
  navy950: '#0C0F29',

  // Brand green (accent / "verified true")
  green50:  '#EDF8EC',
  green100: '#D4EFD2',
  green200: '#A9DFA6',
  green300: '#79CC74',
  green400: '#52BA4D',
  green500: '#39A935', // ← core brand green
  green600: '#2F8C2C',
  green700: '#276F25',
  green800: '#20571F',
  green900: '#163D15',

  // Cool slate neutrals
  slate0:   '#FFFFFF',
  slate50:  '#F7F8FB',
  slate100: '#EEF0F5',
  slate200: '#E0E3EC',
  slate300: '#C7CCDA',
  slate400: '#A3AABF',
  slate500: '#7C8398',
  slate600: '#5B6175',
  slate700: '#434860',
  slate800: '#2C3047',
  slate900: '#1A1D2E',
  slate950: '#0E1020',

  // Verdict / status
  red50:  '#FDECEB',
  red100: '#FBD9D5',
  red200: '#F6B3AB',
  red500: '#E5483D',
  red600: '#D92D20',
  red700: '#B42318',

  amber50:  '#FDF4E7',
  amber100: '#FBE5C6',
  amber200: '#F6CD8D',
  amber500: '#E8870A',
  amber600: '#C46F06',
  amber700: '#97540A',
} as const;

export const Colors = {
  // ── Surfaces ───────────────────────────────
  bg:           Palette.slate50,    // page (light cool slate)
  bgAlt:        Palette.slate0,     // card / elevated surface
  card:         Palette.slate0,

  // ── Encre (text) ───────────────────────────
  ink:          Palette.navy900,    // texte principal / titres
  ink2:         Palette.slate800,   // texte secondaire (corps)
  ink3:         Palette.slate500,   // texte muted / placeholder

  // ── Accent (navy brand) ────────────────────
  accent:       Palette.navy600,    // boutons, liens, dots actifs
  accentSoft:   Palette.navy50,     // fond badge accent
  accentDim:    Palette.navy50,

  // ── Accent secondaire (green) ──────────────
  green:        Palette.green500,
  greenDark:    Palette.green600,
  greenSoft:    Palette.green50,

  // ── Règle / bordures ───────────────────────
  rule:         Palette.slate200,   // bordures légères
  border:       Palette.slate200,
  border2:      Palette.slate300,   // bordure plus marquée

  // ── Verdicts ───────────────────────────────
  true:         Palette.green600,   // VRAI vert (solide, lisible)
  trueDim:      'rgba(57,169,53,0.10)',
  false:        Palette.red600,     // FAUX rouge (surfaces solides)
  falseDim:     'rgba(217,45,32,0.10)',
  warning:      Palette.amber600,   // TROMPEUR ambre
  warnDim:      'rgba(232,135,10,0.10)',

  // ── Feedback (texte) ───────────────────────
  dangerFg:     Palette.red700,     // texte d'erreur sur fond clair

  // ── Inputs ─────────────────────────────────
  inputBg:      Palette.slate0,
  inputBorder:  Palette.slate300,
  inputPlaceholder: Palette.slate400,

  // ── Texte ──────────────────────────────────
  text:         Palette.navy900,
  textMuted:    Palette.slate500,
  white:        '#FFFFFF',

  // ── Misc ───────────────────────────────────
  dark:         Palette.navy900,
  gray:         Palette.slate500,
};

// Shared compact palette used throughout screen styles.
export const P = {
  // Surfaces
  bg:         Palette.slate50,    // page
  surface:    Palette.slate0,     // card / input
  surfaceAlt: Palette.slate100,   // sunken (chips, tab track, tiles)
  white:      '#FFFFFF',

  // Text
  text:       Palette.navy900,    // titres / texte fort
  muted:      Palette.slate500,   // texte secondaire

  // Lines
  line:       Palette.slate200,

  // Brand
  accent:     Palette.navy600,
  navy:       Palette.navy600,
  navyDark:   Palette.navy700,
  green:      Palette.green500,
  greenDark:  Palette.green600,
  greenSoft:  Palette.green50,

  // Stat tiles
  statBeige:  Palette.slate100,
  statGreen:  Palette.green50,
  statPink:   Palette.red50,

  // Verdicts (fg / bg pairs)
  vrai:       Palette.green700,
  vraiBg:     Palette.green50,
  faux:       Palette.red700,
  fauxBg:     Palette.red50,
  douteux:    Palette.amber700,
  douteuxBg:  Palette.amber50,
  warning:    Palette.amber700,
  warningBg:  'rgba(232,135,10,0.10)',

  // Profile / account
  successBg:    Palette.green50,
  successBorder:Palette.green200,
  successText:  Palette.green700,
  streakBg:     Palette.navy50,
  streakIcon:   Palette.green400,
  danger:       Palette.red600,
};
