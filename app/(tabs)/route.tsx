import FilterRoutesDrawer from "@/components/FilterRoutesDrawer";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from "react-native";
import MapView, { UrlTile } from 'react-native-maps';
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  lupinGreen: "#00A651",
  lupinGreenDark: "#00833F",
  lupinBlue: "#2D73FF",
  bg: "#F5F6FA",
  card: "#FFFFFF",
  textDark: "#141414",
  textLight: "#808495",
  border: "#E2E4ED",
  high: "#FF6565",
  medium: "#FFB020",
  low: "#3CCF4E",
  chipGold: "#FFC857",
  chipSilver: "#BDC3C7",
  chipBronze: "#D35400",
  alert: "#FFF4F2",
  headerBg: "#e5e7eb"
};

const ROUTE_TABS = ["Today's Route", "Map View", "This Week", "Plan New"] as const;
type RouteTab = (typeof ROUTE_TABS)[number];

type RouteSummary = {
  distanceKm: string;
  duration: string;
  visits: number;
  traffic: "Light" | "Moderate" | "Heavy";
};

type Poi = {
  id: string;
  name: string;
  type: string;
  distanceKm: string;
  colorDot: string;
};

type DoctorCoverage = {
  id: string;
  name: string;
  tier: "Gold" | "Silver" | "Bronze";
  lastVisit: string;
  requiredFrequency: string;
  rxPotential: string;
  status: "Overdue" | "New" | "Upcoming";
};

type MapViewData = {
  summary: RouteSummary;
  liveTrafficMessage: string;
  pois: Poi[];
  doctors: DoctorCoverage[];
};

const MAP_VIEW_DATA: MapViewData = {
  summary: {
    distanceKm: "18.6 km",
    duration: "6h 20m",
    visits: 6,
    traffic: "Light",
  },
  liveTrafficMessage:
    "Heavy traffic detected near Bombay Hospital (Stop 5). Consider rescheduling or alternative route will add 15 minutes.",
  pois: [
    {
      id: "poi1",
      name: "Cafe Coffee Day",
      type: "Cafe",
      distanceKm: "0.3 km",
      colorDot: "#F59E0B",
    },
    {
      id: "poi2",
      name: "Reliance Smart Pharmacy",
      type: "Pharmacy",
      distanceKm: "0.5 km",
      colorDot: "#22C55E",
    },
    {
      id: "poi3",
      name: "HDFC Bank ATM",
      type: "ATM",
      distanceKm: "0.2 km",
      colorDot: "#3B82F6",
    },
    {
      id: "poi4",
      name: "HP Petrol Pump",
      type: "Fuel Station",
      distanceKm: "1.2 km",
      colorDot: "#EF4444",
    },
  ],
  doctors: [
    {
      id: "doc1",
      name: "Dr. Sharma",
      tier: "Gold",
      lastVisit: "Last visit: 3 weeks ago",
      requiredFrequency: "Required frequency: Biweekly",
      rxPotential: "Rx Potential: Very High",
      status: "Overdue",
    },
    {
      id: "doc2",
      name: "Dr. Mehta",
      tier: "Gold",
      lastVisit: "Last visit: 4 weeks ago",
      requiredFrequency: "Required frequency: Biweekly",
      rxPotential: "Rx Potential: Very High",
      status: "Overdue",
    },
    {
      id: "doc3",
      name: "Dr. Gupta",
      tier: "Gold",
      lastVisit: "Last visit: Never",
      requiredFrequency: "Required frequency: Biweekly",
      rxPotential: "Rx Potential: Very High",
      status: "New",
    },
  ],
}
const { summary } = MAP_VIEW_DATA;

type WeekDay = {
  day: string;
  date: string;
  planned: number;
  coverage: number;
  completed?: number; // undefined means not completed
};

const WEEK_DATA: WeekDay[] = [
  { day: "Monday", date: "Nov 4, 2025", planned: 6, coverage: 8, completed: 6 },
  { day: "Tuesday", date: "Nov 5, 2025", planned: 7, coverage: 9 },
  { day: "Wednesday", date: "Nov 6, 2025", planned: 5, coverage: 7 },
  { day: "Thursday", date: "Nov 7, 2025", planned: 8, coverage: 10 },
  { day: "Friday", date: "Nov 8, 2025", planned: 6, coverage: 8 },
];

const HCP_OPTIONS = [
  "High Priority (Gold Tier)",
  "Medium Priority (Silver Tier)",
  "All Tiers",
  "Pending Visits (Last 30 days)"
];

