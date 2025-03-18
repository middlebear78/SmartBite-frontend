import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { API_BASE_URL } from "@env";

interface MealData {
  user_id: string;
  meal_title: string;
  foods: any[];
  total_macronutrients: any;
  image_url: string;
}

/**
 * ✅ Save meal data in AsyncStorage (local storage)
 */

const saveMealLocally = async (meal: MealData) => {
  try {
    const existingMeals = await AsyncStorage.getItem("loggedMeals");
    const meals = existingMeals ? JSON.parse(existingMeals) : [];
    meals.push(meal);
    await AsyncStorage.setItem("loggedMeals", JSON.stringify(meals));
    console.log("✅ Meal saved locally:", meal);
  } catch (error) {
    console.error("❌ Error saving meal locally:", error);
  }
};

export const logMeal = async (
  mealData: Omit<MealData, "image_url"> & { image_path: string }
) => {
  try {
    console.log("Sending meal data to backend");
    const response = await axios.post(`${API_BASE_URL}/`);
  } catch (error) {}
};
