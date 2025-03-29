import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import * as FileSystem from "expo-file-system";
import { Stack } from "expo-router";
import {
  View,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  ActivityIndicator,
} from "react-native";
import { Screen } from "../components/Screen";
import { useRouter } from "expo-router";
import { BottomTabNavigator } from "../components/TabNavigator";
import DateAndCalories from "../components/Home/DateAndCalories";
import MacroGrid from "../components/Home/MacroGrid";
import TipsSlider from "../components/Home/TipsSlider";
import MealItemHomePage from "../components/Home/MealItemHomePage";
import LocalMealStorageService from "../services/mealLocalStorageService";

// Define the meal structure from storage
interface StoredMeal {
  id?: string;
  meal_title?: string;
  timestamp?: string;
  total_macronutrients?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  local_image_path?: string;
  foods?: any[];
}

export default function HomeScreen() {
  const router = useRouter();
  const [meals, setMeals] = useState<StoredMeal[]>([]);
  const [loading, setLoading] = useState(true);

  // Get current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  // Load meals from local storage
  useFocusEffect(
    useCallback(() => {
      const loadMeals = async () => {
        try {
          setLoading(true);
          const savedMeals = await LocalMealStorageService.getLocalMeals();
          setMeals(savedMeals);
          console.log("✅ Loaded meals:", savedMeals.length);
        } catch (error) {
          console.error("❌ Error loading meals:", error);
        } finally {
          setLoading(false);
        }
      };

      loadMeals();
    }, [])
  );

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

            <View style={styles.mealsContainer}>
              <Text style={styles.sectionTitle}>Your Saved Meals</Text>

              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#6B4EFF" />
                  <Text style={styles.loadingText}>Loading your meals...</Text>
                </View>
              ) : meals.length > 0 ? (
                meals.map((meal, index) => (
                  <MealItemHomePage
                    key={meal?.id || `meal-${index}`}
                    meal_title={meal.meal_title}
                    timestamp={meal.timestamp}
                    total_macronutrients={meal.total_macronutrients}
                    local_image_path={meal.local_image_path}
                    id={meal.id}
                  />
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No saved meals found</Text>
                  <Text style={styles.emptySubtext}>
                    Your saved meals will appear here
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </Screen>

        <BottomTabNavigator />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mealsContainer: {
    flexDirection: "column",
    gap: 20,
    marginTop: 30,
    marginBottom: 120,
  },
  mainContainer: {
    flex: 1,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 10,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666666",
  },
  emptyContainer: {
    padding: 30,
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666666",
    marginTop: 5,
  },
  // Remaining styles...
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
});
