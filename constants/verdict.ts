// constants/verdict.ts
// Single source of truth for the four-outcome verdict system — the heart of a
// fact-checking product. Canonical French vocabulary (fixed by the design system,
// readme "Verdict vocabulary"): Vrai · Faux · Trompeur · Non vérifié.
// Every verdict pairs a COLOR and a GLYPH — never color alone (accessibility).
import { Ionicons } from '@expo/vector-icons';
import { Palette } from './colors';
import type { Verdict } from '../data/homeData';

export type VerdictStyle = {
  /** Canonical short term shown to users. */
  label: string;
  /** Ionicon glyph paired with the color (check / cross / triangle / info). */
  icon: keyof typeof Ionicons.glyphMap;
  /** Foreground (text / icon on soft surface). */
  fg: string;
  /** Soft background. */
  bg: string;
  /** Soft border. */
  border: string;
  /** Solid fill (badges, status circle, confidence bar). */
  solid: string;
};

export const VERDICT_CONFIG: Record<Verdict, VerdictStyle> = {
  VRAI:    { label: 'Vrai',        icon: 'checkmark-circle', fg: Palette.green700, bg: Palette.green50,  border: Palette.green200, solid: Palette.green500 },
  FAUX:    { label: 'Faux',        icon: 'close-circle',     fg: Palette.red700,   bg: Palette.red50,    border: Palette.red200,   solid: Palette.red600 },
  DOUTEUX: { label: 'Trompeur',    icon: 'warning',          fg: Palette.amber700, bg: Palette.amber50,  border: Palette.amber200, solid: Palette.amber500 },
  INCONNU: { label: 'Non vérifié', icon: 'information-circle', fg: Palette.slate600, bg: Palette.slate100, border: Palette.slate300, solid: Palette.slate500 },
};

/** Resolve any verdict-ish string to its style, defaulting to "Non vérifié". */
export const getVerdict = (v?: string): VerdictStyle =>
  VERDICT_CONFIG[(v as Verdict)] ?? VERDICT_CONFIG.INCONNU;
