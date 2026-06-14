// app/(tabs)/verify.tsx
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AnalyzingScreen from '../../components/verify/AnalyzingScreen';
import VerifyImageTab from '../../components/verify/VerifyImageTab';
import VerifyNavbar from '../../components/verify/VerifyNavbar';
import VerifyTabs from '../../components/verify/VerifyTabs';
import VerifyTextTab from '../../components/verify/VerifyTextTab';
import { Button } from '../../components/ui/Button';
import { Alert as InlineAlert } from '../../components/ui/Alert';
import { useVerify } from '../../hooks/useVerify';
import { s } from '../../styles/verify.styles';
import { P } from '../../constants/colors';

export default function Verify() {
  const router = useRouter();
  const vm = useVerify(router);

  return (
    <View style={{ flex: 1, backgroundColor: P.bg }}>
      <StatusBar barStyle="dark-content" backgroundColor={P.bg} />

      {vm.loading ? (
        <AnalyzingScreen
          step={vm.step}
          onClose={() => {
            vm.setLoading(false);
            vm.setStep(0);
          }}
        />
      ) : (
        <SafeAreaView style={s.safe} edges={['top']}>
          <ScrollView
            style={s.screen}
            contentContainerStyle={[s.content, { paddingBottom: 120 }]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <VerifyNavbar onBack={() => router.back()} />
            <Text style={s.pageTitle}>
              Que <Text style={s.pageTitleItalic}>vérifions</Text>-nous ?
            </Text>

            <VerifyTabs tab={vm.tab} onChange={vm.setTab} />

            {vm.tab === 'Texte' && (
              <VerifyTextTab
                texte={vm.texte}
                setTexte={vm.setTexte}
                source={vm.source}
                setSource={vm.setSource}
              />
            )}

            {vm.tab === 'Image' && (
              <VerifyImageTab
                imageUri={vm.imageUri}
                imageMode={vm.imageMode}
                imageClaim={vm.imageClaim}
                onPickImage={vm.pickImage}
                onClearImage={vm.clearImage}
                onSelectMode={vm.setImageMode}
                onChangeClaim={vm.setImageClaim}
              />
            )}

            {!!vm.error && (
              <View style={{ marginBottom: 12 }}>
                <InlineAlert tone="danger">{vm.error}</InlineAlert>
              </View>
            )}

            <Button
              label={vm.ctaLabel()}
              onPress={vm.handleAnalyze}
              variant="accent"
              size="lg"
              fullWidth
              disabled={!vm.canAnalyze()}
              iconRight={<Ionicons name="arrow-forward" size={18} color={P.white} />}
            />
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
}
