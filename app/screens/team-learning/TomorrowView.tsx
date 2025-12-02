import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
type CardState = {
    [key: number]: boolean;
  };
  
  type UpdatedState = {
    [key: number]: any;
  };

export default function TomorrowView() {
  /* APPROVAL STATES */
  const [approvedCards, setApprovedCards] = useState<CardState>({});
  const [allApproved, setAllApproved] = useState(false);

  /* TOGGLE ALL */
  const toggleApproveAll = () => {
    const newValue = !allApproved;
    const updated: UpdatedState = {};

    for (let i = 1; i <= 7; i++) {
      updated[i] = newValue;
    }

    setApprovedCards(updated);
    setAllApproved(newValue);
  };

  /* TOGGLE ONE CARD */
  const toggleCard = (id: number) => {
    setApprovedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  
  // 5️⃣ Style checker
  const getCardStyle = (id: number) => {
    return approvedCards[id] ? styles.cardActive : styles.cardTransparent;
  };

  return (
    <View style={{ padding: 16 }}>

      {/* ------------------ TOP HEADER CARD ------------------ */}
      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Tomorrow’s Visit Plan</Text>
        <Text style={styles.planSubtitle}>
          AI-optimized route with 7 visits planned
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.approveBtn} onPress={toggleApproveAll}>
            <Ionicons name="checkmark" size={18} color="#fff" />
            <Text style={styles.approveBtnText}>
              {allApproved ? "Unapprove All" : "Approve All"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optimizeBtn}>
            <Ionicons name="git-compare-outline" size={16} color="#374151" />
            <Text style={styles.optimizeBtnText}>Optimize Route</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ------------------ SUMMARY CARDS ------------------ */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: "#eff6ff", borderColor: "#bfdbfe" }]}>
          <Ionicons name="person-outline" size={26} color="#1d4ed8" />
          <Text style={styles.summaryValue}>5</Text>
          <Text style={styles.summaryLabel}>Doctors</Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: "#ecfdf5", borderColor: "#bbf7d0" }]}>
          <Ionicons name="briefcase-outline" size={26} color="#059669" />
          <Text style={styles.summaryValue}>1</Text>
          <Text style={styles.summaryLabel}>Chemists</Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: "#faf5ff", borderColor: "#e9d5ff" }]}>
          <Ionicons name="cube-outline" size={26} color="#9333ea" />
          <Text style={styles.summaryValue}>1</Text>
          <Text style={styles.summaryLabel}>Stockists</Text>
        </View>
      </View>

      {/* ------------------ VISIT 1 ------------------ */}
      <TouchableOpacity activeOpacity={0.9} onPress={() => toggleCard(1)} style={[styles.doctorCard, getCardStyle(1)]}>
        <View style={styles.visitNumber}><Text style={styles.visitNumberText}>1</Text></View>
        <View style={styles.statusRight}>
          <View style={styles.priorityBadge}><Text style={styles.priorityBadgeText}>High</Text></View>
          <Ionicons name="checkmark-circle" size={22} color="#22c55e" />
        </View>

        <Text style={styles.doctorName}>Dr. Anjali Verma</Text>
        <View style={styles.doctorTagsRow}>
          <View style={styles.doctorTag}><Text style={styles.doctorTagText}>Doctor</Text></View>
          <Text style={styles.doctorSpecialty}>• Cardiologist</Text>
        </View>

        <View style={styles.row}><Ionicons name="location-outline" size={18} color="#475569" /><Text style={styles.locationText}>Max Hospital, Saket</Text></View>
        <View style={styles.row}><Ionicons name="time-outline" size={18} color="#475569" /><Text style={styles.timeText}>09:00 AM</Text><Text style={styles.lastVisitText}>• Last visit: 4 days ago</Text></View>

        <Text style={styles.objectiveTitle}>Objective</Text>
        <View style={styles.objectiveBox}><Text style={styles.objectiveText}>Follow-up on Cardio-X trial feedback</Text></View>

        <Text style={styles.sectionTitle}>Suggested Products</Text>
        <View style={styles.productRow}>
          <View style={styles.productTag}><Text style={styles.productTagText}>Lupin Cardio-X</Text></View>
          <View style={styles.productTag}><Text style={styles.productTagText}>Lupin BP Care</Text></View>
        </View>

        <View style={styles.row}><Ionicons name="trending-up-outline" size={18} color="#16a34a" /><Text style={styles.prescriptionText}>Prescription trend: Up</Text></View>
      </TouchableOpacity>

      {/* ------------------ VISIT 2 ------------------ */}
      <TouchableOpacity activeOpacity={0.9} onPress={() => toggleCard(2)} style={[styles.doctorCard, getCardStyle(2)]}>
        <View style={styles.visitNumber}><Text style={styles.visitNumberText}>2</Text></View>
        <View style={styles.statusRight}>
          <View style={styles.priorityBadge}><Text style={styles.priorityBadgeText}>Medium</Text></View>
          <Ionicons name="checkmark-circle" size={22} color="#22c55e" />
        </View>

        <Text style={styles.doctorName}>Dr. Rajesh Kumar</Text>
        <View style={styles.doctorTagsRow}>
          <View style={styles.doctorTag}><Text style={styles.doctorTagText}>Doctor</Text></View>
          <Text style={styles.doctorSpecialty}>• Diabetologist</Text>
        </View>
        <View style={styles.row}><Ionicons name="location-outline" size={18} color="#475569" /><Text>Apollo Clinic, Nehru Place</Text></View>
        <View style={styles.row}><Ionicons name="time-outline" size={18} color="#475569" /><Text>10:30 AM</Text><Text>• Last visit: 12 days ago</Text></View>

        <Text style={styles.objectiveTitle}>Objective</Text>
        <View style={styles.objectiveBox}><Text>New product introduction - Diabetes Care Plus</Text></View>

        <Text style={styles.sectionTitle}>Suggested Products</Text>
        <View style={styles.productRow}>
          <View style={styles.productTag}><Text style={styles.productTagText}>Diabetes Care Plus</Text></View>
          <View style={styles.productTag}><Text style={styles.productTagText}>Lupin Glucose Control</Text></View>
        </View>

        <View style={styles.row}><Ionicons name="trending-up-outline" size={18} color="#16a34a" /><Text style={styles.prescriptionText}>Prescription trend: Up</Text></View>
      </TouchableOpacity>

      {/* ------------------ VISIT 3 ------------------ */}
      <TouchableOpacity activeOpacity={0.9} onPress={() => toggleCard(3)} style={[styles.doctorCard, getCardStyle(3)]}>
        <View style={styles.visitNumber}><Text style={styles.visitNumberText}>3</Text></View>
        <View style={styles.statusRight}><View style={styles.priorityBadge}><Text style={styles.priorityBadgeText}>Medium</Text></View></View>

        <Text style={styles.doctorName}>City Medical Store</Text>
        <View style={styles.doctorTagsRow}><View style={styles.doctorTag}><Text style={styles.doctorTagText}>Chemist</Text></View></View>
        <View style={styles.row}><Ionicons name="location-outline" size={18} color="#475569" /><Text>Lajpat Nagar</Text></View>
        <View style={styles.row}><Ionicons name="time-outline" size={18} color="#475569" /><Text>11:45 AM</Text><Text>• Last visit: 7 days ago</Text></View>

        <Text style={styles.objectiveTitle}>Objective</Text>
        <View style={styles.objectiveBox}><Text>Stock check and shelf placement review</Text></View>

        <Text style={styles.sectionTitle}>Suggested Products</Text>
        <View style={styles.productRow}><View style={styles.productTag}><Text style={styles.productTagText}>All Lupin Products</Text></View></View>
      </TouchableOpacity>

      {/* ------------------ VISIT 4 ------------------ */}
      <TouchableOpacity activeOpacity={0.9} onPress={() => toggleCard(4)} style={[styles.doctorCard, getCardStyle(4)]}>
        <View style={styles.visitNumber}><Text style={styles.visitNumberText}>4</Text></View>

        <Text style={styles.doctorName}>Dr. Priya Sharma</Text>
        <View style={styles.doctorTagsRow}><View style={styles.doctorTag}><Text>Doctor</Text></View><Text>• General Physician</Text></View>

        <View style={styles.row}><Ionicons name="location-outline" size={18} color="#475569" /><Text>Sharma Clinic, GK</Text></View>
        <View style={styles.row}><Ionicons name="time-outline" size={18} color="#475569" /><Text>01:00 PM</Text><Text>• Last visit: 5 days ago</Text></View>

        <Text style={styles.objectiveTitle}>Objective</Text>
        <View style={styles.objectiveBox}><Text>Regular follow-up and sample distribution</Text></View>

        <Text style={styles.sectionTitle}>Suggested Products</Text>
        <View style={styles.productRow}>
          <View style={styles.productTag}><Text>Lupin Multi-Vitamin</Text></View>
          <View style={styles.productTag}><Text>Lupin Pain Relief</Text></View>
        </View>

        <View style={styles.row}><Ionicons name="trending-up-outline" size={18} color="#16a34a" /><Text>Prescription trend: Up</Text></View>
      </TouchableOpacity>

      {/* ------------------ VISIT 5 ------------------ */}
      <TouchableOpacity activeOpacity={0.9} onPress={() => toggleCard(5)} style={[styles.doctorCard, getCardStyle(5)]}>
        <View style={styles.visitNumber}><Text style={styles.visitNumberText}>5</Text></View>

        <Text style={styles.doctorName}>Dr. Amit Patel</Text>
        <View style={styles.doctorTagsRow}><View style={styles.doctorTag}><Text>Doctor</Text></View><Text>• Cardiologist</Text></View>

        <View style={styles.row}><Ionicons name="location-outline" size={18} color="#475569" /><Text>Fortis Hospital, Vasant Kunj</Text></View>
        <View style={styles.row}><Ionicons name="time-outline" size={18} color="#475569" /><Text>02:30 PM</Text><Text>• Last visit: 15 days ago</Text></View>

        <Text style={styles.objectiveTitle}>Objective</Text>
        <View style={styles.objectiveBox}><Text>Address concerns about competitor products</Text></View>

        <Text style={styles.sectionTitle}>Suggested Products</Text>
        <View style={styles.productRow}><View style={styles.productTag}><Text>Lupin Cardio-X</Text></View></View>

        <View style={styles.row}><Ionicons name="trending-up-outline" size={18} color="#16a34a" /><Text>Prescription trend: Down</Text></View>
      </TouchableOpacity>

      {/* ------------------ VISIT 6 ------------------ */}
      <TouchableOpacity activeOpacity={0.9} onPress={() => toggleCard(6)} style={[styles.doctorCard, getCardStyle(6)]}>
        <View style={styles.visitNumber}><Text style={styles.visitNumberText}>6</Text></View>

        <Text style={styles.doctorName}>Metro Distributors</Text>
        <View style={styles.doctorTagsRow}><View style={styles.doctorTag}><Text>Stockist</Text></View></View>

        <View style={styles.row}><Ionicons name="location-outline" size={18} color="#475569" /><Text>Okhla Industrial Area</Text></View>
        <View style={styles.row}><Ionicons name="time-outline" size={18} color="#475569" /><Text>04:00 PM</Text><Text>• Last visit: 30 days ago</Text></View>

        <Text style={styles.objectiveTitle}>Objective</Text>
        <View style={styles.objectiveBox}><Text>Monthly stock reconciliation & order placement</Text></View>
      </TouchableOpacity>

      {/* ------------------ VISIT 7 ------------------ */}
      <TouchableOpacity activeOpacity={0.9} onPress={() => toggleCard(7)} style={[styles.doctorCard, getCardStyle(7)]}>
        <View style={styles.visitNumber}><Text style={styles.visitNumberText}>7</Text></View>

        <Text style={styles.doctorName}>Dr. Suresh Reddy</Text>
        <View style={styles.doctorTagsRow}><View style={styles.doctorTag}><Text>Doctor</Text></View><Text>• Pulmonologist</Text></View>

        <View style={styles.row}><Ionicons name="location-outline" size={18} color="#475569" /><Text>Medanta Hospital, Gurgaon</Text></View>
        <View style={styles.row}><Ionicons name="time-outline" size={18} color="#475569" /><Text>05:00 PM</Text><Text>• Last visit: Never visited</Text></View>

        <Text style={styles.objectiveTitle}>Objective</Text>
        <View style={styles.objectiveBox}><Text>Intro to Respiratory Care portfolio</Text></View>

        <Text style={styles.sectionTitle}>Suggested Products</Text>
        <View style={styles.productRow}>
          <View style={styles.productTag}><Text>Lupin Respiratory Plus</Text></View>
          <View style={styles.productTag}><Text>Lupin Asthma Care</Text></View>
        </View>

        <View style={styles.row}><Ionicons name="trending-up-outline" size={18} color="#16a34a" /><Text>Prescription trend: Stable</Text></View>
      </TouchableOpacity>

      {/* ------------------ READY FOR TOMORROW ------------------ */}
      <View style={styles.readyCard}>
        <View style={styles.readyHeader}>
          <View>
            <Text style={styles.readyTitle}>Ready for Tomorrow?</Text>
            <Text style={styles.readySubtitle}>2 of 7 visits approved</Text>
          </View>
          <Ionicons name="list-outline" size={22} color="#fff" />
        </View>

        <TouchableOpacity style={styles.readyBtn}>
          <Text style={styles.readyBtnText}>Confirm Tomorrow's Plan</Text>
          <Ionicons name="arrow-forward" size={18} color="#4f46e5" />
        </TouchableOpacity>
      </View>

    </View>
  );
}

