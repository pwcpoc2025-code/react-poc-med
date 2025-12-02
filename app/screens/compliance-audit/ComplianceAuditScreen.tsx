import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function ComplianceAuditScreen() {
  return (
    <ScrollView style={styles.container}>

      {/* ------- PAGE HEADER ------- */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Compliance & Audit</Text>
      </View>

      {/* ------- AI COMPLIANCE MONITOR BANNER ------- */}
      <LinearGradient
        colors={["#7F56F0", "#B027D9"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.banner}
      >
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <Icon name="sparkles-outline" size={22} color="#fff" />
          <Text style={styles.bannerTitle}>  AI Compliance Monitor</Text>
        </View>

        <Text style={styles.bannerSubtitle}>
          Real-time compliance checking across all activities
        </Text>

        <View style={styles.bannerPillsRow}>
          <View style={styles.badgeGreen}>
            <Icon name="checkmark-circle-outline" size={16} color="#fff" />
            <Text style={styles.badgeText}>All checks passed</Text>
          </View>

          <View style={styles.badgeYellow}>
            <Icon name="warning-outline" size={16} color="#000" />
            <Text style={styles.badgeYellowText}>2 receipts pending</Text>
          </View>
        </View>
      </LinearGradient>

      {/* ------- COMPLIANCE SCORE ------- */}
      <View style={styles.complianceScoreBox}>
        <View>
          <Text style={styles.scoreLabel}>Compliance Score</Text>
          <Text style={styles.scoreValue}>98%</Text>

          <View style={styles.excellentBadge}>
            <Text style={styles.excellentText}>Excellent Standing</Text>
          </View>
        </View>

        <Icon name="shield-checkmark-outline" size={42} color="#22C55E" />
      </View>

      {/* ------- RECENT AUDIT LOGS ------- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Audit Logs</Text>

        {[
          { title: "Sample distribution logged", time: "2 hours ago" },
          { title: "HCP consent captured", time: "4 hours ago" },
          { title: "Call report submitted", time: "6 hours ago" },
        ].map((log, index) => (
          <View key={index} style={styles.auditItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.auditTitle}>{log.title}</Text>
              <Text style={styles.auditTime}>{log.time}</Text>
            </View>
            <Icon name="checkmark-circle-outline" size={24} color="#22C55E" />
          </View>
        ))}
      </View>

      {/* ------- UCPMP SECTION ------- */}
      <View style={styles.ucpmpBox}>
        <Text style={styles.ucpmpTitle}>UCPMP Code '24</Text>

        <Text style={styles.ucpmpSubtitle}>
          Ensure all interactions comply with UCPMP regulations for sample distribution and HCP engagement.
        </Text>

        <TouchableOpacity style={styles.guidelinesBtn}>
          <Text style={styles.guidelinesBtnText}>View Guidelines</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  /* ------ HEADER ------ */
  headerContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },

  /* ------ BANNER ------ */
  banner: {
    padding: 20,
    borderRadius: 12,
    margin: 12,
  },
  bannerTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  bannerSubtitle: {
    color: "#EAD9FF",
    marginBottom: 15,
  },
  bannerPillsRow: {
    flexDirection: "row",
    gap: 8,
  },

  /* Pills */
  badgeGreen: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#22C55E",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  badgeText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 12,
  },
  badgeYellow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FACC15",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  badgeYellowText: {
    color: "#000",
    marginLeft: 5,
    fontSize: 12,
  },

  /* ------ COMPLIANCE SCORE ------ */
  complianceScoreBox: {
    backgroundColor: "#ECFDF5",
    padding: 20,
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreLabel: {
    color: "#6B7280",
    fontSize: 14,
  },
  scoreValue: {
    fontSize: 42,
    fontWeight: "700",
    color: "#111827",
  },
  excellentBadge: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 6,
  },
  excellentText: {
    color: "#fff",
    fontSize: 12,
  },

  /* ------ AUDIT LOGS ------ */
  section: {
    marginTop: 20,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  auditItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#EEF2F7",
  },
  auditTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  auditTime: {
    color: "#6B7280",
    marginTop: 3,
  },

  /* ------ UCPMP SECTION ------ */
  ucpmpBox: {
    marginTop: 25,
    backgroundColor: "#E8F0FF",
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 12,
    marginBottom: 40,
  },
  ucpmpTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  ucpmpSubtitle: {
    marginTop: 10,
    color: "#4B5563",
  },
  guidelinesBtn: {
    marginTop: 20,
    backgroundColor: "#3B82F6",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  guidelinesBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
});
