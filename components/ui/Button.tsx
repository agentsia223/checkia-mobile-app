import {
  TouchableOpacity, Text, StyleSheet,
  ActivityIndicator, View,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

type Variant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

type Props = {
  label:      string;
  onPress:    () => void;
  variant?:   Variant;
  size?:      Size;
  loading?:   boolean;
  disabled?:  boolean;
  fullWidth?: boolean;
  icon?:      React.ReactNode;
  iconRight?: React.ReactNode;
};

// Heights respect the 48px accessibility hit-target floor at md/lg.
const SIZES: Record<Size, { height: number; fontSize: number; padH: number }> = {
  sm: { height: 44, fontSize: 14, padH: 18 },
  md: { height: 52, fontSize: 16, padH: 24 },
  lg: { height: 56, fontSize: 17, padH: 28 },
};

export function Button({
  label, onPress, variant = 'primary', size = 'md',
  loading, disabled, fullWidth, icon, iconRight,
}: Props) {
  const filled = variant === 'primary' || variant === 'accent' || variant === 'danger';

  const bg =
    variant === 'primary'   ? Colors.accent :
    variant === 'accent'    ? Colors.green  :
    variant === 'danger'    ? Colors.false  :
    variant === 'secondary' ? Colors.inputBg :
    'transparent';

  const tc =
    filled ? Colors.white :
    Colors.accent;

  const border =
    variant === 'secondary' ? Colors.rule :
    variant === 'ghost'     ? Colors.accent :
    undefined;

  const sz = SIZES[size];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!isDisabled, busy: !!loading }}
      style={[
        styles.btn,
        filled && styles.filledShadow,
        {
          height: sz.height,
          paddingHorizontal: sz.padH,
          backgroundColor: bg,
          width: fullWidth ? '100%' : 'auto',
          borderWidth:  border ? 1.5 : 0,
          borderColor:  border,
          opacity: isDisabled ? 0.5 : 1,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={tc} />
      ) : (
        <View style={styles.inner}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={[styles.label, { color: tc, fontSize: sz.fontSize }]}>{label}</Text>
          {iconRight && <View style={styles.icon}>{iconRight}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius:    14,
    alignItems:      'center',
    justifyContent:  'center',
  },
  filledShadow: {
    shadowColor: '#131941',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  inner: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           10,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight:    '600',
    letterSpacing: 0.2,
    fontFamily:    Fonts.bodySemibold,
  },
});
