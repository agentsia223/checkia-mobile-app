import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { P } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { BrandLogo } from './BrandLogo';

type Props = {
  /** Safe-area top inset so the navy band bleeds under the status bar. */
  topInset?: number;
  /** Show the language chip on the right. */
  showLang?: boolean;
  lang?: string;
};

/**
 * Full-bleed navy application bar carrying the reversed Check-IA wordmark —
 * the brand's signature header across the mobile product.
 *
 * The language chip is currently a static indicator. Multilingual switching
 * is not wired yet (no i18n layer); swap it for `<LanguageSelector>` once
 * translations ship.
 */
export function BrandBar({ topInset = 0, showLang = true, lang = 'FR' }: Props) {
  return (
    <View style={[styles.bar, { paddingTop: topInset + 12 }]}>
      <BrandLogo variant="wordmark" white height={26} />
      {showLang ? (
        <View style={styles.langChip}>
          <Ionicons name="language" size={14} color="#FFFFFF" />
          <Text style={styles.langText}>{lang}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: P.navy,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingBottom: 14,
  },
  langChip: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  langText: {
    color: '#FFFFFF',
    fontFamily: Fonts.bodySemibold,
    fontSize: 13,
    letterSpacing: 0.3,
  },
});
