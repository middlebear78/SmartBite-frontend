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
  displayOrder?: number;
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
  static async saveMeal(meal: MealData, imagePath?: string): Promise<string> {
    try {
      // Generate a unique ID for this meal
      const mealId = Date.now().toString();

      // Get existing meals to determine the highest display order
      const existingMeals = await this.getLocalMeals();

      // Find the highest display order
      let highestOrder = 0;
      existingMeals.forEach((meal) => {
        if (meal.displayOrder && meal.displayOrder > highestOrder) {
          highestOrder = meal.displayOrder;
        }
      });

      // Assign a display order one higher than the current highest
      const mealWithId = {
        ...meal,
        id: mealId,
        timestamp: new Date().toISOString(),
        displayOrder: highestOrder + 1, // New meals get higher numbers (will appear at top)
      };

      console.log(
        `✅ New meal created with displayOrder: ${mealWithId.displayOrder}, highest was: ${highestOrder}`
      );

      // If there's a local image path, save it permanently
      if (imagePath) {
        const imageExtension = imagePath.split(".").pop() || "jpg";
        const savedImagePath = `${this.IMAGE_DIRECTORY}${mealId}.${imageExtension}`;

        try {
          // Debug logs
          console.log("📸 Original image path:", imagePath);
          console.log("📸 Destination path:", savedImagePath);

          // Check if source image exists
          const sourceInfo = await FileSystem.getInfoAsync(imagePath);
          console.log("📸 Source image exists:", sourceInfo.exists);

          if (sourceInfo.exists) {
            // Ensure directory exists before copying
            const dirInfo = await FileSystem.getInfoAsync(this.IMAGE_DIRECTORY);
            if (!dirInfo.exists) {
              await FileSystem.makeDirectoryAsync(this.IMAGE_DIRECTORY, {
                intermediates: true,
              });
              console.log("📸 Created directory:", this.IMAGE_DIRECTORY);
            }

            // Try to use moveAsync instead of copyAsync (can be more reliable)
            await FileSystem.moveAsync({
              from: imagePath,
              to: savedImagePath,
            });

            // Verify the file was copied successfully
            const destInfo = await FileSystem.getInfoAsync(savedImagePath);
            console.log("📸 Destination image exists:", destInfo.exists);

            if (destInfo.exists) {
              // Store just the filename instead of the full path
              const filename = `${mealId}.${imageExtension}`;
              mealWithId.local_image_path = filename;
              console.log(
                "✅ Image saved successfully, stored filename:",
                filename
              );
            } else {
              console.error(
                "❌ Image copy failed - destination file doesn't exist"
              );
            }
          } else {
            console.error("❌ Source image doesn't exist:", imagePath);
          }
        } catch (imageError) {
          console.error("❌ Error saving image:", imageError);
        }
      }

      // Add new meal to existing meals
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
   * Save meal locally with image handling
   */

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

      // REMOVE SORTING COMPLETELY - return meals exactly as stored
      return meals;

      // OR if you need some form of sorting, use the original order they were saved:
      // return meals; // No sorting - preserves order in AsyncStorage
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

  static async updateMeal(
    mealId: string,
    analysisResult: AnalysisResult,
    imagePath?: string
  ): Promise<string> {
    try {
      // Get raw meals JSON string without processing it
      const mealsJson = await AsyncStorage.getItem(this.MEALS_STORAGE_KEY);
      // Parse JSON directly without sorting
      const meals = mealsJson ? JSON.parse(mealsJson) : [];

      // Find the meal to update
      const mealIndex = meals.findIndex((meal) => meal.id === mealId);

      if (mealIndex === -1) {
        throw new Error(`Meal with ID ${mealId} not found`);
      }

      // Get original meal
      const originalMeal = meals[mealIndex];
      console.log("Original meal to update:", originalMeal);

      // Create updated meal without changing critical properties
      const updatedMeal = {
        ...originalMeal,
        meal_title:
          analysisResult.analysis.meal_title || originalMeal.meal_title,
        total_macronutrients:
          analysisResult.analysis.total_macronutrients ||
          originalMeal.total_macronutrients,
        foods: analysisResult.analysis.foods || originalMeal.foods,
      };

      // Extract just the filename from imagePath for comparison
      const imageFilename = imagePath ? imagePath.split("/").pop() : "";
      console.log(
        "Image comparison - Image filename:",
        imageFilename,
        "Stored path:",
        updatedMeal.local_image_path
      );

      // Only handle image if needed and the filenames don't match
      if (imagePath && imageFilename !== updatedMeal.local_image_path) {
        // Keep the original filename
        if (updatedMeal.local_image_path) {
          const fullImagePath = `${this.IMAGE_DIRECTORY}${updatedMeal.local_image_path}`;
          console.log("Updating image at path:", fullImagePath);

          // Check if source image exists
          const sourceInfo = await FileSystem.getInfoAsync(imagePath);

          if (sourceInfo.exists) {
            // COPY instead of MOVE to avoid deleting the source
            await FileSystem.copyAsync({
              from: imagePath,
              to: fullImagePath,
            });
            console.log("✅ Successfully copied image to:", fullImagePath);
          }
        }
      } else {
        console.log("✅ No image update needed - using existing image");
      }

      // Update in place
      meals[mealIndex] = updatedMeal;
      console.log("✅ Updated meal:", updatedMeal);

      // Save without sorting
      await AsyncStorage.setItem(this.MEALS_STORAGE_KEY, JSON.stringify(meals));

      return mealId;
    } catch (error) {
      console.error("❌ Error updating meal:", error);
      throw error;
    }
  }

  static async updateAllMeals(meals: MealData[]): Promise<boolean> {
    try {
      await AsyncStorage.setItem(this.MEALS_STORAGE_KEY, JSON.stringify(meals));
      console.log("✅ All meals updated");
      return true;
    } catch (error) {
      console.error("❌ Error updating all meals:", error);
      return false;
    }
  }
}

// Initialize when imported
LocalMealStorageService.initialize().catch(console.error);

export default LocalMealStorageService;
