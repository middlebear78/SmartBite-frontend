import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import LocalMealStorageService from "../../services/mealLocalStorageService";

const MealItemHomePage = ({
  meal_title = "Meal",
  timestamp = "",
  total_macronutrients = { calories: 0, protein: 0, carbs: 0, fat: 0 },
  local_image_path,
  id = "",
  foods = [],
}) => {
  const router = useRouter();

  const goToMealPage = () => {
    console.log("go to meal page", id);
    const mealData = {
      analysis: {
        meal_title,
        total_macronutrients,
        foods: foods || [],
      },
    };
    router.push({
      pathname: "/nutrition-info",
      params: {
        analysisResult: JSON.stringify(mealData),
        imagePath: local_image_path
          ? `${FileSystem.documentDirectory}meal_images/${local_image_path
              .split("/")
              .pop()}`
          : "",
        editMode: "true",
        mealId: id, // Make sure to pass the ID
      },
    });
  };

  // Add this function to handle meal deletion for the debugging -------------------------------
  const handleDeleteMeal = (event) => {
    // Stop the event from propagating to the parent TouchableOpacity
    event.stopPropagation();

    // Show confirmation alert
    Alert.alert(
      "Delete Meal",
      `Are you sure you want to delete "${meal_title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Call the delete method from your service
              await LocalMealStorageService.deleteMeal(id);
              // Refresh the home screen (could trigger a reload or use a callback)
              // You might need to pass a callback from your HomeScreen to refresh the list
              console.log("✅ Meal deleted successfully");
            } catch (error) {
              console.error("❌ Error deleting meal:", error);
              Alert.alert(
                "Error",
                "Failed to delete the meal. Please try again."
              );
            }
          },
        },
      ]
    );
  };
  //--------------------------------------------------------------------------------------------------------------------------
  // Format the macros string
  const formatMacros = () => {
    return `Carbs-${total_macronutrients.carbs || 0}g, Fat-${
      total_macronutrients.fat || 0
    }g, Proteins-${total_macronutrients.protein || 0}g`;
  };

  // Format the date
  const formatDate = () => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // Fixed getImageSource function
  const getImageSource = () => {
    if (!local_image_path) {
      return require("../../assets/demoImage.png");
    }

    // Extract filename from path regardless of path format
    const filename = local_image_path.split("/").pop();

    // If we have a filename, try to construct a current path
    if (filename) {
      // Use current app's document directory
      return { uri: `${FileSystem.documentDirectory}meal_images/${filename}` };
    }

    // Fallback to default
    return require("../../assets/demoImage.png");
  };

  const imageSource = getImageSource();
  console.log("Using image source:", JSON.stringify(imageSource));

  return (
    <TouchableOpacity onPress={goToMealPage} style={styles.shadowContainer}>
      <View style={styles.container}>
        <ImageBackground
          source={imageSource}
          style={styles.image}
          onError={(e) =>
            console.log("⚠️ Image load error:", e.nativeEvent.error)
          }
        >
          {/* Add empty View to prevent Text error */}
          <View />
        </ImageBackground>
        <View style={styles.dateContainer}>
          <Text style={styles.mealTypeAndDate}>
            {meal_title} {formatDate()}
          </Text>
          <Text style={styles.calories}>
            {total_macronutrients.calories || 0} cal
          </Text>
          <Text style={styles.macros}>{formatMacros()}</Text>
        </View>

        {/* delete button for the debugging*/}
        {/* <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteMeal}
        >
          <Text style={styles.deleteButtonText}>×</Text>
        </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );
};

export default MealItemHomePage;

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
  container: {
    flex: 1,
    height: 90,
    backgroundColor: Colors.white,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "black",
  },
  dateContainer: {
    height: "100%",
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: Colors.text.secondary,
  },
  image: {
    width: 100,
    height: "100%",
    borderRadius: 20,
  },
  mealTypeAndDate: {
    fontSize: 12,
    color: Colors.text.primary,
  },
  calories: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text.primary,
  },
  macros: {
    marginTop: 3,
    fontSize: 12,
    color: Colors.text.primary,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(255, 59, 48, 0.8)",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 20,
  },
});
