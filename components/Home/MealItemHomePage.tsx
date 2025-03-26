import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../constants/Colors";

// Updated interface to match the stored meal structure
interface MealHomePageProps {
  meal_title?: string;
  timestamp?: string;
  total_macronutrients?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  local_image_path?: string;
  id?: string;
}

const MealItemHomePage = ({
  meal_title = "Meal",
  timestamp = "",
  total_macronutrients = { calories: 0, protein: 0, carbs: 0, fat: 0 },
  local_image_path,
  id = "",
}: MealHomePageProps) => {
  const goToMealPage = () => {
    console.log("go to meal page", id);
  };

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

  // Default image
  const defaultImage = require("../../assets/demoImage.png");

  // Add debug log outside the JSX
  console.log("Image path being used:", local_image_path);

  return (
    <TouchableOpacity onPress={goToMealPage} style={styles.shadowContainer}>
      <View style={styles.container}>
        <ImageBackground
          source={local_image_path ? { uri: local_image_path } : defaultImage}
          style={styles.image}
          onError={(e) =>
            console.log(
              "⚠️ Image load error:",
              e.nativeEvent.error,
              "Path:",
              local_image_path
            )
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
});
