// App.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

type Metric = {
  label: string;
  value: string;
};

type Post = {
  id: string;
  author: string;
  role: string;
  timeAgo: string;
  title: string;
  body: string;
  tag: string;
  metrics?: Metric[];
  likes: number;
  comments: number;
};

type DataShape = {
  stats: {
    teamInsights: number;
    learningProgressPercent: number;
  };
  posts: Post[];
};

const DATA: DataShape = {
  stats: {
    teamInsights: 4,
    learningProgressPercent: 71,
  },
  posts: [
    {
      id: "1",
      author: "Rajesh Kumar",
      role: "Senior Medical Rep • Mumbai Central",
      timeAgo: "2 hours ago",
      title: "Increased Lupin Cardio-X adoption by 45% in Q4",
      body:
        "Successfully engaged with 12 cardiologists using the new e-detailing module. Key strategy: Focused on clinical trial data and patient outcomes. Scheduled follow-ups every 2 weeks to track prescription trends.",
      tag: "Success Story",
      metrics: [
        { label: "Doctors", value: "12" },
        { label: "Prescriptions", value: "340" },
        { label: "Revenue", value: "₹8.5L" },
      ],
      likes: 24,
      comments: 8,
    },
    {
      id: "2",
      author: "Priya Sharma",
      role: "Medical Rep • Delhi NCR",
      timeAgo: "5 hours ago",
      title: "Effective chemist relationship building technique",
      body:
        "Started monthly stock audit visits with top 10 chemists. This helped identify supply chain gaps early and increased trust. Now getting priority shelf space for Lupin products.",
      tag: "Best Practice",
      metrics: [],
      likes: 31,
      comments: 12,
    },
    {
      id: "3",
      author: "Amit Patel",
      role: "Area Manager • Gujarat Region",
      timeAgo: "1 day ago",
      title: "Competitor launched new diabetes combo - Response Strategy",
      body:
        "XYZ Pharma launched a new diabetes combination. Our Lupin Diabetes Care still has better efficacy profile and 15% better pricing. Preparing comparative chart for all reps to counter objections.",
      tag: "Market Intel",
      likes: 42,
      comments: 15,
    },
    {
      id: "4",
      author: "Sneha Reddy",
      role: "Medical Rep • Bangalore South",
      timeAgo: "1 day ago",
      title: "Doctors requesting smaller pack sizes for trial prescriptions",
      body:
        "Multiple physicians (Dr. Mehta, Dr. Rao, Dr. Singh) requested 5-day starter packs for new patients. Current 30-day packs create hesitation for first-time prescriptions. Escalating to product team.",
      tag: "Product Feedback",
      likes: 28,
      comments: 9,
    },
  ],
};

/* ----------------- MEETINGS DATA (existing) ----------------- */

type Visit = {
  id: string;
  status: "Pending" | "Accepted" | "Completed";
  timeAgo: string;
  manager: string;
  rep: string;
  doctor: string;
  clinic: string;
  date: string;
  time: string;
  reason: string;
  primaryAction?: string;
  primaryColor?: string;
  secondaryAction?: string;
};

const VISITS: Visit[] = [
  {
    id: "JV-001",
    status: "Pending",
    timeAgo: "2 hours ago",
    manager: "Mr. Venkata Rao",
    rep: "You",
    doctor: "Dr. Rajesh Kumar",
    clinic: "City Care Multi-Specialty Clinic",
    date: "Nov 15, 2025",
    time: "11:00 AM",
    reason:
      "Doctor has additional queries regarding side effects of Lupin Cardio-X",
    primaryAction: "Accept",
    primaryColor: "#0AA64E",
    secondaryAction: "Decline",
  },
  {
    id: "JV-002",
    status: "Accepted",
    timeAgo: "1 day ago",
    manager: "Ms. Priya Sharma",
    rep: "Rajesh Kumar",
    doctor: "Dr. Anil Mehta",
    clinic: "Global Heart Institute",
    date: "Nov 12, 2025",
    time: "3:00 PM",
    reason:
      "Joint visit for new Respiratory Plus product launch discussion",
    primaryAction: "Add to Calendar",
    primaryColor: "#070810",
  },
];

type Training = {
  id: string;
  title: string;
  badge?: "Upcoming" | "Live" | "Completed";
  description?: string;
  date: string;
  time: string;
  attendees?: number;
  duration?: string;
  host?: string;
  actionLabel?: string;
  actionColor?: string;
};

const TRAININGS: Training[] = [
  {
    id: "TR-001",
    title: "New Product Launch Training - Lupin Respiratory Plus",
    badge: "Upcoming",
    description:
      "Comprehensive training on the newly launched Lupin Respiratory Plus. Clinical data, positioning, and objection handling.",
    date: "Nov 10, 2024",
    time: "10:00 AM",
    attendees: 45,
    duration: "2 hours",
    host: "Dr. Venkat Rao - Product Manager",
    actionLabel: "Add to Calendar",
    actionColor: "#1A5AFE",
  },
  {
    id: "TR-002",
    title: "Monthly Regional Sales Review",
    badge: "Live",
    description:
      "Q4 performance review, territory challenges, and action plans for November.",
    date: "Nov 8, 2024",
    time: "3:00 PM",
    attendees: 22,
    duration: "1.5 hours",
    host: "Ramesh Gupta - Regional Manager",
    actionLabel: "Join Live Meeting",
    actionColor: "#E03B3B",
  },
  {
    id: "TR-003",
    title: "Advanced Sales Techniques Webinar",
    badge: "Upcoming",
    description:
      "Learn advanced techniques for handling objections and closing sales in competitive scenarios.",
    date: "Nov 12, 2024",
    time: "4:00 PM",
    attendees: 120,
    duration: "1 hour",
    host: "Sanjay Malhotra - Sales Trainer",
    actionLabel: "Add to Calendar",
    actionColor: "#1A5AFE",
  },
  {
    id: "TR-004",
    title: "One-on-One Performance Review",
    badge: "Completed",
    description: "Monthly performance discussion and goal setting.",
    date: "Nov 5, 2024",
    time: "11:00 AM",
    attendees: 2,
    duration: "30 mins",
    host: "Manager",
    actionLabel: "Watch Recording",
    actionColor: "#fff",
  },
];

/* ----------------- LEARNING DATA ----------------- */

type CourseStatus = "Completed" | "In Progress" | "Not Started";

type Course = {
  id: string;
  title: string;
  categoryTag: string;
  mandatory: boolean;
  status: CourseStatus;
  description: string;
  duration: string;      // e.g. "2 hours"
  lessons: string;       // e.g. "8 / 8"
  instructor: string;
  dueDate?: string;      // e.g. "Nov 15, 2024"
  progress?: number;     // 0–100
  showCertificateBanner?: boolean;  // “Certificate earned! Download available”
  primaryActionLabel: string;       // bottom primary button
  primaryActionColor: string;       // color of primary button
  secondaryActionLabel?: string;    // optional secondary button (Review)
};