export default function RouteScreen() {
  const [showFilter, setShowFilter] = useState(false);
  const [activeRouteTab, setActiveRouteTab] = useState<RouteTab>("Today's Route");
  const [date, setDate] = useState("");
  const [hcp, setHcp] = useState(HCP_OPTIONS[0]);
  const [hcpDropdownOpen, setHcpDropdownOpen] = useState(false);
  const [maxVisits, setMaxVisits] = useState("6");
  const [aiEnabled, setAiEnabled] = useState(true);
  const [aiAlert, setAiAlert] = useState<string | null>(null);
  const [aiAlertIcon, setAiAlertIcon] = useState<string | null>(null);


  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        {/* NEW TOP BAR (like attached image) */}
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>Territory &amp; Route Planning</Text>

          <TouchableOpacity style={styles.topBarFilterBtn}>
            <Ionicons name="funnel-outline" size={16} color={COLORS.textDark} />
            <Text style={styles.topBarFilterText} onPress={() => setShowFilter(true)}>Filters</Text>
          </TouchableOpacity>
          <FilterRoutesDrawer
            visible={showFilter}
            onClose={() => setShowFilter(false)}
          />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ paddingBottom: 90 }}
          showsVerticalScrollIndicator={false}
        >
          {/* AI POWERED ROUTE OPTIMIZATION */}
          <View style={styles.aiBanner}>
            <View style={{ flex: 1 }}>
              <Text style={styles.aiTitle}>AI-Powered Route Optimization</Text>
              <Text style={styles.aiSubtitle}>
                Smart routing enabled based on GPS, traffic data, and HCP
                priority.
              </Text>
              <View style={styles.aiStatsRow}>
                <AiStat label="Distance Saved" value="-2.4 km" />
                <AiStat label="Time Saved" value="-35 min" />
                <AiStat label="Fuel Saved" value="₹180" />
              </View>
            </View>
            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>Active</Text>
            </View>
          </View>

          {/* TERRITORY SUMMARY */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              My Territory – South Mumbai Zone
            </Text>

            <View style={styles.grid2}>
              <SummaryCard
                title="Total HCPs"
                main="248"
                chipLeft="Gold: 45"
                chipRight="Silver: 80"
              />
              <SummaryCard
                title="Coverage This Month"
                main="92%"
                progress={0.92}
              />
            </View>

            <View style={[styles.grid2, { marginTop: 12 }]}>
              <SummaryCard
                title="High Priority Pending"
                main="12"
                chipLeft="Gold & silver"
              />
              <SummaryCard
                title="Avg Visit Frequency"
                main="2.4x"
                caption="Per month"
              />
            </View>
          </View>

          {/* COVERAGE HEATMAP */}
          <View style={styles.section}>
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>Coverage Heatmap</Text>
              <View style={styles.legendRow}>
                <LegendDot color={COLORS.high} label="High" />
                <LegendDot color={COLORS.medium} label="Medium" />
                <LegendDot color={COLORS.low} label="Low" />
              </View>
            </View>

            <View style={styles.heatmapGrid}>
              {Array.from({ length: 5 * 5 }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.heatBlock,
                    i % 7 === 0
                      ? { backgroundColor: COLORS.low }
                      : i % 3 === 0
                        ? { backgroundColor: COLORS.medium }
                        : { backgroundColor: COLORS.high },
                  ]}
                />
              ))}
            </View>

            <View style={styles.alertBar}>
              <Ionicons
                name="alert-circle-outline"
                size={14}
                color={COLORS.high}
              />
              <Text style={styles.alertText}>
                North Mumbai area shows low coverage (42%). Plan additional
                visits this week.
              </Text>
            </View>
          </View>

          {/* TABS (Today's Route / Map View / This Week / Plan New) */}
          <View style={styles.tabsWrapper}>
            {ROUTE_TABS.map((tab) => {
              const isActive = tab === activeRouteTab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tabPill, isActive && styles.tabPillActive]}
                  onPress={() => setActiveRouteTab(tab)}
                >
                  <Text style={[styles.tabPillText, isActive && styles.tabPillTextActive]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {activeRouteTab === "Today's Route" && (
            <View>
              {/* AI ROUTE INTELLIGENCE BANNER */}
              <View style={styles.aiRouteCard}>
                <View style={styles.rowBetween}>
                  <View>
                    <Text style={styles.aiRouteTitle}>AI Route Intelligence</Text>
                    <Text style={styles.aiRouteSubtitle}>
                      Real-time optimization with traffic & availability
                    </Text>
                  </View>
                  <Ionicons name="sparkles-outline" size={22} color="#fff" />
                </View>

                <View style={styles.aiRouteNoteRow}>
                  <View style={styles.dot} />
                  <Text style={styles.aiRouteNote}>
                    Light traffic on Linking Road until 11 AM – Saves 25 mins
                  </Text>
                </View>
                <View style={styles.aiRouteNoteRow}>
                  <View style={styles.dot} />
                  <Text style={styles.aiRouteNote}>
                    Dr. Sharma available 9-11 AM – Book early slot
                  </Text>
                </View>
              </View>

              {/* ROUTE / MAP / HCP / CALLS / ANALYTICS SMALL TABBAR */}
              <View style={styles.subTabRow}>
                <BottomMiniTab label="Route" active />
                <BottomMiniTab label="Map" />
                <BottomMiniTab label="HCPs" />
                <BottomMiniTab label="Calls" />
                <BottomMiniTab label="Analytics" />
              </View>

              {/* OPTIMIZED ROUTE SUMMARY */}
              <View style={styles.section}>
                <View style={styles.rowBetween}>
                  <Text style={styles.sectionTitle}>Optimized Route</Text>
                  <TouchableOpacity style={styles.startBtn}>
                    <Ionicons name="play" size={14} color="#fff" />
                    <Text style={styles.startBtnText}>Start GPS</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.grid3}>
                  <MiniStat label="Total Distance" value="18.6 km" />
                  <MiniStat label="Est. Time" value="6h 20m" />
                  <MiniStat label="Visits" value="6" />
                </View>

                <Text style={styles.helperText}>
                  Route optimized considering traffic patterns and HCP availability.
                </Text>
              </View>

              {/* OpenStreetMap via react-native-maps UrlTile */}
              <View style={{ marginTop: 14, marginHorizontal: 16, borderRadius: 16, overflow: 'hidden' }}>
                <MapView
              style={styles.map}
              initialRegion={{
                latitude: 19.0176,
                longitude: 72.8562,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              <UrlTile
                urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maximumZ={19}
                flipY={false}
              />
            </MapView>
              </View>

              {/* VISIT LIST */}
              <View style={styles.section}>
                <VisitCard
                  index={1}
                  name="Dr. Sharma"
                  speciality="Cardiologist"
                  tags={["Gold", "High"]}
                  distance="2.3 km"
                  rxPotential="High"
                  traffic="Light"
                  time="09:00 AM"
                  duration="45 min"
                />
                <VisitCard
                  index={2}
                  name="Dr. Patel"
                  speciality="Diabetologist"
                  tags={["Silver", "Medium"]}
                  distance="1.8 km"
                  rxPotential="Medium"
                  traffic="Light"
                  time="10:30 AM"
                  duration="30 min"
                />
                <VisitCard
                  index={3}
                  name="Dr. Mehta"
                  speciality="General Physician"
                  tags={["Gold", "High"]}
                  distance="3.2 km"
                  rxPotential="Very High"
                  traffic="Moderate"
                  time="12:00 PM"
                  duration="50 min"
                />
                <VisitCard
                  index={4}
                  name="Dr. Kumar"
                  speciality="Cardiologist"
                  tags={["Bronze", "Low"]}
                  distance="2.1 km"
                  rxPotential="Medium"
                  traffic="Heavy"
                  time="02:00 PM"
                  duration="40 min"
                />
                <VisitCard
                  index={5}
                  name="Dr. Gupta"
                  speciality="Endocrinologist"
                  tags={["Gold", "High"]}
                  distance="4.5 km"
                  rxPotential="Very High"
                  traffic="Heavy"
                  time="03:30 PM"
                  duration="60 min"
                />
                <VisitCard
                  index={6}
                  name="Dr. Singh"
                  speciality="Diabetologist"
                  tags={["Silver", "Medium"]}
                  distance="2.8 km"
                  rxPotential="High"
                  traffic="Moderate"
                  time="05:00 PM"
                  duration="35 min"
                />
              </View>
            </View>
          )}

          {activeRouteTab === "Map View" && renderMapView(aiAlert, setAiAlert, aiAlertIcon, setAiAlertIcon)}
          {activeRouteTab === "This Week" && renderThisWeek()}
          {activeRouteTab === "Plan New" && renderPlanNew(date,
            setDate,
            hcp,
            setHcp,
            hcpDropdownOpen,
            setHcpDropdownOpen,
            maxVisits,
            setMaxVisits,
            aiEnabled,
            setAiEnabled)}

          {/* DOCTOR COVERAGE PLANNING */}
          {renderDoctorCoverage()}

          {/* OVERLAP ALERT */}
          <View style={styles.overlapCard}>
            <View style={styles.rowBetween}>
              <View style={styles.rowCenter}>
                <Ionicons
                  name="alert-circle-outline"
                  size={18}
                  color={COLORS.high}
                />
                <Text style={styles.overlapTitle}>
                  Overlap Management Alert
                </Text>
              </View>
            </View>
            <Text style={styles.overlapText}>
              2 HCPs in your territory are also covered by Oncology division.
              Coordinate with Rep ID: EMP2024790 to avoid duplication.
            </Text>
            <TouchableOpacity style={styles.viewDetailsBtn}>
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {aiAlert && (
        <View style={styles.aiAlertPopup}>
          <Ionicons
            name={aiAlertIcon === "checkmark-circle" ? "checkmark-circle" : "alert-circle"}
            size={18}
            color="#111"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.aiAlertText}>{aiAlert}</Text>
        </View>
      )}

    </SafeAreaView>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

const AiStat = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.aiStat}>
    <Text style={styles.aiStatValue}>{value}</Text>
    <Text style={styles.aiStatLabel}>{label}</Text>
  </View>
);

