import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function SettingsScreen() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [visitReminderEnabled, setVisitReminderEnabled] = useState(true);
  const [targetAlertEnabled, setTargetAlertEnabled] = useState(false);
  const [gpsTracking, setGpsTracking] = useState(true);
const [autoCheckIn, setAutoCheckIn] = useState(false);
const [routeOpt, setRouteOpt] = useState(true);
const [offlineEnabled, setOfflineEnabled] = useState(false);
const [biometricEnabled, setBiometricEnabled] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f6f8" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Page Title */}
        <Text style={styles.pageTitle}>Settings</Text>

        {/* ================= USER PROFILE CARD ================= */}
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Ionicons name="person-outline" size={32} color="#3b82f6" />
            </View>

            <View>
              <Text style={styles.profileName}>Rajesh Kumar</Text>
              <Text style={styles.profileRole}>Medical Representative</Text>

              <View style={styles.empPill}>
                <Text style={styles.empPillText}>EMP2024789</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Left labels + right aligned values */}
          <View style={styles.row}>
            <View style={styles.leftColumn}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.label}>Territory:</Text>
              <Text style={styles.label}>Reporting Manager:</Text>
            </View>

            <View style={styles.rightColumn}>
              <Text style={styles.value}>rajesh.kumar@lupin.com</Text>
              <Text style={styles.value}>+91 98765 43210</Text>
              <Text style={styles.value}>South Mumbai Zone</Text>
              <Text style={styles.value}>Priya Sharma</Text>
            </View>
          </View>

          {/* Edit profile button */}
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* ================= NOTIFICATIONS CARD ================= */}
        <View style={styles.card}>
          {/* Title */}
          <View style={styles.notificationHeader}>
            <Ionicons name="notifications-outline" size={18} color="#374151" />
            <Text style={styles.notificationTitle}>Notifications</Text>
          </View>

          {/* Notification Items */}
          {renderSwitchItem(
            "Push Notifications",
            "Receive alerts for important updates",
            pushEnabled,
            setPushEnabled
          )}

          {renderSwitchItem(
            "Email Notifications",
            "Get daily summary emails",
            emailEnabled,
            setEmailEnabled
          )}

          {renderSwitchItem(
            "Visit Reminders",
            "Reminders for scheduled visits",
            visitReminderEnabled,
            setVisitReminderEnabled
          )}

          {renderSwitchItem(
            "Target Alerts",
            "Alerts when approaching targets",
            targetAlertEnabled,
            setTargetAlertEnabled
          )}
        </View>
        {/* ================= LOCATION & TRACKING ================= */}
<View style={styles.card}>
  <View style={styles.sectionHeader}>
    <Ionicons name="location-outline" size={18} color="#374151" />
    <Text style={styles.sectionHeaderText}>Location & Tracking</Text>
  </View>

  {renderSwitchItem(
    "GPS Tracking",
    "Enable location tracking for visits",
    gpsTracking,
    setGpsTracking
  )}

  {renderSwitchItem(
    "Auto Check-in",
    "Automatic attendance marking",
    autoCheckIn,
    setAutoCheckIn
  )}

  {renderSwitchItem(
    "Route Optimization",
    "AI-powered route suggestions",
    routeOpt,
    setRouteOpt
  )}
</View>

{/* ================= APP SETTINGS ================= */}
<View style={styles.card}>
  <View style={styles.sectionHeader}>
    <Ionicons name="apps-outline" size={18} color="#374151" />
    <Text style={styles.sectionHeaderText}>App Settings</Text>
  </View>

  {/* Language Row */}
  <TouchableOpacity style={styles.rowItem}>
    <View style={styles.rowLeft}>
      <Ionicons name="globe-outline" size={18} color="#374151" />
      <View>
        <Text style={styles.itemTitle}>Language</Text>
        <Text style={styles.itemSubtitle}>English</Text>
      </View>
    </View>

    <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
  </TouchableOpacity>

  {/* Data Sync Row */}
  <View style={styles.rowItem}>
    <View style={styles.rowLeft}>
      <Ionicons name="sync-outline" size={18} color="#374151" />
      <View>
        <Text style={styles.itemTitle}>Data Sync</Text>
        <Text style={styles.itemSubtitle}>Last synced: 2 mins ago</Text>
      </View>
    </View>

    <TouchableOpacity style={styles.syncBtn}>
      <Text style={styles.syncBtnText}>Sync Now</Text>
    </TouchableOpacity>
  </View>

  {/* Offline Mode Row */}
  <View style={styles.rowItem}>
    <View style={styles.rowLeft}>
      <Ionicons name="cloud-offline-outline" size={18} color="#374151" />
      <View>
        <Text style={styles.itemTitle}>Offline Mode</Text>
        <Text style={styles.itemSubtitle}>Work without internet</Text>
      </View>
    </View>

    <Switch
      value={offlineEnabled}
      onValueChange={setOfflineEnabled}
      trackColor={{ false: "#d1d5db", true: "#10b981" }}
      thumbColor="#fff"
    />
  </View>
