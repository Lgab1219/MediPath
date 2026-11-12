import { StyleSheet, View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { Link } from '@react-navigation/native';

function Login() {
    return (
        <ScrollView style={styles.appContainer}>
            <View style={styles.sectionContainer}>
              <Text style={{ color: '#000', fontWeight: 700, fontSize: 24 }}>Welcome back!</Text>
              <Text style={{ color: '#00000060' }}>Login to use MediPath</Text>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={{ color: '#000' }}>Email</Text>
              <TextInput style={styles.inputBar} />
            </View>

            <View style={styles.sectionContainer}>
              <Text style={{ color: '#000' }}>Password</Text>
              <TextInput style={styles.inputBar} secureTextEntry={true} />
            </View>

            <View style={styles.sectionContainer}>
              <Pressable style={({ pressed }) => [styles.submitBtn, pressed && styles.pressedBtn]} onPress={() => {}}>
                <Text style={{ color: '#ffffff' }}>
                  Login
                </Text>
              </Pressable>
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