import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import LocalMealStorageService from "../../services/mealLocalStorageService";
import { fonts } from "../../constants/fonts";
import { CarbsLetterIcon, FatLetterIcon, ProteinLetterIcon } from "../SvgIcons";
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
  // const formatMacros = () => {
  //   return `Carbs-${total_macronutrients.carbs || 0}g, Fat-${
  //     total_macronutrients.fat || 0
  //   }g, Proteins-${total_macronutrients.protein || 0}g`;
  // };

  const formatMacros = () => {
    return (
      <View style={styles.macrosContainer}>
        <View style={styles.macroItem}>
          <View style={styles.macroIcon}>
            <CarbsLetterIcon />
          </View>
          <Text style={styles.macroText}>
            {total_macronutrients.carbs || 0}g
          </Text>
        </View>
        <View style={styles.macroItem}>
          <View style={styles.macroIcon}>
            <FatLetterIcon />
          </View>
          <Text style={styles.macroText}>{total_macronutrients.fat || 0}g</Text>
        </View>
        <View style={styles.macroItem}>
          <View style={styles.macroIcon}>
            <ProteinLetterIcon />
          </View>
          <Text style={styles.macroText}>
            {total_macronutrients.protein || 0}g
          </Text>
        </View>
      </View>
    );
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
          <View style={styles.mealTypeAndDate}>
            <Text
              style={styles.mealTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {meal_title}
            </Text>
            <Text style={styles.date}>{formatDate()}</Text>
          </View>
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
    shadowColor: Colors.background.darkGray,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: Platform.OS === "ios" ? 0 : 1,
    borderColor: "#f2f2f2",
    backgroundColor: "white",
    borderRadius: 20,
  },
  container: {
    flex: 1,
    height: 90,
    backgroundColor: Colors.white,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  title: {
    fontSize: 20,
    color: Colors.text.secondary,
    fontFamily: fonts.main.regular,
  },

  image: {
    width: 100,
    height: "100%",
    borderRadius: 20,
  },
  mealTypeAndDate: {
    color: Colors.text.primary,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mealTitle: { fontSize: 12, width: "75%", fontFamily: fonts.main.regular },
  date: {
    fontSize: 11,
    fontFamily: fonts.main.regular,
  },
  dateContainer: {
    height: "100%",
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
  },
  calories: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.text.primary,
    fontFamily: fonts.main.bold,
  },
  macros: {
    marginTop: 3,
    fontSize: 12,
    color: Colors.text.primary,
    fontFamily: fonts.main.regular,
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
  macrosContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  macroIcon: {
    width: 16,
    height: 16,
   
  },
  macroItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
    gap: 4,
  },
  macroText: {
    fontSize: 12,
    color: Colors.text.primary,
    fontFamily: fonts.main.regular,
  },
});
