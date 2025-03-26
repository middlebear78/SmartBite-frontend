// SimpleMealStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

// Simple, clear types
export interface Meal {
  id?: string;
  title: string;
  foods: any[];
  macros: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  imagePath?: string;
  date?: string;
}

// Simple storage service with just the essential functions
class MealStorage {
  // Key for AsyncStorage
  private static STORAGE_KEY = "meals";

  // Directory to store images
  private static IMAGE_DIR = FileSystem.documentDirectory + "meals/";

  // Create image directory on initialization
  static async init() {
    try {
      const dirInfo = await FileSystem.getInfoAsync(this.IMAGE_DIR);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(this.IMAGE_DIR, {
          intermediates: true,
        });
        console.log("✅ Created meal images directory");
      }
    } catch (error) {
      console.error("❌ Could not create image directory:", error);
    }
  }

  // Add a new meal with image
  static async addMeal(meal: Meal, imagePath?: string): Promise<string> {
    try {
      // Generate ID and add date
      const id = Date.now().toString();
      const newMeal: Meal = {
        ...meal,
        id,
        date: new Date().toISOString(),
      };

      // Save the image if provided
      if (imagePath) {
        const extension = imagePath.split(".").pop() || "jpg";
        const savedImagePath = `${this.IMAGE_DIR}${id}.${extension}`;

        await FileSystem.copyAsync({
          from: imagePath,
          to: savedImagePath,
        });

        newMeal.imagePath = savedImagePath;
      }

      // Get existing meals and add the new one
      const meals = await this.getMeals();
      meals.push(newMeal);

      // Save back to storage
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(meals));

      return id;
    } catch (error) {
      console.error("❌ Error saving meal:", error);
      throw error;
    }
  }

  // Get all meals
  static async getMeals(): Promise<Meal[]> {
    try {
      const data = await AsyncStorage.getItem(this.STORAGE_KEY);
      const meals = data ? JSON.parse(data) : [];

      // Sort by date (newest first)
      return meals.sort((a: Meal, b: Meal) => {
        return (
          new Date(b.date || "").getTime() - new Date(a.date || "").getTime()
        );
      });
    } catch (error) {
      console.error("❌ Error getting meals:", error);
      return [];
    }
  }

  // Get a single meal by ID
  static async getMeal(id: string): Promise<Meal | null> {
    try {
      const meals = await this.getMeals();
      return meals.find((meal) => meal.id === id) || null;
    } catch (error) {
      console.error(`❌ Error getting meal ${id}:`, error);
      return null;
    }
  }

  // Delete a meal
  static async deleteMeal(id: string): Promise<boolean> {
    try {
      // Get all meals
      const meals = await this.getMeals();
      const mealToDelete = meals.find((meal) => meal.id === id);

      if (!mealToDelete) {
        return false;
      }

      // Delete image if it exists
      if (mealToDelete.imagePath) {
        const imageInfo = await FileSystem.getInfoAsync(mealToDelete.imagePath);
        if (imageInfo.exists) {
          await FileSystem.deleteAsync(mealToDelete.imagePath);
        }
      }

      // Update the meals list
      const updatedMeals = meals.filter((meal) => meal.id !== id);
      await AsyncStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(updatedMeals)
      );

      return true;
    } catch (error) {
      console.error(`❌ Error deleting meal ${id}:`, error);
      return false;
    }
  }

  // Edit a meal
  static async editMeal(updatedMeal: Meal): Promise<boolean> {
    try {
      if (!updatedMeal.id) {
        return false;
      }

      // Get all meals
      const meals = await this.getMeals();
      const index = meals.findIndex((meal) => meal.id === updatedMeal.id);

      if (index === -1) {
        return false;
      }

      // Update the meal at the found index
      meals[index] = {
        ...meals[index],
        ...updatedMeal,
        // Preserve the original image path and date
        imagePath: updatedMeal.imagePath || meals[index].imagePath,
        date: meals[index].date,
      };

      // Save back to storage
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(meals));

      return true;
    } catch (error) {
      console.error(`❌ Error editing meal:`, error);
      return false;
    }
  }

  // Add a meal from scan analysis
  static async addMealFromAnalysis(
    analysisResult: any,
    imagePath: string
  ): Promise<string> {
    try {
      const analysis = analysisResult.analysis;

      // Create a simplified meal object
      const meal: Meal = {
        title: analysis.meal_title || "Unknown Meal",
        foods: analysis.foods || [],
        macros: {
          calories: analysis.total_macronutrients?.calories || 0,
          protein: analysis.total_macronutrients?.protein || 0,
          carbs: analysis.total_macronutrients?.carbs || 0,
          fat: analysis.total_macronutrients?.fat || 0,
        },
      };

      // Save using the add meal function
      return await this.addMeal(meal, imagePath);
    } catch (error) {
      console.error("❌ Error adding meal from analysis:", error);
      throw error;
    }
  }

  // Delete all meals
  static async clearMeals(): Promise<boolean> {
    try {
      // Get all meals to find images
      const meals = await this.getMeals();

      // Delete all image files
      for (const meal of meals) {
        if (meal.imagePath) {
          try {
            const imageInfo = await FileSystem.getInfoAsync(meal.imagePath);
            if (imageInfo.exists) {
              await FileSystem.deleteAsync(meal.imagePath);
            }
          } catch (e) {
            console.error("Error deleting image:", e);
          }
        }
      }

      // Clear the storage
      await AsyncStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error("❌ Error clearing meals:", error);
      return false;
    }
  }
}

// Initialize on import
MealStorage.init().catch(console.error);

export default MealStorage;
