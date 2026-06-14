// app/result/[id].tsx
import {
  ActivityIndicator,
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, StatusBar, Share, Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { factCheckAPI, imageVerificationAPI } from '../../services/api';
import { ResultViewModel, mapImageToResult, mapSubmissionToResult } from '../../utils/apiMappers';
import { getVerdict } from '../../constants/verdict';
import { ConfidenceMeter } from '../../components/ui/ConfidenceMeter';
import { SourceCard } from '../../components/ui/SourceCard';
import { Alert as InlineAlert } from '../../components/ui/Alert';

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
  green:      '#276F25',
  greenLight: '#EDF8EC',
  greenBorder:'#A9DFA6',
  greenBar:   '#39A935',
  red:        '#B42318',
  warning:    '#97540A',
  warningBg:  '#FDF4E7',
  warningLine:'#F6CD8D',
};

export default function ResultScreen() {
  const router = useRouter();
  const { id, kind } = useLocalSearchParams<{ id: string; kind?: string }>();
  const [result, setResult] = useState<ResultViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const loadResult = async () => {
      if (!id) return;
      setLoading(true);
      setError('');
      try {
        if (kind === 'image') {
          const { data } = await imageVerificationAPI.getHistory();
          const verification = data.find((item) => String(item.id) === String(id));
          if (!verification) throw new Error('Résultat image introuvable.');
          if (cancelled) return;
          setResult(mapImageToResult(verification));
        } else {
          const { data } = await factCheckAPI.getResult(id);
          if (cancelled) return;
          setResult(mapSubmissionToResult(data));
        }
      } catch (err: any) {
        if (cancelled) return;
        setError(err.message || 'Impossible de charger ce rapport.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadResult();
    return () => {
      cancelled = true;
    };
  }, [id, kind]);

  const RESULT = result;

  // Single source of truth: color + glyph + the canonical four-outcome system.
  const v = getVerdict(RESULT?.verdict);
  const verdictFg = v.fg;        // text / titles on soft surface
  const verdictSolid = v.solid;  // solid surfaces (icon circle, chip, bar)
  const verdictBg = v.bg;        // soft panel background
  const verdictBorder = v.border;
  const verdictIcon = v.icon;

  const handleShare = async () => {
    if (!RESULT) return;
    try {
      await Share.share({
        message: `Check-IA · ${RESULT.statusChip}\n\n"${RESULT.claim}"\n\n${RESULT.statusDescription}`,
      });
    } catch {
      // user dismissed
    }
  };

  const openSource = (url?: string) => {
    if (!url) return;
    Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={P.navy} />

      {/* ── Navy app bar (flush under the status bar) ── */}
      <SafeAreaView style={s.headerSafe} edges={['top']}>
        <View style={s.header}>
          <TouchableOpacity
            style={s.circleBtn}
            onPress={() => router.back()}
            testID="back-button"
            accessibilityRole="button"
            accessibilityLabel="Retour"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Résultat</Text>
          <View style={s.circleBtnSpacer} />
        </View>
      </SafeAreaView>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
      >
        {RESULT?.date ? <Text style={s.dateMeta}>{RESULT.date}</Text> : null}

        {loading && (
          <View style={s.stateBox}>
            <ActivityIndicator color={P.navy} />
            <Text style={s.stateText}>Chargement du rapport…</Text>
          </View>
        )}

        {!!error && !loading && (
          <InlineAlert tone="danger">{error}</InlineAlert>
        )}

        {!loading && RESULT && (
          <>
        {/* ── Panneau statut (mirroir du web : icône + titre + chip + description) ── */}
        <View
          style={[
            s.statusPanel,
            { borderColor: verdictBorder, backgroundColor: verdictBg },
          ]}
          accessibilityLabel={`Verdict : ${RESULT.statusChip}. ${RESULT.statusTitle}`}
        >
          <View style={[s.statusIconCircle, { backgroundColor: verdictSolid }]}>
            <Ionicons name={verdictIcon} size={28} color={P.white} />
          </View>
          <Text style={[s.statusTitle, { color: verdictFg }]}>
            {RESULT.statusTitle}
          </Text>
          <View style={[s.statusChip, { backgroundColor: verdictSolid }]}>
            <Text style={s.statusChipText}>{RESULT.statusChip}</Text>
          </View>
          <Text style={s.statusDescription}>{RESULT.statusDescription}</Text>
        </View>

        {/* ── Indice de confiance (quand un score réel est disponible) ── */}
        {RESULT.hasConfidence && RESULT.score !== undefined && (
          <View style={s.scoreSection}>
            <ConfidenceMeter
              value={RESULT.score}
              verdict={RESULT.verdict}
              levelLabel={RESULT.scoreLabel}
            />
          </View>
        )}

        {/* ── L'affirmation vérifiée ── */}
        <Text style={s.sectionLabel}>— L'AFFIRMATION VÉRIFIÉE</Text>

        {/* Card avec bordure gauche colorée + ombre + fond teinté verdict */}
        <View style={s.claimCard}>
          <View style={[s.claimBorderLeft, { backgroundColor: verdictSolid }]} />
          <Text style={s.claimText}>{RESULT.claim}</Text>
        </View>

        {/* ── L'analyse ── */}
        <Text style={s.sectionLabel}>— L'ANALYSE</Text>
        <Text style={s.analyseText}>
          {RESULT.analysis}
        </Text>

        {/* ── Sources croisées ── */}
        <Text style={s.sectionLabel} testID="sources-title">
          — SOURCES CROISÉES · {RESULT.sources.length}
        </Text>
        <View style={s.sourcesList}>
          {RESULT.sources.length === 0 ? (
            <Text style={s.sourceEmpty}>Aucune source externe disponible pour ce rapport.</Text>
          ) : RESULT.sources.map((src, i) => (
            <SourceCard
              key={`${src.name}-${i}`}
              rank={src.rank ?? i + 1}
              name={src.name}
              domain={src.domain}
              date={src.date}
              snippet={src.desc}
              url={src.url}
              onPress={() => openSource(src.url)}
              isLast={i === RESULT.sources.length - 1}
            />
          ))}
        </View>

        {/* ── Bannière disclaimer ── */}
        <InlineAlert tone="warning">
          Résultat généré par IA — à considérer comme indicatif, non définitif.
        </InlineAlert>

        <View style={{ height: 100 }} />
          </>
        )}
      </ScrollView>

      {/* ── Barre d'actions fixe en bas (avec marge de sécurité) ── */}
      {RESULT && (
        <SafeAreaView style={s.actionSafe} edges={['bottom']}>
          <View style={s.actionBar}>
            <TouchableOpacity
              style={s.btnPrimary}
              activeOpacity={0.85}
              onPress={handleShare}
              accessibilityRole="button"
              accessibilityLabel="Partager le rapport"
            >
              <Ionicons name="share-outline" size={16} color={P.white} />
              <Text style={s.btnPrimaryText}>Partager le rapport</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}

// ── Styles ───────────────────────────────────────
const s = StyleSheet.create({
  root:    { flex: 1, backgroundColor: P.bg },
  headerSafe: { backgroundColor: P.navy },
  actionSafe: { backgroundColor: P.bg },
  scroll:  { flex: 1, backgroundColor: P.bg },
  content: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 24 },
  stateBox: {
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  stateText: {
    fontSize: 13,
    color: P.muted,
    fontWeight: '600',
  },

  // Navy app bar
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: P.navy,
  },
  circleBtn: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  circleBtnSpacer: {
    width: 40, height: 40,
  },
  headerTitle: {
    fontSize: 19,
    fontFamily: 'BarlowSemiCondensed-Bold',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  dateMeta: {
    fontSize: 11.5,
    fontFamily: 'IBMPlexMono-Regular',
    letterSpacing: 0.4,
    color: P.muted,
    marginBottom: 14,
  },

  // Status panel (mirror web SubmitFact / AIImageDetection)
  statusPanel: {
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 22,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  statusIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statusTitle: {
    fontSize: 24,
    fontFamily: 'BarlowSemiCondensed-Bold',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 14,
  },
  statusChipText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Barlow-SemiBold',
    letterSpacing: 0.4,
  },
  statusDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: P.text,
    fontFamily: 'Barlow-Regular',
    textAlign: 'center',
  },

  // Score / confiance
  scoreSection: {
    marginTop: 8,
    marginBottom: 24,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreLabelText: {
    fontSize: 10, fontWeight: '700',
    letterSpacing: 1.2, color: P.muted,
  },
  scoreLevel: {
    fontSize: 10, fontWeight: '700',
    letterSpacing: 1.2,
  },
  barTrack: {
    width: '100%', height: 7,
    backgroundColor: P.surfaceAlt,
    borderRadius: 4, overflow: 'hidden',
    marginBottom: 5,
  },
  barFill: {
    height: 7, borderRadius: 4,
  },
  barEndRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barEnd:   { fontSize: 10, color: P.muted },
  barCenter:{ fontSize: 12, fontWeight: '700' },

  // Section label
  sectionLabel: {
    fontSize: 10, fontWeight: '700',
    letterSpacing: 1.4, color: P.muted,
    marginBottom: 12, marginTop: 4,
  },

  // ── Claim card : fond crème-vert + bordure gauche verte + ombre ──
  claimCard: {
    flexDirection: 'row',
    backgroundColor: '#EDF8EC',       // fond vert très clair (green-50)
    borderWidth: 1,
    borderColor: '#A9DFA6',           // bordure vert clair (green-200)
    borderRadius: 14,
    marginBottom: 24,
    overflow: 'hidden',
    // Ombre navy-teintée
    shadowColor: '#131941',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 3,
  },
  claimBorderLeft: {
    width: 4,
    alignSelf: 'stretch',
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  claimText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 23,
    color: P.text,
    fontFamily: 'BarlowSemiCondensed-SemiBold',
    paddingHorizontal: 14,
    paddingVertical: 16,
  },

  // Analyse
  analyseText: {
    fontSize: 15, lineHeight: 23,
    color: P.text, marginBottom: 28,
    fontFamily: 'Barlow-Regular',
  },
  analyseBold: {
    fontFamily: 'Barlow-SemiBold',
    color: P.text,
    textDecorationLine: 'underline',
  },

  // Sources
  sourcesList: {
    backgroundColor: P.white,
    borderWidth: 1, borderColor: P.line,
    borderRadius: 16, overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#131941',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  sourceEmpty: {
    fontSize: 14, color: P.muted, lineHeight: 20,
    fontFamily: 'Barlow-Regular',
    paddingHorizontal: 16, paddingVertical: 16,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
    gap: 12,
  },
  sourceSep: {
    height: 1, backgroundColor: P.line,
    marginLeft: 62,
  },
  sourceCheck: {
    width: 30, height: 30, borderRadius: 15,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  sourceText: { flex: 1 },
  sourceName: {
    fontSize: 13, fontWeight: '700', marginBottom: 3,
  },
  sourceDesc: {
    fontSize: 12, color: P.muted, lineHeight: 17,
  },
  sourceRight: {
    alignItems: 'flex-end', gap: 4, flexShrink: 0,
  },
  sourceDate: {
    fontSize: 11, color: P.muted, fontWeight: '500',
  },

  // Disclaimer
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: P.warningBg,
    borderWidth: 1, borderColor: P.warningLine,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  disclaimerText: {
    flex: 1, fontSize: 13,
    lineHeight: 19, color: P.warning,
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
    borderWidth: 1,
    borderColor: P.line,
    borderRadius: 14,
    paddingVertical: 15,
  },
  btnSecondaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: P.text,
  },
  btnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: P.navyDark,
    borderRadius: 14,
    paddingVertical: 15,
  },
  btnPrimaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: P.white,
  },
});
