// app/learn/[slug].tsx
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// ── Palette exacte storyboard ─────────────────────
const P = {
  bg:         '#F7F8FB',
  surface:    '#FFFFFF',
  surfaceAlt: '#EEF0F5',
  white:      '#FFFFFF',
  text:       '#131941',
  muted:      '#7C8398',
  line:       '#E0E3EC',
  navy:       '#28348A',
  navyDark:   '#212C74',
  pullBg:     '#ECEEFB',   // fond pull-quote bleuté (navy-50)
};

export default function Article() {
  const router = useRouter();

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={P.bg} />

      {/* ── Header ── */}
      <View style={s.header}>
        <TouchableOpacity
          style={s.circleBtn}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Retour"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="arrow-back" size={16} color={P.text} />
        </TouchableOpacity>

        <Text style={s.headerTitle}>FICHE N°01</Text>

        <View style={s.circleBtnSpacer} />
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Kicker ── */}
        <Text style={s.kicker}>— MÉDIAS · 5 MIN DE LECTURE</Text>

        {/* ── Titre ── */}
        <Text style={s.titleBlock}>
          {'Désinformation au '}
          <Text style={s.titleItalic}>Sahel.</Text>
        </Text>

        {/* ── Sous-titre italic ── */}
        <Text style={s.subtitle}>
          Repérer les fausses infos, cinq méthodes éprouvées par les rédactions locales.
        </Text>

        {/* ── Auteur ── */}
        <View style={s.authorRow}>
          <View style={s.authorAvatar}>
            <Text style={s.authorAvatarText}>AD</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.authorName}>Aïssatou Diallo</Text>
            <Text style={s.authorRole}>Éditrice · Benbere</Text>
          </View>
          <Text style={s.authorDate}>12 MAR</Text>
        </View>

        {/* ── Séparateur ── */}
        <View style={s.divider} />

        {/* ── Corps avec drop cap ── */}
        <Text style={s.body}>
          <Text style={s.dropCap}>L</Text>
          <Text>
            {'a désinformation prospère là où l\'information fiable\nmanque. Au Sahel, rumeurs WhatsApp et deepfakes\nfranchissent les frontières en quelques heures.'}
          </Text>
        </Text>

        {/* ── Pull quote ── */}
        <View style={s.pullQuote}>
          <View style={s.pullBorderLeft} />
          <View style={{ flex: 1 }}>
            <Text style={s.pullText}>
              {'\u00AB Une fausse nouvelle voyage six fois plus vite qu\'une information vérifiée. \u00BB'}
            </Text>
            <Text style={s.pullAttrib}>— MIT MEDIA LAB, 2018</Text>
          </View>
        </View>

        {/* ── Section titre ── */}
        <Text style={s.sectionTitle}>
          {'01\u00B7 Vérifier la source'}
        </Text>

        {/* ── Corps section ── */}
        <Text style={s.body}>
          Le site a-t-il des mentions légales ? Un domaine récent ? Une orthographe imitant un média connu ? Ces indices ne trompent presque jamais.
        </Text>

        <View style={{ height: 100 }} />
      </ScrollView>

    </SafeAreaView>
  );
}

// ── Styles ───────────────────────────────────────
const s = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: P.bg },
  scroll:  { flex: 1 },
  content: { paddingHorizontal: 22, paddingTop: 20, paddingBottom: 24 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: P.line,
    backgroundColor: P.bg,
  },
  circleBtn: {
    width: 40, height: 40, borderRadius: 20,
    borderWidth: 1, borderColor: P.line,
    backgroundColor: P.surface,
    alignItems: 'center', justifyContent: 'center',
  },
  circleBtnSpacer: {
    width: 40, height: 40,
  },
  headerTitle: {
    fontSize: 11, fontWeight: '700',
    letterSpacing: 1.6, color: P.muted,
  },

  // Kicker
  kicker: {
    fontSize: 10, fontWeight: '700',
    letterSpacing: 1.4, color: P.navy,
    marginBottom: 12, marginTop: 4,
  },

  // Titre
  titleBlock: {
    fontSize: 36,
    fontWeight: '400',
    fontFamily: 'BarlowSemiCondensed-Bold',
    color: P.text,
    lineHeight: 42,
    letterSpacing: -0.5,
    marginBottom: 14,
  },
  titleItalic: {
    
    fontFamily: 'BarlowSemiCondensed-SemiBold',
    color: P.navy,
  },

  // Sous-titre
  subtitle: {
    fontSize: 15,
    
    fontFamily: 'BarlowSemiCondensed-SemiBold',
    color: P.muted,
    lineHeight: 22,
    marginBottom: 20,
  },

  // Auteur
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
  },
  authorAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: P.navy,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  authorAvatarText: {
    fontSize: 12, fontWeight: '700', color: P.white,
  },
  authorName: {
    fontSize: 13, fontWeight: '700', color: P.text,
    marginBottom: 1,
  },
  authorRole: {
    fontSize: 11, color: P.muted,
  },
  authorDate: {
    fontSize: 11, fontWeight: '600',
    color: P.muted, letterSpacing: 0.5,
  },

  // Séparateur
  divider: {
    height: 1, backgroundColor: P.line,
    marginBottom: 20,
  },

  // Corps
  body: {
    fontSize: 15,
    lineHeight: 24,
    color: P.text,
    marginBottom: 20,
  },

  // Drop cap
  dropCap: {
    fontSize: 52,
    lineHeight: 48,
    fontFamily: 'BarlowSemiCondensed-Bold',
    fontWeight: '400',
    color: P.navy,
  },

  // Pull quote
  pullQuote: {
    flexDirection: 'row',
    backgroundColor: P.pullBg,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    paddingVertical: 18,
    paddingRight: 18,
  },
  pullBorderLeft: {
    width: 4,
    backgroundColor: P.navy,
    marginRight: 16,
    borderRadius: 2,
  },
  pullText: {
    fontSize: 16,
    
    fontFamily: 'BarlowSemiCondensed-SemiBold',
    color: P.navy,
    lineHeight: 24,
    marginBottom: 10,
  },
  pullAttrib: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: P.muted,
    textTransform: 'uppercase',
  },

  // Section titre
  sectionTitle: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'BarlowSemiCondensed-Bold',
    color: P.text,
    marginBottom: 14,
    letterSpacing: -0.3,
  },

  // Action bar
  actionBar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: P.line,
    backgroundColor: P.bg,
  },
  btnSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: P.surface,
    borderWidth: 1, borderColor: P.line,
    borderRadius: 14, paddingVertical: 15,
  },
  btnSecondaryText: {
    fontSize: 14, fontWeight: '600', color: P.text,
  },
  btnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: P.navyDark,
    borderRadius: 14, paddingVertical: 15,
  },
  btnPrimaryText: {
    fontSize: 14, fontWeight: '700', color: P.white,
  },
});
