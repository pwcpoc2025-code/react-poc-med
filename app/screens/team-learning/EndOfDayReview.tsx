import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import * as Progress from "react-native-progress";
import AIInsightsView from "./AIInsightsView";
import TomorrowView from "./TomorrowView";

export default function EndOfDayReview() {
    const [activeTab, setActiveTab] = useState("performance");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fb" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={styles.headerIcon}>
              <Ionicons name="time-outline" size={20} color="#fff" />
            </View>
            <View>
              <Text style={styles.headerTitle}>End-of-Day Review</Text>
              <Text style={styles.headerDate}>Tuesday 2 December, 2025</Text>
            </View>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.headerTime}>18:30</Text>
          </View>
        </View>

        {/* SCORE CARD */}
        <View style={styles.scoreCard}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text style={styles.scoreTitle}>Daily Performance Score</Text>
              <Text style={styles.scoreSubtitle}>Based on all targets</Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.scorePercent}>101%</Text>
              <Text style={styles.scoreAch}>Achievement</Text>
            </View>
          </View>

          <View style={{ marginVertical: 16 }}>
            <Progress.Bar
              progress={1.0}
              width={null}
              height={8}
              color="#000622"
              unfilledColor="#E8EAFE"
              borderWidth={0}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Ionicons name="checkmark-circle-outline" size={18} color="#16a34a" />
            <Text style={styles.successMessage}>
              Outstanding performance! Keep it up! 🎉
            </Text>
          </View>
        </View>

        {/* TABS */}
        <View style={styles.tabRow}>
  <TouchableOpacity
    style={[styles.tabBtn, activeTab === "performance" && styles.tabBtnActive]}
    onPress={() => setActiveTab("performance")}
  >
    <Text style={[styles.tabText, activeTab === "performance" && styles.tabTextActive]}>
      Performance
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.tabBtn, activeTab === "insights" && styles.tabBtnActive]}
    onPress={() => setActiveTab("insights")}
  >
    <Text style={[styles.tabText, activeTab === "insights" && styles.tabTextActive]}>
      All Insights
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.tabBtn, activeTab === "tomorrow" && styles.tabBtnActive]}
    onPress={() => setActiveTab("tomorrow")}
  >
    <Text style={[styles.tabText, activeTab === "tomorrow" && styles.tabTextActive]}>
      Tomorrow
    </Text>
  </TouchableOpacity>
