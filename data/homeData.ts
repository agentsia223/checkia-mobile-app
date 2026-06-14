// Internal verdict keys. Canonical user-facing labels live in constants/verdict.ts
// (Vrai · Faux · Trompeur · Non vérifié), the fixed vocabulary of the design system.
export type Verdict = 'VRAI' | 'FAUX' | 'DOUTEUX' | 'INCONNU';

export interface FactCheck {
  id: string;
  raw_input: string;
  verdict: Verdict;
  created_at: string;
  input_type: string;
  score?: number;
  source?: string;
}
