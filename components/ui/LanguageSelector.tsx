import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Palette } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

export type Language = { code: string; endonym: string; french: string };

// Endonym first — the brand serves French + local Sahel languages.
export const LANGUAGES: Language[] = [
  { code: 'fr', endonym: 'Français',   french: 'Français' },
  { code: 'bm', endonym: 'Bamanankan', french: 'Bambara' },
  { code: 'ff', endonym: 'Fulfulde',   french: 'Peul' },
  { code: 'son', endonym: 'Soŋay',     french: 'Songhaï' },
];

type Props = {
  value?: string;                 // language code
  onChange?: (code: string) => void;
  /** Render the trigger reversed for navy surfaces. */
  onDark?: boolean;
};

/**
 * Language picker chip. Tapping opens a sheet of the supported languages.
 * Multilingual access is a core mission of the product.
 */
export function LanguageSelector({ value = 'fr', onChange, onDark = false }: Props) {
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === value) ?? LANGUAGES[0];

  const select = (code: string) => {
    setOpen(false);
    onChange?.(code);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={`Langue : ${current.endonym}. Changer de langue`}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        style={[styles.chip, onDark ? styles.chipDark : styles.chipLight]}
      >
        <Ionicons name="language" size={14} color={onDark ? '#FFFFFF' : Palette.navy600} />
        <Text style={[styles.chipText, { color: onDark ? '#FFFFFF' : Palette.navy600 }]}>
          {current.code.toUpperCase()}
        </Text>
        <Ionicons name="chevron-down" size={12} color={onDark ? 'rgba(255,255,255,0.8)' : Palette.slate500} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.scrim} onPress={() => setOpen(false)}>
          <Pressable style={styles.sheet}>
            <Text style={styles.sheetTitle}>Choisir la langue</Text>
            {LANGUAGES.map((l) => {
              const active = l.code === value;
              return (
                <TouchableOpacity
                  key={l.code}
                  style={styles.option}
                  activeOpacity={0.8}
                  onPress={() => select(l.code)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                >
                  <View style={styles.optionText}>
                    <Text style={styles.endonym}>{l.endonym}</Text>
                    {l.endonym !== l.french ? <Text style={styles.french}>{l.french}</Text> : null}
                  </View>
                  {active ? (
                    <Ionicons name="checkmark-circle" size={20} color={Palette.green500} />
                  ) : (
                    <View style={styles.radio} />
                  )}
                </TouchableOpacity>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    minHeight: 36,
  },
  chipDark: { backgroundColor: 'rgba(255,255,255,0.14)' },
  chipLight: { backgroundColor: Palette.navy50 },
  chipText: { fontFamily: Fonts.bodySemibold, fontSize: 13, letterSpacing: 0.3 },

  scrim: {
    flex: 1,
    backgroundColor: 'rgba(14,16,32,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Palette.slate0,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 34,
  },
  sheetTitle: {
    fontFamily: Fonts.displayBold,
    fontSize: 20,
    color: Palette.navy900,
    marginBottom: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    minHeight: 48,
    borderBottomWidth: 1,
    borderBottomColor: Palette.slate100,
  },
  optionText: { flex: 1 },
  endonym: { fontFamily: Fonts.bodySemibold, fontSize: 16, color: Palette.navy900 },
  french: { fontFamily: Fonts.bodyRegular, fontSize: 13, color: Palette.slate500, marginTop: 1 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Palette.slate300,
  },
});
