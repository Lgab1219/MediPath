import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import type { StaticScreenProps } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';
import { ChevronLeft } from 'lucide-react-native';

type Props = StaticScreenProps<{ full_name: string }>;

function Profile({ route }: Props) {

    const navigation = useNavigation();

    return (
        <ScrollView style={styles.appContainer}>
        <View style={styles.sectionContainer}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <ChevronLeft size={24} color={colors.primary} />
          </Pressable>
        </View>

            <View style={styles.sectionContainer}>
              <Text>Welcome, {route.params?.full_name}!</Text>
            </View>

            <View style={styles.sectionContainer}>
              <Pressable style={({ pressed }) => [styles.submitBtn, pressed && styles.pressedBtn]} onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: '#ffffff' }}>
                  Logout
                </Text>
              </Pressable>
            </View>
        </ScrollView>
    )
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
    backgroundColor: '#a5231a',
    borderColor: '#D92D20',
    borderWidth: 1,
  },

  submitBtn: {
    flex: 1,
    width: '100%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#D92D20',
    alignItems: 'center',
    marginBottom: 10,
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
  
    pressed: { 
        opacity: 0.75 ,
  },

});

export default Profile;