// app/(auth)/onboarding.tsx
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BrandLogo } from '../../components/brand/BrandLogo';

const COLORS = {
  bg: '#F7F8FB',
  surface: '#EEF0F5',
  border: '#E0E3EC',
  text: '#131941',
  textSoft: '#7C8398',
  textMuted: '#A3AABF',
  accent: '#28348A',
  button: '#28348A',
  white: '#FFFFFF',
  dotIdle: '#C7CCDA',
  home: '#A3AABF',
};

const FEATURES = [
  { icon: 'reorder-three-outline', label: 'Texte' },
  { icon: 'image-outline', label: 'Image' },
];

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <View style={styles.screen}>
        <View style={styles.headerMetaRow}>
          <Text style={styles.headerMetaLeft}>• BAMAKO · 2026</Text>
          <Text style={styles.headerMetaRight}>FR</Text>
        </View>

        <View style={styles.brandWrap}>
          <BrandLogo variant="wordmark" height={34} />
        </View>

        <View style={styles.kickerRow}>
          <View style={styles.kickerLine} />
          <Text style={styles.kicker}>N° 001 — L’ESSENTIEL</Text>
        </View>

        <View style={styles.titleWrap}>
          <Text style={styles.titleLine}>Vérifier</Text>
          <Text style={styles.titleLine}>
            l’
            <Text style={styles.titleItalic}>information</Text>
          </Text>
          <Text style={styles.titleLine}>en un instant.</Text>
        </View>

        <Text style={styles.description}>
          Un outil de lutte contre la désinformation{'\n'}
          au Sahel. Texte, lien, image ou son — en{'\n'}
          quelques secondes.
        </Text>

        <View style={styles.featuresRow}>
          {FEATURES.map((item) => (
            <View key={item.label} style={styles.featureCard}>
              <Ionicons
                name={item.icon as any}
                size={16}
                color={COLORS.text}
              />
              <Text style={styles.featureLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.flexSpacer} />

        <TouchableOpacity
          activeOpacity={0.92}
          style={styles.cta}
          onPress={() => router.push('/(auth)/register')}
        >
          <Text style={styles.ctaText}>Commencer</Text>
          <Ionicons name="arrow-forward" size={17} color={COLORS.white} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.82}
          style={styles.loginWrap}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.loginText}>
            Déjà un compte ? <Text style={styles.loginLink}>Se connecter</Text>
          </Text>
        </TouchableOpacity>

        <View style={styles.homeIndicator} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 8,
  },

  headerMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 42,
  },

  headerMetaLeft: {
    fontFamily: 'Barlow-Medium',
    fontSize: 10.5,
    lineHeight: 12,
    letterSpacing: 1.55,
    textTransform: 'uppercase',
    color: '#7C8398',
    includeFontPadding: false,
  },

  headerMetaRight: {
    fontFamily: 'Barlow-Medium',
    fontSize: 10.5,
    lineHeight: 12,
    letterSpacing: 1.55,
    textTransform: 'uppercase',
    color: '#7C8398',
    includeFontPadding: false,
  },

  brandWrap: {
    marginBottom: 34,
  },

  brand: {
    includeFontPadding: false,
  },

  brandCheck: {
    fontFamily: 'BarlowSemiCondensed-Bold',
    fontSize: 34,
    lineHeight: 36,
    letterSpacing: -0.45,
    color: COLORS.text,
  },

  brandIA: {
    fontFamily: 'BarlowSemiCondensed-SemiBold',
    fontSize: 34,
    lineHeight: 36,
    letterSpacing: -0.45,
    color: COLORS.accent,
  },

  kickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  kickerLine: {
    width: 16,
    height: 1.5,
    backgroundColor: '#7C8398',
    marginRight: 8,
  },

  kicker: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 10.5,
    lineHeight: 12,
    letterSpacing: 1.7,
    color: '#7C8398',
    textTransform: 'uppercase',
    includeFontPadding: false,
  },

  titleWrap: {
    marginBottom: 22,
  },

  titleLine: {
    fontFamily: 'BarlowSemiCondensed-Bold',
    fontSize: 43,
    lineHeight: 47,
    letterSpacing: -1.25,
    color: COLORS.text,
    includeFontPadding: false,
  },

  titleItalic: {
    fontFamily: 'BarlowSemiCondensed-SemiBold',
    fontSize: 43,
    lineHeight: 47,
    letterSpacing: -1.25,
    color: COLORS.accent,
    includeFontPadding: false,
  },

  description: {
    fontFamily: 'Barlow-Regular',
    fontSize: 14,
    lineHeight: 21.5,
    letterSpacing: -0.1,
    color: '#5B6175',
    marginBottom: 34,
    includeFontPadding: false,
  },

  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  featureCard: {
    width: 72,
    height: 60,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
  },

  featureLabel: {
    marginTop: 7,
    fontFamily: 'Barlow-Medium',
    fontSize: 11.5,
    lineHeight: 13,
    color: COLORS.text,
    includeFontPadding: false,
  },

  flexSpacer: {
    flex: 1,
  },

  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  dotActive: {
    width: 22,
    height: 4,
    borderRadius: 999,
    backgroundColor: COLORS.button,
    marginRight: 6,
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: COLORS.dotIdle,
    marginRight: 6,
  },

  cta: {
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },

  ctaText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 15.5,
    lineHeight: 18,
    color: COLORS.white,
    includeFontPadding: false,
  },

  loginWrap: {
    alignItems: 'center',
    marginBottom: 16,
  },

  loginText: {
    fontFamily: 'Barlow-Regular',
    fontSize: 12.5,
    lineHeight: 16,
    color: COLORS.textMuted,
    includeFontPadding: false,
  },

  loginLink: {
    fontFamily: 'Barlow-SemiBold',
    color: COLORS.text,
    textDecorationLine: 'underline',
  },

  homeIndicator: {
    alignSelf: 'center',
    width: 119,
    height: 4,
    borderRadius: 999,
    backgroundColor: COLORS.home,
  },
});