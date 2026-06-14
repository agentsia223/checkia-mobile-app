import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, AccessibilityInfo } from 'react-native';
import { Palette } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { getVerdict } from '../../constants/verdict';

type Props = {
  value: number;            // 0–100
  verdict?: string;         // keys the fill color
  label?: string;
  levelLabel?: string;      // e.g. ÉLEVÉ / MOYEN / FAIBLE
};

/**
 * Confidence meter — verdict-keyed fill on a 10px slate track, animated to width
 * (360ms ease-out) and respecting reduce-motion. Percent set in the display font.
 */
export function ConfidenceMeter({ value, verdict, label = 'Indice de confiance', levelLabel }: Props) {
  const v = getVerdict(verdict);
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const anim = useRef(new Animated.Value(0)).current;
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((r) => { if (mounted) setReduceMotion(r); }).catch(() => {});
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (reduceMotion) { anim.setValue(clamped); return; }
    Animated.timing(anim, {
      toValue: clamped,
      duration: 360,
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      useNativeDriver: false,
    }).start();
  }, [clamped, reduceMotion]);

  const width = anim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] });

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clamped }}
      accessibilityLabel={`${label} : ${clamped}%`}
    >
      <View style={styles.row}>
        <Text style={styles.label}>{label.toUpperCase()}</Text>
        {levelLabel ? <Text style={[styles.level, { color: v.fg }]}>{levelLabel}</Text> : null}
      </View>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { width, backgroundColor: v.solid }]} />
      </View>
      <View style={styles.endRow}>
        <Text style={styles.end}>0</Text>
        <Text style={[styles.center, { color: v.fg }]}>{clamped}%</Text>
        <Text style={styles.end}>100</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 10,
    fontFamily: Fonts.bodySemibold,
    letterSpacing: 1.2,
    color: Palette.slate500,
  },
  level: {
    fontSize: 10,
    fontFamily: Fonts.bodySemibold,
    letterSpacing: 1.2,
  },
  track: {
    width: '100%',
    height: 10,
    backgroundColor: Palette.slate200,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  fill: {
    height: 10,
    borderRadius: 5,
  },
  endRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  end: { fontSize: 11, color: Palette.slate500, fontFamily: Fonts.mono },
  center: { fontSize: 13, fontFamily: Fonts.displayBold },
});
