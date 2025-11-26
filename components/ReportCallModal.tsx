import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, TextInput } from "react-native";
const DateTimePicker = Platform.OS === "web" ? null : require("@react-native-community/datetimepicker").default;

import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import JFWModal from "./JFWModal";

type Product = {
  id: string;
  name: string;
  subtitle?: string;
  completed?: boolean;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  doctorName?: string;
  products?: Product[];
  onSubmit?: () => void;
};

export default function ReportCallModal({
  visible,
  onClose,
  doctorName = "Dr. Sharma",
  products = [
    { id: "1", name: "Tonact EZ 40", subtitle: "Statin Combination", completed: true },
    { id: "2", name: "Starpress AM", subtitle: "Beta Blocker + CCB Combination", completed: true },
    { id: "3", name: "Ramistar 10", subtitle: "ACE Inhibitor", completed: true },
  ],
  onSubmit
}: Props) {
    const [dateValue, setDateValue] = useState(new Date());
const [timeValue, setTimeValue] = useState(new Date());
const [showDatePicker, setShowDatePicker] = useState(false);
const [showTimePicker, setShowTimePicker] = useState(false);
const [sampleFormVisible, setSampleFormVisible] = useState(false);

const [sampleProduct, setSampleProduct] = useState("");
const [sampleQty, setSampleQty] = useState("");
const [sampleBatch, setSampleBatch] = useState("");
const [dropdownOpen, setDropdownOpen] = useState(false);
const [nextAction, setNextAction] = useState("");

const productOptions = ["Tonact EZ 40", "Starpress AM", "Ramistar 10"];

const [samples, setSamples] = useState<any[]>([]);
const [callOutcome, setCallOutcome] = useState("");
const [callDropdownOpen, setCallDropdownOpen] = useState(false);
const [recording, setRecording] = useState(false);
const aiGeneratedNote = 
  "Productive call with Dr. Sharma. Discussed Tonact EZ 40, Starpress AM, Ramistar 10. Doctor showed positive interest in the clinical efficacy data and asked relevant questions about dosing and contraindications. Follow-up scheduled for next visit.";

const voiceGeneratedNote =
  "Voice note: Met with Dr. Sharma at Breach Candy Hospital, Mumbai. Detailed presentation on Tonact EZ 40. Doctor expressed interest in prescribing for suitable patients. Will follow up next month.";


const callOutcomeOptions = [
  { label: "Very Positive", color: "#22C55E" },
  { label: "Positive", color: "#4ade80" },
  { label: "Neutral", color: "#a3a3a3" },
  { label: "Needs Follow-up", color: "#ca8a04" },
  { label: "Not Interested", color: "#ef4444" },
];
const [callNotes, setCallNotes] = useState("");
const [jfwVisible, setJfwVisible] = useState(false);


const [files, setFiles] = useState([
  { id: 1, label: "Product Brochure", icon: "document-text-outline" },
  { id: 2, label: "Clinical Study", icon: "medkit-outline" },
  { id: 3, label: "Product Demo", icon: "play-outline" },
  { id: 4, label: "Safety Data", icon: "shield-checkmark-outline" },
]);


  return (
    <>
    <Modal visible={visible} transparent animationType="fade">
      {/* Dim Background */}
      <View style={styles.overlay}>
        
        {/* CENTERED POPUP */}
        <View style={styles.modalBox}>
          
          {/* HEADER */}
          <View style={styles.headerRow}>
            <Text style={styles.mainTitle}>Report New Call</Text>

            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color="#4b5563" />
            </Pressable>
          </View>

          <Text style={styles.subHeader}>
            Documenting call with {doctorName} • {products.length} products detailed
          </Text>

          {/* Scroll Content */}
          <ScrollView
            style={{ maxHeight: 520 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            
            {/* SUCCESS BANNER */}
            <View style={styles.successBanner}>
              <Ionicons name="checkmark-circle" size={20} color="#12B76A" />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.successTitle}>Call completed successfully!</Text>
                <Text style={styles.successBody}>Form auto-filled with detailing data</Text>
              </View>
            </View>

            {/* HCP DETAILS */}
            <View style={styles.section}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>HCP Details</Text>
                <View style={styles.smallBlueBadge}>
                  <Text style={styles.smallBlueBadgeText}>Pre-filled</Text>
                </View>
              </View>

              <View style={styles.hcpCard}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarLetter}>D</Text>
                </View>

                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.hcpName}>{doctorName}</Text>
                  <Text style={styles.hcpSubtitle}>Cardiologist</Text>
                </View>
              </View>
            </View>

            {/* DATE / TIME */}
            <View style={styles.section}>
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    
    {/* DATE FIELD */}
    <View style={[styles.inputBox, { width: "48%" }]}>
      <Pressable
        style={styles.inputPressable}
        onPress={() => setShowDatePicker(true)}
      >
        <Ionicons name="calendar-outline" size={16} color="#2563EB" />
        <Text style={styles.inputText}>
          {dateValue.toLocaleDateString("en-GB")}
        </Text>
      </Pressable>
    </View>

    {/* TIME FIELD */}
    <View style={[styles.inputBox, { width: "48%" }]}>
      <Pressable
        style={styles.inputPressable}
        onPress={() => setShowTimePicker(true)}
      >
        <Ionicons name="time-outline" size={16} color="#2563EB" />
        <Text style={styles.inputText}>
          {timeValue.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </Pressable>
    </View>

  </View>

  {showDatePicker && (
    <DateTimePicker
      value={dateValue}
      mode="date"
      display="default"
      onChange={(event: any, selected: React.SetStateAction<Date>) => {
        setShowDatePicker(false);
        if (selected) setDateValue(selected);
      }}
    />
  )}

  {showTimePicker && (
    <DateTimePicker
      value={timeValue}
      mode="time"
      display="default"
      onChange={(event: any, selected: React.SetStateAction<Date>) => {
        setShowTimePicker(false);
        if (selected) setTimeValue(selected);
      }}
    />
  )}
</View>

            {/* LOCATION */}
            <View style={styles.section}>
              <View style={styles.rowBetween}>
                <Text style={styles.sectionTitle}>Location</Text>
                <View style={styles.smallGreenBadge}>
                  <Text style={styles.smallGreenBadgeText}>GPS Auto-captured</Text>
                </View>
              </View>

              <View style={styles.locationCard}>
                <Ionicons name="location" size={20} color="#12B76A" />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.locationName}>Breach Candy Hospital, Mumbai</Text>
                  <Text style={styles.locationSubText}>Verified location</Text>
                </View>
              </View>
            </View>

            {/* PRODUCTS */}
            <View style={styles.section}>
              <View style={styles.rowBetween}>
                <Text style={styles.sectionTitle}>Products Discussed</Text>
                <View style={styles.blueTag}>
                  <Text style={styles.blueTagText}>{products.length} Products Detailed</Text>
                </View>
              </View>

              <View style={styles.productContainer}>
                {products.map((p) => (
                  <View key={p.id} style={styles.productCard}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <View style={styles.tickCircle}>
                        <Ionicons name="checkmark" size={16} color="#12B76A" />
                      </View>
                      <View style={{ marginLeft: 12 }}>
                        <Text style={styles.productName}>{p.name}</Text>
                        <Text style={styles.productSubtitle}>Detailing completed</Text>
                      </View>
                    </View>

                    <View style={styles.doneBadge}>
                      <Text style={styles.doneBadgeText}>✓ Done</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            {/* SAMPLE DISTRIBUTION */}
{/* SAMPLE DISTRIBUTION */}
<View style={styles.sampleBoxOuter}>

  {/* Header Row */}
  <View style={styles.rowBetween}>
    <Text style={styles.sectionTitle}>Sample Distribution (UCPMP Compliant)</Text>

    <Pressable
      style={styles.addSampleBtn}
      onPress={() => setSampleFormVisible(true)}
    >
      <Text style={styles.addSampleBtnText}>+ Add Sample</Text>
    </Pressable>
  </View>

  {/* FORM WHEN ADD CLICKED */}
  {sampleFormVisible && (
    <View style={styles.sampleFormWrapper}>

      {/* PRODUCT DROPDOWN */}
      <Pressable
        style={styles.sampleInput}
        onPress={() => setDropdownOpen(!dropdownOpen)}
      >
        <Text style={sampleProduct ? styles.selectedText : styles.placeholderText}>
          {sampleProduct || "Select product"}
        </Text>

        <Ionicons
          name={dropdownOpen ? "chevron-up" : "chevron-down"}
          size={18}
          color="#475569"
        />
      </Pressable>

      {/* DROPDOWN MENU */}
      {dropdownOpen && (
        <View style={styles.dropdownMenu}>
          {productOptions.map((item) => (
            <Pressable
              key={item}
              style={styles.dropdownItem}
              onPress={() => {
                setSampleProduct(item);
                setDropdownOpen(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{item}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* QTY & BATCH */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput
          style={[styles.sampleInputSmall, { width: "48%" }]}
          placeholder="Quantity"
          value={sampleQty}
          onChangeText={setSampleQty}
          keyboardType="numeric"
        />

        <TextInput
          style={[styles.sampleInputSmall, { width: "48%" }]}
          placeholder="Batch No."
          value={sampleBatch}
          onChangeText={setSampleBatch}
        />
      </View>

      {/* BUTTONS */}
      <View style={styles.formButtonRow}>
        <Pressable
          style={styles.addBtn}
          onPress={() => {
            if (!sampleProduct || !sampleQty || !sampleBatch) return;
            setSamples([
              ...samples,
              { id: Date.now(), product: sampleProduct, qty: sampleQty, batch: sampleBatch },
            ]);
            // Reset
            setSampleProduct("");
            setSampleQty("");
            setSampleBatch("");
            setSampleFormVisible(false);
          }}
        >
          <Text style={styles.addBtnText}>Add</Text>
        </Pressable>

        <Pressable
          style={styles.cancelBtn}
          onPress={() => {
            setSampleFormVisible(false);
            setDropdownOpen(false);
          }}
        >
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </Pressable>
      </View>

    </View>
  )}

  {/* EMPTY STATE */}
  {samples.length === 0 && (
    <View style={styles.emptySampleBox}>
      <Ionicons name="cube-outline" size={32} color="#94A3B8" />
      <Text style={styles.emptySampleText}>No samples added yet</Text>
      <Text style={styles.emptySampleSubtext}>
        Click "Add Sample" to distribute samples
      </Text>
    </View>
  )}

</View>



{/* CALL OUTCOME */}
{/* CALL OUTCOME */}
<View style={styles.callOutcomeBox}>

  {/* LABEL + BADGE */}
  <View style={styles.callOutcomeHeader}>
    <Ionicons name="alert-circle" size={18} color="#DC2626" />
    <Text style={styles.callOutcomeLabel}>Call Outcome</Text>

    <View style={styles.requiredBadge}>
      <Text style={styles.requiredBadgeText}>Required Field</Text>
    </View>
  </View>

  {/* DROPDOWN FIELD */}
  <Pressable
    style={styles.callOutcomeDropdown}
    onPress={() => setCallDropdownOpen(!callDropdownOpen)}
  >
    <Text style={callOutcome ? styles.callOutcomeValue : styles.callOutcomePlaceholder}>
      {callOutcome || "Select call outcome to continue"}
    </Text>

    <Ionicons
      name={callDropdownOpen ? "chevron-up" : "chevron-down"}
      size={20}
      color="#475569"
    />
  </Pressable>

  {/* DROPDOWN LIST */}
  {callDropdownOpen && (
    <View style={styles.callOutcomeMenu}>
      {callOutcomeOptions.map((item) => (
        <Pressable
          key={item.label}
          onPress={() => {
            setCallOutcome(item.label);
            setCallDropdownOpen(false);
          }}
          style={[
            styles.callOutcomeItem,
            callOutcome === item.label && styles.callOutcomeItemSelected,
          ]}
        >
          {/* colored dot */}
          <View style={[styles.outcomeDot, { backgroundColor: item.color }]} />

          {/* label */}
          <Text style={styles.callOutcomeItemText}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  )}

</View>


{/* CALL NOTES */}
{/* CALL NOTES */}
{/* TAGS */}
<View style={styles.callNotesHeader}>

  <Text style={styles.sectionTitle}>Call Notes</Text>

  <View style={styles.notesTagYellow}>
    <Text style={styles.notesTagYellowText}>AI-Powered</Text>
  </View>

  {/* AI GENERATE */}
  <Pressable
    style={styles.notesTagPurple}
    onPress={() => {
      setRecording(false);
      setCallNotes(aiGeneratedNote);
    }}
  >
    <Ionicons name="sparkles-outline" size={14} color="#6B21A8" />
    <Text style={styles.notesTagPurpleText}>AI Generate</Text>
  </Pressable>

  {/* VOICE RECORDING */}
  <Pressable
    style={recording ? styles.notesTagRecording : styles.notesTagMic}
    onPress={() => {
      // toggle recording mode
      setRecording(true);
      setCallNotes(aiGeneratedNote + "\n\n" + voiceGeneratedNote);
    }}
  >
    <Ionicons
      name={recording ? "mic" : "mic-outline"}
      size={14}
      color={recording ? "#DC2626" : "#1D4ED8"}
    />
    <Text
      style={recording ? styles.notesTagRecordingText : styles.notesTagMicText}
    >
      {recording ? "Recording..." : "Voice"}
    </Text>
  </Pressable>

</View>

<TextInput
  style={styles.notesInputBox}
  multiline
  value={callNotes}
  onChangeText={setCallNotes}
  placeholder="Type your call notes or use voice recording..."
  placeholderTextColor="#94A3B8"
  textAlignVertical="top"
/>


{/* FILES & MEDIA */}
{/* FILES & MEDIA SHARED */}
<View style={styles.section}>

  <View style={styles.rowBetween}>
    <Text style={styles.sectionTitle}>Files & Media Shared</Text>

    <View style={styles.preloadedBadge}>
      <Text style={styles.preloadedBadgeText}>{files.length} Pre-loaded</Text>
    </View>

    <Pressable style={styles.addMoreBtn}>
      <Text style={styles.addMoreBtnText}>Add More</Text>
    </Pressable>
  </View>

  {/* TOP GRAY BOX */}
  <View style={styles.marketingBox}>
    <Ionicons name="folder-outline" size={20} color="#64748B" />
    <Text style={styles.marketingText}>
      Marketing materials ready: PDF, PPT, Videos, Images
    </Text>
  </View>

  {/* FILE GRID */}
  <View style={styles.filesContainer}>
    {files.map((file) => (
      <View key={file.id} style={styles.fileButton}>
        
        {/* Icon */}
        <Ionicons name={file.icon as any} size={18} color="#4B5563" />

        {/* Label */}
        <Text style={styles.fileButtonText}>{file.label}</Text>

        {/* REMOVE BUTTON */}
        <Pressable onPress={() =>
          setFiles(files.filter((f) => f.id !== file.id))
        }>
          <Ionicons name="close-circle" size={18} color="#EF4444" />
        </Pressable>
      </View>
    ))}
  </View>

</View>


{/* NEXT ACTION */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Next Action</Text>

  <TextInput
    style={styles.notesInputBox}
    multiline
    placeholder="Follow-up required, schedule demo, etc."
    placeholderTextColor="#94A3B8"
    value={nextAction}
    onChangeText={setNextAction}
    textAlignVertical="top"
  />
</View>

{/* AUTO-FILLED SUMMARY BOX */}
<View style={styles.summaryBox}>
    
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <View style={styles.summaryIcon}>
            <Ionicons name="checkmark" size={20} color="#12B76A" />
        </View>
        <Text style={styles.summaryTitle}>Auto-filled Call Data Summary</Text>
    </View>

    {/* BULLET LIST */}
    <View style={styles.summaryRow}>
        <View style={styles.summaryBullet}>
            <View style={[styles.summaryDot, { backgroundColor: "#22C55E" }]} />
            <Text style={styles.summaryText}>HCP Details</Text>
        </View>

        <View style={styles.summaryBullet}>
            <View style={[styles.summaryDot, { backgroundColor: "#22C55E" }]} />
            <Text style={styles.summaryText}>Date & Time</Text>
        </View>
    </View>

    <View style={styles.summaryRow}>
        <View style={styles.summaryBullet}>
            <View style={[styles.summaryDot, { backgroundColor: "#22C55E" }]} />
            <Text style={styles.summaryText}>GPS Location</Text>
        </View>

        <View style={styles.summaryBullet}>
            <View style={[styles.summaryDot, { backgroundColor: "#22C55E" }]} />
            <Text style={styles.summaryText}>3 Products</Text>
        </View>
    </View>

    <View style={styles.summaryRow}>
        <View style={styles.summaryBullet}>
            <View style={[styles.summaryDot, { backgroundColor: "#22C55E" }]} />
            <Text style={styles.summaryText}>4 Files/Media</Text>
        </View>

        <View style={styles.summaryBullet}>
            <View style={[styles.summaryDot, { backgroundColor: "#EAB308" }]} />
            <Text style={styles.summaryWarningText}>Outcome (Required)</Text>
        </View>
    </View>

    <Text style={styles.summaryFooterText}>
        Complete the remaining fields to submit your call report
    </Text>
</View>

{/* SUBMIT BUTTON */}
<Pressable   onPress={() => {
    onClose();          // step 1: close ReportCallModal
    setTimeout(() => {
      setJfwVisible(true);   // step 2: open JFWModal
    }, 200);
  }} style={styles.submitBtn}>
    <Ionicons name="checkmark-circle-outline" size={18} color="#FFFFFF" />
    <Text style={styles.submitBtnText}>Submit Call Report</Text>
</Pressable>

<Text style={styles.footerNote}>
    All data is UCPMP compliant and encrypted
</Text>


          </ScrollView>
        </View>
      </View>
      <JFWModal
  visible={jfwVisible}
  onClose={() => setJfwVisible(false)}
  onContinue={() => {
    setJfwVisible(false);
    onSubmit?.(); 
  }}
/>

    </Modal>
    <JFWModal
  visible={jfwVisible}
  onClose={() => setJfwVisible(false)}
  onContinue={() => {
    setJfwVisible(false);
    onSubmit?.(); 
  }}
/>
    </>
  );
}


/* --------------  STYLES (pixel-perfect) -------------- */

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },

  modalBox: {
    width: 420,             // EXACT narrow width
    maxWidth: "95%",
    maxHeight: "92%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    elevation: 12,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0f172a",
  },
  closeBtn: { padding: 4 },
  subHeader: {
    marginTop: 4,
    marginBottom: 12,
    color: "#475569",
    fontSize: 13,
  },

  /* Success Banner */
  successBanner: {
    backgroundColor: "#EAFBF3",
    borderColor: "#A8E8C8",
    borderWidth: 1,
    padding: 14,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  successTitle: {
    fontWeight: "700",
    color: "#0F522B",
  },
  successBody: {
    fontSize: 12,
    color: "#3F8C57",
  },

  /* Sections */
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 14,
    color: "#0f172a",
  },

  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  /* Blue badge */
  smallBlueBadge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  smallBlueBadgeText: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 11,
  },

  /* Green badge */
  smallGreenBadge: {
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  smallGreenBadgeText: {
    color: "#12B76A",
    fontWeight: "700",
    fontSize: 11,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  /* HCP Card */
  hcpCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "800",
  },
  hcpName: {
    fontWeight: "800",
    color: "#0f172a",
  },
  hcpSubtitle: {
    color: "#64748b",
    fontSize: 12,
  },

  /* Inputs */
  rowInputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  inputText: {
    marginLeft: 8,
    color: "#0f172a",
    fontWeight: "600",
  },

  /* Location Card */
  locationCard: {
    backgroundColor: "#ECFDF5",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#BBF7D0",
    flexDirection: "row",
    alignItems: "center",
  },
  locationName: {
    color: "#0f172a",
    fontWeight: "700",
  },
  locationSubText: {
    fontSize: 12,
    color: "#64748b",
  },

  /* Products */
  blueTag: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  blueTagText: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 11,
  },

  productContainer: {
    backgroundColor: "#F5FAFF",
    borderColor: "#DBEAFE",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
  },

  productCard: {
    backgroundColor: "#ECFDF5",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BBF7D0",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  tickCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    alignItems: "center",
    justifyContent: "center",
  },

  productName: {
    fontWeight: "700",
    color: "#065f46",
  },
  productSubtitle: {
    fontSize: 12,
    color: "#065f46",
  },

  doneBadge: {
    backgroundColor: "#ECFDF5",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderColor: "#BBF7D0",
    borderWidth: 1,
  },
  doneBadgeText: {
    color: "#12B76A",
    fontWeight: "700",
    fontSize: 12,
  },
  inputBox: {
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  
  inputPressable: {
    flexDirection: "row",
    alignItems: "center",
  },
  addSampleBtn: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addSampleBtnText: { color: "#0F172A", fontWeight: "600" },
  outcomeDropdown: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FDBA74",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  outcomePlaceholder: { color: "#9A3412", fontSize: 13 },
  
  /* CALL NOTES */
  callNotesHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  notesTagYellow: {
    backgroundColor: "#FEF9C3",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  notesTagYellowText: { color: "#854D0E", fontWeight: "700", fontSize: 11 },
  
  notesTagPurple: {
    backgroundColor: "#F3E8FF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  notesTagPurpleText: { color: "#6B21A8", fontWeight: "700", fontSize: 11 },
  
  notesTagMic: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  notesTagMicText: { color: "#1D4ED8", fontWeight: "700", fontSize: 11 },
  notesPlaceholder: { color: "#64748B", fontSize: 13 },
  
  /* FILES */
  preloadedBadge: {
    backgroundColor: "#F3E8FF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  preloadedBadgeText: { color: "#6B21A8", fontSize: 11, fontWeight: "700" },
  
  addMoreBtn: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  addMoreBtnText: { color: "#334155", fontWeight: "600" },
  /* Add Sample Button */
  /* Form Card Wrapper */
  sampleFormWrapper: {
    backgroundColor: "#F8FAFF",
    borderWidth: 1,
    borderColor: "#DBEAFE",
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
    marginBottom: 12,
  },
  
  sampleInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  /* EMPTY STATE */
  /* OUTER BORDER BOX */
sampleBoxOuter: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    marginBottom: 14,
  },
  placeholderText: { color: "#94A3B8" },
  selectedText: { color: "#0F172A", fontWeight: "600" },
  
  /* DROPDOWN MENU */
  dropdownMenu: {
    marginTop: 6,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    overflow: "hidden",
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  dropdownItemText: {
    color: "#0F172A",
    fontSize: 14,
  },
  
  /* INPUTS */
  sampleInputSmall: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    color: "#0F172A",
    marginTop: 10,
  },
  
  /* FORM BUTTONS */
  formButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  
  addBtn: {
    backgroundColor: "#0F172A",
    paddingVertical: 12,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  addBtnText: { color: "#FFF", fontWeight: "700" },
  
  cancelBtn: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  cancelBtnText: { color: "#475569", fontWeight: "600" },
  
  /* EMPTY STATE */
  emptySampleBox: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    alignItems: "center",
    padding: 24,
  },
  emptySampleText: { marginTop: 6, fontWeight: "700", color: "#475569" },
  emptySampleSubtext: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    marginTop: 2,
  },
  /* OUTER BOX */
callOutcomeBox: {
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FDBA74",
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  
  callOutcomeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  
  callOutcomeLabel: {
    fontWeight: "700",
    marginLeft: 6,
    color: "#B45309",
  },
  
  /* REQUIRED BADGE */
  requiredBadge: {
    backgroundColor: "#FDEAD7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  requiredBadgeText: {
    color: "#C2410C",
    fontSize: 11,
    fontWeight: "700",
  },
  
  /* FIELD BOX */
  callOutcomeDropdown: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FDBA74",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  
  callOutcomePlaceholder: {
    color: "#B45309",
    fontSize: 13,
  },
  
  callOutcomeValue: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "600",
  },
  
  /* DROPDOWN MENU */
  callOutcomeMenu: {
    backgroundColor: "#FFFFFF",
    marginTop: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
    elevation: 3,
  },
  
  callOutcomeItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 10,
  },
  
  callOutcomeItemSelected: {
    backgroundColor: "#F1F5F9",
  },
  
  callOutcomeItemText: {
    fontSize: 14,
    color: "#0F172A",
  },
  
  outcomeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  /* CALL NOTES */
notesInputBox: {
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    minHeight: 90,
    color: "#0F172A",
    fontSize: 14,
    textAlignVertical: "top",
  },
  
  /* TOP GRAY BOX */
  marketingBox: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  marketingText: {
    color: "#475569",
    fontSize: 13,
    flex: 1,
  },
  
  /* FILE GRID OUTER */
  filesContainer: {
    backgroundColor: "#F8F0FF",
    borderWidth: 1,
    borderColor: "#E9D5FF",
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  
  /* FILE BUTTON TILE */
  fileButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E9D5FF",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
  },
  
  fileButtonText: {
    color: "#4B5563",
    fontSize: 14,
    flex: 1,
    fontWeight: "600",
  },
  /* SUMMARY BOX */
summaryBox: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#86EFAC",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
},

summaryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
},

summaryTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#065F46",
},

summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    marginTop: 2,
},

summaryBullet: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    width: "48%",
},

summaryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
},

summaryText: {
    color: "#065F46",
    fontWeight: "600",
    fontSize: 13,
},

summaryWarningText: {
    color: "#B45309",
    fontWeight: "700",
    fontSize: 13,
},

summaryFooterText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 12,
    color: "#64748B",
    fontStyle: "italic",
},

/* SUBMIT BUTTON */
submitBtn: {
    marginTop: 18,
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
},

submitBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
},

footerNote: {
    textAlign: "center",
    marginTop: 8,
    color: "#94A3B8",
    fontSize: 12,
},
notesTagRecording: {
    backgroundColor: "#FEE2E2",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  
  notesTagRecordingText: {
    color: "#DC2626",
    fontWeight: "700",
    fontSize: 11,
  },
  
  

});

