import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StaticScreenProps } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { colors } from '../theme.ts';
import { Phone, Hospital, Heart } from 'lucide-react-native';

type Props = StaticScreenProps<{ full_name: string }>;
// type IconName = React.ComponentProps<typeof Feather>["name"];

function Home({ route }: Props) {

  const navigation = useNavigation();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [holding, setHolding] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  function startHold() {
    setHolding(true);
    setConfirmed(false);
    timer.current = setTimeout(() => {
      setHolding(false);
      setConfirmed(true);
      Alert.alert(
        "SOS Demo",
        "This is a demo only. No responders were notified. You can continue to add sample emergency details.",
        [
          { text: "Continue", onPress: () => {} },
          { text: "Close", style: "cancel" },
        ]
      );
    }, 2000);
  };

  function cancelHold() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setHolding(false);
  }

    return (
        <ScrollView style={styles.appContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>MediPath</Text>
            <Text style={styles.location}>Brgy. San Isidro Labrador 2</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.online}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Online</Text>
            </View>
            <Pressable style={styles.avatar} onPress={() => navigation.navigate("Profile", { full_name: route.params?.full_name as string })}>
              <Text style={styles.avatarText}>JD</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.sosCard}>
          <Pressable
            onPressIn={startHold}
            onPressOut={cancelHold}
            style={[styles.sosRing, holding && styles.sosRingActive]}
            accessibilityRole="button"
            accessibilityLabel="Press and hold SOS for two seconds"
          >
            <View style={styles.sosInner}>
              <Text style={styles.sosText}>SOS</Text>
              <Text style={styles.sosHint}>{holding ? "Keep holding..." : "Hold 2 seconds"}</Text>
            </View>
          </Pressable>
          <Text style={styles.sosCaption}>
            Press and hold to send your location to barangay responders
          </Text>
        </View>

        <View style={styles.quickCalls}>
          <Pressable
            style={styles.call911}
            onPress={() =>
              Alert.alert(
                "Emergency call",
                "Calling 911 requires device phone permission and will be enabled in a later integration step."
              )
            }
          >
            <Phone color="#FFFFFF" size={17} />
            <Text style={styles.call911Text}>Call 911</Text>
          </Pressable>
          <Pressable style={styles.callBarangay} onPress={() => {}}>
            <Phone color="#0A7476" size={17} />
            <Text style={styles.callBarangayText}>Call Barangay</Text>
          </Pressable>
        </View>

        <View style={styles.tiles}>
          <Pressable style={styles.tile} onPress={() => {}}>
            <View style={styles.tileIcon}>
              <Hospital color="#FFFFFF" size={24} />
            </View>
            <Text style={styles.tileTitle}>Nearest Hospital</Text>
            <Text style={styles.tileSub}>Works offline</Text>
          </Pressable>
          <Pressable style={styles.tile} onPress={() => {}}>
            <View style={styles.tileIcon}>
              <Heart color="#FFFFFF" size={24} />
            </View>
            <Text style={styles.tileTitle}>First Aid Guide</Text>
            <Text style={styles.tileSub}>Step by step</Text>
          </Pressable>
        </View>
        
        </ScrollView>
    );
}


const styles = StyleSheet.create({

  header: { minHeight: 64, paddingHorizontal: 4, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  brand: { fontSize: 24, fontWeight: "800", color: colors.navy },
  location: { fontSize: 12, color: colors.muted, marginTop: 2 },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  online: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.successSoft, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 99 },
  onlineDot: { width: 7, height: 7, borderRadius: 5, backgroundColor: "#16A34A" },
  onlineText: { fontSize: 12, fontWeight: "700", color: colors.navy },
  avatar: { width: 42, height: 42, borderRadius: 99, backgroundColor: colors.teal, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "white", fontWeight: "700" },
  sosCard: { backgroundColor: colors.primary, borderRadius: 28, padding: 14, alignItems: "center", marginTop: 6, marginBottom: 12 },
  sosRing: { width: 128, height: 128, borderRadius: 100, backgroundColor: "rgba(255,255,255,0.18)", alignItems: "center", justifyContent: "center" },
  sosRingActive: { backgroundColor: "rgba(255,255,255,0.35)", transform: [{ scale: 0.97 }] },
  sosInner: { width: 100, height: 100, borderRadius: 100, backgroundColor: "white", alignItems: "center", justifyContent: "center", elevation: 5 },
  sosText: { fontSize: 30, fontWeight: "900", color: colors.primary },
  sosHint: { fontSize: 11, fontWeight: "600", color: colors.navy, marginTop: 1 },
  sosCaption: { color: "white", textAlign: "center", fontSize: 13, lineHeight: 18, marginTop: 10, paddingHorizontal: 6 },
  quickCalls: { flexDirection: "row", gap: 12, marginBottom: 12 },
  call911: { backgroundColor: colors.navy, borderRadius: 16, paddingInline: 30, paddingVertical: 15, flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "center" },
  call911Text: { color: "white", fontSize: 15, fontWeight: "700" },
  callBarangay: { backgroundColor: "white", borderColor: colors.teal, borderWidth: 1.5, borderRadius: 16, paddingInline: 30, paddingVertical: 15, flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "center" },
  callBarangayText: { color: colors.teal, fontSize: 15, fontWeight: "700" },
  tiles: { flexDirection: "row", gap: 12, marginBottom: 12 },
  tile: { flex: 1, backgroundColor: "white", borderColor: colors.border, borderWidth: 1, borderRadius: 22, padding: 16, minHeight: 130 },
  tileIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: colors.teal, alignItems: "center", justifyContent: "center", marginBottom: 10 },
  tileTitle: { color: colors.navy, fontWeight: "700", fontSize: 14 },
  tileSub: { color: colors.muted, fontSize: 12, marginTop: 3 },


  appContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 24,
    textAlign: 'center',
  },

});

export default Home;