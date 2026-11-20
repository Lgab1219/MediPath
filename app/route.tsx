import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryButton, Card } from "../src/components/UI";
import { demoHospitals } from "../src/data/demo";
import { colors } from "../src/theme";

export default function RouteScreen() {
  const { hospitalId } = useLocalSearchParams<{hospitalId?: string}>();
  const hospital = demoHospitals.find(h => h.id === hospitalId) ?? demoHospitals[1];
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.map}>
        <View style={styles.streetOne}/><View style={styles.streetTwo}/><View style={styles.routeLine}/>
        <Pressable style={styles.back} onPress={() => router.back()}><Feather name="arrow-left" size={20} color={colors.navy}/></Pressable>
        <View style={styles.mapLabel}><Text style={styles.mapLabelText}>{hospital.name}</Text></View>
        <View style={styles.userMarker}><Feather name="navigation" size={14} color="white"/></View>
        <View style={styles.destination}><Feather name="plus" size={18} color="white"/></View>
        <Text style={styles.mapDisclaimer}>Map illustration only · no live route data</Text>
      </View>
      <ScrollView style={styles.sheet} contentContainerStyle={{paddingBottom: 24}}>
        <View style={styles.handle}/>
        <Text style={styles.hospital}>{hospital.name}</Text>
        <Text style={styles.address}>{hospital.address}</Text>
        <Card style={styles.routeInfo}>
          <Text style={styles.routeInfoTitle}>Route information unavailable</Text>
          <Text style={styles.routeInfoText}>Connect Mapbox Directions and provide a verified starting location to calculate distance, travel time and traffic.</Text>
        </Card>
        <PrimaryButton title="Mapbox integration needed" onPress={() => Alert.alert("Not connected yet", "Live navigation will be enabled after adding the Mapbox token and location permissions.")}/>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  map: { height: "48%", backgroundColor: "#E8E4D8", position: "relative", overflow: "hidden" },
  streetOne: { position: "absolute", height: 24, width: "130%", backgroundColor: "#F8F6F0", top: "42%", left: "-10%", transform: [{rotate: "-20deg"}] },
  streetTwo: { position: "absolute", height: 18, width: "130%", backgroundColor: "#F8F6F0", top: "20%", left: "-5%", transform: [{rotate: "30deg"}] },
  routeLine: { position: "absolute", width: 5, height: "48%", backgroundColor: colors.teal, top: "25%", left: "49%", transform: [{rotate: "18deg"}], borderRadius: 4 },
  back: { position: "absolute", top: 12, left: 16, width: 44, height: 44, borderRadius: 30, backgroundColor: "white", alignItems: "center", justifyContent: "center" },
  mapLabel: { position: "absolute", top: 72, right: 14, backgroundColor: "white", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6, maxWidth: "68%" },
  mapLabelText: { color: colors.navy, fontSize: 11, fontWeight: "700" },
  userMarker: { position: "absolute", left: "25%", top: "68%", width: 30, height: 30, borderRadius: 18, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: "white" },
  destination: { position: "absolute", left: "68%", top: "28%", width: 32, height: 32, borderRadius: 18, backgroundColor: colors.teal, alignItems: "center", justifyContent: "center" },
  mapDisclaimer: { position: "absolute", bottom: 10, left: 12, backgroundColor: "rgba(255,255,255,0.85)", padding: 6, borderRadius: 6, color: colors.navy, fontSize: 10 },
  sheet: { flex: 1, backgroundColor: "white", borderTopLeftRadius: 28, borderTopRightRadius: 28, marginTop: -20, paddingHorizontal: 20, paddingTop: 14 },
  handle: { width: 40, height: 4, borderRadius: 3, backgroundColor: colors.border, alignSelf: "center", marginBottom: 18 },
  hospital: { fontSize: 18, fontWeight: "800", color: colors.navy },
  address: { fontSize: 12, color: colors.muted, marginTop: 5 },
  routeInfo: { marginTop: 18, marginBottom: 18, backgroundColor: colors.tealSoft, borderColor: colors.teal, borderWidth: 1 },
  routeInfoTitle: { fontWeight: "700", color: colors.navy, fontSize: 14 },
  routeInfoText: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 6 },
});