</View>
{activeTab === "performance" && (
<View>
        {/* ------------ SECTION TITLE ------------ */}
        <View style={styles.sectionHeader}>
          <Ionicons size={18} color="#2563eb" />
          <Text style={styles.sectionTitle}>Target vs Achievement</Text>
        </View>

        {/* CARD - DOCTOR CALLS */}
        <View style={[styles.metricCard, { backgroundColor: "#FFFAE8" }]}>
          <View style={styles.metricRow}>
            <View style={styles.metricLeft}>
              <Ionicons name="person-circle-outline" size={20} color="#b45309" />
              <Text style={styles.metricTitle}>Doctor Calls</Text>
            </View>
            <Text style={styles.metricValue}>10 /12</Text>
          </View>

          <Progress.Bar
            progress={0.83}
            width={null}
            height={8}
            color="#000622"
            unfilledColor="#EFE9C7"
            borderWidth={0}
          />

          <View style={styles.metricFooterRow}>
            <Text style={styles.metricFooterText}>83% Complete</Text>
            <Text style={styles.metricFooterText}>2 calls short</Text>
          </View>
        </View>

        {/* CARD - NEW PRESCRIPTIONS */}
        <View style={[styles.metricCard, { backgroundColor: "#EEFFF4" }]}>
          <View style={styles.metricRow}>
            <View style={styles.metricLeft}>
              <Ionicons name="medkit-outline" size={20} color="#059669" />
              <Text style={styles.metricTitle}>New Prescriptions</Text>
            </View>
            <Text style={[styles.metricValue, { color: "#059669" }]}>28 /25</Text>
          </View>

          <Progress.Bar
            progress={1.12}
            width={null}
            height={8}
            color="#000622"
            unfilledColor="#CFFAEA"
            borderWidth={0}
          />

          <View style={styles.metricFooterRow}>
            <Text style={styles.metricFooterText}>112% Complete</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Ionicons name="checkmark-circle-outline" size={16} color="#059669" />
              <Text style={[styles.metricFooterText, { color: "#059669" }]}>
                Target Met
              </Text>
            </View>
          </View>
        </View>
        {/* ================= SAMPLE DISTRIBUTION ================= */}
<View style={[styles.metricCard, { backgroundColor: "#fefce8", borderColor: "#fde68a" }]}>
  <View style={styles.metricHeader}>
    <View style={styles.metricLeft}>
      <Ionicons name="cube-outline" size={18} color="#b45309" />
      <Text style={styles.metricTitle}>Sample Distribution</Text>
    </View>

    <Text style={styles.metricTarget}>45 /50</Text>
  </View>

  {/* Progress bar */}
  <View style={styles.progressContainer}>
    <View style={[styles.progressFill, { width: "90%" }]} />
  </View>

  <View style={styles.metricFooter}>
    <Text style={styles.metricPercent}>90% Complete</Text>
    <Text style={styles.metricStatus}>5 strips short</Text>
  </View>
</View>

{/* ================= SALES VALUE ================= */}
<View style={[styles.metricCard, { backgroundColor: "#ecfdf5", borderColor: "#bbf7d0" }]}>
  <View style={styles.metricHeader}>
    <View style={styles.metricLeft}>
      <Ionicons name="cash-outline" size={18} color="#047857" />
      <Text style={styles.metricTitle}>Sales Value</Text>
    </View>

    <Text style={styles.metricTarget}>₹52,000 /₹50,000</Text>
  </View>

  {/* Progress bar */}
  <View style={styles.progressContainer}>
    <View style={[styles.progressFill, { width: "104%" }]} />
  </View>

  <View style={styles.metricFooter}>
    <Text style={styles.metricPercent}>104% Complete</Text>
    <View style={styles.statusRow}>
      <Ionicons name="checkmark-circle" size={14} color="#16a34a" />
      <Text style={[styles.metricStatus, { color: "#16a34a" }]}> Target Met</Text>
    </View>
  </View>
</View>

{/* ================= CHEMIST VISITS ================= */}
<View style={[styles.metricCard, { backgroundColor: "#fef2f2", borderColor: "#fecaca" }]}>
  <View style={styles.metricHeader}>
    <View style={styles.metricLeft}>
      <Ionicons name="medkit-outline" size={18} color="#b91c1c" />
      <Text style={styles.metricTitle}>Chemist Visits</Text>
    </View>

    <Text style={[styles.metricTarget, { color: "#b91c1c" }]}>6 /8</Text>
  </View>

  {/* Progress bar */}
  <View style={styles.progressContainer}>
    <View style={[styles.progressFill, { width: "75%" }]} />
  </View>

  <View style={styles.metricFooter}>
    <Text style={styles.metricPercent}>75% Complete</Text>
    <Text style={[styles.metricStatus, { color: "#b91c1c" }]}>2 visits short</Text>
  </View>
</View>

{/* ================= E-DETAILING SESSIONS ================= */}
<View style={[styles.metricCard, { backgroundColor: "#ecfdf5", borderColor: "#bbf7d0" }]}>
  <View style={styles.metricHeader}>
    <View style={styles.metricLeft}>
      <Ionicons name="ribbon-outline" size={18} color="#047857" />
      <Text style={styles.metricTitle}>E-Detailing Sessions</Text>
    </View>

    <Text style={styles.metricTarget}>7 /5</Text>
  </View>

  {/* Progress bar */}
  <View style={styles.progressContainer}>
    <View style={[styles.progressFill, { width: "140%" }]} />
  </View>

  <View style={styles.metricFooter}>
    <Text style={styles.metricPercent}>140% Complete</Text>

    <View style={styles.statusRow}>
      <Ionicons name="checkmark-circle" size={14} color="#16a34a" />
      <Text style={[styles.metricStatus, { color: "#16a34a" }]}> Target Met</Text>
    </View>
  </View>
</View>
{/* ================= TODAY'S ACHIEVEMENTS ================= */}
<View style={styles.achievementsCard}>
  <View style={styles.achievementsHeader}>
    <Ionicons name="ribbon-outline" size={20} color="#ca8a04" />
    <Text style={styles.achievementsTitle}>Today's Achievements</Text>
  </View>

  {/* Achievement Item */}
  <View style={styles.achievementItem}>
    <View style={styles.achievementIcon}>
      <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
    </View>
    <View>
      <Text style={styles.achievementTitle}>Sales Target Exceeded</Text>
      <Text style={styles.achievementSubtitle}>
        Achieved 104% of daily sales target (₹52,000)
      </Text>
    </View>
  </View>

  <View style={styles.achievementItem}>
    <View style={[styles.achievementIcon, { backgroundColor: "#fefce8" }]}>
      <Ionicons name="trophy-outline" size={20} color="#d97706" />
    </View>
    <View>
      <Text style={styles.achievementTitle}>Top Performer</Text>
      <Text style={styles.achievementSubtitle}>
        Highest prescription generation in your territory today
      </Text>
    </View>
  </View>

  <View style={styles.achievementItem}>
    <View style={[styles.achievementIcon, { backgroundColor: "#faf5ff" }]}>
      <Ionicons name="star-outline" size={20} color="#a855f7" />
    </View>
    <View>
      <Text style={styles.achievementTitle}>Perfect E-Detailing</Text>
      <Text style={styles.achievementSubtitle}>
        Completed 7 e-detailing sessions with 100% engagement
      </Text>
    </View>
  </View>

  <View style={styles.achievementItem}>
    <View style={[styles.achievementIcon, { backgroundColor: "#f0f9ff" }]}>
      <Ionicons name="person-add-outline" size={20} color="#0284c7" />
    </View>
    <View>
      <Text style={styles.achievementTitle}>New Doctor Onboarded</Text>
      <Text style={styles.achievementSubtitle}>
        Successfully onboarded Dr. Rajesh Mehta - Cardiologist
      </Text>
    </View>
  </View>
</View>
{/* ================= DAILY REFLECTION ================= */}
<View style={styles.notesCard}>
  <View style={styles.notesHeader}>
    <Ionicons name="chatbox-ellipses-outline" size={20} color="#374151" />
    <Text style={styles.notesTitle}>Daily Reflection & Notes</Text>
  </View>

  {/* Input Area */}
  <TextInput
    multiline
    placeholder="Reflect on your day... What went well? What challenges did you face? Any key learnings?"
    placeholderTextColor="#9ca3af"
    style={styles.notesInput}
  />

  {/* Submit Button */}
  <TouchableOpacity style={styles.submitBtn}>
    <Ionicons name="send-outline" size={18} color="#ffffff" />
    <Text style={styles.submitBtnText}>Submit Review</Text>
  </TouchableOpacity>
</View>
</View>)}