// ... other small components stay the same (SummaryCard, etc.)

const TopTab = ({ label, active }: { label: string; active?: boolean }) => (
  <TouchableOpacity
    style={[
      styles.tabItem,
      active && styles.tabItemActive,
    ]}
  >
    <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
  </TouchableOpacity>
);

const BottomMiniTab = ({ label, active }: { label: string; active?: boolean }) => (
  <View style={styles.subTabItem}>
    <Text style={[styles.subTabText, active && styles.subTabTextActive]}>{label}</Text>
    {active && <View style={styles.subTabIndicator} />}
  </View>
);

const LegendDot = ({ color, label }: { color: string; label: string }) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendDot, { backgroundColor: color }]} />
    <Text style={styles.legendLabel}>{label}</Text>
  </View>
);

const CoverageCard = ({
  name,
  status,
  lastVisit,
  frequency,
  potential,
}: {
  name: string;
  status: string;
  lastVisit: string;
  frequency: string;
  potential: string;
}) => (
  <View style={styles.coverageCard}>
    <Text style={styles.coverageName}>{name}</Text>
    <Text style={styles.coverageMeta}>{status}</Text>
    <Text style={styles.coverageMeta}>{lastVisit}</Text>
    <Text style={styles.coverageMeta}>{frequency}</Text>
    <Text style={styles.coverageMeta}>{potential}</Text>
  </View>
);

