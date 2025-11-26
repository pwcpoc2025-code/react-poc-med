// components/RCPAModal.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { JSX, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import RCPABrandWiseMedPlusUI from "./RCPABrandWiseMedPlusUI";
import RCPABrandWiseUI from "./RCPABrandWiseUI";
import RCPABrandWiseWellnessUI from "./RCPABrandWiseWellnessUI";
import RCPAGrandTotal from "./RCPAGrandTotal";
import RCPASchemesUI from "./RCPASchemesUI";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export default function RCPAModal({ visible, onClose, onSubmit }: Props) {
  const [selected, setSelected] = useState<"yes" | "no" | null>(null);
  const chemistUIMap: Record<string, JSX.Element> = {
    apollo: <RCPABrandWiseUI />,
    medplus: <RCPABrandWiseMedPlusUI />,
    wellness:<RCPABrandWiseWellnessUI />, // optional
  };
  
  const chemists = [
    { id: "apollo", name: "Apollo Pharmacy", location: "Breach Candy" },
    { id: "medplus", name: "MedPlus", location: "Malabar Hill" },
    { id: "wellness", name: "Wellness Forever", location: "Peddar Road" },
  ];
  
  const [selectedChemists, setSelectedChemists] = useState<string[]>([]);
  
  function toggleChemist(id: string) {
    if (selectedChemists.includes(id)) {
      setSelectedChemists(selectedChemists.filter((c) => c !== id));
    } else {
      setSelectedChemists([...selectedChemists, id]);
    }
  }
  

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Ionicons name="storefront-outline" size={22} color="#fff" />
              <View>
                <Text style={styles.headerTitle}>RCPA CAPTURE</Text>
                <Text style={styles.headerSubtitle}>
                  Track prescriptions for Dr. Sharma
                </Text>
              </View>
            </View>

            <Pressable onPress={onClose}>
              <Ionicons name="close" size={22} color="#FFFFFF" />
            </Pressable>
          </View>

          {/* BODY */}
          <ScrollView  contentContainerStyle={styles.body}
  showsVerticalScrollIndicator={false}>
  
  <Text style={styles.question}>Do you want to do an RCPA?</Text>

  <Text style={styles.subText}>
    Retail Chemist Prescription Audit – Track prescriptions at nearby chemists
  </Text>

  {/* YES / NO BUTTONS */}
  <View style={styles.radioRow}>

    <Pressable style={styles.radioOption} onPress={() => setSelected("yes")}>
      <View
        style={[
          styles.radioCircle,
          selected === "yes" && styles.radioSelected,
        ]}
      />
      <Text style={styles.radioLabel}>Yes</Text>
    </Pressable>

    <Pressable style={styles.radioOption} onPress={() => setSelected("no")}>
      <View
        style={[
          styles.radioCircle,
          selected === "no" && styles.radioSelected,
        ]}
      />
      <Text style={styles.radioLabel}>No</Text>
    </Pressable>

  </View>


  {/* SHOW CHEMIST SELECT ONLY IF YES IS SELECTED */}
  {selected === "yes" && (
    <View style={{ marginTop: 10 }}>
      <Text style={styles.chemistTitle}>Select Chemists Tagged to Dr. Sharma</Text>
      <Text style={styles.chemistSubTitle}>
        Multiple chemists can be selected for RCPA
      </Text>

      {chemists.map((c) => {
        const isSelected = selectedChemists.includes(c.id);
        return (
          <Pressable
            key={c.id}
            style={[
              styles.chemistBox,
              isSelected && styles.chemistBoxSelected,
            ]}
            onPress={() => toggleChemist(c.id)}
          >
            <View style={styles.chemistLeft}>
              <View
                style={[
                  styles.checkbox,
                  isSelected && styles.checkboxSelected,
                ]}
              >
                {isSelected && (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                )}
              </View>

              <View>
                <Text
                  style={[
                    styles.chemistName,
                    isSelected && { color: "#0F172A" },
                  ]}
                >
                  {c.name}
                </Text>
                <Text style={styles.chemistLocation}>{c.location}</Text>
              </View>
            </View>

            {isSelected && (
              <Ionicons name="refresh" size={20} color="#F97316" />
            )}
          </Pressable>
        );
      })}
     {/* Show brand-wise UI only for selected chemists */}
{selected === "yes" && selectedChemists.length > 0 && (
  <View style={{ marginTop: 20 }}>
    {selectedChemists.map((chemId) => (
      <View key={chemId} style={{ marginBottom: 20 }}>
        {chemistUIMap[chemId]}
      </View>
    ))}
  </View>
)}
 {selected && (
  <View>
              <RCPASchemesUI />
              <RCPAGrandTotal total={2} />
              </View>
            )}

    </View>
  )}

</ScrollView>


          {/* FOOTER */}
          <View style={styles.footer}>
            <Pressable style={styles.backBtn} onPress={onClose}>
              <Text style={styles.backText}>Back</Text>
            </Pressable>

            <Pressable
              style={[
                styles.submitBtn,
                selected === null ? { opacity: 0.4 } : {},
              ]}
              disabled={selected === null}
              onPress={onSubmit}
            >
              <Text style={styles.submitText}>Submit RCPA</Text>
            </Pressable>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  modalBox: {
    width: 420, // SAME WIDTH AS YOUR JFW MODAL
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    maxHeight: "85%",
  },
  header: {
    backgroundColor: "#F97316",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: "#FFEAD5",
    fontSize: 12,
  },

  body: {
    padding: 20,
  },
  question: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 10,
  },
  subText: {
    fontSize: 12,
    color: "#475569",
    marginBottom: 16,
  },

  radioRow: {
    flexDirection: "row",
    gap: 30,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#94A3B8",
  },
  radioSelected: {
    backgroundColor: "#F97316",
    borderColor: "#F97316",
  },
  radioLabel: {
    color: "#0F172A",
    fontSize: 14,
  },

  footer: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  backBtn: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  backText: {
    color: "#475569",
    fontWeight: "600",
  },
  submitBtn: {
    backgroundColor: "#F97316",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  submitText: {
    color: "#fff",
    fontWeight: "700",
  },
  chemistTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 10,
    marginBottom: 4,
  },
  
  chemistSubTitle: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 14,
  },
  
  chemistBox: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  
  chemistBoxSelected: {
    borderColor: "#F97316",
    backgroundColor: "#FFF7ED",
  },
  
  chemistLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#94A3B8",
    justifyContent: "center",
    alignItems: "center",
  },
  
  checkboxSelected: {
    backgroundColor: "#F97316",
    borderColor: "#F97316",
  },
  
  chemistName: {
    fontSize: 14,
    color: "#0F172A",
    fontWeight: "600",
  },
  
  chemistLocation: {
    fontSize: 12,
    color: "#64748B",
  },
  
  selectedCountBox: {
    backgroundColor: "#FFFBEB",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FDE68A",
    padding: 12,
    marginTop: 6,
  },
  
});
