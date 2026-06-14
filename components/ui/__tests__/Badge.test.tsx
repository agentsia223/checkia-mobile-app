import React from 'react';
import { render } from '@testing-library/react-native';
import { Badge } from '../Badge';

describe('Badge Component', () => {
  it('affiche le bon texte pour le verdict VRAI', () => {
    const { getByText } = render(<Badge verdict="VRAI" />);
    expect(getByText(/INFORMATION VRAIE/i)).toBeTruthy();
  });

  it('affiche le bon texte pour le verdict FAUX', () => {
    const { getByText } = render(<Badge verdict="FAUX" />);
    expect(getByText(/INFORMATION FAUSSE/i)).toBeTruthy();
  });

  it('affiche le terme canonique « trompeuse » pour le verdict DOUTEUX', () => {
    const { getByText } = render(<Badge verdict="DOUTEUX" />);
    expect(getByText(/INFORMATION TROMPEUSE/i)).toBeTruthy();
  });

  it('affiche « non vérifiée » pour le verdict INCONNU', () => {
    const { getByText } = render(<Badge verdict="INCONNU" />);
    expect(getByText(/INFORMATION NON VÉRIFIÉE/i)).toBeTruthy();
  });
});
