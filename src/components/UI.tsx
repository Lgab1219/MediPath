import { PropsWithChildren } from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors, radius } from "../theme";

export function Page({ children }: PropsWithChildren) {
  return <View style={styles.page}>{children}</View>;
}
export function Heading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.heading}>
      <Text style={styles.title}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}
export function PrimaryButton({ title, onPress, tone = "teal" }: {
  title: string; onPress: () => void; tone?: "teal" | "red" | "outline";
}) {
  return (
    <Pressable onPress={onPress} style={[
      styles.button,
      tone === "red" ? styles.redButton : tone === "outline" ? styles.outlineButton : styles.tealButton
    ]}>
      <Text style={[
        styles.buttonText,
        tone === "outline" ? { color: colors.navy } : null
      ]}>{title}</Text>
    </Pressable>
  );
}
export function Card({ children, style }: PropsWithChildren<{style?: ViewStyle}>) {
  return <View style={[styles.card, style]}>{children}</View>;
}
export function SmallLabel({ children }: PropsWithChildren) {
  return <Text style={styles.smallLabel}>{children}</Text>;
}
const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.bg },
  heading: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 14 },
  title: { color: colors.navy, fontSize: 24, fontWeight: "800" },
  subtitle: { color: colors.muted, fontSize: 13, marginTop: 3 },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radius.card, padding: 16 },
  button: { height: 54, borderRadius: radius.button, alignItems: "center", justifyContent: "center", paddingHorizontal: 16 },
  tealButton: { backgroundColor: colors.teal },
  redButton: { backgroundColor: colors.primary },
  outlineButton: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  buttonText: { color: colors.surface, fontWeight: "700", fontSize: 16 },
  smallLabel: { color: colors.muted, fontSize: 12 },
});
