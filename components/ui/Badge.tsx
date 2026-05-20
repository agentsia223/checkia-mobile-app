import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

type Verdict = 'VRAI' | 'FAUX' | 'DOUTEUX' | 'INCONNU';

const config: Record<Verdict, { bg: string; tc: string; label: string }> = {
  VRAI:    { bg: Colors.true,    tc: Colors.bg,    label: '✔  INFORMATION VRAIE' },
  FAUX:    { bg: Colors.false,   tc: Colors.white, label: '✘  INFORMATION FAUSSE' },
  DOUTEUX: { bg: Colors.warning, tc: Colors.bg,    label: '⚠  INFORMATION DOUTEUSE' },
  INCONNU: { bg: Colors.border2, tc: Colors.white, label: '?  NON DÉTERMINÉ' },
};

export function Badge({ verdict }: { verdict: Verdict }) {
  const { bg, tc, label } = config[verdict];
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color: tc }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8, alignSelf: 'center' },
  text: { fontSize: 13, fontWeight: '800', letterSpacing: 0.5 },
});
