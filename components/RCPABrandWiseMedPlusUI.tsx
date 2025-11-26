import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function RCPABrandWiseMedPlusUI() {
  const [brands, setBrands] = useState([
    { id: 1, name: "CardioPlus XR", category: "Cardiology", dot: "#2563eb", tag: "#e0edff", count: 0 },
    { id: 2, name: "DiabetCare", category: "Diabetes", dot: "#22c55e", tag: "#e7ffef", count: 0 },
    { id: 3, name: "ImmunoBoost", category: "Immunity", dot: "#a855f7", tag: "#f4e8ff", count: 0 },
    { id: 4, name: "RespiClear", category: "Respiratory", dot: "#06b6d4", tag: "#ddfaff", count: 0 },

    { id: 5, name: "Competitor CardioMax", category: "Cardiology", dot: "#ef4444", tag: "#ffe6e6", count: 0 },
    { id: 6, name: "Competitor DiabetX", category: "Diabetes", dot: "#fb923c", tag: "#fff0df", count: 0 },
    { id: 7, name: "Competitor ImmunoPro", category: "Immunity", dot: "#ec4899", tag: "#ffe6f4", count: 0 },
  ]);

  const increment = (id: number) => {
    setBrands(prev =>
      prev.map(b =>
        b.id === id ? { ...b, count: b.count + 1 } : b
      )
    );
  };

  const decrement = (id: number) => {
    setBrands(prev =>
      prev.map(b =>
        b.id === id && b.count > 0 ? { ...b, count: b.count - 1 } : b
      )
    );
  };

  return (
    <View style={styles.wrapper}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Ionicons name="storefront-outline" size={18} color="#6b7280" />
          <Text style={styles.headerTitle}>MedPlus</Text>
        </View>

        <View style={styles.stockBadge}>
          <View style={styles.yellowDot} />
          <Text style={styles.stockText}>Medium</Text>
          <Ionicons name="chevron-down" size={16} color="#444" />
        </View>
      </View>

      {/* GROUP TITLES + BRAND CARDS */}
      <Text style={styles.groupTitle}>Lupin Brands</Text>

      {brands.slice(0, 4).map(b => renderBrand(b, increment, decrement))}

      <Text style={[styles.groupTitle, { color: "#dc2626" }]}>
        Competitor Brands
      </Text>

      {brands.slice(4).map(b => renderBrand(b, increment, decrement))}

      {/* TOTAL */}
      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Total Prescriptions:</Text>
        <Text style={styles.totalValue}>
          {brands.reduce((sum, b) => sum + b.count, 0)}
        </Text>
      </View>
    </View>
  );
}

function renderBrand(b: { id: any; name: any; category: any; dot: any; tag: any; count: any; }, increment: { (id: number): void; (id: number): void; (arg0: any): void; }, decrement: { (id: number): void; (id: number): void; (arg0: any): void; }) {
  return (
    <View key={b.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.dot, { backgroundColor: b.dot }]} />
        <Text style={styles.brandName}>{b.name}</Text>

        <View style={[styles.categoryTag, { backgroundColor: b.tag }]}>
          <Text style={styles.categoryText}>{b.category}</Text>
        </View>
      </View>

      <View style={styles.counterRow}>
        <Pressable style={styles.counterBtn} onPress={() => decrement(b.id)}>
          <Text style={styles.counterText}>–</Text>
        </Pressable>

        <Text style={styles.counterValue}>{b.count}</Text>

        <Pressable style={styles.counterBtn} onPress={() => increment(b.id)}>
          <Text style={styles.counterText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#f8f0ff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  stockBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  yellowDot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#facc15",
  },
  stockText: { fontSize: 12, fontWeight: "600" },
  groupTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6b7280",
    marginBottom: 10,
    marginTop: 12,
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 20,
  },
  brandName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  categoryTag: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "700",
  },
  counterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  counterBtn: {
    height: 32,
    width: 32,
    borderRadius: 8,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: {
    fontSize: 20,
    fontWeight: "700",
  },
  counterValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  totalBox: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontWeight: "700",
  },
  totalValue: {
    fontWeight: "800",
    color: "#6b46c1",
  },
});
