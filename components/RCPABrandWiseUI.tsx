import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function RCPABrandWiseUI() {
    const [brands, setBrands] = React.useState([
        { id: 1, name: "CardioPlus XR", category: "Cardiology", dot: "#2563eb", tag: "#dbeafe", count: 0 },
        { id: 2, name: "DiabetCare", category: "Diabetes", dot: "#16a34a", tag: "#dcfce7", count: 0 },
        { id: 3, name: "ImmunoBoost", category: "Immunity", dot: "#9333ea", tag: "#f3e8ff", count: 0 },
        { id: 4, name: "RespiClear", category: "Respiratory", dot: "#0ea5e9", tag: "#cffafe", count: 0 },
      
        { id: 5, name: "Competitor CardioMax", category: "Cardiology", dot: "#ef4444", tag: "#fee2e2", count: 0 },
        { id: 6, name: "Competitor DiabetX", category: "Diabetes", dot: "#fb923c", tag: "#ffedd5", count: 0 },
        { id: 7, name: "Competitor ImmunoPro", category: "Immunity", dot: "#ec4899", tag: "#fce7f3", count: 0 },
      ]);
      function increment(id: number) {
        setBrands(prev =>
          prev.map(b =>
            b.id === id ? { ...b, count: b.count + 1 } : b
          )
        );
      }
      
      function decrement(id: number) {
        setBrands(prev =>
          prev.map(b =>
            b.id === id && b.count > 0 ? { ...b, count: b.count - 1 } : b
          )
        );
      }
            
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RCPA Capture - Brand wise</Text>

      {/* Pharmacy Header */}
      <View style={styles.pharmacyRow}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Ionicons name="home" size={18} color="#6b7280" />
          <Text style={styles.pharmacyName}>Apollo Pharmacy</Text>
        </View>

        <Pressable style={styles.stockBadge}>
          <View style={styles.yellowDot} />
          <Text style={styles.stockText}>Medium</Text>
          <Ionicons name="chevron-down" size={16} color="#444" />
        </Pressable>
      </View>

      {/* Group Title */}
      <Text style={styles.groupTitle}>Lupin Brands</Text>

      {/* Brand Items */}
      {brands.map(b => (
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
        <Text style={styles.counterText}>-</Text>
      </Pressable>

      <Text style={styles.counterValue}>{b.count}</Text>

      <Pressable style={styles.counterBtn} onPress={() => increment(b.id)}>
        <Text style={styles.counterText}>+</Text>
      </Pressable>
    </View>
  </View>
))}


      {/* Footer */}
      <View style={styles.footerRow}>
        <Text style={styles.totalLabel}>Total Prescriptions:</Text>
        <Text style={styles.totalValue}>0</Text>
      </View>
    </View>
  );
}

function brandItem(name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, category: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, dotColor: string, tagBg: string) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.dot, { backgroundColor: dotColor }]} />
        <Text style={styles.brandName}>{name}</Text>

        <View style={[styles.categoryTag, { backgroundColor: tagBg }]}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>

      <View style={styles.counterRow}>
        <Pressable style={styles.counterBtn}><Text style={styles.counterText}>-</Text></Pressable>
        <Text style={styles.counterValue}>0</Text>
        <Pressable style={styles.counterBtn}><Text style={styles.counterText}>+</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  pharmacyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  pharmacyName: {
    fontSize: 14,
    fontWeight: "600",
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
    height: 8,
    width: 8,
    borderRadius: 10,
    backgroundColor: "#fbbf24",
  },
  stockText: { fontSize: 12, fontWeight: "600" },

  groupTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6b7280",
    marginTop: 16,
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },

  dot: {
    height: 10,
    width: 10,
    borderRadius: 20,
  },

  brandName: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },

  categoryTag: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#1e293b",
  },

  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  counterBtn: {
    height: 28,
    width: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
  },
  counterText: {
    fontSize: 18,
    fontWeight: "700",
  },
  counterValue: { fontSize: 16, fontWeight: "700" },

  footerRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: { fontSize: 14, fontWeight: "700" },
  totalValue: { fontSize: 14, fontWeight: "900", color: "#2563eb" },
});
