import { StyleSheet, View, ScrollView, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import Register from './src/components/Register';

function App() {
 
  return (
    <ScrollView style={styles.appContainer}>
      <Register />
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
});

export default App;
