import React from 'react';
import { Modal, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { P } from '../../constants/colors';

type Props = {
  visible: boolean;
  message?: string;
};

export default function VerifyLoadingModal({
  visible,
  message = 'Vérification en cours… nous consultons des sources fiables.',
}: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color={P.accent} />
          <Text style={styles.text}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(14,16,32,0.45)', justifyContent: 'center', alignItems: 'center', padding: 32 },
  content: { backgroundColor: 'white', padding: 30, borderRadius: 20, alignItems: 'center', gap: 15 },
  text: { fontSize: 15, color: P.text, fontFamily: 'Barlow-Medium', textAlign: 'center', lineHeight: 21 }
});
