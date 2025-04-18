// scan-results.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Screen } from "../components/Screen";
import { Colors } from "../constants/Colors";
import MacroGridItem from "../components/Home/MacroGridItem";
import { ScrollView } from "react-native-gesture-handler";
import { EditIcon, AddIcon } from "../components/SvgIcons";
import ScanResultMealItem from "../components/ScanResultMealItem";
import LocalMealStorageService from "../services/mealLocalStorageService"; // Import the MealStorage class
import CustomAlert from "@/components/CustomAlert";

const ScanResult = () => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  // Get URL params from navigation
  const params = useLocalSearchParams();
  const analysisResult = params.analysisResult
    ? JSON.parse(params.analysisResult as string)
    : null;
  const imagePath = params.imagePath as string;

  // Extract nutrition data safely
  const analysis = analysisResult?.analysis;
  const foods = analysis?.foods || [];
  const mealTitle = analysis?.meal_title || "Unknown Meal";
  const totalMacros = analysis?.total_macronutrients || {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    grams: 0,
  };

  const [AlertVisible, setAlertVisible] = useState<Boolean>(false);
  const [AlertMessage, setAlertMessage] = useState<String>("");
  const [AlertType, setAlertType] = useState<"success" | "error" | "info">(
    "success"
  );

  // Debug logs
  console.log("🛠️ Analysis Result:", analysisResult);
  console.log("🖼️ Received Image Path:", imagePath);

  // Original ScanResult functions
  const editTitleAndDate = () => {
    console.log("editTitleAndDate on ScanResult.tsx");
  };

  const addIngredient = () => {
    console.log("addIngredient on ScanResult.tsx");
  };

  // Use MealStorage to save the meal
  const saveIngredient = async () => {
    try {
      setIsSaving(true);

      // Use MealStorage to save the meal and image
      const mealId = await LocalMealStorageService.saveMealFromAnalysis(
        analysisResult,
        imagePath
      );

      console.log("📌 Meal Logged with ID:", mealId);

      // Navigate to home with a success parameter
      router.replace({
        pathname: "/home",
        params: {
          showSuccessAlert: "true",
          alertMessage: "Your meal has been saved to your Bites Diary",
        },
      });
    } catch (error) {
      console.error("Error saving meal:", error);
      Alert.alert("Error", "Failed to save your meal. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const cancelAddIngredient = () => {
    console.log("cancelAddIngredient on ScanResult.tsx");
  };

  // Fix results function from NutritionInfo
  const handleFixResults = () => {
    Alert.alert(
      "⚠️ Fixing Results",
      "You can now edit or correct your meal details."
    );
    console.log("✏️ Fixing Results for:", analysis);
  };

  // Function to render food items
  const renderFoodItem = ({ item }) => (
    <ScanResultMealItem
      ingredient={item.food_name}
      amount={`${item.macronutrients.grams}g`}
    />
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: Colors.white },
          headerTintColor: Colors.text.primary,
          headerShadowVisible: false,
          headerTitle: mealTitle || "Meal Details",
        }}
      />
      <Screen title="ScanResult">
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={{ uri: imagePath }}
              style={styles.image}
              onError={(e) =>
                console.log("❌ Image Load Error:", e.nativeEvent.error)
              }
            />
          </View>
          <View style={styles.macroGridContainer}>
            <MacroGridItem
              title="Carbs"
              value={`${totalMacros.carbs || 0}g`}
              icon="carbs"
              backgroundColor={Colors.background.lightBlue}
            />
            <MacroGridItem
              title="Fats"
              value={`${totalMacros.fat || 0}g`}
              icon="fats"
              backgroundColor={Colors.background.lightOrange}
            />
            <MacroGridItem
              title="Proteins"
              value={`${totalMacros.protein || 0}g`}
              icon="proteins"
              backgroundColor={Colors.background.lightGreen}
            />
          </View>
          <View style={styles.backgroundPatternContainer}>
            <ImageBackground
              source={require("../assets/images/food_pattern.png")}
              style={styles.container}
              imageStyle={styles.backgroundPattern}
            >
              <View style={styles.dataContainer}>
                <TouchableOpacity
                  onPress={editTitleAndDate}
                  style={styles.editIconContainer}
                >
                  <EditIcon />
                </TouchableOpacity>
                <Text style={styles.typeAndDate}>Lunch | 25.2.25</Text>
                <Text style={styles.totalCalories}>
                  Total - {totalMacros.calories || 0} cal
                </Text>

                {/* Use ScrollView for fixed items or FlatList for dynamic items */}
                {foods && foods.length > 0 ? (
                  <ScrollView style={styles.scrollViewContainer}>
                    {foods.map((item, index) => (
                      <ScanResultMealItem
                        key={index}
                        ingredient={item.food_name}
                        amount={`${item.macronutrients.grams}g`}
                      />
                    ))}
                  </ScrollView>
                ) : (
                  <ScrollView style={styles.scrollViewContainer}>
                    <Text style={styles.noFoodText}>
                      No food items detected
                    </Text>
                    <ScanResultMealItem
                      ingredient="Add ingredients manually"
                      amount=""
                    />
                  </ScrollView>
                )}

                <View style={styles.addIngredientContainer}>
                  <TouchableOpacity
                    onPress={saveIngredient}
                    style={styles.saveIngredientContainer}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <ActivityIndicator color={Colors.white} size="small" />
                    ) : (
                      <Text style={styles.saveIngredientText}>Save</Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={addIngredient}
                    style={styles.addIconContainer}
                    disabled={isSaving}
                  >
                    <AddIcon />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleFixResults}
                    style={styles.cancelAddIngredientContainer}
                    disabled={isSaving}
                  >
                    <Text style={styles.cancelAddIngredientText}>Fix</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      </Screen>
    </>
  );
};

export default ScanResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageContainer: {
    height: Dimensions.get("window").height * 0.3,
    width: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  macroGridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    zIndex: 1,
    position: "relative",
    top: -70,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  backgroundPatternContainer: {
    paddingHorizontal: 10,
    flex: 1,
    borderRadius: 35,
    overflow: "hidden",
    marginTop: -50,
  },
  backgroundPattern: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
  },
  dataContainer: {
    padding: 15,
  },
  typeAndDate: {
    textAlign: "center",
    fontSize: 12,
    color: Colors.text.primary,
  },
  totalCalories: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 5,
    color: Colors.text.primary,
    fontWeight: "bold",
  },
  editIconContainer: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  scrollViewContainer: {
    paddingTop: 10,
    height: "70%",
    marginBottom: 20,
  },
  addIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addIngredientContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 60,
  },
  saveIngredientContainer: {
    backgroundColor: Colors.background.darkBlue,
    padding: 7,
    width: 80,
    borderRadius: 100,
    alignItems: "center",
  },
  cancelAddIngredientContainer: {
    backgroundColor: Colors.background.darkGray,
    padding: 7,
    width: 80,
    borderRadius: 100,
    alignItems: "center",
  },
  saveIngredientText: {
    color: Colors.white,
    fontSize: 16,
  },
  cancelAddIngredientText: {
    color: Colors.white,
    fontSize: 16,
  },
  noFoodText: {
    textAlign: "center",
    fontSize: 16,
    color: "#ff6b6b",
    marginTop: 20,
    marginBottom: 10,
  },
  foodItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text.primary,
  },
});
