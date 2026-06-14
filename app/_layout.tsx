// app/_layout.tsx
import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { onAuthRequired } from '../services/api';
import { fontAssets } from '../constants/fonts';

export default function RootLayout() {
  const router = useRouter();
  const [fontsLoaded] = useFonts(fontAssets);

  useEffect(() => {
    const unsubscribe = onAuthRequired(() => {
      router.replace('/(auth)/login');
    });
    return () => {
      unsubscribe();
    };
  }, [router]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="result/[id]" />
        <Stack.Screen name="history/index" />
        <Stack.Screen name="learn/[slug]" />
      </Stack>
    </SafeAreaProvider>
  );
}
