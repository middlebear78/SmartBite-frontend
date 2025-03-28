import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { Screen } from "../components/Screen";
import { Colors } from "../constants/Colors";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { BottomTabNavigator } from "../components/TabNavigator";
import MyMealsTabs from "../components/MyMeals/MyMealsTabs";
import DayItem from "../components/MyMeals/DayItem";
import MealItemHomePage from "../components/Home/MealItemHomePage";
import LocalMealStorageService from "../services/mealLocalStorageService";
import * as FileSystem from "expo-file-system";

const MyMeals = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [allMeals, setAllMeals] = useState([]);
  const [filteredDayItems, setFilteredDayItems] = useState([]);
  const [todayMeals, setTodayMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load meals when component mounts
  useEffect(() => {
    loadMeals();
  }, []);

  // Filter day items when tab changes
  useEffect(() => {
    filterDayItemsByTab();
  }, [activeTab, allMeals]);

  // Handle tab change from MyMealsTabs
  const handleTabChange = (index) => {
    console.log(`Tab changed to: ${index}`);
    setActiveTab(index);
  };

  // Load meals from storage
  const loadMeals = async () => {
    try {
      setLoading(true);
      const savedMeals = await LocalMealStorageService.getLocalMeals();
      console.log("Loaded meals:", savedMeals.length);
      setAllMeals(savedMeals);

      // Filter today's meals
      filterTodayMeals(savedMeals);
    } catch (error) {
      console.error("Error loading meals:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter today's meals
  const filterTodayMeals = (meals) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysMeals = meals.filter((meal) => {
      if (!meal.timestamp) return false;
      const mealDate = new Date(meal.timestamp);
      mealDate.setHours(0, 0, 0, 0);
      return mealDate.getTime() === today.getTime();
    });

    setTodayMeals(todaysMeals);
    console.log(`Found ${todaysMeals.length} meals for today`);
  };

  // Group meals by day and returns sorted array
  const processMealsByDay = (meals) => {
    // Group meals by day
    const mealsByDay = {};

    meals.forEach((meal) => {
      if (!meal.timestamp) return;

      const mealDate = new Date(meal.timestamp);
      const dateKey = mealDate.toISOString().split("T")[0]; // YYYY-MM-DD

      // Format date as "Thursday 20.3.2025"
      const formattedDate = mealDate.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      if (!mealsByDay[dateKey]) {
        mealsByDay[dateKey] = {
          date: formattedDate,
          dateObj: new Date(mealDate), // Store a copy of the date object
          meals: [],
          totalCalories: 0,
          awardType: "bronze", // Default award type
        };
      }

      mealsByDay[dateKey].meals.push(meal);
      mealsByDay[dateKey].totalCalories +=
        meal.total_macronutrients?.calories || 0;

      // Set award type based on calories
      const calories = mealsByDay[dateKey].totalCalories;
      if (calories > 2000) {
        mealsByDay[dateKey].awardType = "gold";
      } else if (calories > 1500) {
        mealsByDay[dateKey].awardType = "silver";
      } else {
        mealsByDay[dateKey].awardType = "bronze";
      }
    });

    // Convert to array and sort by date
    return Object.values(mealsByDay).sort((a, b) => {
      return b.dateObj.getTime() - a.dateObj.getTime(); // Newest first
    });
  };

  // Filter day items based on active tab
  const filterDayItemsByTab = () => {
    if (!allMeals.length) {
      setFilteredDayItems([]);
      return;
    }

    // First process all meals into day items
    const dayItems = processMealsByDay(allMeals);

    // Then filter based on selected tab
    let filtered = [];
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    switch (activeTab) {
      case 1: // Last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        filtered = dayItems.filter((day) => {
          // Use the stored date object directly
          const dayDate = new Date(day.dateObj);
          dayDate.setHours(0, 0, 0, 0);
          return dayDate >= sevenDaysAgo;
        });
        break;

      case 2: // Last Month
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        oneMonthAgo.setHours(0, 0, 0, 0);

        filtered = dayItems.filter((day) => {
          // Use the stored date object directly
          const dayDate = new Date(day.dateObj);
          dayDate.setHours(0, 0, 0, 0);
          return dayDate >= oneMonthAgo;
        });
        break;

      case 3: // All time
        filtered = dayItems;
        break;

      case 4: // Favorites
        // For favorites, we need to check if any meals in the day are marked as favorites
        // This will depend on your meal data structure - let's assume meals have a 'favorite' flag
        filtered = dayItems.filter((day) => {
          // Check if any meal in this day is a favorite
          return day.meals.some((meal) => meal.favorite === true);
        });

        // If no favorites found, show a message
        if (filtered.length === 0) {
          console.log("No favorite meals found");
        }
        break;

      case 5: // Date range
        // This would typically use a date picker UI
        // For now, let's default to the last 30 days as an example
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);
        thirtyDaysAgo.setHours(0, 0, 0, 0);

        filtered = dayItems.filter((day) => {
          // Use the stored date object directly
          const dayDate = new Date(day.dateObj);
          dayDate.setHours(0, 0, 0, 0);
          return dayDate >= thirtyDaysAgo;
        });
        break;

      default:
        filtered = dayItems;
    }

    setFilteredDayItems(filtered);
    console.log(`Tab ${activeTab}: Found ${filtered.length} days`);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "My Bites",
          headerStyle: { backgroundColor: Colors.white },
          headerShadowVisible: false,
        }}
      />

      <Screen title="My Meals">
        <MyMealsTabs onTabChange={handleTabChange} />
        <ScrollView>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#6B4EFF" />
              <Text style={styles.loadingText}>Loading your meals...</Text>
            </View>
          ) : activeTab === 0 ? (
            // Today tab - show individual meals
            <View style={styles.todayContainer}>
              {todayMeals.length > 0 ? (
                todayMeals.map((meal, index) => (
                  <MealItemHomePage
                    key={meal.id || `meal-${index}`}
                    meal_title={meal.meal_title}
                    timestamp={meal.timestamp}
                    total_macronutrients={meal.total_macronutrients}
                    local_image_path={meal.local_image_path}
                    id={meal.id}
                  />
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No meals recorded today</Text>
                  <Text style={styles.emptySubtext}>
                    Take a photo of your food to log a meal
                  </Text>
                </View>
              )}
            </View>
          ) : (
            // Other tabs - show day items
            <View style={styles.DayItemsContainer}>
              {filteredDayItems.length > 0 ? (
                filteredDayItems.map((day, index) => (
                  <DayItem
                    key={`day-${index}`}
                    date={day.date}
                    totalCalories={day.totalCalories}
                    awardType={day.awardType}
                    meals={day.meals}
                  />
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No meals found</Text>
                  <Text style={styles.emptySubtext}>
                    No meal data available for this time period
                  </Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </Screen>
      <BottomTabNavigator />
    </>
  );
};

export default MyMeals;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  DayItemsContainer: {
    gap: 20,
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    marginTop: 20,
    marginBottom: 100,
  },
  todayContainer: {
    padding: 15,
    gap: 15,
    marginBottom: 100,
  },
  loadingContainer: {
    padding: 40,
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
    margin: 20,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 8,
  },
});
