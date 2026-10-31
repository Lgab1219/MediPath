import { StyleSheet, View, ScrollView, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react';

interface UserInput {
  email: string;
  password: string;
  full_name: string;
}

interface ApiError {
  error?: string;
}

const API_URL = 'http://192.168.1.11:3000';

function App() {

  const [input, setInput] = useState<UserInput>({ email: '', password: '', full_name: '' });

  async function handleSubmit() {

    try {
      const response = await fetch(`${API_URL}/accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: input.email, password: input.password, full_name: input.full_name }),
      });

      const data = (await response.json().catch(() => null)) as ApiError | null;

      if (!response.ok) {
        throw new Error(data?.error ?? `Request failed (${response.status})`);
      }
      console.log('Account created successfully:', data);
    } catch (error) {
      console.error('Error creating account:', error);
    }

    console.log("Input submitted!");
  }
 
  return (
    <ScrollView style={styles.appContainer}>
      <View style={styles.sectionContainer}>
        <Text style={{ color: '#000' }}>Full Name</Text>
        <TextInput style={styles.inputBar} onChangeText={(text) => setInput({...input, full_name: text})} />
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
        <Pressable style={({ pressed }) => [styles.submitBtn, pressed && styles.pressedBtn]} onPress={handleSubmit}>
          <Text style={{ color: '#ffffff' }}>
            Submit
          </Text>
        </Pressable>
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

export default App;
