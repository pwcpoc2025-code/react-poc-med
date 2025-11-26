import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  total: number;   // pass combined count here
};

export default function RCPAGrandTotal({ total }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Ionicons name="trending-up" size={20} color="#fff" />
        <Text style={styles.label}>Grand Total RCPA</Text>
      </View>

      <Text style={styles.total}>{total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#059669",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  total: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },
});