const VisitCard = ({
  index,
  name,
  speciality,
  tags,
  distance,
  rxPotential,
  traffic,
  time,
  duration,
}: {
  index: number;
  name: string;
  speciality: string;
  tags: string[];
  distance: string;
  rxPotential: string;
  traffic: string;
  time: string;
  duration: string;
}) => (
  <View style={styles.visitCard}>
    <View style={styles.visitTopRow}>
      <View style={styles.visitIndexCircle}>
        <Text style={styles.visitIndexText}>{index}</Text>
      </View>
      <View>
        <Text style={styles.visitName}>{name}</Text>
        <Text style={styles.visitSpeciality}>{speciality}</Text>
      </View>
    </View>
    <View style={styles.visitTagRow}>
      {tags.map((tag, i) => (
        <View key={i} style={styles.visitTag}>
          <Text style={styles.visitTagText}>{tag}</Text>
        </View>
      ))}
    </View>
    <View style={styles.visitMetaRow}>
      <MetaItem label="Distance" value={distance} />
      <MetaItem label="Rx Potential" value={rxPotential} />
      <MetaItem label="Traffic" value={traffic} />
    </View>
    <View style={styles.visitMetaRow}>
      <MetaItem label="Time" value={time} />
      <MetaItem label="Duration" value={duration} />
    </View>
  </View>
);

const MetaItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.metaItem}>
    <Text style={styles.metaText}>{label}: {value}</Text>
  </View>
);

const SummaryCard = ({
  title,
  main,
  chipLeft,
  chipRight,
  progress,
  caption,
}: {
  title: string;
  main: string;
  chipLeft?: string;
  chipRight?: string;
  progress?: number;
  caption?: string;
}) => (
  <View style={styles.summaryCard}>
    <Text style={styles.summaryTitle}>{title}</Text>
    <Text style={styles.summaryMain}>{main}</Text>
    {caption && <Text style={styles.summaryCaption}>{caption}</Text>}
    {(chipLeft || chipRight) && (
      <View style={styles.summaryChipRow}>
        {chipLeft && (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{chipLeft}</Text>
          </View>
        )}
        {chipRight && (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{chipRight}</Text>
          </View>
        )}
      </View>
    )}
    {progress != null && (
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { flex: progress }]} />
        <View style={{ flex: 1 - progress }} />
      </View>
    )}
  </View>
);

// (keep LegendDot, TopTab, BottomMiniTab, VisitCard, MetaItem,
// CoverageCard, BottomNavItem exactly as you already had them)

const MiniStat = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.miniStat}>
    <Text style={styles.miniStatLabel}>{label}</Text>
    <Text style={styles.miniStatValue}>{value}</Text>
  </View>
);

