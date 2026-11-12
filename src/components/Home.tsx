import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Home() {

  const navigation = useNavigation();

    return (
        <ScrollView style={styles.appContainer}>
            <View style={styles.sectionContainer}>
              <Text>Home Screen</Text>
            </View>

            <View style={styles.sectionContainer}>
              <Pressable style={({ pressed }) => [styles.submitBtn, pressed && styles.pressedBtn]} onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: '#ffffff' }}>
                  Logout
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

export default Home;