const COURSES: Course[] = [
  {
    id: "c1",
    title: "Lupin Company Overview & Values",
    categoryTag: "Company Overview",
    mandatory: true,
    status: "Completed",
    description: "Mission, values, product portfolio, company history and vision",
    duration: "2 hours",
    lessons: "8 / 8",
    instructor: "HR & Corporate Affairs Team",
    showCertificateBanner: true,
    primaryActionLabel: "Download Certificate",
    primaryActionColor: "#079B3A",
    secondaryActionLabel: "Review",
  },
  {
    id: "c2",
    title: "Pharmaceutical Industry Fundamentals",
    categoryTag: "Pharma Industry Basics",
    mandatory: true,
    status: "Completed",
    description:
      "Regulatory landscape, DPCO guidelines, ethics code (UCPMP), industry standards",
    duration: "3 hours",
    lessons: "10 / 10",
    instructor: "Dr. Venkat Rao - Regulatory Affairs",
    showCertificateBanner: true,
    primaryActionLabel: "Download Certificate",
    primaryActionColor: "#079B3A",
    secondaryActionLabel: "Review",
  },
  {
    id: "c3",
    title: "Cardiovascular Therapy Area Deep Dive",
    categoryTag: "Therapy Area Knowledge",
    mandatory: true,
    status: "In Progress",
    description:
      "Anatomy, physiology, disease overview, treatment protocols, patient journey",
    duration: "4 hours",
    lessons: "8 / 12",
    instructor: "Dr. Anil Kumar - Medical Affairs",
    dueDate: "Nov 15, 2024",
    progress: 65,
    showCertificateBanner: false,
    primaryActionLabel: "Continue Learning",
    primaryActionColor: "#9B1BFF", // purple bar/button
  },
  {
    id: "c4",
    title: "Diabetes Therapy & Metabolic Disorders",
    categoryTag: "Therapy Area Knowledge",
    mandatory: true,
    status: "Completed",
    description:
      "Diabetes pathophysiology, complications, treatment approaches, lifestyle management",
    duration: "4 hours",
    lessons: "12 / 12",
    instructor: "Dr. Suresh Reddy - Endocrinology",
    showCertificateBanner: true,
    primaryActionLabel: "Download Certificate",
    primaryActionColor: "#079B3A",
    secondaryActionLabel: "Review",
  },
  {
    id: "c5",
    title: "Respiratory Diseases & Treatment Options",
    categoryTag: "Therapy Area Knowledge",
    mandatory: true,
    status: "Not Started",
    description:
      "Asthma, COPD, respiratory infections, inhalation therapy",
    duration: "3.5 hours",
    lessons: "0 / 11",
    instructor: "Dr. Meera Iyer - Pulmonology",
    dueDate: "Nov 20, 2024",
    progress: 0,
    primaryActionLabel: "Start Module",
    primaryActionColor: "#1462FF",
  },
  {
    id: "c6",
    title: "Lupin Cardio-X Complete Product Knowledge",
    categoryTag: "Product Knowledge",
    mandatory: true,
    status: "In Progress",
    description:
      "Composition, indications, dosage, contraindications, side effects, competitor comparison",
    duration: "3.5 hours",
    lessons: "11 / 14",
    instructor: "Dr. Ramesh Gupta - Product Manager",
    dueDate: "Nov 12, 2024",
    progress: 75,
    primaryActionLabel: "Continue Learning",
    primaryActionColor: "#9B1BFF",
  },
  {
    id: "c7",
    title: "Lupin Respiratory Plus Product Training",
    categoryTag: "Product Knowledge",
    mandatory: true,
    status: "Not Started",
    description:
      "New product launch - composition, clinical trials, positioning vs competitors",
    duration: "3 hours",
    lessons: "0 / 10",
    instructor: "Product Management Team",
    dueDate: "Nov 18, 2024",
    progress: 0,
    primaryActionLabel: "Start Module",
    primaryActionColor: "#1462FF",
  },
  {
    id: "c8",
    title: "Diabetes Care Portfolio Overview",
    categoryTag: "Product Knowledge",
    mandatory: true,
    status: "Completed",
    description: "Complete diabetes portfolio, patient profiles, therapy selection",
    duration: "3 hours",
    lessons: "12 / 12",
    instructor: "Dr. Priya Sharma - Medical Affairs",
    showCertificateBanner: true,
    primaryActionLabel: "Download Certificate",
    primaryActionColor: "#079B3A",
    secondaryActionLabel: "Review"
  },
  {
    id: "c9",
    title: "Field Force Excellence Program",
    categoryTag: "Field Processes",
    mandatory: true,
    status: "Completed",
    description: "Doctor segmentation, coverage norms, territory planning, reporting processes",
    duration: "3.5 hours",
    lessons: "13 / 13",
    instructor: "Sanjay Malhotra - Regional Manager",
    showCertificateBanner: true,
    primaryActionLabel: "Download Certificate",
    primaryActionColor: "#079B3A",
    secondaryActionLabel: "Review"
  },
  {
    id: "c10",
    title: "HCP Segmentation & Call Planning",
    categoryTag: "Field Processes",
    mandatory: true,
    status: "Completed",
    description: "Doctor classification, call frequency, coverage strategies, route planning",
    duration: "2 hours",
    lessons: "7 / 7",
    instructor: "Training & Development Team",
    showCertificateBanner: true,
    primaryActionLabel: "Download Certificate",
    primaryActionColor: "#079B3A",
    secondaryActionLabel: "Review"
  },
  {
    id: "c11",
    title: "Advanced Communication & Selling Skills",
    categoryTag: "Communication & Selling Skills",
    mandatory: true,
    status: "In Progress",
    description: "Opening techniques, detailing, objection handling, closing, rapport building",
    duration: "5 hours",
    lessons: "9 / 20",
    instructor: "Ravi Deshmukh - Sales Coach",
    dueDate: "Dec 1, 2024",
    progress: 45,
    showCertificateBanner: false,
    primaryActionLabel: "Continue Learning",
    primaryActionColor: "#9B1BFF"
  },
  {
    id: "c12",
    title: "Detailing & Visual Aid Presentation",
    categoryTag: "Communication & Selling Skills",
    mandatory: true,
    status: "Completed",
    description: "Opening and detailing techniques, effective communication with HCPs",
    duration: "2.5 hours",
    lessons: "8 / 8",
    instructor: "Sales Training Academy",
    showCertificateBanner: true,
    primaryActionLabel: "Download Certificate",
    primaryActionColor: "#079B3A",
    secondaryActionLabel: "Review"
  },
  {
    id: "c13",
    title: "Handling Objections Like a Pro",
    categoryTag: "Communication & Selling Skills",
    mandatory: true,
    status: "In Progress",
    description: "Common objections, response strategies, converting objections to opportunities",
    duration: "3 hours",
    lessons: "3 / 10",
    instructor: "Amit Patel - Area Manager",
    dueDate: "Nov 25, 2024",
    progress: 30,
    primaryActionLabel: "Continue Learning",
    primaryActionColor: "#9B1BFF"
  },
  {
    id: "c14",
    title: "Call Closing Techniques & Follow-ups",
    categoryTag: "Communication & Selling Skills",
    mandatory: true,
    status: "Not Started",
    description: "Closing the call effectively, commitment strategies, scheduling follow-ups",
    duration: "2 hours",
    lessons: "0 / 7",
    instructor: "Sales Excellence Team",
    dueDate: "Nov 30, 2024",
    progress: 0,
    primaryActionLabel: "Start Module",
    primaryActionColor: "#1462FF"
  },
  {
    id: "c15",
    title: "Call Planning & Frequency Management",
    categoryTag: "Communication & Selling Skills",
    mandatory: true,
    status: "Completed",
    description: "Strategic call planning, optimal frequency, resource allocation",
    duration: "2.5 hours",
    lessons: "9 / 9",
    instructor: "Field Operations Team",
    showCertificateBanner: true,
    primaryActionLabel: "Download Certificate",
    primaryActionColor: "#079B3A",
    secondaryActionLabel: "Review"
  },
  {
    id: "c16",
    title: "CRM Mobile App Mastery",
    categoryTag: "CRM / Digital Tool Training",
    mandatory: true,
    status: "Completed",
    description: "Using CRM for call reporting, sample tracking, expense claims, analytics",
    duration: "2 hours",
    lessons: "8 / 8",
    instructor: "IT & Digital Team",
    showCertificateBanner: true,
    primaryActionLabel: "Download Certificate",
    primaryActionColor: "#079B3A",
    secondaryActionLabel: "Review"
  },
  {
    id: "c17",
    title: "E-Detailing Platform Training",
    categoryTag: "CRM / Digital Tool Training",
    mandatory: true,
    status: "Completed",
    description: "Using e-detailing apps, content sharing, tracking engagement",
    duration: "1.5 hours",
    lessons: "6 / 6",
    instructor: "Digital Marketing Team",
    showCertificateBanner: true,
    primaryActionLabel: "Download Certificate",
    primaryActionColor: "#079B3A",
    secondaryActionLabel: "Review"
  },
  {
    id: "c18",
    title: "Sample Reporting & UCPMP Compliance in CRM",
    categoryTag: "CRM / Digital Tool Training",
    mandatory: true,
    status: "Completed",
    description: "Sample distribution entry, UCPMP guidelines, digital signatures, audit trails",
    duration: "1.5 hours",
    lessons: "5 / 5",
    instructor: "Compliance & IT Team",
    showCertificateBanner: true,
    primaryActionLabel: "Download Certificate",
    primaryActionColor: "#079B3A",
    secondaryActionLabel: "Review"
  },
  {
    id: "c19",
    title: "UCPMP Compliance & Medical Sampling Guidelines",
    categoryTag: "Compliance",
    mandatory: true,
    status: "Completed",
    description: "UCPMP code, sampling limits, documentation, audit compliance",
    duration: "2.5 hours",
    lessons: "10 / 10",
    instructor: "Legal & Compliance Team",
    showCertificateBanner: true,
    primaryActionLabel: "Download Certificate",
    primaryActionColor: "#079B3A",
    secondaryActionLabel: "Review"
  },
  {
    id: "c20",
    title: "DPCO Pricing & Regulatory Compliance",
    categoryTag: "Compliance",
    mandatory: true,
    status: "Not Started",
    description: "DPCO regulations, pricing guidelines, marketing compliance",
    duration: "2 hours",
    lessons: "0 / 8",
    instructor: "Regulatory Affairs",
    dueDate: "Dec 5, 2024",
    progress: 0,
    primaryActionLabel: "Start Module",
    primaryActionColor: "#1462FF"
  }

];

const CATEGORIES = [
  "All",
  "Company Overview",
  "Pharma Industry Basics",
  "Therapy Area Knowledge",
  "Product Knowledge",
  "Field Processes",
  "Communication & Selling Skills",
  "CRM / Digital Tool Training",
  "Compliance",
];

/* ----------------- SUPPORT DATA (NEW) ----------------- */

type QuickHelpItem = {
  id: string;
  question: string;
};

const QUICK_HELP_ITEMS: QuickHelpItem[] = [
  { id: "q1", question: "How to submit expense claims?" },
  { id: "q2", question: "Sample distribution guidelines" },
  { id: "q3", question: "Product information for Cardio-X" },
  { id: "q4", question: "Call reporting best practices" },
];

type TicketStatus = "In Progress" | "Resolved" | "Open";
type TicketPriority = "High" | "Medium" | "Low";
type TicketTone = "red" | "yellow";

type SupportTicket = {
  id: string;
  title: string;
  category: string;
  status: TicketStatus;
  priority: TicketPriority;
  tone: TicketTone;
  assignedTo: string;
  createdAgo: string;
  updatedAgo: string;
};

const SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: "TCK-001",
    title: "Unable to sync call reports from Nov 5",
    category: "Technical",
    status: "In Progress",
    priority: "High",
    tone: "red",
    assignedTo: "IT Support Team",
    createdAgo: "2 days ago",
    updatedAgo: "4 hours ago",
  },
  {
    id: "TCK-002",
    title: "Need product literature for Lupin Respiratory Plus",
    category: "Product Query",
    status: "Resolved",
    priority: "Medium",
    tone: "yellow",
    assignedTo: "Product Team",
    createdAgo: "5 days ago",
    updatedAgo: "3 days ago",
  },
  {
    id: "TCK-003",
    title: "Sample delivery delayed for territory",
    category: "Order Issue",
    status: "Open",
    priority: "High",
    tone: "red",
    assignedTo: "Logistics Team",
    createdAgo: "1 day ago",
    updatedAgo: "1 day ago",
  },
];

const TEAM_MEMBERS = [
  "Rajesh Kumar - Medical Rep",
  "Priya Sharma - Senior Rep",
  "Amit Patel - Area Manager",
  "Sneha Reddy - Medical Rep",
];

const DOCTORS = [
  "Dr. Rajesh Kumar - Cardiologist",
  "Dr. Anil Mehta - Neurologist",
  "Dr. Vivek Rao - Physician",
  "Dr. Shruti Singh - Endocrinologist",
];

/* ----------------- TABS ----------------- */

