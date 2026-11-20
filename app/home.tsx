import { router } from "expo-router";
import { useRef, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../src/components/UI";
import { colors } from "../src/theme";

function ActionRow({ icon, title, subtitle, onPress, badge }: {
  icon: keyof typeof Feather.glyphMap; title: string; subtitle: string; onPress: () => void; badge?: string;
}) {
  return (
    <Pressable onPress={onPress} style={styles.actionRow}>
      <View style={styles.rowIcon}><Feather name={icon} size={18} color={colors.teal} /></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSubtitle}>{subtitle}</Text>
      </View>
      {badge ? <Text style={styles.badge}>{badge}</Text> : null}
      <Feather name="chevron-right" size={18} color={colors.muted} />
    </Pressable>
  );
}
export default function HomeScreen() {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [holding, setHolding] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const startHold = () => {
    setHolding(true);
    setConfirmed(false);
    timer.current = setTimeout(() => {
      setHolding(false);
      setConfirmed(true);
      Alert.alert(
        "SOS demo",
        "This is a demo only. No responders were notified. You can continue to add sample emergency details.",
        [{ text: "Continue", onPress: () => router.push("/add-details") }, { text: "Close", style: "cancel" }]
      );
    }, 2000);
  };
  const cancelHold = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setHolding(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>MediPath</Text>
            <Text style={styles.location}>Brgy. San Isidro Labrador 2</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.online}><View style={styles.onlineDot}/><Text style={styles.onlineText}>Online</Text></View>
            <Pressable style={styles.avatar} onPress={() => router.push("/profile")}><Text style={styles.avatarText}>JD</Text></Pressable>
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
          <Text style={styles.sosCaption}>Press and hold to send your location to barangay responders</Text>
        </View>

        <View style={styles.quickCalls}>
          <Pressable style={styles.call911} onPress={() => Alert.alert("Emergency call", "Calling 911 requires device phone permission and will be enabled in a later integration step.")}>
            <Feather name="phone" size={17} color="white"/><Text style={styles.call911Text}>Call 911</Text>
          </Pressable>
          <Pressable style={styles.callBarangay} onPress={() => router.push("/contacts")}>
            <Feather name="phone" size={17} color={colors.teal}/><Text style={styles.callBarangayText}>Call Barangay</Text>
          </Pressable>
        </View>

        <View style={styles.tiles}>
          <Pressable style={styles.tile} onPress={() => router.push("/hospitals")}>
            <View style={styles.tileIcon}><Feather name="plus-square" size={24} color="white"/></View>
            <Text style={styles.tileTitle}>Nearest Hospital</Text>
            <Text style={styles.tileSub}>Works offline</Text>
          </Pressable>
          <Pressable style={styles.tile} onPress={() => router.push("/first-aid")}>
            <View style={styles.tileIcon}><Feather name="heart" size={24} color="white"/></View>
            <Text style={styles.tileTitle}>First Aid Guide</Text>
            <Text style={styles.tileSub}>Step by step</Text>
          </Pressable>
        </View>

        <Card style={styles.more}>
          <ActionRow icon="message-circle" title="Ask the assistant" subtitle="First aid, English or Filipino" badge="Online" onPress={() => router.push("/assistant")} />
          <View style={styles.separator}/>
          <ActionRow icon="phone" title="Contacts" subtitle="911 and barangay" onPress={() => router.push("/contacts")} />
          <View style={styles.separator}/>
          <ActionRow icon="bell" title="Saved Requests" subtitle="Your request history" badge="Demo" onPress={() => router.push("/requests")} />
        </Card>
        {confirmed ? <Text style={styles.demoNote}>Demo interaction only — no responders were notified.</Text> : null}
      </ScrollView>
      <View style={styles.bottomNav}>
        <Pressable onPress={() => router.replace("/home")} style={styles.navItem}><Feather name="home" size={20} color={colors.teal}/><Text style={styles.navActive}>Home</Text></Pressable>
        <Pressable onPress={() => router.push("/hospitals")} style={styles.navItem}><Feather name="map-pin" size={20} color={colors.muted}/><Text style={styles.navText}>Hospitals</Text></Pressable>
        <Pressable onPress={() => router.push("/first-aid")} style={styles.navItem}><Feather name="book-open" size={20} color={colors.muted}/><Text style={styles.navText}>First Aid</Text></Pressable>
        <Pressable onPress={() => router.push("/profile")} style={styles.navItem}><Feather name="user" size={20} color={colors.muted}/><Text style={styles.navText}>Profile</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 16, paddingBottom: 18 },
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
  call911: { flex: 1, backgroundColor: colors.navy, borderRadius: 16, paddingVertical: 15, flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "center" },
  call911Text: { color: "white", fontSize: 15, fontWeight: "700" },
  callBarangay: { flex: 1, backgroundColor: "white", borderColor: colors.teal, borderWidth: 1.5, borderRadius: 16, paddingVertical: 14, flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "center" },
  callBarangayText: { color: colors.teal, fontSize: 15, fontWeight: "700" },
  tiles: { flexDirection: "row", gap: 12, marginBottom: 12 },
  tile: { flex: 1, backgroundColor: "white", borderColor: colors.border, borderWidth: 1, borderRadius: 22, padding: 16, minHeight: 130 },
  tileIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: colors.teal, alignItems: "center", justifyContent: "center", marginBottom: 10 },
  tileTitle: { color: colors.navy, fontWeight: "700", fontSize: 14 },
  tileSub: { color: colors.muted, fontSize: 12, marginTop: 3 },
  more: { paddingVertical: 0, paddingHorizontal: 0, overflow: "hidden", borderRadius: 18 },
  actionRow: { minHeight: 61, flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 14, paddingVertical: 10 },
  rowIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.tealSoft, alignItems: "center", justifyContent: "center" },
  rowTitle: { fontSize: 14, fontWeight: "700", color: colors.navy },
  rowSubtitle: { fontSize: 12, color: colors.muted, marginTop: 2 },
  badge: { backgroundColor: colors.successSoft, color: colors.navy, overflow: "hidden", paddingHorizontal: 9, paddingVertical: 4, borderRadius: 20, fontSize: 11, fontWeight: "700" },
  separator: { height: 1, backgroundColor: colors.border, marginLeft: 62 },
  demoNote: { textAlign: "center", color: colors.warning, fontSize: 11, marginTop: 8 },
  bottomNav: { height: 68, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: "white", flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingBottom: 4 },
  navItem: { alignItems: "center", gap: 3, minWidth: 60 },
  navActive: { fontSize: 10, color: colors.teal, fontWeight: "700" },
  navText: { fontSize: 10, color: colors.muted },
});
