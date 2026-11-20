import { StyleSheet, View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { Link } from '@react-navigation/native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

interface UserInput {
  email: string;
  password: string;
  full_name?: string;
}

interface ApiError {
  error?: string;
}

// NOTE: Change the API_URL to your local machine's IP address and port where the backend server is running.
const API_URL = 'http://192.168.1.11:3000';

function Login() {

  const [input, setInput] = useState<UserInput>({ email: '', password: '' });

  const [error, setError] = useState<string>('');

  const navigation = useNavigation();

  async function handleSubmit() {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: input.email, password: input.password }),
      });

      const data = await response.json().catch(() => null) as (ApiError & UserInput) | null;

      if (!response.ok) {
        throw new Error(data?.error ?? `Request failed (${response.status})`);
      }

      navigation.navigate('Home', { full_name: data?.full_name as string });

    } catch (error) {
      setError((error as Error).message);
      // console.error('Error during login:', error);
    }
  }

    return (
        <ScrollView style={styles.appContainer}>
            <View style={styles.sectionContainer}>
              <Text style={{ color: '#000', fontWeight: 700, fontSize: 24 }}>Welcome back!</Text>
              <Text style={{ color: '#00000060' }}>Login to use MediPath</Text>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={{ color: '#000' }}>Email</Text>
              <TextInput style={styles.inputBar} onChangeText={(text) => setInput({ ...input, email: text })} />
            </View>

            <View style={styles.sectionContainer}>
              <Text style={{ color: '#000' }}>Password</Text>
              <TextInput style={styles.inputBar} secureTextEntry={true} onChangeText={(text) => setInput({ ...input, password: text })} />
            </View>

            <View style={styles.sectionContainer}>
              <Pressable style={({ pressed }) => [styles.submitBtn, pressed && styles.pressedBtn]} onPress={handleSubmit}>
                <Text style={{ color: '#ffffff' }}>
                  Login
                </Text>
              </Pressable>
              <Text style={{ color: '#ff0000' }}>{ error ? error : '' }</Text>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={{ color: '#000' }}>New to MediPath? <Link screen='Register'>Create account</Link> </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

  appContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 24,
    textAlign: 'center',
  },

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

  pressedBtn: {
    backgroundColor: '#ffffff36',
    borderColor: '#BE6E46',
    borderWidth: 1,
  },

  submitBtn: {
    flex: 1,
    width: '100%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#BE6E46',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default Login;