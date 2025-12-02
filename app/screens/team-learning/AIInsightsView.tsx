import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AIInsightsView() {
  return (
    <View style={{ padding: 16 }}>

      {/* Header */}
      <View style={styles.headerCard}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <Ionicons name="sparkles-outline" size={20} color="#2563eb" />
          <Text style={styles.headerTitle}>AI-Powered Insights</Text>
        </View>
        <Text style={styles.headerSubtext}>
          Personalized recommendations based on your performance and territory data
        </Text>
      </View>
      {/* PRIORITY BLOCK */}
<View style={styles.insightCard}>
  
  {/* Tag */}
  <View style={styles.tagRed}>
    <Text style={styles.tagRedText}>Priority</Text>
  </View>

  {/* Impact label right side */}
  <Text style={styles.impactRed}>High Impact</Text>

  {/* Row */}
  <View style={styles.insightRow}>
    <Ionicons name="information-circle-outline" size={26} color="#2563eb" />
    <View style={{ marginLeft: 10, flex: 1 }}>
      <Text style={styles.insightTitle}>Follow up with Dr. Sharma</Text>
      <Text style={styles.insightDescription}>
        Dr. Sharma showed high interest in Lupin Cardio-X during today's visit.
        Schedule a follow-up within 3 days to capitalize on this opportunity.
      </Text>
    </View>
  </View>

  {/* CTA Button */}
  <TouchableOpacity style={styles.actionBtn}>
    <Text style={styles.actionText}>Schedule Follow-up</Text>
    <Ionicons name="chevron-forward" size={16} color="#111" />
  </TouchableOpacity>
</View>
{/* OPPORTUNITY BLOCK */}
<View style={styles.insightCard}>

  <View style={styles.tagGreen}>
    <Text style={styles.tagGreenText}>Opportunity</Text>
  </View>

  <Text style={styles.impactRed}>High Impact</Text>

  <View style={styles.insightRow}>
    <Ionicons name="radio-outline" size={26} color="#2563eb" />
    <View style={{ marginLeft: 10, flex: 1 }}>
      <Text style={styles.insightTitle}>Untapped high-value doctors</Text>
      <Text style={styles.insightDescription}>
        You have 3 A-grade cardiologists in your territory who haven't been visited
        in 2 weeks. Prioritize them for tomorrow.
      </Text>
    </View>
  </View>

  <TouchableOpacity style={styles.actionBtn}>
    <Text style={styles.actionText}>View Doctors</Text>
    <Ionicons name="chevron-forward" size={16} color="#111" />
  </TouchableOpacity>
</View>
{/* WARNING BLOCK */}
<View style={styles.insightCard}>
  
  <View style={styles.tagYellow}>
    <Text style={styles.tagYellowText}>Warning</Text>
  </View>

  <Text style={styles.impactYellow}>Medium Impact</Text>

  <View style={styles.insightRow}>
    <Ionicons name="trending-down-outline" size={26} color="#2563eb" />
    <View style={{ marginLeft: 10, flex: 1 }}>
      <Text style={styles.insightTitle}>Doctor call target missed</Text>
      <Text style={styles.insightDescription}>
        You completed 10/12 doctor calls today. Adjust tomorrow's route to ensure
        you meet the daily target.
      </Text>
    </View>
  </View>

  <TouchableOpacity style={styles.actionBtn}>
    <Text style={styles.actionText}>Optimize Route</Text>
    <Ionicons name="chevron-forward" size={16} color="#111" />
  </TouchableOpacity>
</View>


      {/* --------- Insight BLOCK 1 --------- */}
      <View style={styles.insightCard}>
        <View style={styles.tagBlue}>
          <Text style={styles.tagBlueText}>Improvement</Text>
        </View>

        <View style={styles.insightRow}>
          <Ionicons name="cube-outline" size={24} color="#2563eb" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.insightTitle}>Increase sample utilization</Text>
            <Text style={styles.insightDescription}>
              Your sample distribution is at 90%. Consider offering samples to doctors
              who are fence-sitters.
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>View Sample Stock</Text>
          <Ionicons name="chevron-forward" size={16} color="#111" />
        </TouchableOpacity>
      </View>

      {/* --------- Insight BLOCK 2 --------- */}
      <View style={styles.insightCard}>
        <View style={styles.tagGreen}>
          <Text style={styles.tagGreenText}>Opportunity</Text>
        </View>

        <View style={styles.insightRow}>
          <Ionicons name="briefcase-outline" size={24} color="#1d4ed8" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.insightTitle}>Chemist relationship building</Text>
            <Text style={styles.insightDescription}>
              Focus on building stronger relationships with chemists near Dr. Patel’s clinic
              to ensure better stock visibility.
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>Plan Chemist Visit</Text>
          <Ionicons name="chevron-forward" size={16} color="#111" />
        </TouchableOpacity>
      </View>
{/* ---------------- IMPROVEMENT BLOCK ---------------- */}
<View style={styles.insightCard}>

  {/* Tag */}
  <View style={styles.tagBlue}>
    <Text style={styles.tagBlueText}>Improvement</Text>
  </View>

  {/* Impact */}
  <Text style={styles.impactGreen}>Low Impact</Text>

  {/* Row */}
  <View style={styles.insightRow}>
    <Ionicons name="thumbs-up-outline" size={26} color="#2563eb" />
    <View style={{ marginLeft: 10, flex: 1 }}>
      <Text style={styles.insightTitle}>E-Detailing performance excellent</Text>
      <Text style={styles.insightDescription}>
        Your e-detailing engagement is 40% higher than average. Consider sharing your technique with the team.
      </Text>
    </View>
  </View>

  {/* CTA Button */}
  <TouchableOpacity style={styles.actionBtn}>
    <Text style={styles.actionText}>Share Best Practice</Text>
    <Ionicons name="chevron-forward" size={16} color="#111" />
  </TouchableOpacity>
