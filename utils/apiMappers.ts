import { FactCheck, Verdict } from '../data/homeData';
import { ImageVerification, Submission } from '../services/api';
import { VERDICT_CONFIG } from '../constants/verdict';

export type ResultSource = {
  name: string;
  date?: string;
  desc: string;
  url?: string;
  domain?: string;
  rank?: number;
};

export type ResultViewModel = {
  id: string;
  date: string;
  verdict: Verdict;
  statusTitle: string;
  statusChip: string;
  statusDescription: string;
  hasConfidence: boolean;
  score?: number;
  scoreLabel?: string;
  claim: string;
  analysis: string;
  sources: ResultSource[];
};

const TEXT_STATUS_PRESETS: Record<string, { title: string; chip: string; description: string }> = {
  vérifié: {
    title: 'Information vérifiée',
    chip: 'Fiable',
    description: 'Cette information a été vérifiée et est considérée comme fiable selon nos analyses approfondies.',
  },
  rejeté: {
    title: 'Information fausse',
    chip: 'Non fiable',
    description: 'Cette information a été identifiée comme potentiellement fausse ou trompeuse après vérification.',
  },
  'en cours': {
    title: 'Vérification en cours',
    chip: 'En analyse',
    description: 'Vérification en cours… nous consultons des sources fiables.',
  },
};

const IMAGE_STATUS_PRESETS: Record<string, { title: string; chip: string; description: string }> = {
  AUTHENTIQUE: {
    title: 'Image authentique',
    chip: 'Authentique',
    description: 'Cette image semble être authentique et prise par un appareil photo réel.',
  },
  IA_DÉTECTÉE: {
    title: 'IA détectée',
    chip: 'IA détectée',
    description: 'Cette image présente des caractéristiques typiques d\'une génération par IA.',
  },
  INCERTAIN: {
    title: 'Résultat incertain',
    chip: 'Incertain',
    description: 'Il n\'est pas possible de déterminer avec certitude l\'origine de cette image.',
  },
  VRAIE: {
    title: 'Contenu vérifié',
    chip: 'Vraie',
    description: 'Le contenu de cette image est confirmé par les sources analysées.',
  },
  FAUSSE: {
    title: 'Contenu erroné',
    chip: 'Fausse',
    description: 'Le contenu de cette image contredit les sources analysées.',
  },
  INDÉTERMINÉE: {
    title: 'Contenu indéterminé',
    chip: 'Indéterminée',
    description: 'Les sources analysées ne permettent pas de conclure.',
  },
  ANALYSÉE: {
    title: 'Analyse terminée',
    chip: 'Analysée',
    description: 'L\'analyse de l\'image est terminée.',
  },
  EN_COURS: {
    title: 'Vérification en Cours',
    chip: 'En Analyse',
    description: 'Vérification en cours, notre IA analyse les sources disponibles…',
  },
  ERREUR: {
    title: 'Erreur d\'analyse',
    chip: 'Erreur',
    description: 'Une erreur est survenue lors de l\'analyse de cette image.',
  },
};

const textStatusPreset = (statut?: string) =>
  TEXT_STATUS_PRESETS[statut ?? ''] ?? TEXT_STATUS_PRESETS['en cours'];

const imageStatusPreset = (status?: string) =>
  IMAGE_STATUS_PRESETS[status ?? ''] ?? IMAGE_STATUS_PRESETS.EN_COURS;

const toDate = (value?: string | null) => {
  if (!value) return new Date();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
};

export const formatReportDate = (value?: string | null) =>
  toDate(value).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).replace('.', '').toUpperCase();

export const mapSubmissionStatusToVerdict = (status?: string): Verdict => {
  if (status === 'vérifié') return 'VRAI';
  if (status === 'rejeté') return 'FAUX';
  // Pending / unknown results are "Non vérifié" rather than mis-shown as Trompeur.
  return 'INCONNU';
};