const renderMapView = (aiAlert: string | null,
  setAiAlert: (v: string | null) => void,
  aiAlertIcon: string | null,
  setAiAlertIcon: (v: string | null) => void,) => (
  <>
    {/* Map placeholder */}
    <View style={styles.mapCard}>
      {/* Left legend */}
      {renderRouteLegend()}

      {/* Right controls */}
      <View style={styles.mapControls}>
        <TouchableOpacity style={styles.mapControlBtn}>
          <Ionicons name="add" size={18} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapControlBtn}>
          <Ionicons name="remove" size={18} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapControlBtn}>
          <Ionicons name="paper-plane-outline" size={18} />
        </TouchableOpacity>
      </View>

      {/* Simple placeholder route path */}
      <View style={styles.routePlaceholderWrapper}>
        <View style={styles.routePlaceholderLine} />
        <Text style={styles.routePlaceholderText}>
          Optimized route preview will appear here
        </Text>
      </View>
    </View>

    <View style={styles.summaryCardMapView}>
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Distance</Text>
        <Text style={styles.summaryValue}>{summary.distanceKm}</Text>
      </View>
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Duration</Text>
        <Text style={styles.summaryValue}>{summary.duration}</Text>
      </View>
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Visits</Text>
        <Text style={styles.summaryValue}>{summary.visits}</Text>
      </View>
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Traffic</Text>
        <Text style={[styles.summaryValue, { color: "#16A34A" }]}>
          {summary.traffic}
        </Text>
      </View>
    </View>

    {/*Nav buttons */}
    <View style={styles.navRow}>
      <TouchableOpacity style={styles.navPrimary} onPress={() => {
        setAiAlertIcon("checkmark-circle");
        setAiAlert("Starting turn-by-turn navigation...");
        setTimeout(() => setAiAlert(null), 3000);
      }}>
        <Ionicons name="navigate" size={18} color="#FFFFFF" />
        <Text style={styles.navPrimaryText}>  Start Navigation</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navSecondary} onPress={() => {
        setAiAlertIcon("information-circle");
        setAiAlert("Downloading route for offline use...");
        setTimeout(() => setAiAlert(null), 3000);
      }}>
        <Ionicons name="location-outline" size={18} color="#111827" />
        <Text style={styles.navSecondaryText}>  Save Offline</Text>
      </TouchableOpacity>
    </View>

    {/* Live Traffic */}
    <View style={styles.trafficCard}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={18}
          color="#EA580C"
        />
        <Text style={styles.trafficTitle}>  Live Traffic Update</Text>
      </View>
      <Text style={styles.trafficText}>{MAP_VIEW_DATA.liveTrafficMessage}</Text>
      <TouchableOpacity style={styles.trafficCta}>
        <Text style={styles.trafficCtaText}>View Alternative Route</Text>
      </TouchableOpacity>
    </View>

    {/* Poi List */}
    <View style={styles.cardContainer}>
      <View style={styles.cardHeaderRow}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="location-outline" size={18} color="#2563EB" />
          <Text style={styles.cardTitle}>  Nearby Points of Interest</Text>
        </View>
      </View>

      {MAP_VIEW_DATA.pois.map((poi) => (
        <View key={poi.id} style={styles.poiRow}>
          <View style={styles.poiLeft}>
            <View
              style={[styles.poiDot, { backgroundColor: poi.colorDot }]}
            />
            <View>
              <Text style={styles.poiName}>{poi.name}</Text>
              <Text style={styles.poiType}>{poi.type}</Text>
            </View>
          </View>
          <Text style={styles.poiDistance}>{poi.distanceKm}</Text>
        </View>
      ))}
    </View>
  </>
)

