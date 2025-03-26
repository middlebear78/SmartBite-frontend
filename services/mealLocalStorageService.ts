// LocalMealStorageService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

// Define types
export interface MealData {
  user_id?: string;
  meal_title: string;
  foods: any[];
  total_macronutrients: any;
  local_image_path?: string;
  timestamp?: string;
  id?: string;
}

export interface AnalysisResult {
  analysis: {
    meal_title: string;
    foods: any[];
    total_macronutrients: any;
  };
}

class LocalMealStorageService {
  // Local storage key
  private static MEALS_STORAGE_KEY = "loggedMeals";
  private static IMAGE_DIRECTORY =
    FileSystem.documentDirectory + "meal_images/";

  /**
   * Initialize the service
   */
  static async initialize() {
    try {
      const dirInfo = await FileSystem.getInfoAsync(this.IMAGE_DIRECTORY);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(this.IMAGE_DIRECTORY, {
          intermediates: true,
        });
        console.log("✅ Created image directory for meal storage");
      }
    } catch (error) {
      console.error("❌ Error initializing LocalMealStorageService:", error);
    }
  }

  /**
   * Save meal locally with image handling
   */
  static async saveMeal(
    meal: MealData,
    imagePath?: string
  ): Promise<string> {
    try {
      // Generate a unique ID for this meal
      const mealId = Date.now().toString();
      const mealWithId = {
        ...meal,
        id: mealId,
        timestamp: new Date().toISOString(),
      };

      // If there's a local image path, save it permanently
      if (imagePath) {
        const imageExtension = imagePath.split(".").pop() || "jpg";
        const savedImagePath = `${this.IMAGE_DIRECTORY}${mealId}.${imageExtension}`;

        try {
          await FileSystem.copyAsync({
            from: imagePath,
            to: savedImagePath,
          });
          mealWithId.local_image_path = savedImagePath;
          console.log("✅ Image saved locally:", savedImagePath);
        } catch (imageError) {
          console.error("❌ Error saving image locally:", imageError);
        }
      }

      // Get existing meals and add new one
      const existingMeals = await this.getLocalMeals();
      existingMeals.push(mealWithId);

      // Save the updated list
      await AsyncStorage.setItem(
        this.MEALS_STORAGE_KEY,
        JSON.stringify(existingMeals)
      );
      console.log("✅ Meal saved locally:", mealWithId);

      return mealId;
    } catch (error) {
      console.error("❌ Error saving meal locally:", error);
      throw error;
    }
  }

  /**
   * Save meal from analysis result
   */
  static async saveMealFromAnalysis(
    analysisResult: AnalysisResult,
    imagePath: string
  ): Promise<string> {
    try {
      const analysis = analysisResult.analysis;
      
      // Create meal data object from analysis
      const mealData: MealData = {
        meal_title: analysis.meal_title,
        foods: analysis.foods,
        total_macronutrients: analysis.total_macronutrients,
      };

      // Save the meal with its image
      const mealId = await this.saveMeal(mealData, imagePath);
      return mealId;
    } catch (error) {
      console.error("❌ Error in saveMealFromAnalysis:", error);
      throw error;
    }
  }

  /**
   * Get all locally saved meals
   */
  static async getLocalMeals(): Promise<MealData[]> {
    try {
      const mealsJson = await AsyncStorage.getItem(this.MEALS_STORAGE_KEY);
      const meals = mealsJson ? JSON.parse(mealsJson) : [];

      // Sort by timestamp (newest first)
      return meals.sort((a: MealData, b: MealData) => {
        return (
          new Date(b.timestamp || "").getTime() -
          new Date(a.timestamp || "").getTime()
        );
      });
    } catch (error) {
      console.error("❌ Error fetching local meals:", error);
      return [];
    }
  }

  /**
   * Get a specific meal by ID
   */
  static async getMeal(mealId: string): Promise<MealData | null> {
    try {
      const meals = await this.getLocalMeals();
      const meal = meals.find((m) => m.id === mealId);
      return meal || null;
    } catch (error) {
      console.error(`❌ Error getting meal ${mealId}:`, error);
      return null;
    }
  }

  /**
   * Delete a meal from local storage
   */
  static async deleteMeal(mealId: string): Promise<boolean> {
    try {
      const meals = await this.getLocalMeals();
      const mealToDelete = meals.find((meal) => meal.id === mealId);

      // If meal has a local image, delete it
      if (mealToDelete?.local_image_path) {
        try {
          const imageInfo = await FileSystem.getInfoAsync(
            mealToDelete.local_image_path
          );
          if (imageInfo.exists) {
            await FileSystem.deleteAsync(mealToDelete.local_image_path);
            console.log("✅ Deleted image:", mealToDelete.local_image_path);
          }
        } catch (imageError) {
          console.error("❌ Error deleting image:", imageError);
        }
      }

      // Update the meals list without the deleted meal
      const updatedMeals = meals.filter((meal) => meal.id !== mealId);
      await AsyncStorage.setItem(
        this.MEALS_STORAGE_KEY,
        JSON.stringify(updatedMeals)
      );

      console.log("✅ Meal deleted:", mealId);
      return true;
    } catch (error) {
      console.error("❌ Error deleting meal:", error);
      return false;
    }
  }

  /**
   * Clear all locally saved meals
   */
  static async clearAllMeals(): Promise<boolean> {
    try {
      // Get all meals to find and delete their images
      const meals = await this.getLocalMeals();

      // Delete all image files
      for (const meal of meals) {
        if (meal.local_image_path) {
          try {
            const imageInfo = await FileSystem.getInfoAsync(
              meal.local_image_path
            );
            if (imageInfo.exists) {
              await FileSystem.deleteAsync(meal.local_image_path);
            }
          } catch (e) {
            console.error("Error deleting image:", e);
          }
        }
      }

      // Remove all meal data
      await AsyncStorage.removeItem(this.MEALS_STORAGE_KEY);
      console.log("✅ All meals cleared from storage");
      return true;
    } catch (error) {
      console.error("❌ Error clearing all meals:", error);
      return false;
    }
  }

  /**
   * Get storage statistics
   */
  static async getStorageStats(): Promise<{
    mealCount: number;
    totalImageSizeMB: string;
    lastSaved: string | null;
  }> {
    try {
      const meals = await this.getLocalMeals();

      // Calculate storage for images
      let totalImageSizeBytes = 0;
      for (const meal of meals) {
        if (meal.local_image_path) {
          const imageInfo = await FileSystem.getInfoAsync(
            meal.local_image_path,
            { size: true }
          );
          if (imageInfo.exists && imageInfo.size) {
            totalImageSizeBytes += imageInfo.size;
          }
        }
      }

      return {
        mealCount: meals.length,
        totalImageSizeMB: (totalImageSizeBytes / (1024 * 1024)).toFixed(2),
        lastSaved: meals.length > 0 ? meals[0].timestamp || null : null,
      };
    } catch (error) {
      console.error("❌ Error getting storage stats:", error);
      return {
        mealCount: 0,
        totalImageSizeMB: "0",
        lastSaved: null,
      };
    }
  }
}

// Initialize when imported
LocalMealStorageService.initialize().catch(console.error);

export default LocalMealStorageService;