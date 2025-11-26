import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function RCPASchemesUI() {

  const [schemes, setSchemes] = useState([
    {
      id: 1,
      title: "10+2 Free Scheme",
      applicable: "CardioPlus XR, DiabetCare",
      valid: "Dec 31, 2025",
      selected: false,
    },
    {
      id: 2,
      title: "15% Discount on Bulk Order",
      applicable: "ImmunoBoost, RespiClear",
      valid: "Nov 30, 2025",
      selected: false,
    },
    {
      id: 3,
      title: "Buy 5 Get 1 Free",
      applicable: "DiabetCare",
      valid: "Jan 15, 2026",
      selected: false,
    },
    {
      id: 4,
      title: "Special Festive Offer",
      applicable: "CardioPlus XR, ImmunoBoost",
      valid: "Dec 15, 2025",
      selected: false,
    },
  ]);

  function toggleScheme(id: number) {
    setSchemes(prev =>
      prev.map(s =>
        s.id === id ? { ...s, selected: !s.selected } : s
      )
    );
  }

  return (
    <View style={{ marginTop: 20 }}>

      {/* STOCK DOCUMENT UPLOAD */}
      <View style={styles.uploadBox}>
        <Text style={styles.uploadTitle}>Stock Document Upload</Text>
        <Text style={styles.uploadSub}>
          Upload current stock levels PDF document from stockist
        </Text>

        <Pressable style={styles.uploadButton}>
          <Ionicons name="cloud-upload-outline" size={20} color="#1e293b" />
          <Text style={styles.uploadBtnText}>Choose PDF File</Text>
        </Pressable>
      </View>

      {/* ACTIVE SCHEMES */}
      <View style={styles.schemeSection}>
        <Text style={styles.schemeTitle}>Active Schemes & Offers</Text>
        <Text style={styles.schemeSub}>
          Select schemes currently available on products
        </Text>

        {schemes.map(s => (
          <Pressable
            onPress={() => toggleScheme(s.id)}
            key={s.id}
            style={[
              styles.schemeCard,
              s.selected && styles.schemeCardSelected,
            ]}
          >
            {/* CHECKBOX */}
            <View
              style={[
                styles.checkbox,
                s.selected && styles.checkboxSelected,
              ]}
            >
              {s.selected && (
                <Ionicons name="checkmark" size={14} color="#fff" />
              )}
            </View>

            {/* Card Text */}
            <View style={{ flex: 1 }}>
              <Text style={styles.schemeName}>{s.title}</Text>
              <Text style={styles.schemeApplicable}>
                Applicable: {s.applicable}
              </Text>
              <Text style={styles.schemeValid}>Valid till {s.valid}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      {/* COMMENTS */}
      <View style={styles.commentsBox}>
        <Text style={styles.commentsTitle}>Comments / Remarks</Text>

        <TextInput
          placeholder="Add any additional comments or remarks about the RCPA, stock levels, or schemes…"
          multiline
          style={styles.input}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  uploadBox: {
    backgroundColor: "#eef2ff",
    padding: 16,
    borderRadius: 12,
  },
  uploadTitle: {
    fontWeight: "700",
    fontSize: 15,
    color: "#1e293b",
  },
  uploadSub: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 12,
    marginTop: 4,
  },
  uploadButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  uploadBtnText: {
    fontSize: 14,
    fontWeight: "600",
  },

  schemeSection: {
    backgroundColor: "#fef3c7",
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
  },
  schemeTitle: {
    fontWeight: "700",
    fontSize: 15,
  },
  schemeSub: {
    fontSize: 12,
    color: "#a16207",
    marginBottom: 14,
  },
  schemeCard: {
    flexDirection: "row",
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 12,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    gap: 12,
  },
  schemeCardSelected: {
    borderColor: "#f59e0b",
    backgroundColor: "#fff7e6",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#94a3b8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  checkboxSelected: {
    backgroundColor: "#f59e0b",
    borderColor: "#f59e0b",
  },
  schemeName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1e293b",
  },
  schemeApplicable: {
    fontSize: 12,
    color: "#334155",
    marginTop: 4,
  },
  schemeValid: {
    fontSize: 12,
    color: "#d97706",
    marginTop: 2,
  },

  commentsBox: {
    backgroundColor: "#f1f5f9",
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
  },
  commentsTitle: {
    fontWeight: "700",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    height: 100,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
});
