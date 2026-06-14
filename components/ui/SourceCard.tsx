import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Palette } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

type Props = {
  rank?: number;
  name: string;
  domain?: string;
  date?: string;
  snippet?: string;
  reliability?: string;     // e.g. "fiable"
  url?: string;
  onPress?: () => void;
  isLast?: boolean;
};

/**
 * Ranked evidence source — navy initial avatar + green rank badge, optional
 * reliability pill, mono `domain · date`, and a snippet. Signature data-display
 * component of the fact-checking product.
 */
export function SourceCard({ rank, name, domain, date, snippet, reliability, url, onPress, isLast }: Props) {
  const initial = (name || '?').trim().charAt(0).toUpperCase();
  // Avoid echoing the domain when it is already the displayed name.
  const showDomain = domain && domain !== name;
  const meta = [showDomain ? domain : null, date].filter(Boolean).join('  ·  ');

  return (
    <TouchableOpacity
      style={[styles.row, !isLast && styles.rowBorder]}
      activeOpacity={url ? 0.75 : 1}
      onPress={onPress}
      disabled={!url}
      accessibilityRole={url ? 'link' : 'text'}
      accessibilityLabel={`Source${rank ? ` ${rank}` : ''} : ${name}${reliability ? `, ${reliability}` : ''}`}
    >
      <View style={styles.avatarWrap}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        {rank ? (
          <View style={styles.rankBadge}>
            <Text style={styles.rankText}>{rank}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          {reliability ? (
            <View style={styles.relPill}>
              <Ionicons name="shield-checkmark" size={10} color={Palette.green700} />
              <Text style={styles.relText}>{reliability}</Text>
            </View>
          ) : null}
        </View>
        {meta ? <Text style={styles.meta} numberOfLines={1}>{meta}</Text> : null}
        {snippet ? <Text style={styles.snippet} numberOfLines={2}>{snippet}</Text> : null}
      </View>

      {url ? (
        <Ionicons name="open-outline" size={15} color={Palette.slate400} style={styles.openIcon} />
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Palette.slate200,
  },
  avatarWrap: { width: 38, height: 38, flexShrink: 0 },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: Palette.navy600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontFamily: Fonts.displayBold,
    fontSize: 18,
  },
  rankBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: Palette.green500,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  rankText: { color: '#FFFFFF', fontFamily: Fonts.bodyBold, fontSize: 9 },
  body: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: {
    flexShrink: 1,
    fontFamily: Fonts.bodySemibold,
    fontSize: 15,
    color: Palette.navy900,
  },
  relPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: Palette.green50,
  },
  relText: {
    fontFamily: Fonts.bodySemibold,
    fontSize: 10,
    color: Palette.green700,
  },
  meta: {
    fontFamily: Fonts.mono,
    fontSize: 11.5,
    color: Palette.slate500,
    marginTop: 3,
  },
  snippet: {
    fontFamily: Fonts.bodyRegular,
    fontSize: 13.5,
    lineHeight: 19,
    color: Palette.slate700,
    marginTop: 5,
  },
  openIcon: { marginTop: 2 },
});
