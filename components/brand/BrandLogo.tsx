import { Image, ImageStyle, StyleProp } from 'react-native';

// Intrinsic aspect ratios of the trimmed brand assets (width / height).
const WORDMARK_RATIO = 1036 / 390; // ≈ 2.656
const ICON_RATIO = 302 / 295;      // ≈ 1.024

const SOURCES = {
  wordmark:      require('../../assets/brand/logo-wordmark.png'),
  wordmarkWhite: require('../../assets/brand/logo-wordmark-white.png'),
  icon:          require('../../assets/brand/logo-icon.png'),
  iconWhite:     require('../../assets/brand/logo-icon-white.png'),
};

type Props = {
  /** Full "Check-IA" lockup, or just the shield mark. */
  variant?: 'wordmark' | 'icon';
  /** Use the reversed (white) asset for navy / dark surfaces. */
  white?: boolean;
  /** Rendered height in px; width derives from the asset ratio. */
  height?: number;
  style?: StyleProp<ImageStyle>;
};

/**
 * The Check-IA brand mark. Renders the official shield + wordmark assets at a
 * fixed height, deriving width from the artwork's intrinsic ratio so it never
 * distorts.
 */
export function BrandLogo({ variant = 'wordmark', white = false, height = 28, style }: Props) {
  const ratio = variant === 'wordmark' ? WORDMARK_RATIO : ICON_RATIO;
  const source =
    variant === 'wordmark'
      ? white ? SOURCES.wordmarkWhite : SOURCES.wordmark
      : white ? SOURCES.iconWhite : SOURCES.icon;

  return (
    <Image
      source={source}
      resizeMode="contain"
      style={[{ height, width: height * ratio }, style]}
      accessibilityRole="image"
      accessibilityLabel="Check-IA"
    />
  );
}
