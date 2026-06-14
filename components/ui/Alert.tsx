import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Palette } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';

const TONES: Record<AlertTone, { fg: string; bg: string; border: string; icon: keyof typeof Ionicons.glyphMap }> = {
  info:    { fg: Palette.navy700,  bg: Palette.navy50,  border: Palette.navy200,  icon: 'information-circle' },
  success: { fg: Palette.green700, bg: Palette.green50, border: Palette.green200, icon: 'checkmark-circle' },
  warning: { fg: Palette.amber700, bg: Palette.amber50, border: Palette.amber200, icon: 'warning' },
  danger:  { fg: Palette.red700,   bg: Palette.red50,   border: Palette.red200,   icon: 'alert-circle' },
};

type Props = {
  tone?: AlertTone;
  children: React.ReactNode;
  icon?: keyof typeof Ionicons.glyphMap;
};

/** Tonal banner with a 4px left rule — info / success / warning / danger. */
export function Alert({ tone = 'info', children, icon }: Props) {
  const t = TONES[tone];
  return (
    <View style={[styles.wrap, { backgroundColor: t.bg, borderColor: t.border }]}>
      <View style={[styles.rule, { backgroundColor: t.fg }]} />
      <Ionicons name={icon ?? t.icon} size={16} color={t.fg} style={styles.icon} />
      <Text style={[styles.text, { color: t.fg }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingRight: 14,
    paddingLeft: 16,
    overflow: 'hidden',
  },
  rule: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  icon: { marginTop: 1 },
  text: {
    flex: 1,
    fontFamily: Fonts.bodyRegular,
    fontSize: 13,
    lineHeight: 19,
  },
});