</View>


{/* ---------------- KEY FOCUS AREAS BLOCK ---------------- */}
<View style={styles.focusCard}>
  <View style={styles.focusHeader}>
    <Ionicons name="bulb-outline" size={22} color="#16a34a" />
    <Text style={styles.focusTitle}>Key Focus Areas for Tomorrow</Text>
  </View>

  {/* Bullet List */}
  <View style={styles.focusItem}>
    <Ionicons name="checkmark-circle-outline" size={20} color="#16a34a" />
    <Text style={styles.focusText}>
      Prioritize 3 high-value cardiologists who haven’t been visited
    </Text>
  </View>

  <View style={styles.focusItem}>
    <Ionicons name="checkmark-circle-outline" size={20} color="#16a34a" />
    <Text style={styles.focusText}>
      Complete 12 doctor calls to meet daily target
    </Text>
  </View>

  <View style={styles.focusItem}>
    <Ionicons name="checkmark-circle-outline" size={20} color="#16a34a" />
    <Text style={styles.focusText}>
      Follow up with Dr. Sharma within 3 days
    </Text>
  </View>

  <View style={styles.focusItem}>
    <Ionicons name="checkmark-circle-outline" size={20} color="#16a34a" />
    <Text style={styles.focusText}>
      Increase sample distribution to reach 100% utilization
    </Text>
  </View>
</View>

    </View>
  );
}

const styles = StyleSheet.create({
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
    headerTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: "#1e3a8a",
      marginLeft: 8,
    },
    headerSubtext: {
      color: "#475569",
      fontSize: 13,
    },
  
    /* INSIGHT BLOCK */
    insightCard: {
      backgroundColor: "#ffffff",
      borderRadius: 10,
      padding: 16,
      borderWidth: 1,
      borderColor: "#e5e7eb",
      marginBottom: 20,
    },
  
    tagBlue: {
      alignSelf: "flex-start",
      backgroundColor: "#dbeafe",
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
      marginBottom: 10,
    },
    tagBlueText: {
      fontSize: 12,
      color: "#1d4ed8",
      fontWeight: "600",
    },
  
    tagGreen: {
      alignSelf: "flex-start",
      backgroundColor: "#dcfce7",
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
      marginBottom: 10,
    },
    tagGreenText: {
      fontSize: 12,
      color: "#15803d",
      fontWeight: "600",
    },
  
    insightRow: {
      flexDirection: "row",
      marginBottom: 16,
    },
  
    insightTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: "#111827",
    },
  
    insightDescription: {
      color: "#475569",
      marginTop: 4,
      fontSize: 12,
      width: "95%",
    },
  
    actionBtn: {
      flexDirection: "row",
      justifyContent: "center",
      paddingVertical: 10,
      borderRadius: 8,
      backgroundColor: "#f9fafb",
      borderWidth: 1,
      borderColor: "#e5e7eb",
      alignItems: "center",
      marginTop: 8,
    },
  
    actionText: {
      fontSize: 14,
      marginRight: 6,
      fontWeight: "600",
    },
    /* NEW TAGS */
tagRed: {
    alignSelf: "flex-start",
    backgroundColor: "#fee2e2",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  tagRedText: {
    fontSize: 12,
    color: "#dc2626",
    fontWeight: "600",
  },
  
  impactRed: {
    position: "absolute",
    right: 16,
    top: 16,
    fontSize: 12,
    fontWeight: "600",
    color: "#dc2626",
  },
  
  tagYellow: {
    alignSelf: "flex-start",
    backgroundColor: "#fef9c3",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  tagYellowText: {
    fontSize: 12,
    color: "#ca8a04",
    fontWeight: "600",
  },
  impactYellow: {
    position: "absolute",
    right: 16,
    top: 16,
    fontSize: 12,
    fontWeight: "600",
    color: "#ca8a04",
  },
  /* IMPACT LABEL */
impactGreen: {
    position: "absolute",
    right: 16,
    top: 16,
    fontSize: 12,
    fontWeight: "600",
    color: "#16a34a",
  },
  
  /* FOCUS AREA CARD */
  focusCard: {
    backgroundColor: "#ecfdf5",
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#bbf7d0",
    marginTop: 20,
    marginBottom: 30,
  },
  
  focusHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  
  focusTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#065f46",
    marginLeft: 8,
  },
  
  focusItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  
  focusText: {
    fontSize: 14,
    color: "#065f46",
    flex: 1,
  },
  
  });
  