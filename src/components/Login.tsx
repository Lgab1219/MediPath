
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { colors } from '../theme';
import React, { useState } from 'react';

interface UserInput {
  email: string;
  password: string;
  full_name?: string;
}

interface ApiError {
  error?: string;
}

const API_URL = 'http://192.168.1.11:3000';

function Login() {
  const [input, setInput] = useState<UserInput>({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<any>();

  async function handleSubmit() {
    setError('');

    if (!input.email.trim() || !input.password) {
      setError('Please enter your email and password.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: input.email.trim(),
          password: input.password,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | (ApiError & UserInput)
        | null;

      if (!response.ok) {
        throw new Error(
          data?.error ?? `Request failed (${response.status})`,
        );
      }

      navigation.navigate('Home', {
        full_name: data?.full_name ?? '',
      });
    } catch (error) {
      setError(
        (error as Error).message || 'Unable to log in. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <ArrowLeft size={21} color={colors.navy} />
        </Pressable>

        <Image
          source={require('../../assets/brand/medipath-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Sign in to your MediPath account
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Email address</Text>
          <TextInput
            value={input.email}
            onChangeText={(text) =>
              setInput({ ...input, email: text })
            }
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="you@example.com"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={input.password}
            onChangeText={(text) =>
              setInput({ ...input, password: text })
            }
            secureTextEntry
            autoCapitalize="none"
            placeholder="Enter your password"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
        </View>

        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : null}

        <Pressable
          style={({ pressed }) => [
            styles.submitButton,
            pressed && styles.pressedButton,
            loading && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.submitText}>Sign in</Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.link}>
            Don't have an account? Create one
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            navigation.navigate('Home', { full_name: 'Guest' })
          }
        >
          <Text style={styles.guest}>Continue as guest</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 30,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DCE3E8',
  },
  logo: {
    width: 62,
    height: 62,
    marginTop: 32,
    marginBottom: 0,
  },
  title: {
    fontSize: 27,
    fontWeight: '900',
    color: colors.navy,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 4,
    marginBottom: 24,
  },
  field: {
    gap: 7,
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.navy,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE3E8',
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: colors.navy,
  },
  error: {
    color: '#D92D20',
    fontSize: 12,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    marginTop: 8,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  pressedButton: {
    opacity: 0.8,
  },
  disabledButton: {
    opacity: 0.7,
  },
  link: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: colors.teal,
    padding: 12,
    marginTop: 12,
  },
  guest: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.muted,
    padding: 8,
  },
});

export default Login;
