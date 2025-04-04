// app/analytics.tsx
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { Screen } from "../components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";
import { LineChart, BarChart } from "react-native-chart-kit";
import { BottomTabNavigator } from "@/components/TabNavigator";

export default function AnalyticsScreen() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState("week"); // 'week', 'month', 'year'
  const [weightModalVisible, setWeightModalVisible] = useState(false);
  const [currentWeight, setCurrentWeight] = useState("69.2");
  const [weightNote, setWeightNote] = useState("");
  const [weightHistory, setWeightHistory] = useState([
    { date: "Mar 28, 2025", weight: "69.2", note: "After morning run" },
    { date: "Mar 27, 2025", weight: "69.4", note: "" },
    { date: "Mar 26, 2025", weight: "69.5", note: "Higher sodium yesterday" },
    { date: "Mar 25, 2025", weight: "69.7", note: "" },
    { date: "Mar 24, 2025", weight: "69.8", note: "" },
  ]);

  // Handle opening modal safely
  const openWeightModal = useCallback(() => {
    // Reset the weight input to current weight when opening the modal
    setCurrentWeight(weightHistory[0]?.weight || "69.2");
    setWeightNote("");
    setWeightModalVisible(true);
  }, [weightHistory]);

  // Sample data
  const weightData = {
    week: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          data: [70.2, 70.0, 69.8, 69.7, 69.5, 69.4, 69.2],
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    },
    month: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          data: [70.5, 70.0, 69.5, 69.2],
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    },
    year: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          data: [72.0, 71.5, 71.0, 70.5, 70.0, 69.2],
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    },
  };

  const calorieData = {
    week: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          data: [1850, 2050, 1900, 2100, 1800, 2200, 1950],
          color: (opacity = 1) => `rgba(255, 149, 0, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    },
    month: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          data: [1950, 2000, 1900, 1950],
          color: (opacity = 1) => `rgba(255, 149, 0, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    },
    year: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          data: [2200, 2150, 2100, 2050, 2000, 1950],
          color: (opacity = 1) => `rgba(255, 149, 0, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    },
  };

  const macroData = {
    labels: ["Protein", "Carbs", "Fat"],
    data: [30, 50, 20],
    barColors: ["#007AFF", "#FF9500", "#FF3B30"],
    legendFontSize: 12,
  };

  const chartWidth = Dimensions.get("window").width - 40;
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "5",
      strokeWidth: "2",
    },
  };

  const handleSaveWeight = () => {
    // Validate input
    if (!currentWeight.trim()) {
      // Handle empty weight
      alert("Please enter a valid weight");
      return;
    }

    // Get current date
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // Create new entry
    const newEntry = {
      date: formattedDate,
      weight: currentWeight,
      note: weightNote,
    };

    // Add to history
    setWeightHistory([newEntry, ...weightHistory]);

    // Close modal and reset fields
    setWeightModalVisible(false);
    setWeightNote("");
  };

  // Time range selector component
  const TimeRangeSelector = () => (
    <View style={styles.timeRangeContainer}>
      <TouchableOpacity
        style={[
          styles.timeRangeButton,
          timeRange === "week" && styles.timeRangeButtonActive,
        ]}
        onPress={() => setTimeRange("week")}
      >
        <Text
          style={[
            styles.timeRangeText,
            timeRange === "week" && styles.timeRangeTextActive,
          ]}
        >
          Week
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.timeRangeButton,
          timeRange === "month" && styles.timeRangeButtonActive,
        ]}
        onPress={() => setTimeRange("month")}
      >
        <Text
          style={[
            styles.timeRangeText,
            timeRange === "month" && styles.timeRangeTextActive,
          ]}
        >
          Month
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.timeRangeButton,
          timeRange === "year" && styles.timeRangeButtonActive,
        ]}
        onPress={() => setTimeRange("year")}
      >
        <Text
          style={[
            styles.timeRangeText,
            timeRange === "year" && styles.timeRangeTextActive,
          ]}
        >
          Year
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Weight modal component
  const WeightModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={weightModalVisible}
      onRequestClose={() => setWeightModalVisible(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setWeightModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  onPress={() => setWeightModalVisible(false)}
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                >
                  <Text style={styles.modalCancel}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Record Weight</Text>
                <TouchableOpacity
                  onPress={handleSaveWeight}
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                >
                  <Text style={styles.modalSave}>Save</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.weightInputContainer}>
                <TextInput
                  style={styles.weightInput}
                  value={currentWeight}
                  onChangeText={setCurrentWeight}
                  keyboardType="decimal-pad"
                  maxLength={5}
                />
                <Text style={styles.weightUnit}>kg</Text>
              </View>

              <View style={styles.noteContainer}>
                <Text style={styles.noteLabel}>Note (optional)</Text>
                <TextInput
                  style={styles.noteInput}
                  value={weightNote}
                  onChangeText={setWeightNote}
                  placeholder="How are you feeling today?"
                  multiline={true}
                  maxLength={100}
                />
              </View>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );

  // Weight history component
  const WeightHistory = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name="list-outline" size={24} color="#007AFF" />
        <Text style={styles.sectionTitle}>Weight History</Text>
      </View>
      <View style={styles.card}>
        {weightHistory.map((entry, index) => (
          <View
            key={index}
            style={[styles.historyItem, index > 0 && styles.borderTop]}
          >
            <View style={styles.historyMain}>
              <Text style={styles.historyDate}>{entry.date}</Text>
              <Text style={styles.historyWeight}>{entry.weight} kg</Text>
            </View>
            {entry.note ? (
              <Text style={styles.historyNote}>{entry.note}</Text>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: "#007AFF",
          headerShadowVisible: false,
        }}
      />
      <Screen title="Analytics" showBack={false}>
        <ScrollView style={styles.container}>
          {/* Summary Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="analytics-outline" size={24} color="#007AFF" />
              <Text style={styles.sectionTitle}>Summary</Text>
            </View>
            <View style={styles.card}>
              <View style={styles.summaryRow}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryValue}>-0.8 kg</Text>
                  <Text style={styles.summaryLabel}>Last 30 days</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryValue}>-5.0 kg</Text>
                  <Text style={styles.summaryLabel}>Total loss</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Current Weight Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="scale-outline" size={24} color="#FF2D55" />
              <Text style={styles.sectionTitle}>Current Weight</Text>
              <TouchableOpacity
                style={styles.addWeightButton}
                onPress={openWeightModal}
                activeOpacity={0.8}
              >
                <Ionicons name="add" size={18} color="#FFFFFF" />
                <Text style={styles.addWeightButtonText}>Add Weight</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.card}>
              <View style={styles.currentWeightContainer}>
                <View style={styles.weightIconContainer}>
                  <Ionicons name="body-outline" size={40} color="#FF2D55" />
                </View>
                <View style={styles.weightDetailsContainer}>
                  <Text style={styles.currentWeightValue}>
                    {weightHistory[0]?.weight || "69.2"} kg
                  </Text>
                  <View style={styles.weightChangeContainer}>
                    <Ionicons name="arrow-down" size={16} color="#34C759" />
                    <Text style={styles.weightChangeText}>
                      -0.2 kg from last week
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Weight Progress */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="trending-down-outline"
                size={24}
                color="#007AFF"
              />
              <Text style={styles.sectionTitle}>Weight Progress</Text>
            </View>
            <TimeRangeSelector />
            <View style={styles.chartCard}>
              <LineChart
                data={weightData[timeRange]}
                width={chartWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
              />
              <View style={styles.chartLabels}>
                <View style={styles.chartLabelItem}>
                  <View style={[styles.dot, { backgroundColor: "#007AFF" }]} />
                  <Text style={styles.chartLabelText}>
                    Current: {weightHistory[0]?.weight || "69.2"} kg
                  </Text>
                </View>
                <View style={styles.chartLabelItem}>
                  <View style={[styles.dot, { backgroundColor: "#8E8E93" }]} />
                  <Text style={styles.chartLabelText}>Target: 65.0 kg</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Weight History */}
          <WeightHistory />

          {/* Calorie Intake */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="flame-outline" size={24} color="#FF9500" />
              <Text style={styles.sectionTitle}>Calorie Intake</Text>
            </View>
            <View style={styles.chartCard}>
              <LineChart
                data={calorieData[timeRange]}
                width={chartWidth}
                height={220}
                chartConfig={{
                  ...chartConfig,
                  color: (opacity = 1) => `rgba(255, 149, 0, ${opacity})`,
                }}
                bezier
                style={styles.chart}
              />
              <View style={styles.chartLabels}>
                <View style={styles.chartLabelItem}>
                  <View style={[styles.dot, { backgroundColor: "#FF9500" }]} />
                  <Text style={styles.chartLabelText}>Average: 1950 kcal</Text>
                </View>
                <View style={styles.chartLabelItem}>
                  <View style={[styles.dot, { backgroundColor: "#8E8E93" }]} />
                  <Text style={styles.chartLabelText}>Goal: 2000 kcal</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Macronutrient Distribution */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="pie-chart-outline" size={24} color="#007AFF" />
              <Text style={styles.sectionTitle}>
                Macronutrient Distribution
              </Text>
            </View>
            <View style={styles.chartCard}>
              <BarChart
                data={{
                  labels: macroData.labels,
                  datasets: [
                    {
                      data: macroData.data,
                    },
                  ],
                }}
                width={chartWidth}
                height={200}
                chartConfig={{
                  ...chartConfig,
                  colors: macroData.barColors,
                }}
                fromZero
                style={styles.chart}
              />
              <View style={styles.macroLegend}>
                {macroData.labels.map((label, index) => (
                  <View key={index} style={styles.legendItem}>
                    <View
                      style={[
                        styles.legendDot,
                        { backgroundColor: macroData.barColors[index] },
                      ]}
                    />
                    <Text style={styles.legendText}>
                      {label}: {macroData.data[index]}%
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Activity Tracking */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="fitness-outline" size={24} color="#5856D6" />
              <Text style={styles.sectionTitle}>Activity Tracking</Text>
            </View>
            <View style={styles.card}>
              <View style={styles.progressRow}>
                <Text style={styles.progressLabel}>Daily Steps</Text>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBar,
                      { width: "75%", backgroundColor: "#5856D6" },
                    ]}
                  />
                </View>
                <Text style={styles.progressValue}>7,531 / 10,000</Text>
              </View>
              <View style={[styles.progressRow, styles.borderTop]}>
                <Text style={styles.progressLabel}>Exercise Minutes</Text>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBar,
                      { width: "60%", backgroundColor: "#5856D6" },
                    ]}
                  />
                </View>
                <Text style={styles.progressValue}>30 / 50 min</Text>
              </View>
              <View style={[styles.progressRow, styles.borderTop]}>
                <Text style={styles.progressLabel}>Active Calories</Text>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBar,
                      { width: "45%", backgroundColor: "#5856D6" },
                    ]}
                  />
                </View>
                <Text style={styles.progressValue}>225 / 500 kcal</Text>
              </View>
            </View>
          </View>

          {/* Nutritional Insights */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="nutrition-outline" size={24} color="#34C759" />
              <Text style={styles.sectionTitle}>Nutritional Insights</Text>
            </View>
            <View style={styles.card}>
              <View style={styles.insightItem}>
                <View style={styles.insightHeader}>
                  <Ionicons name="checkmark-circle" size={20} color="#34C759" />
                  <Text style={styles.insightTitle}>Protein Goal Achieved</Text>
                </View>
                <Text style={styles.insightDescription}>
                  You've met your protein goal 6 out of 7 days this week.
                </Text>
              </View>
              <View style={[styles.insightItem, styles.borderTop]}>
                <View style={styles.insightHeader}>
                  <Ionicons name="alert-circle" size={20} color="#FF9500" />
                  <Text style={styles.insightTitle}>Sodium Intake</Text>
                </View>
                <Text style={styles.insightDescription}>
                  Your sodium intake is 15% above recommended levels.
                </Text>
              </View>
              <View style={[styles.insightItem, styles.borderTop]}>
                <View style={styles.insightHeader}>
                  <Ionicons name="water" size={20} color="#007AFF" />
                  <Text style={styles.insightTitle}>Hydration</Text>
                </View>
                <Text style={styles.insightDescription}>
                  Average water intake: 1.8L/day (Goal: 2.5L)
                </Text>
              </View>
            </View>
          </View>

          {/* Achievements */}
          <View style={[styles.section, styles.lastSection]}>
            <View style={styles.sectionHeader}>
              <Ionicons name="ribbon-outline" size={24} color="#FF9500" />
              <Text style={styles.sectionTitle}>Achievements</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.achievementsContainer}
            >
              <View style={styles.achievementCard}>
                <View style={styles.achievementIconContainer}>
                  <Ionicons name="trending-down" size={28} color="#FFFFFF" />
                </View>
                <Text style={styles.achievementTitle}>First Kilo</Text>
                <Text style={styles.achievementDescription}>
                  Lost your first kilogram
                </Text>
              </View>
              <View style={[styles.achievementCard, styles.achievementActive]}>
                <View
                  style={[
                    styles.achievementIconContainer,
                    styles.achievementIconActive,
                  ]}
                >
                  <Ionicons name="flame" size={28} color="#FFFFFF" />
                </View>
                <Text style={styles.achievementTitle}>Streak Master</Text>
                <Text style={styles.achievementDescription}>
                  14 days streak
                </Text>
              </View>
              <View style={styles.achievementCard}>
                <View
                  style={[
                    styles.achievementIconContainer,
                    { backgroundColor: "#8E8E93" },
                  ]}
                >
                  <Ionicons name="trophy" size={28} color="#FFFFFF" />
                </View>
                <Text style={styles.achievementTitle}>Goal Crusher</Text>
                <Text style={styles.achievementDescription}>
                  Reach your target weight
                </Text>
              </View>
              <View style={styles.achievementCard}>
                <View
                  style={[
                    styles.achievementIconContainer,
                    { backgroundColor: "#8E8E93" },
                  ]}
                >
                  <Ionicons name="fitness" size={28} color="#FFFFFF" />
                </View>
                <Text style={styles.achievementTitle}>Active Life</Text>
                <Text style={styles.achievementDescription}>
                  30 days with 10K+ steps
                </Text>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </Screen>
      <WeightModal />
      <BottomTabNavigator />
    </>
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
    flex: 1,
  },
  // Current weight styles
  addWeightButton: {
    backgroundColor: "#FF2D55",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: "center",
  },
  addWeightButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 4,
  },
  currentWeightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  weightIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFF0F3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  weightDetailsContainer: {
    flex: 1,
  },
  currentWeightValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 6,
  },
  weightChangeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  weightChangeText: {
    fontSize: 14,
    color: "#34C759",
    marginLeft: 4,
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
    padding: 16,
  },
  chartCard: {
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
    padding: 16,
    alignItems: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#E5E5EA",
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#8E8E93",
  },
  timeRangeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },
  timeRangeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  timeRangeButtonActive: {
    backgroundColor: "#E5F1FF",
  },
  timeRangeText: {
    fontSize: 14,
    color: "#8E8E93",
  },
  timeRangeTextActive: {
    color: "#007AFF",
    fontWeight: "600",
  },
  chartLabels: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingTop: 8,
  },
  chartLabelItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  chartLabelText: {
    fontSize: 14,
    color: "#8E8E93",
  },
  macroLegend: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingTop: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
    color: "#8E8E93",
  },
  // Progress bar styles
  progressRow: {
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 16,
    marginBottom: 6,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#E5E5EA",
    borderRadius: 4,
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressValue: {
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "right",
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
    paddingTop: 12,
  },
  // Insight styles
  insightItem: {
    marginBottom: 12,
  },
  insightHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  insightDescription: {
    fontSize: 14,
    color: "#8E8E93",
    paddingLeft: 28,
  },
  // Achievement styles
  achievementsContainer: {
    marginBottom: 12,
  },
  achievementCard: {
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
    padding: 16,
    marginRight: 12,
    width: 150,
    alignItems: "center",
  },
  achievementActive: {
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  achievementIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  achievementIconActive: {
    backgroundColor: "#FFD700",
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  achievementDescription: {
    fontSize: 12,
    color: "#8E8E93",
    textAlign: "center",
  },
  // Weight modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    justifyContent: "flex-end",
    width: "100%",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  modalCancel: {
    fontSize: 16,
    color: "#8E8E93",
  },
  modalSave: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
  weightInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  weightInput: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    width: 120,
    color: "#007AFF",
  },
  weightUnit: {
    fontSize: 30,
    marginLeft: 8,
    color: "#8E8E93",
  },
  noteContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  noteLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 10,
    padding: 12,
    height: 100,
    textAlignVertical: "top",
  },
  // Weight history styles
  historyItem: {
    paddingVertical: 12,
  },
  historyMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyDate: {
    fontSize: 16,
  },
  historyWeight: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
  historyNote: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 4,
  },
});
