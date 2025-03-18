// app/settings.tsx
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Screen } from "../components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <Screen title="Settings" showBack={true}>
      <ScrollView style={styles.container}>
        {/* Profile Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person-outline" size={24} color="#007AFF" />
            <Text style={styles.sectionTitle}>My Profile</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Age</Text>
              <Text style={styles.value}>28</Text>
              <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
            </View>
            <View style={[styles.row, styles.borderTop]}>
              <Text style={styles.label}>Height</Text>
              <Text style={styles.value}>175 cm</Text>
              <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
            </View>
            <View style={[styles.row, styles.borderTop]}>
              <Text style={styles.label}>Current Weight</Text>
              <Text style={styles.value}>70 kg</Text>
              <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
            </View>
          </View>
        </View>

        {/* Plan Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="star-outline" size={24} color="#007AFF" />
            <Text style={styles.sectionTitle}>My Plan</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Current Plan</Text>
              <Text style={[styles.value, styles.premium]}>Premium</Text>
              <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
            </View>
            <View style={[styles.row, styles.borderTop]}>
              <Text style={styles.label}>Renewal Date</Text>
              <Text style={styles.value}>Jan 30, 2025</Text>
              <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
            </View>
            <View style={[styles.row, styles.borderTop]}>
              <Text style={styles.label}>Diet Type</Text>
              <Text style={styles.value}>Balanced</Text>
              <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
            </View>
            <View style={[styles.row, styles.borderTop]}>
              <Text style={styles.label}>Daily Calorie Goal</Text>
              <Text style={styles.value}>2000 kcal</Text>
              <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
            </View>
          </View>
        </View>

        {/* Diet Goals Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="trophy-outline" size={24} color="#007AFF" />
            <Text style={styles.sectionTitle}>Diet Goals</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Target Weight</Text>
              <Text style={styles.value}>65 kg</Text>
              <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
            </View>
            <View style={[styles.row, styles.borderTop]}>
              <Text style={styles.label}>Weekly Goal</Text>
              <Text style={styles.value}>-0.5 kg</Text>
              <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
            </View>
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings-outline" size={24} color="#007AFF" />
            <Text style={styles.sectionTitle}>Preferences</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Units</Text>
              <Text style={styles.value}>Metric</Text>
              <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
            </View>
            <View style={[styles.row, styles.borderTop]}>
              <Text style={styles.label}>Language</Text>
              <Text style={styles.value}>English</Text>
              <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#007AFF"
            />
            <Text style={styles.sectionTitle}>About</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Version</Text>
              <Text style={styles.value}>1.0.0</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  lastSection: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 8,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: "#8E8E93",
    marginRight: 8,
  },
  premium: {
    color: "#FFD700",
    fontWeight: "600",
  },
});
