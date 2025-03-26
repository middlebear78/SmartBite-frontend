import React from "react";
import { Stack } from "expo-router";
import {
  View,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import { Screen } from "../components/Screen";
import { useRouter } from "expo-router";
import { BottomTabNavigator } from "../components/TabNavigator";
import DateAndCalories from "../components/Home/DateAndCalories";
import MacroGrid from "../components/Home/MacroGrid";
import TipsSlider from "../components/Home/TipsSlider";
import DailyMeals from "../components/Home/DailyMeals";

export default function HomeScreen() {
  const router = useRouter();
  const today = new Date();

  // Format date like "Tue, Jan 7, 2025"
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const mealSections = [
    {
      id: "breakfast",
      title: "Breakfast",
      time: "07:00 - 09:00",
      calories: 0,
      foods: 0,
    },
    {
      id: "lunch",
      title: "Lunch",
      time: "11:30 - 13:00",
      calories: 0,
      foods: 0,
    },
    {
      id: "dinner",
      title: "Dinner",
      time: "18:00 - 20:00",
      calories: 0,
      foods: 0,
    },
    {
      id: "snack",
      title: "Snack",
      time: "Any time",
      calories: 0,
      foods: 0,
    },
  ];

  return (
    <>
      {/* Hide header just for this screen */}
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Screen title="Daily Nutrition" showBack={false}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <DateAndCalories />
            <MacroGrid />
            <TipsSlider />
            <DailyMeals />
          </ScrollView>
        </Screen>

        <BottomTabNavigator />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  macrosGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  macroItem: {
    alignItems: "center",
    flex: 1,
  },
  macroIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 14,
    color: "#666666",
  },
  dailyNutritionLink: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  linkText: {
    fontSize: 16,
    color: "#6B4EFF",
    fontWeight: "600",
  },
  mealsContainer: {
    paddingHorizontal: 15,
  },
  mealCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  mealHeader: {
    flex: 1,
  },
  mealTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  mealTime: {
    fontSize: 14,
    color: "#666666",
  },
  mealStats: {
    marginTop: 8,
  },
  mealCalories: {
    fontSize: 14,
    color: "#666666",
  },
  foodCount: {
    fontSize: 12,
    color: "#999999",
    marginTop: 2,
  },
  addFood: {
    padding: 8,
  },
  cameraButton: {
    position: "absolute",
    right: 20,
    bottom: 90,
    backgroundColor: "#6B4EFF",
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6B4EFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  lower_nav: {
    width: "100%",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
  },
});
