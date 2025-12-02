// SystemExperience.tsx
// FINAL VERSION — Now includes:
// Unified Interface
// Personalized Insights
// Real-Time Support
// Mobile-First Design
// Continuous Learning
// Fixed Header + Scrollable Body

import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    View,
} from "react-native";

export default function SystemExperience() {
    
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      <StatusBar barStyle="light-content" backgroundColor="#0B8A30" />

      {/* FIXED HEADER */}
      <View
        style={{
          backgroundColor: "#00AB84",
          paddingVertical: 26,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 20, color: "#fff", fontWeight: "700" }}>
          System of Experience
        </Text>
        <Text style={{ fontSize: 13, color: "#E8FDEB", marginTop: 4 }}>
          Comprehensive CRM Platform Highlights
        </Text>
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        {/* ====== STATS BAR (kept same as previous working version) ====== */}
        <View
          style={{
            backgroundColor: "#fff",
            marginHorizontal: 16,
            marginTop: 16,
            borderRadius: 12,
            paddingVertical: 26,
            borderWidth: 1,
            borderColor: "#E5E7EB",
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          {/* TOP ROW */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Column icon={<Feather name="monitor" size={30} color="#028A3D" />} value="20+" />
            <Column icon={<MaterialIcons name="school" size={30} color="#028A3D" />} value="20" />
            <Column icon={<MaterialIcons name="psychology" size={30} color="#028A3D" />} value="15+" />
            <Column icon={<Feather name="trending-up" size={30} color="#028A3D" />} value="8+" />
          </View>

          {/* Bottom labels */}
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <Text style={{ color: "#6B7280", fontSize: 12 }}>Total Modules</Text>
            <Text style={{ color: "#6B7280", fontSize: 12 }}>Training Modules</Text>
            <Text style={{ color: "#6B7280", fontSize: 12 }}>AI Features</Text>
            <Text style={{ color: "#6B7280", fontSize: 12 }}>Integration Points</Text>
          </View>
        </View>

        {/* ===== EXISTING CARDS ===== */}
        <SectionCard
          title="Unified Interface"
          color="#1E40AF"
          iconName="desktop-windows"
          headerBg="#EFF6FF"
          headerBorder="#DBEAFE"
          badgeColor="#059669"
          description="Single platform for planning, engagement, reporting, and admin tasks"
          features={[
            "Integrated Dashboard with all key metrics",
            "Territory Route Planning with GPS optimization",
            "HCP Management with 360° profiles",
            "Digital Call Reporting with voice-to-text",
            "Sample Tracking with UCPMP compliance",
            "Expense & Leave Management",
            "Bid & Distributor Management",
            "Analytics & Compliance Tracking",
          ]}
          modules={[
            "Dashboard",
            "Territory Planning",
            "HCP Management",
            "Call Reporting",
            "Expense Management",
            "Leave Management",
            "Analytics",
            "Settings",
          ]}
        />

        <SectionCard
          title="Personalized Insights"
          color="#7C3AED"
          iconName="psychology"
          headerBg="#F9F5FF"
          headerBorder="#E9D8FD"
          badgeColor="#059669"
          description="AI-powered insights for doctor interactions and sales strategy"
          features={[
            "HCP 360° profiles with detailed demographics",
            "Prescription potential & behavior analysis",
            "Smart call planning recommendations",
            "Territory-specific performance metrics",
            "Predictive analytics for sales targets",
            "Personalized detailing sequences",
            "KOL identification & engagement tracking",
            "Market intelligence & competitive insights",
          ]}
          modules={[
            "360° Doctor Profiles",
            "AI Pre-Call Session",
            "Analytics Dashboard",
            "KOL Management",
          ]}
        />

        <SectionCard
          title="Real-Time Support"
          color="#059669"
          iconName="support-agent"
          headerBg="#ECFDF5"
          headerBorder="#BBF7D0"
          badgeColor="#059669"
          description="Integrated CRM with AI chatbot for instant assistance"
          features={[
            "Floating AI chatbot accessible from all screens",
            "Context-aware intelligent suggestions",
            "Real-time HCP insights & recommendations",
            "Voice-to-text call documentation",
            "Instant access to product information",
            "Quick route optimization suggestions",
            "Smart follow-up reminders",
            "AI-powered market intelligence",
          ]}
          modules={[
            "AI Chatbot Assistant",
            "Voice-to-Text Reporting",
            "Smart Notifications",
            "AI Analytics",
          ]}
        />

        {/* ============================================================
                NEW SECTION 1: MOBILE-FIRST DESIGN
        ============================================================ */}
        <SectionCard
          title="Mobile-First Design"
          color="#0284C7"
          iconName="smartphone"
          headerBg="#EFFFFF"   // Very light aqua blue
          headerBorder="#CFFAFE"
          badgeColor="#059669"
          description="Optimized for field force convenience on mobile devices"
          features={[
            "Responsive design for all screen sizes",
            "Touch-optimized UI for mobile interaction",
            "GPS-enabled territory planning",
            "Geo-tagging for doctor visits",
            "Offline-ready capabilities",
            "Quick-access bottom navigation",
            "Swipe gestures for efficiency",
            "Mobile-optimized data entry forms",
          ]}
          modules={[
            "Mobile Dashboard",
            "GPS Route Planning",
            "Quick Call Reporting",
            "Mobile Expense Claims",
          ]}
        />

        {/* ============================================================
                NEW SECTION 2: CONTINUOUS LEARNING
        ============================================================ */}
        <SectionCard
          title="Continuous Learning"
          color="#C2410C"
          iconName="menu-book"
          headerBg="#FFF7ED"   // Soft cream
          headerBorder="#FED7AA"
          badgeColor="#059669"
          description="Training and knowledge sharing embedded in daily workflow"
          features={[
            "20 comprehensive pharmaceutical training modules",
            "Company overview & culture training",
            "Therapy area deep-dive modules",
            "Product knowledge certifications",
            "Communication & selling skills development",
            "CRM & digital tool training",
            "Compliance & regulatory training",
            "Best practices sharing platform",
          ]}
          modules={[
            "Team Learning Hub",
            "Training Modules",
            "Knowledge Sharing",
            "E-Detailing Resources",
          ]}
        />
        {/* ============================================================
      NEW SECTION 7: INTEGRATED OPERATIONS
============================================================ */}
<SectionCard
  title="Integrated Operations"
  color="#B91C1C"
  iconName="work"
  headerBg="#FFF1F2"
  headerBorder="#FECACA"
  badgeColor="#059669"
  description="Complete expense, leave & attendance management"
  features={[
    "Digital expense claim submission",
    "Automated travel & DA calculations",
    "Receipt capture & verification",
    "Real-time expense approval workflow",
    "Leave application & balance tracking",
    "Attendance marking with geo-verification",
    "Holiday calendar integration",
    "Manager approval dashboard",
  ]}
  modules={[
    "Expense Management",
    "Leave Management",
    "Attendance Tracking",
    "Approval Workflows",
  ]}
/>

{/* ============================================================
      NEW SECTION 8: COMPLETION BANNER
============================================================ */}
<View
  style={{
    marginTop: 20,
    marginHorizontal: 12,
    backgroundColor: "#0B8A30",
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  }}
>
  {/* Icon */}
  <MaterialIcons name="emoji-events" size={40} color="white" />

  <Text
    style={{
      marginTop: 10,
      fontSize: 18,
      fontWeight: "700",
      color: "#fff",
      textAlign: "center",
    }}
  >
    Complete System of Experience
  </Text>

  <Text
    style={{
      marginTop: 6,
      fontSize: 13,
      color: "#E6FBEA",
      textAlign: "center",
      maxWidth: 300,
    }}
  >
    All 6 core experience highlights are fully implemented in this comprehensive
    mobile CRM platform
  </Text>

  {/* FOOTER ROW */}
  <View
    style={{
      flexDirection: "row",
      marginTop: 18,
      gap: 14,
      flexWrap: "wrap",
      justifyContent: "center",
    }}
  >
    {/* Item 1 */}
    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
      <MaterialIcons name="check-circle" size={18} color="white" />
      <Text style={{ color: "white", fontSize: 13 }}>Production Ready</Text>
    </View>

    {/* Item 2 */}
    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
      <MaterialIcons name="verified" size={18} color="white" />
      <Text style={{ color: "white", fontSize: 13 }}>Fully Interactive</Text>
    </View>

    {/* Item 3 */}
    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
      <MaterialIcons name="smartphone" size={18} color="white" />
      <Text style={{ color: "white", fontSize: 13 }}>Mobile Optimized</Text>
    </View>
  </View>
</View>


        {/* END OF ALL SECTIONS */}
      </ScrollView>
    </SafeAreaView>
  );
}

/* Small helper */
function Column({ icon, value }: any) {
  return (
    <View style={{ alignItems: "center" }}>
      {icon}
      <Text style={{ fontSize: 18, fontWeight: "700", marginTop: 4 }}>
        {value}
      </Text>
    </View>
  );
}

/* SECTION COMPONENT */
function SectionCard({
  title,
  color,
  iconName,
  headerBg,
  headerBorder,
  badgeColor,
  description,
  features,
  modules,
}: any) {

const MODULE_ROUTES: any = {
  "Dashboard": "/(tabs)",
  "Territory Planning": "/route",
  "HCP Management": "/hcps",
  "Call Reporting": "/calls",
  "Expense Management": "/screens/field-activities/expense-management",
  "Leave Management": "/screens/field-activities/leave-attendance",
  "Analytics": "/analytics",
  "Settings": "/screens/compliance-audit/settings-index",

  "360° Doctor Profiles": "/hcps",
  "AI Pre-Call Session": "/(tabs)",
  "Analytics Dashboard": "/analytics",
  "KOL Management": "/screens/engagement-marketing/kol-management",

  "AI Chatbot Assistant": "/(tabs)",
  "Voice-to-Text Reporting": "/calls",
  "Smart Notifications": "/(tabs)",
  "AI Analytics": "/analytics",

  "Mobile Dashboard": "/(tabs)",
  "GPS Route Planning": "/route",
  "Quick Call Reporting": "/calls",
  "Mobile Expense Claims": "/screens/field-activities/expense-management",

  "Team Learning Hub": "/screens/team-learning/team-collaboration",
  "Training Modules": "/screens/team-learning/team-collaboration",
  "Knowledge Sharing": "/screens/team-learning/team-collaboration",
  "E-Detailing Resources": "/screens/engagement-marketing/e-detailing",

  "Approval Workflows": "/screens/field-activities/expense-management",
  "Attendance Tracking": "/screens/field-activities/leave-attendance",
};
const router = useRouter();
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        marginHorizontal: 16,
        marginTop: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <View
        style={{
          backgroundColor: headerBg,
          padding: 18,
          borderBottomWidth: 1,
          borderColor: headerBorder,
        }}
      >
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <MaterialIcons name={iconName} size={22} color={color} />
            <Text style={{ fontSize: 16, fontWeight: "700", color }}>{title}</Text>
          </View>

          <View
            style={{
              backgroundColor: "#ECFDF5",
              borderColor: "#BBF7D0",
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: badgeColor, fontSize: 12, fontWeight: "700" }}>Implemented</Text>
          </View>
        </View>

        <Text style={{ marginTop: 6, fontSize: 13, color: "#475569" }}>{description}</Text>
      </View>

      {/* Content */}
      <View style={{ padding: 18 }}>
        <Text style={{ fontSize: 15, fontWeight: "700", color: "#0F172A", marginBottom: 10 }}>
          Key Features
        </Text>

        {features.map((f: string, i: number) => (
          <View
            key={i}
            style={{ flexDirection: "row", alignItems: "center", marginBottom: 8, gap: 8 }}
          >
            <MaterialIcons name="check-circle" size={18} color="#059669" />
            <Text style={{ fontSize: 14, color: "#334155" }}>{f}</Text>
          </View>
        ))}

        <Text style={{ marginTop: 16, fontWeight: "700", fontSize: 15, color: "#0F172A" }}>
          Related Modules
        </Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
          {modules.map((m: string, i: number) => (
           <Pressable
           key={i}
           onPress={() => {
             const route = MODULE_ROUTES[m];
             if (route) router.push(route);
             else console.warn("No route mapped for:", m);
           }}
           style={{
             paddingHorizontal: 14,
             paddingVertical: 8,
             borderWidth: 1,
             borderColor: "#E2E8F0",
             backgroundColor: "#F1F5F9",
             borderRadius: 20,
           }}
         >
           <Text style={{ fontSize: 12, color: "#475569" }}>{m}</Text>
         </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}
