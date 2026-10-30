import { StyleSheet, View, ScrollView, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react';

interface UserInput {
  email: string;
  password: string;
}

function App() {

  const [input, setInput] = useState<UserInput>({ email: '', password: '' });

  function handleSubmit() {
    console.log('Email:', input.email);
    console.log('Password:', input.password);
  }
 
  return (
    <ScrollView style={styles.appContainer}>
      <View style={styles.sectionContainer}>
        <Text>{input.email ? input.email : null}</Text>
        <Text>{input.password ? input.password : null}</Text>
        <Text style={{ color: '#ffffff' }}>Email</Text>
        <TextInput style={styles.inputBar} onChangeText={(text) => setInput({...input, email: text})} />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={{ color: '#ffffff' }}>Password</Text>
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