{activeTab === "insights" && (
  <AIInsightsView />  // the UI I will give you below
)}

{activeTab === "tomorrow" && (
  <TomorrowView />
)}

      </ScrollView>
    </SafeAreaView>
  );
}

/* ======================== STYLES ======================== */

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerIcon: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  headerDate: {
    fontSize: 12,
    color: "#6b7280",
  },

  headerTime: {
    fontSize: 13,
    color: "#7C3AED",
    fontWeight: "700",
    marginTop: 4,
  },

  scoreCard: {
    backgroundColor: "#F6F4FF",
    padding: 16,
    margin: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0d9ff",
  },

  scoreTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  scoreSubtitle: {
    fontSize: 12,
    color: "#6b7280",
  },

  scorePercent: {
    fontSize: 22,
    fontWeight: "800",
    color: "#9333EA",
  },

  scoreAch: {
    fontSize: 12,
    color: "#6b7280",
  },

  successMessage: {
    fontSize: 13,
    color: "#16a34a",
  },

  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    marginHorizontal: 12,
    borderRadius: 30,
    padding: 4,
    marginTop: 6,
  },

  activeTab: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },

  activeTabText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000",
  },

  inactiveTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },

  inactiveTabText: {
    fontSize: 13,
    color: "#6b7280",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937",
  },

  metricCard: {
    marginTop: 14,
    marginHorizontal: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  metricValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  metricFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  metricFooterText: {
    fontSize: 12,
    color: "#6b7280",
  },
  
  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  
  metricLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  
  metricTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0f172a",
  },
  
  metricTarget: {
    fontWeight: "700",
    color: "#0f172a",
  },
  
  progressContainer: {
    height: 8,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#e5e7eb",
    overflow: "hidden",
  },
  
  progressFill: {
    height: "100%",
    backgroundColor: "#000",
    borderRadius: 10,
  },
  
  metricFooter: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  
  metricPercent: {
    fontSize: 12,
    color: "#6b7280",
  },
  
  metricStatus: {
    fontSize: 12,
    color: "#6b7280",
  },
  
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  /* Today’s Achievements */
achievementsCard: {
    backgroundColor: "#fffbeb",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fef3c7",
    marginTop: 20,
  },
  
  achievementsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 8,
  },
  
  achievementsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#92400e",
  },
  
  achievementItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#fef9c3",
  },
  
  achievementIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#ecfccb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  
  achievementTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
  },
  
  achievementSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  
  /* Daily Notes */
  notesCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginTop: 20,
    marginBottom: 30,
  },
  
  notesHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  
  notesTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
  },
  
  notesInput: {
    backgroundColor: "#f3f4f6",
    height: 100,
    borderRadius: 10,
    padding: 12,
    textAlignVertical: "top",
    fontSize: 14,
    color: "#111827",
    marginBottom: 16,
  },
  
  submitBtn: {
    backgroundColor: "#8b5cf6",
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  
  submitBtnText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  tabRow: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f3f4f6",
    borderRadius: 30,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  tabBtnActive: {
    backgroundColor: "white",
    elevation: 2,
  },
  tabText: {
    color: "#6b7280",
  },
  tabTextActive: {
    color: "#111827",
    fontWeight: "700",
  },

  /* HEADER CARD */
  headerCard: {
    backgroundColor: "#eff6ff",
    borderRadius: 10,
    padding: 16,
    borderColor: "#dbeafe",
    borderWidth: 1,
    marginBottom: 20,
  },
});