const renderThisWeek = () => (
  <View style={styles.weekBox}>
    <Text style={styles.sectionTitle}>Weekly Schedule Overview</Text>

    {WEEK_DATA.map((item, index) => {
      const isCompletedDay = item.completed !== undefined;

      return (
        <TouchableOpacity key={index} activeOpacity={0.8} style={[
          styles.card,
          isCompletedDay && styles.cardCompleted
        ]}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {/* LEFT */}
            <View>
              <Text style={styles.dayText}>{item.day}</Text>
              <Text style={styles.dateText}>{item.date}</Text>

              {isCompletedDay && (
                <View style={styles.completedBadge}>
                  <Text style={styles.completedBadgeText}>
                    Completed: {item.completed}/{item.planned}
                  </Text>
                </View>
              )}
            </View>

            {/* RIGHT */}
            <View style={{ alignItems: "flex-end", justifyContent: "center" }}>
              <Text style={styles.rightText}>Planned: {item.planned} visits</Text>
              <Text style={styles.rightText}>Coverage: {item.coverage} HCPs</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    })}
  </View>
)

const renderPlanNew = (date: string,
  setDate: (v: string) => void,
  hcp: string,
  setHcp: (v: string) => void,
  hcpDropdownOpen: boolean,
  setHcpDropdownOpen: (v: boolean) => void,
  maxVisits: string,
  setMaxVisits: (v: string) => void,
  aiEnabled: boolean,
  setAiEnabled: (v: boolean) => void) => (

  <View style={styles.box}>
    <Text style={styles.title}>Plan New Route</Text>

    {/* Select Date */}
    <Text style={styles.label}>Select Date</Text>
    <View style={styles.inputWrapper}>
      <TextInput
        value={date}
        placeholder="dd-mm-yyyy"
        onChangeText={setDate}
        style={styles.input}
      />
      <Ionicons name="calendar-outline" size={20} color="#6B7280" />
    </View>

    {/* Target HCPs */}
    <Text style={styles.label}>Target HCPs</Text>
    <TouchableOpacity
      style={styles.inputWrapper}
      onPress={() => setHcpDropdownOpen(!hcpDropdownOpen)}
      activeOpacity={0.8}
    >
      <Text style={styles.inputText}>{hcp}</Text>
      <Ionicons name="chevron-down" size={20} color="#6B7280" />
    </TouchableOpacity>

    {hcpDropdownOpen && (
      <View style={styles.dropdown}>
        {HCP_OPTIONS.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.dropdownItem}
            onPress={() => {
              setHcp(item);
              setHcpDropdownOpen(false);
            }}
          >
            <Text style={styles.dropdownText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )}

    {/* Max Visits */}
    <Text style={styles.label}>Max Visits</Text>
    <TextInput
      value={maxVisits}
      onChangeText={(t) => setMaxVisits(t.replace(/[^0-9]/g, ""))}
      keyboardType="number-pad"
      placeholder="6"
      style={styles.numberInput}
    />

    {/* Enable AI */}
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.aiToggleRow}
      onPress={() => setAiEnabled(!aiEnabled)}
    >
      <Text style={styles.aiToggleText}>Enable AI Route Optimization</Text>
      <Ionicons
        name={aiEnabled ? "checkbox" : "square-outline"}
        size={24}
        color={aiEnabled ? "#007AFF" : "#9CA3AF"}
      />
    </TouchableOpacity>

    {/* Button */}
    <TouchableOpacity style={styles.generateBtn} activeOpacity={0.85}>
      <Ionicons name="flash-outline" size={18} color="#fff" />
      <Text style={styles.generateBtnText}>  Generate Optimized Route</Text>
    </TouchableOpacity>
  </View>
)

const renderRouteLegend = () => (
  <View style={styles.legendCard}>
    <Text style={styles.legendTitle}>Route Legend</Text>

    <View style={styles.legendRow}>
      <View style={[styles.legendDot, { backgroundColor: "#22C55E" }]} />
      <Text style={styles.legendLabel}>Current Location</Text>
    </View>

    <View style={styles.legendRow}>
      <View style={[styles.legendDot, { backgroundColor: "#2563EB" }]} />
      <Text style={styles.legendLabel}>HCP Location</Text>
    </View>

    <View style={styles.legendRow}>
      <View
        style={[
          styles.legendLine,
          { borderColor: "#2563EB", borderStyle: "solid" },
        ]}
      />
      <Text style={styles.legendLabel}>Optimized Route</Text>
    </View>
  </View>
);

const renderDoctorCoverage = () => (
  <View style={styles.cardContainer}>
    <View style={styles.cardHeaderRow}>
      <Text style={styles.cardTitle}>Doctor Coverage Planning</Text>
    </View>

    {MAP_VIEW_DATA.doctors.map((doc) => (
      <View key={doc.id} style={styles.docCard}>
        <View style={styles.docHeaderRow}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.docName}>{doc.name}</Text>
            <View style={styles.tierChip}>
              <Text style={styles.tierChipText}>{doc.tier}</Text>
            </View>
          </View>
          <View
            style={[
              styles.docStatusBadge,
              doc.status === "Overdue"
                ? styles.docStatusOverdue
                : styles.docStatusNew,
            ]}
          >
            <Text style={styles.docStatusText}>{doc.status}</Text>
          </View>
        </View>

        <Text style={styles.docMeta}>{doc.lastVisit}</Text>
        <Text style={styles.docMeta}>{doc.requiredFrequency}</Text>
        <Text style={styles.docMeta}>{doc.rxPotential}</Text>

        <TouchableOpacity style={styles.docScheduleBtn}>
          <MaterialCommunityIcons name="calendar-blank-outline" size={16} />
          <Text style={styles.docScheduleText}>  Schedule Visit</Text>
        </TouchableOpacity>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  /* NEW TOP BAR */
  topBar: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.headerBg,
    // subtle bottom shadow like screenshot
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.textDark,
  },
  topBarFilterBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  topBarFilterText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.textDark,
  },

  scroll: {
    flex: 1,
  },

  /* AI Banner */
  aiBanner: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: COLORS.lupinBlue,
    padding: 14,
  },
  aiTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  aiSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 11,
    marginBottom: 10,
  },
  aiStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  aiStat: {
    flex: 1,
  },
  aiStatValue: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  aiStatLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
  },
  aiBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#00C853",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  aiBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },

  section: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 8,
  },
  grid2: {
    flexDirection: "row",
    gap: 8,
  },
  grid3: {
    flexDirection: "row",
    marginTop: 10,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryTitle: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  summaryMain: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textDark,
    marginTop: 4,
  },
  summaryCaption: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  summaryChipRow: {
    flexDirection: "row",
    marginTop: 6,
    gap: 6,
    flexWrap: "wrap",
  },
  chip: {
    borderRadius: 10,
    backgroundColor: "#F5F6FA",
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  chipText: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  progressBar: {
    height: 5,
    borderRadius: 3,
    overflow: "hidden",
    backgroundColor: "#ECEEF5",
    marginTop: 8,
    flexDirection: "row",
  },
  progressFill: {
    backgroundColor: COLORS.lupinGreen,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  legendRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    marginLeft: 4,
  },

  heatmapGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 4,
  },
  heatBlock: {
    width: "18%",
    height: 20,
    borderRadius: 4,
  },
  alertBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.alert,
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
  },
  alertText: {
    fontSize: 11,
    color: COLORS.textDark,
    marginLeft: 6,
    flex: 1,
  },

  /* Top Tabs */
  tabRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: "#E9ECF5",
    borderRadius: 12,
    padding: 3,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tabItemActive: {
    backgroundColor: "#fff",
  },
  tabText: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: "500",
  },
  tabTextActive: {
    color: COLORS.lupinGreen,
  },

  /* AI Route Card */
  aiRouteCard: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#6C5CE7",
  },
  aiRouteTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  aiRouteSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 11,
    marginTop: 2,
  },
  aiRouteNoteRow: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#fff",
    marginRight: 6,
  },
  aiRouteNote: {
    color: "#fff",
    fontSize: 11,
    flex: 1,
  },

  /* Sub Tabs */
  subTabRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  subTabItem: {
    flex: 1,
    alignItems: "center",
  },
  subTabText: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  subTabTextActive: {
    color: COLORS.lupinGreen,
    fontWeight: "600",
  },
  subTabIndicator: {
    marginTop: 2,
    width: 18,
    height: 2,
    borderRadius: 1,
    backgroundColor: COLORS.lupinGreen,
  },

  startBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lupinGreen,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  startBtnText: {
    color: "#fff",
    fontSize: 11,
    marginLeft: 4,
  },
  miniStat: {
    flex: 1,
    paddingVertical: 8,
  },
  miniStatLabel: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  miniStatValue: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textDark,
    marginTop: 2,
  },
  helperText: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 6,
  },

  mapPlaceholder: {
    marginTop: 14,
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#DDE3F5",
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  mapText: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 4,
  },

  /* Map view style for react-native-maps */
  map: {
    height: 160,
    width: '100%',
  },

  /* Visit cards */
  visitCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
  },
  visitTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  visitIndexCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#EEF1FB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  visitIndexText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  visitName: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  visitSpeciality: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  visitTagRow: {
    flexDirection: "row",
    marginTop: 4,
    gap: 6,
  },
  visitTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: "#FFF5D7",
  },
  visitTagText: {
    fontSize: 10,
    color: COLORS.textDark,
  },
  visitTime: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  visitDuration: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 2,
  },
  visitMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    marginLeft: 4,
    fontSize: 10,
    color: COLORS.textLight,
  },

  /* Coverage planning */
  coverageCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 10,
  },
  coverageName: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  coverageMeta: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  statusChip: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusChipText: {
    fontSize: 10,
    fontWeight: "600",
  },
  scheduleBtn: {
    marginTop: 8,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#EEF3FF",
  },
  scheduleText: {
    fontSize: 11,
    color: COLORS.lupinBlue,
    marginLeft: 4,
    fontWeight: "500",
  },

  overlapCard: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.alert,
    borderWidth: 1,
    borderColor: "#FFCCBC",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  overlapTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textDark,
    marginLeft: 6,
  },
  overlapText: {
    fontSize: 11,
    color: COLORS.textDark,
    marginTop: 6,
  },
  viewDetailsBtn: {
    marginTop: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  viewDetailsText: {
    fontSize: 11,
    color: COLORS.textDark,
  },

  /* Bottom nav (still commented out) */
  bottomNav: {
    height: 60,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: "#FFFFFF",
  },
  bottomItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomLabel: {
    fontSize: 10,
    marginTop: 2,
    color: COLORS.textLight,
  },
  bottomLabelActive: {
    color: COLORS.lupinGreen,
    fontWeight: "600",
  },
  tabsWrapper: {
    flexDirection: "row",
    backgroundColor: "#E5E7EB",
    borderRadius: 999,
    padding: 4,
    marginTop: 10,
    marginBottom: 12,
  },
  tabPill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  tabPillActive: {
    backgroundColor: "#FFFFFF",
  },
  tabPillText: {
    fontSize: 13,
    color: "#6B7280",
  },
  tabPillTextActive: {
    fontWeight: "700",
    color: "#111827",
  },
  /* map card */
  mapCard: {
    marginTop: 8,
    borderRadius: 16,
    backgroundColor: "#E4F2FF",
    padding: 16,
    position: "relative",
  },
  mapControls: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  mapControlBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  legendCard: {
    position: "absolute",
    left: 16,
    top: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  legendTitle: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111827",
  },
  // legendRow: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 6,
  // },
  // legendDot: {
  //   width: 8,
  //   height: 8,
  //   borderRadius: 4,
  //   marginRight: 8,
  // },
  legendLine: {
    width: 14,
    borderBottomWidth: 2,
    marginRight: 8,
  },
  // legendLabel: {
  //   fontSize: 11,
  //   color: "#4B5563",
  // },

  routePlaceholderWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  routePlaceholderLine: {
    width: "80%",
    borderBottomWidth: 2,
    borderStyle: "dashed",
    borderColor: "#2563EB",
    marginBottom: 12,
  },
  routePlaceholderText: {
    fontSize: 12,
    color: "#4B5563",
  },

  /* summary strip */
  summaryCardMapView: {
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  summaryValue: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  /* nav buttons */
  navRow: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 8,
  },
  navPrimary: {
    flex: 1,
    backgroundColor: "#050617",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  navPrimaryText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  navSecondary: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  navSecondaryText: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "600",
  },

  /* live traffic */
  trafficCard: {
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: "#FFF7E6",
    borderWidth: 1,
    borderColor: "#FDE1B2",
    padding: 14,
  },
  trafficTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#B45309",
  },
  trafficText: {
    marginTop: 8,
    fontSize: 13,
    color: "#92400E",
    lineHeight: 18,
  },
  trafficCta: {
    marginTop: 10,
    alignSelf: "flex-start",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#F97316",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  trafficCtaText: {
    fontSize: 13,
    color: "#C05621",
    fontWeight: "600",
  },

  /* generic card container */
  cardContainer: {
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardHeaderRow: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  /* POI rows */
  poiRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    marginBottom: 6,
  },
  poiLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  poiDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  poiName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  poiType: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  poiDistance: {
    fontSize: 12,
    color: "#6B7280",
  },
  /* doctor coverage */
  docCard: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#FFF3F3",
    borderWidth: 1,
    borderColor: "#FECACA",
    padding: 12,
  },
  docHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  docName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  tierChip: {
    marginLeft: 8,
    borderRadius: 999,
    backgroundColor: "#F59E0B",
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tierChipText: {
    fontSize: 11,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  docStatusBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  docStatusOverdue: {
    backgroundColor: "#F97373",
  },
  docStatusNew: {
    backgroundColor: "#F97316",
  },
  docStatusText: {
    fontSize: 11,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  docMeta: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  docScheduleBtn: {
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FECACA",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  docScheduleText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  card: {
    backgroundColor: "#f9fbfbff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardCompleted: {
    backgroundColor: "#EBFFF0",
    borderColor: "#C6F2D0",
  },
  dayText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  dateText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 3,
    marginBottom: 6,
  },
  rightText: {
    fontSize: 12,
    color: "#6B7280",
    marginVertical: 2,
  },
  completedBadge: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  completedBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  weekBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 12,
  },
  box: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
    marginBottom: 6,
    marginTop: 14,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#111",
  },
  inputText: {
    fontSize: 14,
    color: "#111",
    flex: 1,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginTop: 4,
    overflow: "hidden",
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  dropdownText: {
    fontSize: 14,
    color: "#111",
  },
  numberInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: "#111",
  },
  aiToggleRow: {
    backgroundColor: "#ECF4FF",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  aiToggleText: {
    fontSize: 14,
    color: "#111",
  },
  generateBtn: {
    marginTop: 24,
    backgroundColor: "#0C0E1A",
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  generateBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  aiAlertPopup: {
    position: "absolute",
    top: 18,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: "#efefef",
    zIndex: 999,
  },
  aiAlertText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111",
  },

});
