// constants/fonts.ts
// CHECK-IA type system.
// Display: Barlow Semi Condensed (echoes the condensed wordmark) — headlines & verdicts.
// Body/UI: Barlow (humanist grotesque, high legibility).
// These keys must match the names registered in app/_layout.tsx via useFonts.

export const Fonts = {
  // Display (condensed)
  displayBold:     'BarlowSemiCondensed-Bold',
  displaySemibold: 'BarlowSemiCondensed-SemiBold',
  displayMedium:   'BarlowSemiCondensed-Medium',

  // Body
  bodyRegular:  'Barlow-Regular',
  bodyMedium:   'Barlow-Medium',
  bodySemibold: 'Barlow-SemiBold',
  bodyBold:     'Barlow-Bold',

  // Mono — source URLs / domains, dates, evidence references (per design system)
  mono:       'IBMPlexMono-Regular',
  monoMedium: 'IBMPlexMono-Medium',
} as const;

// Source map consumed by useFonts() — keep in sync with assets/fonts.
export const fontAssets = {
  'BarlowSemiCondensed-Bold':     require('../assets/fonts/BarlowSemiCondensed-Bold.ttf'),
  'BarlowSemiCondensed-SemiBold': require('../assets/fonts/BarlowSemiCondensed-SemiBold.ttf'),
  'BarlowSemiCondensed-Medium':   require('../assets/fonts/BarlowSemiCondensed-Medium.ttf'),
  'Barlow-Regular':  require('../assets/fonts/Barlow-Regular.ttf'),
  'Barlow-Medium':   require('../assets/fonts/Barlow-Medium.ttf'),
  'Barlow-SemiBold': require('../assets/fonts/Barlow-SemiBold.ttf'),
  'Barlow-Bold':     require('../assets/fonts/Barlow-Bold.ttf'),
  'IBMPlexMono-Regular': require('../assets/fonts/IBMPlexMono-Regular.ttf'),
  'IBMPlexMono-Medium':  require('../assets/fonts/IBMPlexMono-Medium.ttf'),
};
