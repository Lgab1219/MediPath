import { StyleSheet, View, Text, TextInput, Pressable, ScrollView, Switch, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme.ts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';


interface UserInput {
  email: string;
  password: string;
  full_name: string;
  confirm_password: string;
  phone_number: string;
}

interface ApiError {
  error?: string;
}

const API_URL = 'http://192.168.1.11:3000';

function Register() {
  const [input, setInput] = useState<UserInput>({ email: '', password: '', full_name: '', confirm_password: '', phone_number: '' });
  
  const [error, setError] = useState<string>('');

  const navigation = useNavigation();

  const [locationConsent, setLocationConsent] = useState(true);

  async function handleSubmit() {

      if (!locationConsent) {
        setError('You must agree to share your location with barangay responders when sending an emergency request.');
        return;
      }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: input.email, password: input.password, full_name: input.full_name, phone_number: input.phone_number, confirm_password: input.confirm_password }),
      });

      const data = (await response.json().catch(() => null)) as ApiError | null;

      if (!response.ok) {
        throw new Error(data?.error ?? `Request failed (${response.status})`);
      }

      navigation.navigate('Login');
      console.log('Account created successfully!');
    } catch (error) {
      setError((error as Error).message);
    }
  }

    return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <ChevronLeft size={24} color={colors.primary} />
          </Pressable>
          <View style={styles.headerCopy}>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>Takes less than a minute</Text>
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.formContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

            <View style={styles.sectionContainer}>
              <Text style={{ color: '#000' }}>Full Name</Text>
              <TextInput style={styles.inputBar} onChangeText={(text) => setInput({...input, full_name: text})} />
            </View>

            <View style={styles.sectionContainer}>
              <Text style={{ color: '#000' }}>Mobile Number</Text>
              <TextInput style={styles.inputBar} onChangeText={(text) => setInput({...input, phone_number: text})} keyboardType="numeric" />
            </View>

            <View style={styles.sectionContainer}>
              <Text style={{ color: '#000' }}>Email</Text>
              <TextInput style={styles.inputBar} onChangeText={(text) => setInput({...input, email: text})} />
            </View>

            <View style={styles.sectionContainer}>
              <Text style={{ color: '#000' }}>Password</Text>
              <TextInput style={styles.inputBar} secureTextEntry={true} onChangeText={(text) => setInput({...input, password: text})} />
            </View>

            <View style={styles.sectionContainer}>
              <Text style={{ color: '#000' }}>Confirm Password</Text>
              <TextInput style={styles.inputBar} secureTextEntry={true} onChangeText={(text) => setInput({...input, confirm_password: text})} />
            </View>

            <View style={styles.consentRow}>
              <Switch value={locationConsent} onValueChange={setLocationConsent} />
              <Text style={styles.consentText}>
                I agree to share my location with barangay responders when I send an emergency request.
              </Text>
            </View>

            <View>
              <Text style={{ color: '#ff0000' }}>{ error ? error : '' }</Text>
            </View>
        </ScrollView>

        <View style={styles.actionBar}>
          <Pressable
            accessibilityRole="button"
            onPress={handleSubmit}
            style={({ pressed }) => [styles.createButton, pressed && styles.createButtonPressed]}
          >
            <Text style={styles.createButtonText}>Create account</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
    marginVertical: 10,
    padding: 8,
  },

  inputBar: {
    borderWidth: 1,
    borderColor: '#BE6E46',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: '#000000',
  },

  safeArea: { flex: 1, backgroundColor: colors.bg },
  keyboardView: { flex: 1 },
  header: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: { opacity: 0.75 },
  headerCopy: { flex: 1, gap: 2 },
  title: { color: colors.navy, fontSize: 22, fontWeight: "800", lineHeight: 27 },
  subtitle: { color: colors.muted, fontSize: 13, lineHeight: 17 },
  scroll: { flex: 1 },
  formContent: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 18, gap: 12 },
  field: { width: "100%", gap: 6 },
  label: { color: colors.muted, fontSize: 13, fontWeight: "600", lineHeight: 17 },
  inputShell: {
    minHeight: 48,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  input: { flex: 1, minWidth: 0, paddingVertical: 11, color: colors.navy, fontSize: 15 },
  consentRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: { backgroundColor: colors.teal, borderColor: colors.teal },
  consentText: { flex: 1, color: colors.muted, fontSize: 12, lineHeight: 17 },
  actionBar: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
    marginBottom: 40,
  },
  createButton: {
    minHeight: 54,
    width: "100%",
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonPressed: { opacity: 0.85 },
  createButtonText: { color: colors.surface, fontSize: 16, fontWeight: "600" },
  loginRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, minHeight: 24 },
  loginPrompt: { color: colors.muted, fontSize: 14 },
  loginLink: { color: colors.teal, fontSize: 14, fontWeight: "600" },
});

export default Register;