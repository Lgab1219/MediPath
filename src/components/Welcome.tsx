
import React from 'react';
import { WifiOff, MapPin, ShieldAlert } from 'lucide-react-native';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';

const features = [
  {
    icon: WifiOff,
    title: 'Works without internet',
    description: 'Map, hospitals and first aid are saved on your phone.',
  },
  {
    icon: MapPin,
    title: 'Nearest hospital + route',
    description: 'Know where to go from where you are.',
  },
  {
    icon: ShieldAlert,
    title: 'Alert barangay responders',
    description: 'Send your location with one hold of the SOS button.',
  },
];

export default function Welcome() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <Image
          source={require('../../assets/brand/medipath-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.brand}>MediPath</Text>
        <Text style={styles.tagline}>
          Find help fast. Follow the path. Stay calm.
        </Text>

        <Image
          source={require('../../assets/brand/path-motif.png')}
          style={styles.pathMotif}
          resizeMode="contain"
        />
      </View>

      <View style={styles.features}>
        {features.map((feature) => (
          <View key={feature.title} style={styles.featureCard}>
            <View style={styles.iconBox}>
              <feature.icon
                size={24}
                color={colors.teal}
                strokeWidth={2}
              />
            </View>

            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>
                {feature.description}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.primaryButtonText}>Get started</Text>
        </Pressable>

        <Text style={styles.footnote}>
          Prototype for Brgy. San Isidro Labrador 2, Dasmariñas City, Cavite
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 30,
  },
  hero: {
    minHeight: 265,
    backgroundColor: colors.primary,
    borderRadius: 32,
    padding: 24,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 16,
  },
  brand: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '700',
  },
  tagline: {
    color: '#FFFFFF',
    opacity: 0.9,
    fontSize: 16,
    lineHeight: 23,
    marginTop: 10,
    maxWidth: 270,
  },
  pathMotif: {
    position: 'absolute',
    width: 220,
    height: 150,
    right: 5,
    bottom: -40,
    opacity: 0.9,
  },
  features: {
    gap: 12,
    marginTop: 18,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 18,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.tealSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: '700',
  },
  featureDescription: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 3,
  },
  actions: {
    gap: 10,
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  footnote: {
    color: colors.muted,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8,
  },
});
