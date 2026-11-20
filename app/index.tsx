import { router } from "expo-router";
import { Alert } from "react-native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, PrimaryButton } from "../src/components/UI";
import { colors } from "../src/theme";

const features = [
  { icon: "wifi-off" as const, title: "Works without internet", text: "Map, hospitals and first aid are saved on your phone" },
  { icon: "map-pin" as const, title: "Nearest hospital + route", text: "Know where to go from where you are" },
  { icon: "bell" as const, title: "Alert barangay responders", text: "Send your location with one hold of the SOS button" },
];

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image
            source={require("../assets/brand/medipath-logo.png")}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="MediPath logo"
          />
          <Text style={styles.brand}>MediPath</Text>
          <Text style={styles.tagline}>Find help fast. Follow the path. Stay calm.</Text>
          <Image
            source={require("../assets/brand/path-motif.png")}
            style={styles.pathMotif}
            resizeMode="contain"
            accessibilityLabel="MediPath path motif"
          />
        </View>
        <View style={styles.features}>
          {features.map((item) => (
            <Card key={item.title} style={styles.feature}>
              <View style={styles.iconBox}><Feather name={item.icon} size={21} color={colors.teal} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureText}>{item.text}</Text>
              </View>
            </Card>
          ))}
        </View>
        <View style={styles.actions}>
          <PrimaryButton title="Get started" tone="red" onPress={() => router.push("/login")} />
          <PrimaryButton title="Download offline map (42 MB)" tone="outline" onPress={() => Alert.alert("Offline map", "Offline map download will be enabled after the map data package is configured.")} />
          <Text style={styles.footnote}>Prototype for Brgy. San Isidro Labrador 2, Dasmariñas City, Cavite</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: 16, paddingBottom: 30, flexGrow: 1, justifyContent: "space-between" },
  hero: { backgroundColor: colors.primary, borderRadius: 32, padding: 24, minHeight: 265, overflow: "hidden" },
  logo: { width: 64, height: 64, marginBottom: 16 },
  brand: { color: "white", fontSize: 38, fontWeight: "800" },
  tagline: { color: "rgba(255,255,255,0.95)", fontSize: 16, lineHeight: 23, marginTop: 10, maxWidth: 270 },
  pathMotif: { position: "absolute", width: 220, height: 150, right: 5, bottom: -40 },
  features: { gap: 12, marginTop: 18 },
  feature: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderRadius: 18 },
  iconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: colors.tealSoft, alignItems: "center", justifyContent: "center" },
  featureTitle: { fontSize: 15, color: colors.navy, fontWeight: "700" },
  featureText: { fontSize: 12, color: colors.muted, marginTop: 3, lineHeight: 17 },
  actions: { gap: 10, marginTop: 20 },
  footnote: { color: colors.muted, textAlign: "center", fontSize: 11, marginTop: 6 },
});
