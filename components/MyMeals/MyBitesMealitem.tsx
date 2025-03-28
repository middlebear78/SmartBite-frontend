import { View, Text, Image, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import MacroItem from "./MacroItem";
import * as FileSystem from "expo-file-system";

// Update interface to match our meal data structure
interface MyBitesMealitemProps {
  meal_title?: string;
  total_macronutrients?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  local_image_path?: string;
  mealType?: string;
  timestamp?: string;
}

const MyBitesMealitem = ({
  mealType = "Meal",
  meal_title = "Untitled Meal",
  total_macronutrients = { calories: 0, protein: 0, carbs: 0, fat: 0 },
  local_image_path,
  timestamp,
}: MyBitesMealitemProps) => {
  // Function to get proper image source
  const getImageSource = () => {
    if (!local_image_path) {
      return require("../../assets/noMealImage.jpg");
    }

    // Extract filename from path
    const filename = local_image_path.split("/").pop();

    // If we have a filename, construct the path using current app's document directory
    if (filename) {
      console.log(`MyBitesMealitem - Using constructed path for: ${filename}`);
      return { uri: `${FileSystem.documentDirectory}meal_images/${filename}` };
    }

    // Fallback to default
    return require("../../assets/noMealImage.jpg");
  };

  // Format meal type from timestamp if not provided
  const getMealType = () => {
    if (mealType) return mealType;

    if (timestamp) {
      const date = new Date(timestamp);
      const hour = date.getHours();

      if (hour < 10) return "Breakfast";
      if (hour < 14) return "Lunch";
      if (hour < 18) return "Afternoon Snack";
      return "Dinner";
    }

    return "Meal";
  };

  // Validation logging
  console.log(`MyBitesMealitem - Rendering: ${meal_title}`);
  console.log(`MyBitesMealitem - Image path: ${local_image_path}`);

  return (
    <View style={styles.mealItem}>
      <View style={styles.imageContainer}>
        <Image
          source={getImageSource()}
          style={styles.image}
          onError={(e) =>
            console.log(`MyBitesMealitem - Image error: ${e.nativeEvent.error}`)
          }
        />
      </View>
      <View style={styles.mealDetails}>
        <Text style={styles.mealType}>{getMealType()}</Text>
        <Text style={styles.mealTitle}>{meal_title}</Text>
        <View style={styles.macroContainer}>
          <MacroItem
            title="Carbs"
            value={`${total_macronutrients.carbs || 0}g`}
            backgroundColor={Colors.background.lightBlue}
          />
          <MacroItem
            title="Fats"
            value={`${total_macronutrients.fat || 0}g`}
            backgroundColor={Colors.background.lightOrange}
          />
          <MacroItem
            title="Proteins"
            value={`${total_macronutrients.protein || 0}g`}
            backgroundColor={Colors.background.lightGreen}
          />
        </View>
        <Text style={styles.mealCalories}>
          meal cal {total_macronutrients.calories || 0}
        </Text>
      </View>
    </View>
  );
};

export default MyBitesMealitem;

const styles = StyleSheet.create({
  mealItem: {
    margin: 10,
    borderRadius: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    height: 180,
  },
  imageContainer: {
    width: "35%",
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  mealDetails: { padding: 20, width: "65%" },

  mealCalories: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.text.secondary,
    fontWeight: "bold",
  },
  macroContainer: {
    flexDirection: "row",
    gap: 20,
    marginTop: 10,
  },
  mealType: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  mealTitle: {
    fontSize: 14,
  },
});
