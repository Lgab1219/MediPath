import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../src/theme";

const inputFields = [
  { key: "name", label: "Full name", placeholder: "Juan Dela Cruz", icon: "user" as const },
  { key: "phone", label: "Mobile number", placeholder: "09XX XXX XXXX", icon: "phone" as const },
  { key: "email", label: "Email", placeholder: "name@email.com", icon: "mail" as const },
  { key: "password", label: "Password", placeholder: "Create a password", icon: "lock" as const },
  { key: "confirmPassword", label: "Confirm password", placeholder: "Re-enter your password", icon: "lock" as const },
] as const;

type FieldKey = (typeof inputFields)[number]["key"];
type FormValues = Record<FieldKey, string>;

export default function Register() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [locationConsent, setLocationConsent] = useState(true);

  const updateField = (key: FieldKey, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleCreateAccount = () => {
    const name = values.name.trim();
    const phoneDigits = values.phone.replace(/\D/g, "");
    const email = values.email.trim();

    if (!name || !values.phone.trim() || !email || !values.password || !values.confirmPassword) {
      Alert.alert("Missing information", "Please complete all fields to continue.");
      return;
    }
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      Alert.alert("Check your mobile number", "Enter a valid mobile number, including its country code if needed.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }
    if (values.password.length < 8) {
      Alert.alert("Password too short", "Your password must contain at least 8 characters.");
      return;
    }
    if (values.password !== values.confirmPassword) {
      Alert.alert("Passwords do not match", "Please make sure both password fields match.");
      return;
    }
    if (!locationConsent) {
      Alert.alert("Consent required", "Please review and accept the location-sharing consent to continue.");
      return;
    }

    // The current project does not yet have a registration/profile workflow wired to Supabase Auth.
    Alert.alert(
      "Registration not connected yet",
      "Your information passed the form checks. Account creation will be enabled once the MediPath registration and profile setup are connected to Supabase.",
    );
  };

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
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <Feather name="chevron-left" size={23} color={colors.navy} />
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
          {inputFields.map((field) => {
            const isPassword = field.key === "password" || field.key === "confirmPassword";
            const isConfirmPassword = field.key === "confirmPassword";
            return (
              <View key={field.key} style={styles.field}>
                <Text style={styles.label}>{field.label}</Text>
                <View style={styles.inputShell}>
                  <Feather name={field.icon} size={18} color={colors.muted} />
                  <TextInput
                    accessibilityLabel={field.label}
                    value={values[field.key]}
                    onChangeText={(value) => updateField(field.key, value)}
                    placeholder={field.placeholder}
                    placeholderTextColor={colors.muted}
                    style={styles.input}
                    autoCapitalize={field.key === "email" ? "none" : field.key === "name" ? "words" : "none"}
                    autoCorrect={field.key === "name"}
                    keyboardType={field.key === "phone" ? "phone-pad" : field.key === "email" ? "email-address" : "default"}
                    secureTextEntry={isPassword}
                    textContentType={isPassword || isConfirmPassword ? "newPassword" : field.key === "email" ? "emailAddress" : field.key === "phone" ? "telephoneNumber" : "name"}
                    maxLength={field.key === "phone" ? 16 : undefined}
                    returnKeyType={isConfirmPassword ? "done" : "next"}
                  />
                </View>
              </View>
            );
          })}

          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: locationConsent }}
            onPress={() => setLocationConsent((checked) => !checked)}
            style={styles.consentRow}
          >
            <View style={[styles.checkbox, locationConsent && styles.checkboxChecked]}>
              {locationConsent ? <Feather name="check" size={15} color={colors.surface} /> : null}
            </View>
            <Text style={styles.consentText}>
              I agree to share my location with barangay responders when I send an emergency request.
            </Text>
          </Pressable>
        </ScrollView>

        <View style={styles.actionBar}>
          <Pressable
            accessibilityRole="button"
            onPress={handleCreateAccount}
            style={({ pressed }) => [styles.createButton, pressed && styles.createButtonPressed]}
          >
            <Text style={styles.createButtonText}>Create account</Text>
          </Pressable>
          <View style={styles.loginRow}>
            <Text style={styles.loginPrompt}>Already have an account?</Text>
            <Pressable onPress={() => router.replace("/login")} hitSlop={6}>
              <Text style={styles.loginLink}>Log in</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  consentRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, paddingTop: 2, paddingBottom: 4 },
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
    gap: 12,
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
