import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import CustomAlert from "../components/CustomAlert";
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
import { fonts } from "../constants/fonts";
import { Colors } from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dummymeals from "../DummyData/DummyHomeMealsItem";

// -----------------Define the interface for DUMMY -food items ------------------------
interface FoodItem {
  id: string;
  name: string;
  amount: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const meal = dummymeals[0];
const mealId = meal?.id || "default-id";
const mealTitle = meal?.meal_title || "Default Meal";
const mealTimestamp = meal?.timestamp || "Apr 23, 2025";
const mealCalories = meal?.total_macronutrients?.calories || 0;
const mealProtein = meal?.total_macronutrients?.protein || 0;
const mealCarbs = meal?.total_macronutrients?.carbs || 0;
const mealFat = meal?.total_macronutrients?.fat || 0;
const mealImagePath = meal?.local_image_path || "";
const mealFoods = meal?.foods || [];

// --------------------end of dummy_data_interface--------------------

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
  const params = useLocalSearchParams();
  const [meals, setMeals] = useState<StoredMeal[]>([]);
  const [loading, setLoading] = useState(true);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error" | "info">(
    "success"
  );

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  useFocusEffect(
    useCallback(() => {
      const loadMeals = async () => {
        try {
          setLoading(true);
          // Get meals without resorting them
          const mealsJson = await AsyncStorage.getItem(
            LocalMealStorageService.MEALS_STORAGE_KEY
          );
          const savedMeals = mealsJson ? JSON.parse(mealsJson) : [];

          // Debug log to check if foods data exists
          savedMeals.forEach((meal, index) => {
            console.log(
              `Meal ${index} - ${meal.meal_title} - Foods:`,
              meal.foods ? meal.foods.length : "none"
            );
          });

          setMeals(savedMeals);
          console.log("✅ Loaded meals:", savedMeals.length);
        } catch (error) {
          console.error("❌ Error loading meals:", error);
        } finally {
          setLoading(false);
        }
      };

      loadMeals();
    }, []) // Empty dependency array means it runs once when the screen is focused
  );
  useEffect(() => {
    if (params.showSuccessAlert === "true") {
      // Small delay to ensure navigation is complete
      setTimeout(() => {
        setAlertMessage(
          (params.alertMessage as string) || "Meal saved successfully"
        );
        setAlertType("success");
        setAlertVisible(true);
        console.log("Alert should be visible now:", params.alertMessage);
        // Clear the parameters after showing the alert
        // This is crucial to prevent the loop
        router.setParams({ showSuccessAlert: "false" });
      }, 300);
    }
  }, [params.showSuccessAlert]); // Only depend on this specific parameter

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Wrap the entire view in SafeAreaView */}

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

            {/* --------------------------dummy_meals------------------------------------------ */}

            {dummymeals.map((meal, index) => (
              <MealItemHomePage
                key={meal.id}
                meal_title={meal.meal_title}
                timestamp={meal.timestamp}
                total_macronutrients={meal.total_macronutrients}
                local_image_path={meal.local_image_path}
                id={meal.id}
                foods={meal.foods}
              />
            ))}
            {/* ------------------------------end_of_dummy_meals---------------------------------- */}

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
                  foods={meal.foods}
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
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        type={alertType}
        onHide={() => setAlertVisible(false)}
      />
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
    paddingBottom: 20, // Ensure padding at the bottom
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: Platform.OS === "ios" ? 0 : 45,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.main.bold,
    color: Colors.text.primary,
    textAlign: "center",
    marginTop: 5,
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
