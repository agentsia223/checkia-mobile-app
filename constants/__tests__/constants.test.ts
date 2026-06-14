/**
 * @file constants.test.ts
 * @description Tests d'intégrité pour les constantes du projet.
 */

import { Colors, P } from '../colors';
import { TABS, ANALYSIS_STEPS, STEP_TITLES, SOURCES } from '../verify';

describe('Constants Integrity', () => {
  describe('Colors', () => {
    it('doit contenir les couleurs de base (design system Check-IA)', () => {
      expect(Colors.bg).toBeDefined();
      expect(Colors.accent).toBe('#28348A'); // brand navy
      expect(Colors.green).toBe('#39A935');  // brand green
      expect(Colors.true).toBe('#2F8C2C');
      expect(Colors.false).toBe('#D92D20');
    });

    it('doit avoir le nouveau système P (Palette)', () => {
      expect(P.navy).toBe('#28348A');
      expect(P.green).toBe('#39A935');
      expect(P.vrai).toBe('#276F25');
      expect(P.faux).toBe('#B42318');
      expect(P.douteux).toBe('#97540A');
    });
  });

  describe('Verify Constants', () => {
    it('TABS doit contenir 2 onglets (Texte, Image) — alignement web', () => {
      expect(TABS).toHaveLength(2);
      expect(TABS.map(t => t.key)).toEqual(['Texte', 'Image']);
    });

    it('ANALYSIS_STEPS doit avoir 4 étapes (pas de détection de langue)', () => {
      expect(ANALYSIS_STEPS).toHaveLength(4);
      expect(ANALYSIS_STEPS[0].label).toBe('Extraction du texte');
      // Aucune étape ne porte un sub hardcodé
      ANALYSIS_STEPS.forEach((step) => expect(step.sub).toBeNull());
    });

    it('STEP_TITLES doit correspondre aux 4 étapes', () => {
      expect(STEP_TITLES).toHaveLength(4);
      expect(STEP_TITLES[0].etape).toBe('ÉTAPE 1 SUR 4');
      expect(STEP_TITLES[3].etape).toBe('ÉTAPE 4 SUR 4');
    });

    it('SOURCES doit contenir les sites de fact-checking', () => {
      expect(SOURCES).toContain('benbere.com');
      expect(SOURCES).toContain('AFP Fact Check');
    });

  });
});
