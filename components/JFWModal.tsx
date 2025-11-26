import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import RCPAModal from "./RCPAModal";

type Props = {
  visible: boolean;
  onClose: () => void;
  onContinue: () => void;
};

export default function JFWModal({ visible, onClose, onContinue }: Props) {
  const [selected, setSelected] = useState<"yes" | "no" | null>(null);

  const roles = [
    { id: "asm", label: "ASM (Area Sales Manager)" },
    { id: "rsm", label: "RSM (Regional Sales Manager)" },
    { id: "sm", label: "SM (Sales Manager)" },
    { id: "nsm", label: "NSM (National Sales Manager)" },
    { id: "dh", label: "DH (Divisional Head)" },
  ];

  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [showJFWModal, setShowJFWModal] = useState(false);
const [showRCPAModal, setShowRCPAModal] = useState(false);
const [showJFW, setShowJFW] = useState(false);
const [showRCPA, setShowRCPA] = useState(false);


  function toggleRole(id: string) {
    if (selectedRoles.includes(id)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== id));
    } else {
      setSelectedRoles([...selectedRoles, id]);
    }
  }

  return (
    <View>
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>

        <View style={styles.modalBox}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.successIcon}>
                <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
              </View>

              <View>
                <Text style={styles.headerTitle}>POST CALL - JFW</Text>
                <Text style={styles.headerSubtitle}>
                  Call completed with Dr. Sharma
                </Text>
              </View>
            </View>

            <Pressable onPress={onClose}>
              <Ionicons name="close" size={22} color="#FFFFFF" />
            </Pressable>
          </View>

          <ScrollView style={{ maxHeight: 480 }}>

            {/* QUESTION */}
            <View style={styles.body}>
              <Text style={styles.questionText}>
                <Ionicons name="person-outline" size={18} color="#475569" />{"  "}
                Did you conduct Joint Field Work (JFW)?
              </Text>

              {/* YES / NO RADIO */}
              <View style={styles.radioRow}>
                {/* YES */}
                <Pressable
                  style={styles.radioOption}
                  onPress={() => setSelected("yes")}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      selected === "yes" && styles.radioSelected,
                    ]}
                  />
                  <Text style={styles.radioLabel}>Yes</Text>
                </Pressable>

                {/* NO */}
                <Pressable
                  style={styles.radioOption}
                  onPress={() => {
                    setSelected("no");
                    setSelectedRoles([]);
                  }}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      selected === "no" && styles.radioSelected,
                    ]}
                  />
                  <Text style={styles.radioLabel}>No</Text>
                </Pressable>
              </View>
            </View>

            {/* DIVIDER */}
            <View style={styles.divider} />

            {/* ROLE SELECTION — ONLY IF YES */}
            {selected === "yes" && (
              <View style={styles.body}>

                <Text style={styles.roleTitle}>With whom did you conduct JFW?</Text>
                <Text style={styles.roleSubTitle}>
                  Select all roles that participated in the Joint Field Work
                </Text>

                {/* ROLE LIST */}
                {roles.map((r) => {
                  const isSelected = selectedRoles.includes(r.id);
                  return (
                    <Pressable
                      key={r.id}
                      style={[
                        styles.roleBox,
                        isSelected && styles.roleBoxSelected,
                      ]}
                      onPress={() => toggleRole(r.id)}
                    >
                      <View style={styles.roleLeftSection}>
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

                        <Text
                          style={[
                            styles.roleLabel,
                            isSelected && { color: "#0F172A" },
                          ]}
                        >
                          {r.label}
                        </Text>
                      </View>

                      {isSelected && (
                        <Ionicons
                          name="refresh"
                          size={20}
                          color="#2563EB"
                        />
                      )}
                    </Pressable>
                  );
                })}

                {/* SELECTED TAGS */}
                {selectedRoles.length > 0 && (
                  <View style={styles.selectedTagBox}>
                    <Text style={{ color: "#475569", marginRight: 6 }}>
                      Selected:
                    </Text>

                    {selectedRoles.map((id) => {
                      const role = roles.find((r) => r.id === id);
                      return (
                        <View key={id} style={styles.selectedTag}>
                          <Text style={styles.selectedTagText}>
                            {role?.id.toUpperCase()}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
            )}

          </ScrollView>

          {/* FOOTER BUTTONS */}
          <View style={styles.footer}>
            <Pressable style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </Pressable>

            <Pressable
              style={[
                styles.continueBtn,
                selected === null ||
                (selected === "yes" && selectedRoles.length === 0)
                  ? { opacity: 0.4 }
                  : {},
              ]}
              disabled={
                selected === null ||
                (selected === "yes" && selectedRoles.length === 0)
              }
              onPress={() => {
                onClose();              // CLOSE JFWModal
                setShowRCPAModal(true); // OPEN RCPA Modal
              }}
            >
              <Text style={styles.continueText}>Continue</Text>
            </Pressable>
          </View>

        </View>
      </View>
    </Modal>
    <RCPAModal
        visible={showRCPAModal}
        onClose={() => setShowRCPAModal(false)}
        onSubmit={() => {
          setShowRCPAModal(false);
          // Continue to next step...
        }}
      />
    </View>
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
    width: 420,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#10B981",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  successIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: "#ECFDF5",
    fontSize: 12,
  },
  body: {
    padding: 20,
  },
  questionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 18,
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
    backgroundColor: "#10B981",
    borderColor: "#10B981",
  },
  radioLabel: {
    color: "#0F172A",
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  roleTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  roleSubTitle: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 14,
  },
  roleBox: {
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
  roleBoxSelected: {
    borderColor: "#2563EB",
    backgroundColor: "#EEF6FF",
  },
  roleLeftSection: {
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
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  roleLabel: {
    fontSize: 14,
    color: "#475569",
  },
  selectedTagBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    padding: 10,
    marginTop: 10,
  },
  selectedTag: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 6,
  },
  selectedTagText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 11,
  },
  footer: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  cancelBtnText: {
    color: "#475569",
    fontWeight: "600",
  },
  continueBtn: {
    backgroundColor: "#10B981",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  continueText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
