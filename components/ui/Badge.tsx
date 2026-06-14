import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VERDICT_CONFIG } from '../../constants/verdict';
import type { Verdict } from '../../data/homeData';
import { Fonts } from '../../constants/fonts';

const LONG_LABEL: Record<Verdict, string> = {
  VRAI:    'Information vraie',
  FAUX:    'Information fausse',
  DOUTEUX: 'Information trompeuse',
  INCONNU: 'Information non vérifiée',
};

// Solid verdict badge. Color + glyph are always paired (never color alone) and
// the vocabulary comes from the central verdict config (Vrai/Faux/Trompeur/Non vérifié).
export function Badge({ verdict }: { verdict: Verdict }) {
  const v = VERDICT_CONFIG[verdict] ?? VERDICT_CONFIG.INCONNU;
  return (
    <View style={[styles.badge, { backgroundColor: v.solid }]}>
      <Ionicons name={v.icon} size={15} color="#FFFFFF" />
      <Text style={styles.text}>{LONG_LABEL[verdict] ?? LONG_LABEL.INCONNU}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 999,
    alignSelf: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: Fonts.bodySemibold,
    letterSpacing: 0.3,
  },
});