export const mapImageStatusToVerdict = (status?: string): Verdict => {
  if (status === 'VRAIE' || status === 'AUTHENTIQUE') return 'VRAI';
  if (status === 'FAUSSE' || status === 'IA_DÉTECTÉE') return 'FAUX';
  // INCERTAIN / INDÉTERMINÉE / ANALYSÉE / EN_COURS / ERREUR → not verified.
  return 'INCONNU';
};

export const scoreLabel = (score: number) => {
  if (score >= 75) return 'ÉLEVÉ';
  if (score >= 45) return 'MOYEN';
  return 'FAIBLE';
};

const sourceDomain = (source: any): string | undefined => {
  if (source?.domain) return String(source.domain).replace(/^www\./, '');
  if (source?.url) {
    try {
      return new URL(source.url).hostname.replace(/^www\./, '');
    } catch {
      return undefined;
    }
  }
  return undefined;
};

const sourceName = (source: any) => {
  if (source?.title) return source.title;
  if (source?.name) return source.name;
  const domain = sourceDomain(source);
  if (domain) return domain;
  if (source?.url) return source.url;
  return String(source ?? 'Source');
};

export const mapSubmissionToFactCheck = (submission: Submission): FactCheck => ({
  id: String(submission.id),
  raw_input: submission.texte,
  verdict: mapSubmissionStatusToVerdict(submission.statut),
  created_at: submission.date,
  input_type: submission.source ? 'url' : 'texte',
  source: submission.source || undefined,
});

export const mapImageToFactCheck = (verification: ImageVerification): FactCheck => ({
  id: `image-${verification.id}`,
  raw_input: verification.claim_text || verification.original_filename || 'Image importée',
  verdict: mapImageStatusToVerdict(verification.status),
  created_at: verification.date,
  input_type: 'image',
  score: verification.confidence ?? 0,
  source: verification.verification_type === 'ai_detection' ? 'Détection IA' : 'Vérification image',
});

export const mapSubmissionToResult = (submission: Submission): ResultViewModel => {
  const sources = (submission.web_sources ?? []).map((source: any, i: number) => ({
    name: sourceName(source),
    domain: sourceDomain(source),
    rank: i + 1,
    desc: source?.snippet || source?.description || source?.content || source?.url || 'Source utilisée pour la vérification.',
    url: source?.url,
  }));
  const preset = textStatusPreset(submission.statut);
  const verdict = mapSubmissionStatusToVerdict(submission.statut);
  const rawScore = (submission as any).confidence ?? (submission as any).score;
  const hasScore = typeof rawScore === 'number';

  return {
    id: String(submission.id),
    date: formatReportDate(submission.date),
    verdict,
    statusTitle: preset.title,
    statusChip: VERDICT_CONFIG[verdict].label,
    statusDescription: preset.description,
    hasConfidence: hasScore,
    score: hasScore ? rawScore : undefined,
    scoreLabel: hasScore ? scoreLabel(rawScore) : undefined,
    claim: submission.texte,
    analysis: submission.detailed_result || preset.description,
    sources,
  };
};

export const mapImageToResult = (verification: ImageVerification): ResultViewModel => {
  const score = verification.confidence ?? 0;
  const preset = imageStatusPreset(verification.status);

  const verdict = mapImageStatusToVerdict(verification.status);

  return {
    id: `image-${verification.id}`,
    date: formatReportDate(verification.date),
    verdict,
    statusTitle: preset.title,
    statusChip: VERDICT_CONFIG[verdict].label,
    statusDescription: preset.description,
    hasConfidence: true,
    score,
    scoreLabel: scoreLabel(score),
    claim: verification.claim_text || verification.original_filename || 'Image importée',
    analysis: verification.explanation || preset.description,
    sources: verification.image_url
      ? [{ name: verification.original_filename || 'Image', rank: 1, desc: verification.image_url, url: verification.image_url }]
      : [],
  };
};