</View>

{/* ================= PRIVACY & SECURITY ================= */}
<View style={styles.card}>
  <View style={styles.sectionHeader}>
    <Ionicons name="shield-outline" size={18} color="#374151" />
    <Text style={styles.sectionHeaderText}>Privacy & Security</Text>
  </View>

  {/* Change Password */}
  <TouchableOpacity style={styles.rowItem}>
    <View>
      <Text style={styles.itemTitle}>Change Password</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
  </TouchableOpacity>

  {/* Privacy Policy */}
  <TouchableOpacity style={styles.rowItem}>
    <View>
      <Text style={styles.itemTitle}>Privacy Policy</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
  </TouchableOpacity>

  {/* Terms of Service */}
  <TouchableOpacity style={styles.rowItem}>
    <View>
      <Text style={styles.itemTitle}>Terms of Service</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
  </TouchableOpacity>

  {/* Biometric Login */}
  <View style={styles.rowItem}>
    <View>
      <Text style={styles.itemTitle}>Biometric Login</Text>
      <Text style={styles.itemSubtitle}>Use fingerprint/face ID</Text>
    </View>

    <Switch
      value={biometricEnabled}
      onValueChange={setBiometricEnabled}
      trackColor={{ false: "#d1d5db", true: "#10b981" }}
      thumbColor="#fff"
    />
  </View>
</View>

{/* ================= APP INFO BLOCK ================= */}
<View style={styles.card}>
  <View style={styles.appInfoRow}>
    <Text style={styles.infoLabel}>App Version:</Text>
    <Text style={styles.infoValue}>2.1.5</Text>
  </View>

  <View style={styles.appInfoRow}>
    <Text style={styles.infoLabel}>Build:</Text>
    <Text style={styles.infoValue}>2024.11.5</Text>
  </View>

  <View style={styles.appInfoRow}>
    <Text style={styles.infoLabel}>Last Update:</Text>
    <Text style={styles.infoValue}>Nov 1, 2025</Text>
  </View>

  {/* Check Updates Button */}
  <TouchableOpacity style={styles.updateBtn}>
    <Text style={styles.updateBtnText}>Check for Updates</Text>
  </TouchableOpacity>
</View>

{/* ================= LOGOUT BUTTON ================= */}
<TouchableOpacity style={styles.logoutBar}>
  <Ionicons name="log-out-outline" size={18} color="#fff" />
  <Text style={styles.logoutBarText}>Logout</Text>
</TouchableOpacity>


      </ScrollView>
    </SafeAreaView>
  );
}

/* ======================= HELPER FUNCTION ======================= */

function renderSwitchItem(title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, subtitle: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, value: boolean | undefined, onChange: ((value: boolean) => void | Promise<void>) | null | undefined) {
  return (
    <View style={styles.switchRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.switchTitle}>{title}</Text>
        <Text style={styles.switchSubtitle}>{subtitle}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: "#d1d5db", true: "#10b981" }}
        thumbColor="#fff"
      />
    </View>
  );
}

/* ================================ STYLES ================================ */

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
    color: "#111827",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  /* Profile Section */
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 999,
    backgroundColor: "#e6efff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  profileName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  profileRole: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 3,
  },

  empPill: {
    marginTop: 6,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  empPillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#374151",
  },

  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 14,
  },

  row: {
    flexDirection: "row",
    marginBottom: 14,
  },

  leftColumn: {
    flex: 1,
    gap: 14,
  },

  rightColumn: {
    flex: 1,
    alignItems: "flex-end",
    gap: 14,
  },

  label: {
    color: "#6b7280",
    fontSize: 13,
  },

  value: {
    color: "#111827",
    fontSize: 13,
  },

  editBtn: {
    marginTop: 6,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    alignItems: "center",
  },

  editBtnText: {
    color: "#1D4ED8",
    fontWeight: "600",
  },

  /* Notifications Section */
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    gap: 8,
  },

  notificationTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  switchTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  switchSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    gap: 8,
  },
  
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  
  itemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  
  itemSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  
  syncBtn: {
    backgroundColor: "#e5f3ff",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  
  syncBtnText: {
    color: "#1d4ed8",
    fontWeight: "600",
    fontSize: 12,
  },

  appInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  
  infoLabel: {
    fontSize: 13,
    color: "#6b7280",
  },
  
  infoValue: {
    fontSize: 13,
    color: "#111827",
    fontWeight: "600",
  },
  
  updateBtn: {
    marginTop: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    alignItems: "center",
  },
  
  updateBtnText: {
    fontSize: 14,
    color: "#1d4ed8",
    fontWeight: "600",
  },
  
  logoutBar: {
    backgroundColor: "#dc2626",
    paddingVertical: 14,
    marginTop: 20,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  
  logoutBarText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  
  
});
