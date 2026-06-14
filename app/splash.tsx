import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, AccessibilityInfo } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Palette } from '../constants/colors';
import { BrandLogo } from '../components/brand/BrandLogo';
import { authAPI } from '../services/api';

export default function Splash() {
  const router = useRouter();
  const fade = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled()
      .then((reduce) => {
        if (reduce) {
          fade.setValue(1);
          progress.setValue(1);
          return;
        }
        Animated.timing(fade, {
          toValue: 1,
          duration: 480,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start();
        Animated.timing(progress, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: false,
        }).start();
      })
      .catch(() => {
        fade.setValue(1);
        progress.setValue(1);
      });

    const timer = setTimeout(() => {
      authAPI.getSession().then((session) => {
        router.replace(session ? '/(tabs)' : '/(auth)/onboarding');
      });
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['8%', '100%'],
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.View style={[styles.center, { opacity: fade }]}>
        <BrandLogo variant="icon" white height={88} />
        <BrandLogo variant="wordmark" white height={34} style={styles.wordmark} />
        <Text style={styles.sub}>Vérification par l'IA</Text>
        <View style={styles.regionRow}>
          <View style={styles.dot} />
          <Text style={styles.region}>SAHEL FRANCOPHONE</Text>
        </View>
      </Animated.View>

      <View style={styles.barTrack}>
        <Animated.View style={[styles.barFill, { width: barWidth }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.navy600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: { alignItems: 'center' },
  wordmark: { marginTop: 22 },
  sub: {
    marginTop: 16,
    fontSize: 15,
    fontFamily: 'Barlow-Regular',
    color: 'rgba(255,255,255,0.72)',
  },
  regionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Palette.green500,
  },
  region: {
    fontSize: 11,
    fontFamily: 'Barlow-SemiBold',
    letterSpacing: 1.8,
    color: Palette.green400,
  },
  barTrack: {
    position: 'absolute',
    bottom: 64,
    width: 132,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.18)',
    overflow: 'hidden',
  },
  barFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: Palette.green500,
  },
});