/* ------------------ STYLES ------------------ */

const styles = StyleSheet.create({
  /* TOP CARD */
  planCard: {
    backgroundColor: "#fff7ed",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffedd5",
    marginBottom: 20,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#7c2d12",
  },
  planSubtitle: {
    color: "#78350f",
    marginTop: 4,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 16,
    gap: 10,
  },
  approveBtn: {
    flex: 1,
    backgroundColor: "#22c55e",
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  approveBtnText: {
    color: "white",
    fontWeight: "700",
  },

  optimizeBtn: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  optimizeBtnText: {
    fontWeight: "600",
    color: "#374151",
  },

  /* SUMMARY */
  summaryRow: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
  },
  summaryValue: { fontSize: 20, fontWeight: "700", marginTop: 6 },
  summaryLabel: { color: "#475569", marginTop: 2 },

  /* CARD TRANSPARENT / ACTIVE */
  cardTransparent: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#bae6fd",
  },
  cardActive: {
    backgroundColor: "#f0f9ff",
    borderWidth: 1,
    borderColor: "#bae6fd",
  },

  /* DOCTOR CARD BASE */
  doctorCard: {
    marginTop: 12,
    padding: 18,
    borderRadius: 10,
  },

  visitNumber: {
    position: "absolute",
    left: 10,
    top: 10,
    backgroundColor: "#dbeafe",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  visitNumberText: { fontWeight: "700", color: "#1e3a8a" },

  statusRight: {
    position: "absolute",
    right: 10,
    top: 10,
    flexDirection: "row",
    gap: 6,
  },
  priorityBadge: {
    backgroundColor: "#fecaca",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 16,
  },
  priorityBadgeText: {
    color: "#dc2626",
    fontSize: 12,
    fontWeight: "600",
  },

  doctorName: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
  },
  doctorTagsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 6,
  },
  doctorTag: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  doctorTagText: {
    fontSize: 12,
    color: "#1d4ed8",
    fontWeight: "600",
  },
  doctorSpecialty: { color: "#475569", fontSize: 12 },

  row: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 },
  locationText: { color: "#374151" },
  timeText: { color: "#374151" },
  lastVisitText: { color: "#6b7280" },

  objectiveTitle: { marginTop: 16, fontWeight: "600", color: "#374151" },
  objectiveBox: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginTop: 6,
  },
  objectiveText: { color: "#374151" },

  sectionTitle: { marginTop: 16, marginBottom: 4, color: "#374151", fontWeight: "600" },

  productRow: { flexDirection: "row", gap: 8 },
  productTag: {
    backgroundColor: "#f3e8ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  productTagText: { color: "#6d28d9", fontWeight: "600" },

  prescriptionText: { color: "#15803d", fontWeight: "600" },

  /* READY FOR TOMORROW */
  readyCard: {
    marginTop: 28,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "blue",
  },
  readyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  readyTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  readySubtitle: { color: "#e0e7ff", fontSize: 12, marginTop: 2 },

  readyBtn: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  readyBtnText: {
    color: "#4f46e5",
    fontWeight: "700",
    fontSize: 14,
  },
});