const TABS = ["Insights", "Meetings", "Learning", "Support"] as const;
type TabName = (typeof TABS)[number];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabName>("Insights");
  const [search, setSearch] = useState<string>("");
  const [aiAlert, setAiAlert] = useState<string | null>(null);
  const [aiAlertIcon, setAiAlertIcon] = useState<"information-circle" | "checkmark-circle">("information-circle");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [learningSearch, setLearningSearch] = useState<string>("");
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("General");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<string>("");

  const [showJointVisitModal, setShowJointVisitModal] = useState(false);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);

  const [showInsightModal, setShowInsightModal] = useState(false);
  const [insightCategory, setInsightCategory] = useState("Best Practice"); // Default selected
  const [insightTitle, setInsightTitle] = useState("");
  const [insightContent, setInsightContent] = useState("");
  const [insightDoctors, setInsightDoctors] = useState("");
  const [insightPrescriptions, setInsightPrescriptions] = useState("");
  const [insightRevenue, setInsightRevenue] = useState("");


  const [teamMember, setTeamMember] = useState("");
  const [doctor, setDoctor] = useState("");
  const [clinic, setClinic] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");


  const isTablet = width >= 800;

  const completed = 12;
  const total = 20;
  const progressPct = Math.round((completed / total) * 100);

  const filteredCourses = COURSES.filter((c) =>
    activeCategory === "All" ? true : c.categoryTag === activeCategory
  ).filter((c) =>
    learningSearch.trim()
      ? (c.title + c.description + c.categoryTag)
        .toLowerCase()
        .includes(learningSearch.toLowerCase())
      : true
  );

  /* ----------------- HEADER ----------------- */

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="account-group" size={20} color="#fff" />
        </View>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.headerTitle}>Team Collaboration & Learning</Text>
          <Text style={styles.headerSubtitle}>
            Connect, learn, and grow together
          </Text>
        </View>
      </View>

      <View style={styles.headerStatsRow}>
        <View style={[styles.statCard, styles.statCardBlue]}>
          <Text style={styles.statLabel}>Team Insights</Text>
          <Text style={styles.statValue}>{DATA.stats.teamInsights}</Text>
          <MaterialCommunityIcons
            name="share-variant"
            size={20}
            color="#4E86FF"
            style={{ position: "absolute", right: 14, top: 14 }}
          />
        </View>

        <View style={[styles.statCard, styles.statCardPink]}>
          <Text style={styles.statLabel}>Learning Progress</Text>
          <Text style={styles.statValue}>
            {DATA.stats.learningProgressPercent}%
          </Text>
          <MaterialCommunityIcons
            name="book-open-page-variant"
            size={20}
            color="#7B3CFF"
            style={{ position: "absolute", right: 14, top: 14 }}
          />
        </View>
      </View>
    </View>
  );

  /* ----------------- INSIGHTS ----------------- */

  const renderShareBox = () => (
    <View style={styles.shareBox}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}
      >
        <View style={styles.shareIcon}>
          <MaterialCommunityIcons name="share-variant" size={18} color="#fff" />
        </View>
        <Text style={styles.shareTitle}>Share Team Insights</Text>
      </View>
      <Text style={styles.shareDesc}>
        Share success stories, best practices, and market intelligence with your
        team
      </Text>
      <TouchableOpacity
        style={styles.shareBtn} activeOpacity={0.85}
        onPress={() => setShowInsightModal(true)}
      >
        <MaterialCommunityIcons name="share-variant-outline" size={14} color="#fff" />
        <Text style={styles.shareBtnText}>  Share New Insight</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPost = ({ item }: { item: Post }) => {
    return (
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.author.charAt(0)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.postAuthor}>{item.author}</Text>
            <Text style={styles.postRole}>{item.role}</Text>
            <Text style={styles.postRole}>{item.timeAgo}</Text>
          </View>
          <View
            style={[
              styles.postTag,
              item.tag === "Success Story"
                ? styles.tagSuccess
                : item.tag === "Best Practice"
                  ? styles.tagBlue
                  : item.tag === "Market Intel"
                    ? styles.tagPurple
                    : styles.tagOrange,
            ]}
          >
            <Text
              style={[
                styles.postTagText,
                item.tag === "Success Story"
                  ? { color: "#30a35aff" }
                  : item.tag === "Best Practice"
                    ? { color: "#4480c5ff" }
                    : item.tag === "Market Intel"
                      ? { color: "#834da9ff" }
                      : { color: "#a74e22ff" },
              ]}
            >
              {item.tag}
            </Text>
          </View>
        </View>

        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postBody}>{item.body}</Text>

        {item.metrics &&
          item.metrics.length > 0 &&
          item.metrics[0].label !== "" && (
            <View style={styles.metricsRow}>
              {item.metrics.map((m, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.metricBox,
                    idx === 0
                      ? {
                        borderColor: "#CFE5FF",
                        backgroundColor: "#f0f6feff",
                      }
                      : idx === 1
                        ? {
                          borderColor: "#DFF7E8",
                          backgroundColor: "#f2fff7ff",
                        }
                        : {
                          borderColor: "#F1E6FF",
                          backgroundColor: "#faf7ffff",
                        },
                  ]}
                >
                  <Text style={styles.metricLabel}>{m.label}</Text>
                  <Text
                    style={[
                      styles.metricValue,
                      idx === 0
                        ? { color: "#2C69D9" }
                        : idx === 1
                          ? { color: "#1fa363ff" }
                          : { color: "#ba45dbff" },
                    ]}
                  >
                    {m.value}
                  </Text>
                </View>
              ))}
            </View>
          )}

        <View style={styles.divider} />
        <View style={styles.postFooter}>
          <View style={styles.footerLeft}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => {
                setAiAlertIcon("checkmark-circle");
                setAiAlert(`Insight liked!`);
                setTimeout(() => setAiAlert(null), 3000);
              }}
            >
              <MaterialCommunityIcons name="trending-up" size={18} color="#3E7BFF" />
              <Text style={styles.footerCount}>{item.likes}</Text>
            </TouchableOpacity>

            <Ionicons name="chatbubble-outline" size={18} style={{ marginLeft: 12 }} />
            <Text style={styles.footerCount}>{item.comments}</Text>
          </View>

          <MaterialCommunityIcons name="share-variant-outline" size={18} />
        </View>
      </View>
    );
  };

  const filtered = DATA.posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.body.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase())
  );

  const renderInsights = () => (
    <View style={{ paddingBottom: 120 }}>
      {renderShareBox()}
      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={18} color="#8f8f8f" />
        <TextInput
          placeholder="Search insights..."
          placeholderTextColor="#9a9a9a"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={{ paddingBottom: 60 }}>
        {filtered.map((item) => renderPost({ item }))}
      </View>
    </View>
  );

  const renderPlaceholderTab = (title: string) => (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 16, color: "#333" }}>
        {title} content will appear here. (You said you'll provide screenshots
        later)
      </Text>
    </View>
  );

  /* ----------------- MEETINGS ----------------- */

  const renderVisitCard = (v: Visit) => {
    const leftStripe =
      v.status === "Pending"
        ? "#FF7B2A"
        : v.status === "Accepted"
          ? "#06B060"
          : "#C0C0C0";

    return (
      <View key={v.id} style={[styles.card, { borderLeftColor: leftStripe }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Joint Visit Request</Text>
          <View
            style={[
              styles.smallBadge,
              v.status === "Pending"
                ? { backgroundColor: "#FFEDE0", borderColor: "#FFD1A8" }
                : v.status === "Accepted"
                  ? { backgroundColor: "#E8FFF2", borderColor: "#BFEFD1" }
                  : { backgroundColor: "#F2F2F2", borderColor: "#E0E0E0" },
            ]}
          >
            <Text
              style={[
                styles.smallBadgeText,
                v.status === "Accepted"
                  ? { color: "#0C8A4D" }
                  : { color: "#B35C00" },
              ]}
            >
              {v.status}
            </Text>
          </View>
        </View>

        <Text style={styles.muted}>{v.timeAgo}</Text>

        {/* Team Members */}
        <View
          style={[
            styles.infoBox,
            { backgroundColor: "#F1F7FF", borderColor: "#D6E9FF" },
          ]}
        >
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="account-group"
              size={16}
              color="#3C69FF"
            />
            <Text style={styles.infoBoxTitle}>  Team Members</Text>
          </View>

          <View
            style={{
              marginTop: 8,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "48%" }}>
              <Text style={styles.infoLabel}>Manager</Text>
              <Text style={[styles.infoValue, { marginTop: 6 }]}>
                {v.manager}
              </Text>
            </View>
            <View style={{ width: "48%" }}>
              <Text style={styles.infoLabel}>Rep</Text>
              <Text style={[styles.infoValue, { marginTop: 6 }]}>{v.rep}</Text>
            </View>
          </View>
        </View>

        {/* Visit Details */}
        <View
          style={[
            styles.infoBox,
            { backgroundColor: "#FBF4FF", borderColor: "#F0DBFF" },
          ]}
        >
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={16}
              color="#8C4CC6"
            />
            <Text style={styles.infoBoxTitle}>  Visit Details</Text>
          </View>

          <View
            style={{
              marginTop: 8,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.infoLabel}>Doctor:</Text>
              <Text style={[styles.infoValue, { marginTop: 6 }]}>
                {v.doctor}
              </Text>
              <Text style={[styles.infoLabel, { marginTop: 8 }]}>Clinic:</Text>
              <Text style={[styles.infoValue, { marginTop: 6 }]}>
                {v.clinic}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={[styles.infoValue, { fontWeight: "700" }]}>
                {v.doctor}
              </Text>
              <Text
                style={[
                  styles.infoLabel,
                  { color: "#777", marginTop: 6 },
                ]}
              >
                {v.clinic}
              </Text>
            </View>
          </View>
        </View>

        {/* Date/time */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={18}
              color="#666"
            />
            <Text style={styles.metaText}>{v.date}</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={18}
              color="#666"
            />
            <Text style={styles.metaText}>{v.time}</Text>
          </View>
        </View>

        {/* Reason */}
        <View style={[styles.reasonBox]}>
          <Text style={styles.reasonTitle}>Reason for Joint Visit:</Text>
          <Text style={styles.reasonText}>{v.reason}</Text>
        </View>

        {/* Actions */}
        <View
          style={[styles.actionRow, v.secondaryAction && { flexDirection: "row" }]}
        >
          {v.primaryAction && (
            <TouchableOpacity
              style={[
                styles.primaryButton,
                { backgroundColor: v.primaryColor || "#0AA64E" },
                v.secondaryAction && { width: "48%" },
              ]} onPress={() => {
                if (v.primaryAction === "Accept") {
                  setAiAlertIcon("checkmark-circle");
                  setAiAlert("Joint Field Work accepted! Added to your calendar.");
                  setTimeout(() => setAiAlert(null), 5000);
                }
              }}
            >
              <MaterialCommunityIcons
                name={
                  v.primaryAction === "Accept" ? "check" : "calendar-plus"
                }
                size={16}
                color="#fff"
              />
              <Text style={styles.primaryButtonText}>
                {"  "}
                {v.primaryAction}
              </Text>
            </TouchableOpacity>
          )}
          {v.secondaryAction && (
            <TouchableOpacity
              style={[styles.secondaryButton, { width: "48%" }]} onPress={() => {
                if (v.secondaryAction === "Decline") {
                  setAiAlertIcon("information-circle");
                  setAiAlert("Joint Field Work request declined.");
                  setTimeout(() => setAiAlert(null), 5000);
                }
              }}
            >
              <Text style={styles.secondaryButtonText}>
                {v.secondaryAction}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderTrainingCard = (t: Training) => {
    return (
      <View key={t.id} style={[styles.card, { borderLeftColor: "#E0E0E0" }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{t.title}</Text>
          {t.badge && (
            <View
              style={[
                styles.smallBadge,
                t.badge === "Upcoming"
                  ? { backgroundColor: "#EAF0FF", borderColor: "#D9E7FF" }
                  : t.badge === "Live"
                    ? { backgroundColor: "#FFEDED", borderColor: "#FFDCDC" }
                    : { backgroundColor: "#F2F2F2", borderColor: "#E0E0E0" },
              ]}
            >
              <Text style={styles.smallBadgeText}>{t.badge}</Text>
            </View>
          )}
        </View>

        {t.description ? (
          <Text style={styles.cardSubtitle}>{t.description}</Text>
        ) : null}

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={18}
              color="#666"
            />
            <Text style={styles.metaText}>{t.date}</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={18}
              color="#666"
            />
            <Text style={styles.metaText}>{t.time}</Text>
          </View>
        </View>

        {t.attendees !== undefined && (
          <View style={[styles.metaRow, { marginTop: 6 }]}>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons
                name="account-group-outline"
                size={18}
                color="#666"
              />
              <Text style={styles.metaText}>{t.attendees} attendees</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={[styles.metaText, { marginLeft: 8 }]}>
                Duration: {t.duration}
              </Text>
            </View>
          </View>
        )}

        {t.host ? (
          <View style={styles.hostBox}>
            <Text style={styles.hostText}>Host</Text>
            <Text style={{ fontWeight: "600" }}>{t.host}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={[
            styles.primaryButton,
            { backgroundColor: t.actionColor || "#1A5AFE" },
            t.actionLabel === "Watch Recording" && {
              borderWidth: 1,
              borderColor: "#e4e0e0ff",
            },
          ]}
        >
          <MaterialCommunityIcons
            name={
              t.actionLabel === "Join Live Meeting"
                ? "video"
                : t.actionLabel === "Watch Recording"
                  ? "play-outline"
                  : "calendar-plus"
            }
            size={20}
            color={t.actionLabel === "Watch Recording" ? "#000" : "#fff"}
          />
          <Text
            style={[
              styles.primaryButtonText,
              t.actionLabel === "Watch Recording" && { color: "#000" },
            ]}
          >
            {"  "}
            {t.actionLabel}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderMeetings = () => {
    return (
      <View>
        {/* Joint Field Work banner */}
        <View
          style={[
            styles.banner,
            { backgroundColor: "#EEFFF2", borderColor: "#DFF7E8" },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={[styles.circleIcon, { backgroundColor: "#08A54B" }]}
            >
              <MaterialCommunityIcons
                name="account-group"
                size={18}
                color="#fff"
              />
            </View>
            <Text style={styles.bannerTitle}>  Joint Field Work (JFW)</Text>
          </View>
          <Text style={styles.bannerDesc}>
            Schedule joint visits with team members to HCP clinics
          </Text>
          <TouchableOpacity
            style={[
              styles.primaryButton,
              {
                backgroundColor: "#08A54B",
                alignSelf: "stretch",
                marginTop: 12,
              },
            ]} onPress={() => setShowJointVisitModal(true)}
          >
            <MaterialCommunityIcons
              name="account-plus-outline"
              size={16}
              color="#fff"
            />
            <Text style={styles.primaryButtonText}>
              {"  "}
              Request Joint Visit
            </Text>
          </TouchableOpacity>
        </View>

        {/* Visits list */}
        <View style={{ marginTop: 12 }}>
          {VISITS.map((v) => renderVisitCard(v))}
        </View>

        {/* Virtual Meetings banner */}
        <View
          style={[
            styles.banner,
            {
              backgroundColor: "#FFF6F6",
              borderColor: "#FFECEC",
              marginTop: 10,
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={[styles.circleIcon, { backgroundColor: "#E75454" }]}
            >
              <MaterialCommunityIcons name="video" size={18} color="#fff" />
            </View>
            <Text style={styles.bannerTitle}>
              {"  "}
              Virtual Meetings & Training
            </Text>
          </View>
          <Text style={styles.bannerDesc}>
            Join live sessions, webinars, and training programs
          </Text>
        </View>

        {/* Trainings list */}
        <View style={{ marginTop: 12 }}>
          {TRAININGS.map((t) => renderTrainingCard(t))}
        </View>
      </View>
    );
  };

  const renderCourse = (c: Course) => {
    const isCompleted = c.status === "Completed";
    const isInProgress = c.status === "In Progress";
    const isNotStarted = c.status === "Not Started";

    return (
      <View key={c.id} style={styles.courseCard}>
        {/* Title row + status badge */}
        <View style={styles.courseHeaderRow}>

          {/* LEFT: Title + Mandatory */}
          <View style={styles.leftTitleRow}>
            <Text style={styles.courseTitle}>{c.title}</Text>

            {c.mandatory && (
              <View style={styles.mandatoryBadgeInline}>
                <Text style={styles.mandatoryText}>Mandatory</Text>
              </View>
            )}
          </View>

          {/* RIGHT: Status */}
          <View
            style={[
              styles.statusBadge,
              isCompleted
                ? styles.statusCompleted
                : isInProgress
                  ? styles.statusInProgress
                  : styles.statusNotStarted,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                isCompleted
                  ? { color: "#0B7F3B" }
                  : isInProgress
                    ? { color: "#3C6CFF" }
                    : { color: "#666" },
              ]}
            >
              {c.status}
            </Text>
          </View>
        </View>



        {/* Category tag */}
        <View style={styles.categoryPill}>
          <Text style={styles.categoryText}>{c.categoryTag}</Text>
        </View>

        {/* Description */}
        <Text style={styles.courseDesc}>{c.description}</Text>

        {/* Duration / Instructor / Lessons / Due date */}
        <View
          style={{
            flexDirection: isTablet ? "row" : "column",
            marginTop: 12,
          }}
        >
          <View style={[styles.infoBlock, isTablet && { flex: 1 }]}>
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>{c.duration}</Text>
          </View>

          <View style={[styles.infoBlock, isTablet && { flex: 1 }]}>
            <Text style={styles.infoLabel}>Instructor</Text>
            <Text style={styles.infoValue}>{c.instructor}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: isTablet ? "row" : "column",
            marginTop: 10,
          }}
        >
          <View style={[styles.infoBlock, isTablet && { flex: 1 }]}>
            <Text style={styles.infoLabel}>Lessons</Text>
            <Text style={styles.infoValue}>{c.lessons}</Text>
          </View>

          {c.dueDate && (
            <View style={[styles.infoBlock, isTablet && { flex: 1 }]}>
              <Text style={styles.infoLabel}>Due Date</Text>
              <Text style={styles.infoValue}>{c.dueDate}</Text>
            </View>
          )}
        </View>

        {/* Certificate banner for completed modules with download */}
        {c.showCertificateBanner && (
          <View style={styles.certificateBanner}>
            <MaterialCommunityIcons
              name="certificate-outline"
              size={16}
              color="#0B7F3B"
            />
            <Text style={styles.certificateText}>
              {"  "}Certificate earned! Download available
            </Text>
          </View>
        )}

        {/* Progress row for In Progress / Not Started */}
        {typeof c.progress === "number" && !c.showCertificateBanner && (
          <View style={{ marginTop: 16 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <Text style={styles.infoLabel}>Progress</Text>
              <Text style={styles.infoLabel}>{c.progress}%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${c.progress}%`,
                    backgroundColor: isNotStarted ? "#C9CCD1" : "#000",
                  },
                ]}
              />
            </View>
          </View>
        )}

        {/* Action buttons row */}
        <View
          style={[
            styles.courseActionsRow,
            c.showCertificateBanner && { marginTop: 12 },
          ]}
        >
          {c.secondaryActionLabel && (
            <TouchableOpacity style={styles.secondaryHalfButton}>
              <MaterialCommunityIcons
                name="play-outline"
                size={16}
                color="#111"
              />
              <Text style={styles.secondaryHalfButtonText}>
                {"  "}
                {c.secondaryActionLabel}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              c.secondaryActionLabel ? styles.primaryHalfButton : styles.primaryFullButton,
              { backgroundColor: c.primaryActionColor },
            ]}
          >
            <MaterialCommunityIcons
              name={
                c.primaryActionLabel === "Start Module"
                  ? "play-circle-outline"
                  : c.primaryActionLabel === "Continue Learning"
                    ? "play-outline"
                    : "certificate-outline"
              }
              size={16}
              color="#fff"
            />
            <Text style={styles.primaryHalfButtonText}>
              {"  "}
              {c.primaryActionLabel}
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  };

  const renderLearnings = () => {
    return (
      <View>
        {/* Learning & Development banner */}
        <View style={[styles.banner, styles.bannerPink]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={[styles.iconCircle, { backgroundColor: "#7B46FF" }]}>
              <MaterialCommunityIcons
                name="book-open-page-variant"
                size={18}
                color="#fff"
              />
            </View>
            <Text style={styles.bannerTitle}>  Learning & Development</Text>
          </View>
          <Text style={styles.bannerDesc}>
            Complete assigned modules and track your progress
          </Text>
        </View>

        {/* Overall progress banner */}
        <View style={[styles.banner, styles.bannerBlue, { marginTop: 12 }]}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Overall Learning Progress</Text>
            <Text style={styles.progressCount}>
              {completed} / {total}
            </Text>
          </View>
          <Text style={styles.smallMuted}>Completed Modules</Text>
          <View style={styles.overallTrack}>
            <View
              style={[styles.overallFill, { width: `${progressPct}%` }]}
            />
          </View>
        </View>

        {/* Filter card */}
        <View style={[styles.simpleCard, { marginTop: 12 }]}>
          <Text style={styles.cardTitleSmall}>Filter by Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10 }}
          >
            {CATEGORIES.map((c) => {
              const active = c === activeCategory;
              return (
                <TouchableOpacity
                  key={c}
                  onPress={() => setActiveCategory(c)}
                  style={[styles.chip, active && styles.chipActive]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      active && styles.chipTextActive,
                    ]}
                  >
                    {c}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* All courses (cards) */}
        <View style={{ marginTop: 12, paddingBottom: 80 }}>
          {filteredCourses.map(renderCourse)}
        </View>
      </View>
    )
  }

  /* ----------------- SUPPORT (NEW) ----------------- */

  const renderTicketCard = (ticket: SupportTicket) => {
    const isRed = ticket.tone === "red";

    const cardToneStyle = isRed
      ? styles.ticketCardRed
      : styles.ticketCardYellow;

    const statusStyle =
      ticket.status === "In Progress"
        ? styles.statusPillInProgress
        : ticket.status === "Resolved"
          ? styles.statusPillResolved
          : styles.statusPillOpen;

    const priorityStyle =
      ticket.priority === "High"
        ? styles.priorityHigh
        : ticket.priority === "Medium"
          ? styles.priorityMedium
          : styles.priorityLow;

    return (
      <View key={ticket.id} style={[styles.ticketCard, cardToneStyle]}>
        {/* Title row */}
        <View style={styles.ticketHeaderRow}>
          <View style={styles.ticketTitleLeft}>
            <Text numberOfLines={2} style={styles.ticketTitle}>
              {ticket.title}
              <Text>{"  "}</Text>
            </Text>

            <View style={styles.ticketCategoryChip}>
              <Text style={styles.ticketCategoryText}>{ticket.category}</Text>
            </View>
          </View>

          <View style={[styles.statusPill, statusStyle]}>
            <Text style={styles.statusPillText}>{ticket.status}</Text>
          </View>
        </View>


        {/* Assigned */}
        <Text style={styles.ticketAssigned}>
          Assigned to: {ticket.assignedTo}
        </Text>

        <View style={styles.ticketDivider} />

        {/* Created / Updated + Priority */}
        <View style={styles.ticketFooterRow}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.ticketMetaText}>
              Created: {ticket.createdAgo}
            </Text>
            <Text style={[styles.ticketMetaText, { marginLeft: 12 }]}>
              Updated: {ticket.updatedAgo}
            </Text>
          </View>

          <View style={[styles.priorityChip, priorityStyle]}>
            <Text style={styles.priorityChipText}>{ticket.priority}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderSupport = () => {
    const isTablet = width >= 768;

    return (
      <View style={styles.supportRoot}>
        {/* Real-Time Support */}
        <View style={styles.rtCard}>
          <View style={styles.rtHeaderRow}>
            <View style={styles.rtIconCircle}>
              <Ionicons
                name="chatbubbles-outline"
                size={18}
                color="#02848F"
              />
            </View>
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={styles.rtTitle}>Real-Time Support</Text>
              <Text style={styles.rtSubtitle}>
                Get instant help via CRM support team and AI chatbot
              </Text>
            </View>
          </View>

          <View style={styles.rtActionsRow}>
            <TouchableOpacity
              style={[styles.rtCreateBtn, styles.rtBtnHalf]}
              onPress={() => setShowCreateTicketModal(true)}
            >

              <Ionicons name="chatbubble-outline" size={18} color="#ffffff" />
              <Text style={styles.rtCreateBtnText}>  Create Ticket</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.rtAskBotBtn, styles.rtBtnHalf]}
              onPress={() => {
                setAiAlert("AI Chatbot feature – Check bottom right corner!");
                setTimeout(() => setAiAlert(null), 3000);
              }}
            >
              <MaterialCommunityIcons name="robot-outline" size={18} color="#7C3AED" />
              <Text style={styles.rtAskBotText}>  Ask AI Bot</Text>
            </TouchableOpacity>

          </View>
        </View>

        {/* AI Assistant Quick Help */}
        <View style={styles.quickHelpCard}>
          <View style={styles.quickHelpHeader}>
            <MaterialCommunityIcons name="robot-outline" size={18} color="#7C3AED" />
            <Text style={styles.quickHelpTitle}>AI Assistant Quick Help</Text>
          </View>

          <View style={{ marginTop: 14 }}>
            {QUICK_HELP_ITEMS.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={styles.quickHelpItemBox}
                onPress={() => {
                  setAiAlert(`AI Bot: ${item.question}`);
                  setTimeout(() => setAiAlert(null), 3000);
                }}
              >
                <Ionicons name="chatbubble-ellipses-outline" size={18} color="#4B5563" />
                <Text style={styles.quickHelpText}>{item.question}</Text>
              </TouchableOpacity>

            ))}
          </View>

        </View>


        {/* Support Tickets */}
        <Text style={styles.supportTicketsTitle}>Your Support Tickets</Text>
        <View style={{ marginTop: 8 }}>
          {SUPPORT_TICKETS.map(renderTicketCard)}
        </View>
      </View>
    );
  };

  /* ----------------- MAIN RENDER ----------------- */

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {renderHeader()}

        {/* Tabs */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === "Insights" && styles.tabActive,
            ]}
            onPress={() => setActiveTab("Insights")}
          >
            <Text
              style={
                activeTab === "Insights"
                  ? styles.tabTextActive
                  : styles.tabText
              }
            >
              <MaterialCommunityIcons
                name="share-variant-outline"
                size={18}
                style={{ marginRight: 6 }}
              />{" "}
              Insights
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === "Meetings" && styles.tabActive,
            ]}
            onPress={() => setActiveTab("Meetings")}
          >
            <Text
              style={
                activeTab === "Meetings"
                  ? styles.tabTextActive
                  : styles.tabText
              }
            >
              <MaterialCommunityIcons
                name="video-outline"
                size={18}
                style={{ marginRight: 6 }}
              />{" "}
              Meetings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === "Learning" && styles.tabActive,
            ]}
            onPress={() => setActiveTab("Learning")}
          >
            <Text
              style={
                activeTab === "Learning"
                  ? styles.tabTextActive
                  : styles.tabText
              }
            >
              <MaterialCommunityIcons
                name="school-outline"
                size={18}
                style={{ marginRight: 6 }}
              />{" "}
              Learning
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === "Support" && styles.tabActive,
            ]}
            onPress={() => setActiveTab("Support")}
          >
            <Text
              style={
                activeTab === "Support"
                  ? styles.tabTextActive
                  : styles.tabText
              }
            >
              <MaterialCommunityIcons
                name="message-text-outline"
                size={18}
                style={{ marginRight: 6 }}
              />{" "}
              Support
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "Insights" && renderInsights()}
        {activeTab === "Meetings" && renderMeetings()}
        {activeTab === "Learning" && renderLearnings()}
        {activeTab === "Support" && renderSupport()}
      </ScrollView>

      {showCreateTicketModal && (
        <View style={styles.ticketModalOverlay}>
          <View style={styles.ticketModalBox}>
            <TouchableOpacity
              style={styles.ticketModalClose}
              onPress={() => setShowCreateTicketModal(false)}
            >
              <Ionicons name="close" size={22} color="#000" />
            </TouchableOpacity>
            {/* Header */}
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              <MaterialCommunityIcons name="file-document-edit-outline" size={20} color="#00796B" />
              <Text style={styles.ticketModalTitle}>  Create Support Ticket</Text>
            </View>
            <Text style={styles.ticketModalSubtitle}>
              Our support team will respond to your request promptly
            </Text>

            {/* Category */}
            <Text style={styles.ticketLabel}>Category *</Text>
            <View style={styles.categoryGrid}>
              {["Technical", "Product Query", "Order Issue", "General"].map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryOption,
                    selectedCategory === cat && styles.categoryOptionActive,
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text
                    style={[
                      styles.categoryOptionText,
                      selectedCategory === cat && { color: "#00796B", fontWeight: "700" },
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Subject */}
            <Text style={styles.ticketLabel}>Subject *</Text>
            <TextInput
              placeholder="Brief description of your issue..."
              placeholderTextColor="#9ba1a6"
              style={styles.ticketInput}
              value={subject}
              onChangeText={setSubject}
            />

            {/* Message */}
            <Text style={styles.ticketLabel}>Message *</Text>
            <TextInput
              placeholder="Provide detailed information about your issue..."
              placeholderTextColor="#9ba1a6"
              style={[styles.ticketInput, { height: 90 }]}
              value={message}
              onChangeText={setMessage}
              multiline
            />

            {/* Priority */}
            <Text style={styles.ticketLabel}>Priority</Text>
            <View style={styles.priorityRow}>
              {["Low", "Medium", "High"].map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[
                    styles.priorityBtn,
                    priority === p && styles.priorityBtnActive,
                  ]}
                  onPress={() => setPriority(p)}
                >
                  <Text
                    style={[
                      styles.priorityBtnText,
                      priority === p && { color: "#00796B", fontWeight: "700" },
                    ]}
                  >
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Footer buttons */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowCreateTicketModal(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitBtn} onPress={() => {
                if (!subject.trim() || !message.trim()) {
                  setAiAlertIcon("information-circle");
                  setAiAlert("Please provide subject and message");
                  setTimeout(() => setAiAlert(null), 3000);
                  return;
                }

                // success alert
                setShowCreateTicketModal(false);
                setSubject("");
                setMessage("");
                setPriority("");
                setSelectedCategory("General");
                setAiAlertIcon("checkmark-circle");
                setAiAlert("Support ticket created. Our team will respond shortly.");
                setTimeout(() => setAiAlert(null), 3000);
              }}
              >
                <MaterialCommunityIcons name="send" size={16} color="#fff" />
                <Text style={styles.submitBtnText}>  Create Ticket</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {showJointVisitModal && (
        <View style={styles.ticketModalOverlay}>
          <View style={styles.jfwModalBox}>

            {/* Close */}
            <TouchableOpacity
              style={styles.ticketModalClose}
              onPress={() => setShowJointVisitModal(false)}
            >
              <Ionicons name="close" size={22} color="#000" />
            </TouchableOpacity>

            {/* Header */}
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              <MaterialCommunityIcons name="account-multiple-plus-outline" size={20} color="#00796B" />
              <Text style={styles.ticketModalTitle}>  Request Joint Field Work</Text>
            </View>
            <Text style={styles.ticketModalSubtitle}>
              Schedule a joint visit with a team member to an HCP clinic
            </Text>

            {/* TEAM MEMBER */}
            <Text style={styles.ticketLabel}>Select Team Member *</Text>
            <TouchableOpacity
              style={styles.selectBox}
              onPress={() => {
                setShowTeamDropdown(!showTeamDropdown);
                setShowDoctorDropdown(false);
              }}
            >
              <Text style={teamMember ? styles.selectText : styles.selectPlaceholder}>
                {teamMember || "Choose team member..."}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#333" />
            </TouchableOpacity>

            {showTeamDropdown && (
              <View style={styles.selectDropdown}>
                {["Choose team member...", ...TEAM_MEMBERS].map((item, index) => {
                  const isSelected = teamMember === item;
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.selectOption,
                        isSelected && styles.selectOptionSelected
                      ]}
                      onPress={() => {
                        if (item !== "Choose team member...") setTeamMember(item);
                        setShowTeamDropdown(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.selectOptionText,
                          isSelected && styles.selectOptionTextSelected
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}



            {/* DOCTOR */}
            <Text style={styles.ticketLabel}>Doctor to Visit *</Text>

            <TouchableOpacity
              style={styles.selectBox}
              onPress={() => {
                setShowDoctorDropdown(!showDoctorDropdown);
                setShowTeamDropdown(false); // ensure only one dropdown open at a time
              }}
            >
              <Text style={doctor ? styles.selectText : styles.selectPlaceholder}>
                {doctor || "Choose doctor..."}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#333" />
            </TouchableOpacity>

            {showDoctorDropdown && (
              <View style={styles.selectDropdown}>
                {["Choose doctor...", ...DOCTORS].map((item, index) => {
                  const isSelected = doctor === item;
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.selectOption,
                        isSelected && styles.selectOptionSelected
                      ]}
                      onPress={() => {
                        if (item !== "Choose doctor...") setDoctor(item);
                        setShowDoctorDropdown(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.selectOptionText,
                          isSelected && styles.selectOptionTextSelected
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}



            {/* CLINIC */}
            <Text style={styles.ticketLabel}>Clinic/Location</Text>
            <TextInput
              placeholder="e.g., City Care Multi-Specialty Clinic"
              style={styles.ticketInput}
              value={clinic}
              onChangeText={setClinic}
            />

            {/* DATE + TIME */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ width: "48%" }}>
                <Text style={styles.ticketLabel}>Date *</Text>
                <TextInput
                  placeholder="dd-mm-yyyy"
                  style={styles.ticketInput}
                  value={date}
                  onChangeText={setDate}
                />
              </View>

              <View style={{ width: "48%" }}>
                <Text style={styles.ticketLabel}>Time</Text>
                <TextInput
                  placeholder="--:--"
                  style={styles.ticketInput}
                  value={time}
                  onChangeText={setTime}
                />
              </View>
            </View>

            {/* REASON */}
            <Text style={styles.ticketLabel}>Reason for Joint Visit *</Text>
            <TextInput
              placeholder="e.g., Doctor has additional queries regarding side effects of the drug…"
              style={[styles.ticketInput, { height: 90 }]}
              value={reason}
              onChangeText={setReason}
              multiline
            />

            {/* BENEFITS BOX */}
            <View style={styles.jfwBenefitsBox}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                <MaterialCommunityIcons name="music-note-eighth" size={18} color="#1A57CC" />
                <Text style={{ fontWeight: "700", marginLeft: 6, color: "#1A57CC" }}>
                  Joint Field Work Benefits:
                </Text>
              </View>

              <Text style={styles.benefitsText}>• Knowledge sharing and skill development</Text>
              <Text style={styles.benefitsText}>• Complex case handling with senior support</Text>
              <Text style={styles.benefitsText}>• Relationship building with key HCPs</Text>
              <Text style={styles.benefitsText}>• Real-time coaching and feedback</Text>
            </View>

            {/* FOOTER BUTTONS */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowJointVisitModal(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.jfwSubmitBtn}
                onPress={() => {
                  if (!teamMember || !doctor || !date || !reason.trim()) {
                    setAiAlertIcon("information-circle");
                    setAiAlert("Please fill in all required fields");
                    setTimeout(() => setAiAlert(null), 3000);
                    return;
                  }

                  setShowJointVisitModal(false);
                  setAiAlertIcon("checkmark-circle");
                  setAiAlert(`Joint Field Work request sent to ${teamMember.split(" - ")[0]}!`);
                  setTimeout(() => setAiAlert(null), 3000);
                  setTime("")
                  setDate("")
                  setDoctor("")
                  setTeamMember("")
                  setReason("")
                  setClinic("")
                }}
              >
                <MaterialCommunityIcons name="send" size={16} color="#fff" />
                <Text style={styles.submitBtnText}>  Send Request</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {showInsightModal && (
        <View style={styles.ticketModalOverlay}>
          <View style={styles.insightModalBox}>

            {/* Close */}
            <TouchableOpacity
              style={styles.ticketModalClose}
              onPress={() => setShowInsightModal(false)}
            >
              <Ionicons name="close" size={22} color="#000" />
            </TouchableOpacity>

            {/* Header */}
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              <MaterialCommunityIcons name="share-circle" size={20} color="#00796B" />
              <Text style={styles.ticketModalTitle}>  Share Team Insight</Text>
            </View>
            <Text style={styles.ticketModalSubtitle}>
              Share your success story or best practice with the team
            </Text>

            {/* CATEGORY */}
            <Text style={styles.ticketLabel}>Category *</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 6 }}>
              {["Success Story", "Best Practice", "Market Intel", "Product Feedback"].map((c) => (
                <TouchableOpacity
                  key={c}
                  onPress={() => setInsightCategory(c)}
                  style={[
                    styles.categoryPillShareInsight,
                    insightCategory === c && styles.categoryPillActive
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryPillText,
                      insightCategory === c && styles.categoryPillTextActive
                    ]}
                  >
                    {c}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* TITLE */}
            <Text style={styles.ticketLabel}>Title *</Text>
            <TextInput
              placeholder="Enter a descriptive title..."
              style={styles.ticketInput}
              value={insightTitle}
              onChangeText={setInsightTitle}
            />

            {/* CONTENT */}
            <Text style={styles.ticketLabel}>Content *</Text>
            <TextInput
              placeholder="Share your insight, strategy, learning, or observation..."
              style={[styles.ticketInput, { height: 100 }]}
              value={insightContent}
              onChangeText={setInsightContent}
              multiline
            />

            {/* OPTIONAL METRICS */}
            <Text style={styles.ticketLabel}>Add Metrics (Optional)</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TextInput
                placeholder="Doctors"
                keyboardType="numeric"
                value={insightDoctors}
                onChangeText={(t) => setInsightDoctors(t.replace(/[^0-9]/g, ""))}
                style={styles.metricInput}
              />
              <TextInput
                placeholder="Prescriptions"
                keyboardType="numeric"
                value={insightPrescriptions}
                onChangeText={(t) => setInsightPrescriptions(t.replace(/[^0-9]/g, ""))}
                style={styles.metricInput}
              />
              <TextInput
                placeholder="Revenue ₹"
                keyboardType="numeric"
                value={insightRevenue}
                onChangeText={(t) => setInsightRevenue(t.replace(/[^0-9]/g, ""))}
                style={styles.metricInput}
              />
            </View>


            {/* OPTIONAL ATTACHMENTS */}
            <Text style={[styles.ticketLabel, { marginTop: 10 }]}>Attachments (Optional)</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity style={styles.fileBtn}>
                <MaterialCommunityIcons name="file-outline" size={18} />
                <Text style={{ marginLeft: 6 }}>Add File</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.fileBtn}>
                <MaterialCommunityIcons name="image-outline" size={18} />
                <Text style={{ marginLeft: 6 }}>Add Image</Text>
              </TouchableOpacity>
            </View>

            {/* FOOTER BUTTONS */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowInsightModal(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.jfwSubmitBtn}
                onPress={() => {
                  if (!insightTitle.trim() || !insightContent.trim()) {
                    setAiAlertIcon("information-circle");
                    setAiAlert("Please provide both title and content");
                    setTimeout(() => setAiAlert(null), 3000);
                    return;
                  }

                  setShowInsightModal(false);
                  setAiAlertIcon("checkmark-circle");
                  setAiAlert("Insight shared with team successfully!");
                  setTimeout(() => setAiAlert(null), 3000);
                  setInsightContent("")
                  setInsightTitle("")
                  setInsightCategory("Best Practice")
                }}
              >
                <MaterialCommunityIcons name="send" size={16} color="#fff" />
                <Text style={styles.submitBtnText}>  Share Insight</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      )}



      {/* floating action button (kept as is) */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>L</Text>
      </TouchableOpacity>
      {aiAlert && (
        <View style={styles.aiAlertContainer}>
          <View style={styles.aiAlertBox}>
            <Ionicons name={aiAlertIcon} size={18} color="#000" />
            <Text style={styles.aiAlertText}>{aiAlert}</Text>
          </View>
        </View>
      )}


    </SafeAreaView>
  );
};

export default App;

/* ----------------- STYLES ----------------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  /* Header */
  headerContainer: {
    marginTop: 12,
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#5B46FF",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#161616",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#7c7c7c",
    marginTop: 2,
  },

  headerStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statCard: {
    flex: 1,
    height: 72,
    borderRadius: 8,
    padding: 14,
    marginRight: 10,
    justifyContent: "center",
    position: "relative",
  },
  statCardBlue: {
    backgroundColor: "#E9F5FF",
    marginRight: 12,
  },
  statCardPink: {
    backgroundColor: "#F6EAFE",
  },
  statLabel: {
    fontSize: 12,
    color: "#6b6b6b",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2a2a2a",
    marginTop: 6,
  },

  /* Tabs */
  tabsRow: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    padding: 6,
    borderRadius: 18,
    marginBottom: 12,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 18,
  },
  tabActive: { backgroundColor: "#fff" },
  tabText: { color: "#475569" },
  tabTextActive: { fontWeight: "700" },

  /* Share box */
  shareBox: {
    marginTop: 14,
    backgroundColor: "#EEF9F0",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#DFF7E8",
  },
  shareIcon: {
    width: 28,
    height: 28,
    borderRadius: 28,
    backgroundColor: "#0BA44D",
    alignItems: "center",
    justifyContent: "center",
  },
  shareTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 8,
    color: "#123e26",
  },
  shareDesc: {
    color: "#5a7b61",
    marginTop: 8,
    marginBottom: 12,
    lineHeight: 18,
  },
  shareBtn: {
    backgroundColor: "#09893b",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 6,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  shareBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 6,
  },

  /* Search */
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#efefef",
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    color: "#333",
  },

  /* Post card */
  postCard: {
    backgroundColor: "#fff",
    marginTop: 14,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eef0f3",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#B4A9FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "700",
  },
  postAuthor: {
    fontWeight: "700",
    fontSize: 14,
    color: "#161616",
  },
  postRole: {
    fontSize: 12,
    color: "#8d8d8d",
    marginTop: 4,
  },
  postTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    marginLeft: 8,
  },
  postTagText: {
    fontSize: 12,
    fontWeight: "600",
  },
  tagSuccess: {
    backgroundColor: "#ECFFF4",
    borderColor: "#C7F2D7",
  },
  tagBlue: {
    backgroundColor: "#F1F7FF",
    borderColor: "#D6E9FF",
  },
  tagPurple: {
    backgroundColor: "#FCF4FF",
    borderColor: "#F0DBFF",
  },
  tagOrange: {
    backgroundColor: "#FFF7EF",
    borderColor: "#FFE7C9",
  },

  postTitle: {
    fontWeight: "700",
    marginTop: 6,
    marginBottom: 8,
    color: "#111",
  },
  postBody: {
    color: "#6a6a6a",
    lineHeight: 20,
    marginBottom: 12,
    fontSize: 13,
  },

  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 12,
  },
  metricBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginRight: 8,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  metricLabel: {
    fontSize: 12,
    color: "#4c4c4c",
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2b2b2b",
  },

  divider: {
    height: 1,
    backgroundColor: "#eef0f3",
    marginVertical: 10,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerCount: {
    marginLeft: 6,
    marginRight: 12,
    fontSize: 13,
  },

  /* FAB */
  fab: {
    position: "absolute",
    right: 16,
    bottom: 22,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#07A86B",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Meetings / cards / banners */
  banner: {
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    marginTop: 12,
  },
  circleIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#123e26",
    marginTop: 2,
  },
  bannerDesc: {
    color: "#5a7b61",
    marginTop: 8,
    fontSize: 13,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#EEF0F3",
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  cardSubtitle: {
    color: "#6a6a6a",
    marginTop: 8,
    fontSize: 13,
  },

  smallBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    marginLeft: 10,
  },
  smallBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  muted: {
    color: "#8f8f8f",
    marginTop: 6,
    marginBottom: 8,
  },

  infoBox: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginTop: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoBoxTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
  infoRowSpace: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: "#6b6b6b",
  },
  infoValue: {
    fontSize: 13,
    color: "#111",
    marginTop: 6,
    fontWeight: "600",
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
    width: "50%",
  },
  metaText: {
    marginLeft: 8,
    color: "#6b6b6b",
  },
  hostText: {
    color: "#6b6b6b",
  },

  reasonBox: {
    backgroundColor: "#FFFBE8",
    borderColor: "#F6E6A6",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  reasonTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
  },
  reasonText: {
    color: "#444",
    fontSize: 13,
  },

  actionRow: {
    marginTop: 12,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#111",
    fontWeight: "600",
  },

  hostBox: {
    borderWidth: 1,
    borderColor: "#d9e5f7ff",
    backgroundColor: "#f6f8fcff",
    padding: 10,
    borderRadius: 6,
    marginTop: 12,
    marginBottom: 12,
  },

  /* ----------------- SUPPORT STYLES (NEW) ----------------- */

  supportRoot: {
    paddingBottom: 24,
  },

  /* Real-Time Support card */
  rtCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BFE7EC",
    backgroundColor: "#F4FEFF",
    padding: 14,
    marginTop: 12,
  },
  rtHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rtIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#D6F5F7",
    alignItems: "center",
    justifyContent: "center",
  },
  rtTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#172B36",
  },
  rtSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#5D6A72",
  },
  rtActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  rtBtnHalf: {
    width: "49%",
  },
  rtCreateBtn: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#008EAD",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rtCreateBtnText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
  rtAskBotBtn: {
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E1D7FF",
    backgroundColor: "#FBF9FF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rtAskBotText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#5B21CC",
  },

  /* Quick Help */
  quickHelpCard: {
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8D9FF",
    backgroundColor: "#FAF6FF",
    padding: 16,
  },

  quickHelpHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },

  quickHelpTitle: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "700",
    color: "#43306B",
  },

  quickHelpRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 10,
  },

  quickHelpText: {
    fontSize: 13,
    color: "#1F2937",
    flex: 1,
  },

  quickHelpDivider: {
    height: 1,
    backgroundColor: "#E6DFF7",
  },

  quickHelpItemBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10, // spacing between each help box
    gap: 10,
  },


  /* Tickets */
  supportTicketsTitle: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
  },
  ticketCard: {
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  ticketCardRed: {
    backgroundColor: "#FFF7F7",
    borderColor: "#FFBFC0",
  },
  ticketCardYellow: {
    backgroundColor: "#FFFBF2",
    borderColor: "#FFDDA4",
  },

  ticketHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8
  },
  ticketTitleContainer: {
    flex: 1,
  },


  ticketTitleLeft: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },

  ticketTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    maxWidth: "100%", // ensures wrapping
  },


  ticketCategoryChip: {
    marginTop: 4,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  ticketCategoryText: {
    fontSize: 11,
    color: "#4B5563",
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: "600",
  },
  statusPillInProgress: {
    backgroundColor: "#E0EDFF",
  },
  statusPillResolved: {
    backgroundColor: "#DDFBE3",
  },
  statusPillOpen: {
    backgroundColor: "#FFF2B3",
  },

  ticketAssigned: {
    marginTop: 6,
    fontSize: 12,
    color: "#4B5563",
  },
  ticketDivider: {
    marginTop: 10,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  ticketFooterRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ticketMetaText: {
    fontSize: 11,
    color: "#6B7280",
  },
  priorityChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  priorityChipText: {
    fontSize: 11,
    fontWeight: "600",
  },
  priorityHigh: {
    backgroundColor: "#FFE5E7",
    borderColor: "#FCA5A5",
  },
  priorityMedium: {
    backgroundColor: "#F4ECFF",
    borderColor: "#D8B4FE",
  },
  priorityLow: {
    backgroundColor: "#E5F6FF",
    borderColor: "#BAE6FD",
  },
  aiAlertContainer: {
    position: "absolute",
    top: 18,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 999,
  },

  aiAlertBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  aiAlertText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },

  bannerPink: {
    backgroundColor: "#FDF6FB",
    borderColor: "#F1E6F4",
  },
  bannerBlue: {
    backgroundColor: "#EEF9FF",
    borderColor: "#D6EEF8",
  },

  /* Overall progress */
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
  },
  progressCount: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111",
  },
  smallMuted: {
    marginTop: 8,
    color: "#666",
    fontSize: 13,
  },
  overallTrack: {
    height: 10,
    backgroundColor: "#E8F0F4",
    borderRadius: 8,
    marginTop: 8,
    overflow: "hidden",
  },
  overallFill: {
    height: 10,
    backgroundColor: "#000",
    borderRadius: 8,
  },

  /* Filter card */
  simpleCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EEF0F3",
  },
  cardTitleSmall: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
  },
  chip: {
    borderWidth: 1,
    borderColor: "#E6E8EB",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  chipActive: {
    backgroundColor: "#0B65F9",
    borderColor: "#0B65F9",
  },
  chipText: {
    fontSize: 13,
    color: "#333",
  },
  chipTextActive: {
    color: "#fff",
    fontWeight: "700",
  },

  /* Search */
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#efefef",
  },

  /* Course card */
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EEF0F3",
    marginBottom: 12,
  },
  /* REMOVE justifyContent: space-between here */
  courseHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  /* New LEFT zone */
  leftTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    flex: 1,
  },

  /* No change to courseTitle */
  courseTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },

  /* Mandatory inline pill */
  mandatoryBadgeInline: {
    backgroundColor: "#FFF0F0",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "#FFD6D6",
    marginLeft: 8,
  },

  // courseTitle: {
  //   fontSize: 16,
  //   fontWeight: "700",
  //   color: "#111",
  //   flex: 1,
  //   paddingRight: 8,
  // },
  courseDesc: {
    marginTop: 8,
    color: "#666",
    lineHeight: 18,
  },

  categoryPill: {
    marginTop: 6,
    alignSelf: "flex-start",
    backgroundColor: "#EEF6FF",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#D9E7FF",
  },
  categoryText: {
    color: "#305FD6",
    fontWeight: "600",
    fontSize: 12,
  },

  mandatoryBadge: {
    backgroundColor: "#FFF0F0",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#FFD6D6",
    marginRight: 6,
  },
  mandatoryText: {
    color: "#D04B4B",
    fontWeight: "700",
    fontSize: 12,
  },

  statusBadge: {
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
  },
  statusCompleted: {
    backgroundColor: "#E9FFF0",
    borderColor: "#CFF0D9",
  },
  statusInProgress: {
    backgroundColor: "#EAF1FF",
    borderColor: "#D3E0FF",
  },
  statusNotStarted: {
    backgroundColor: "#F5F5F7",
    borderColor: "#E4E4E7",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },

  infoBlock: {
    marginRight: 14,
    marginTop: 4,
  },

  certificateBanner: {
    marginTop: 14,
    backgroundColor: "#E9FFE9",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#C6F1C6",
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  certificateText: {
    color: "#166534",
    fontSize: 13,
  },

  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E4E4E7",
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },

  courseActionsRow: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
  },

  /* When both Review + Download exist (50/50) */
  secondaryHalfButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E4E6EB",
    marginRight: 10, // GAP between buttons
  },
  secondaryHalfButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },

  primaryHalfButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 8,
  },

  /* When only 1 button exists -> fullscreen */
  primaryFullButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 8,
  },

  primaryHalfButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  ticketModalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    zIndex: 999,
  },

  ticketModalBox: {
    width: "100%",
    maxWidth: 460,  // increased from 420
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 22,    // slightly more padding
    position: "relative",
  },

  ticketModalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0A3D37",
  },

  ticketModalSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 18,
  },

  ticketLabel: {
    fontSize: 13,
    fontWeight: "700",
    marginTop: 14,
    marginBottom: 6,
    color: "#1B1C1E",
  },

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  categoryOption: {
    width: "48%",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 10,
    alignItems: "center",
  },

  categoryOptionActive: {
    backgroundColor: "#E1F7F3",
    borderColor: "#00A88F",
  },

  categoryOptionText: {
    fontSize: 14,
    color: "#374151",
  },

  ticketInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#111",
    backgroundColor: "#F8F9FA",
  },

  priorityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },

  priorityBtn: {
    width: "30%",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  priorityBtnActive: {
    backgroundColor: "#E1F7F3",
    borderColor: "#00A88F",
  },

  priorityBtnText: {
    fontSize: 14,
    color: "#374151",
  },

  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  cancelBtn: {
    backgroundColor: "#F1F5F9",
    paddingVertical: 12,
    borderRadius: 8,
    paddingHorizontal: 28,
  },

  cancelBtnText: {
    fontWeight: "600",
    color: "#374151",
  },

  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#009FB7",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },

  submitBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14
  },

  ticketModalClose: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 50,
    padding: 6,
  },
  jfwModalBox: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 22,
    position: "relative",
  },

  dropdown: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dropdownPlaceholder: {
    color: "#9EA3AA"
  },
  dropdownText: {
    color: "#111",
    fontWeight: "500",
  },

  dropdownOverlay: {
    position: "absolute",
    top: 100,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    zIndex: 999,
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  dropdownValue: {
    fontSize: 14,
    color: "#111",
  },
  dropdownInline: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    maxHeight: 160,
    overflow: "hidden",
  },

  selectBox: {
    borderWidth: 1,
    borderColor: "#CFCFCF",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  selectText: {
    fontSize: 14,
    color: "#111",
  },
  selectPlaceholder: {
    fontSize: 14,
    color: "#9EA3AA",
  },

  selectDropdown: {
    borderWidth: 1,
    borderColor: "#CFCFCF",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    overflow: "hidden",
  },

  selectOption: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  selectOptionSelected: {
    backgroundColor: "#0B5FFF",  // blue highlight
  },

  selectOptionText: {
    fontSize: 14,
    color: "#111",
  },
  selectOptionTextSelected: {
    color: "#FFFFFF", // white inside blue
  },

  jfwBenefitsBox: {
    marginTop: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CFE1FF",
    backgroundColor: "#EEF4FF",
    padding: 14,
  },

  benefitsText: {
    color: "#215288",
    fontSize: 13,
    marginBottom: 4,
  },

  jfwSubmitBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#009F67",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },


  insightModalBox: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 22,
    position: "relative",
  },

  categoryPillShareInsight: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DADADA",
    marginRight: 8,
    marginBottom: 8,
  },
  categoryPillActive: {
    backgroundColor: "#E6F0FF",
    borderColor: "#4C84FF",
  },
  categoryPillText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "500",
  },
  categoryPillTextActive: {
    color: "#2762FF",
    fontWeight: "700",
  },

  metricBoxShareInsight: {
    width: "31%",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 12,
  },

  fileBtn: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  metricInput: {
    width: "31%",
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#111",
  }


});
