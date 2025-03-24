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
    const response = await axios.post(`${API_BASE_URL}/save-meal/`, mealData);
    return response.data;
  } catch (error) {
    console.error("❌ Error saving meal to backend:", error);
    throw error;
  }
};

export const sendImageToCloud = async (imageUri: string) => {
  try {
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg",
      name: "food-image.jpg",
    } as any);

    const response = await axios.post(
      `${API_BASE_URL}/resize-upload-image/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.image_url;
  } catch (error) {
    console.error("❌ Error uploading image to cloud:", error);
    throw error;
  }
};



export const saveMealFromAnalysis = async (
  analysis: any,
  userId: string,
  imageUrl: string
) => {
  try {
    const payload = {
      analysis,
      user_id: userId,
      image_url: imageUrl,
    };

    const response = await axios.post(
      `${API_BASE_URL}/save-meal-from-analysis/`,
      payload
    );

    // Also save locally
    await saveMealLocally({
      user_id: userId,
      meal_title: analysis.meal_title,
      foods: analysis.foods,
      total_macronutrients: analysis.total_macronutrients,
      image_url: imageUrl,
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error saving meal from analysis:", error);
    throw error;
  }
};

export const getLocalMeals = async () => {
  try {
    const mealsJson = await AsyncStorage.getItem("loggedMeals");
    return mealsJson ? JSON.parse(mealsJson) : [];
  } catch (error) {
    console.error("❌ Error fetching local meals:", error);
    return [];
  }
};
