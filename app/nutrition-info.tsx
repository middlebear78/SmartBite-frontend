// nutrition-info.tsx
import React, { useState, useEffect } from "react";
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
import { fonts } from "../constants/fonts";
import MacroGridItem from "../components/Home/MacroGridItem";
import { ScrollView } from "react-native-gesture-handler";
import {
  EditIcon,
  AddIcon,
  CarbsLetterIcon,
  FatLetterIcon,
  ProteinLetterIcon,
} from "../components/SvgIcons";
import ScanResultMealItem from "../components/ScanResultMealItem";
import LocalMealStorageService from "../services/mealLocalStorageService"; // Import the MealStorage class
import CustomAlert from "@/components/CustomAlert";
import Ionicons from "@expo/vector-icons/Ionicons"; // Import Ionicons for checkmarks and diet indicators

const ScanResult = () => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [dietCompliant, setDietCompliant] = useState({});
  const [overallDietCompliant, setOverallDietCompliant] = useState(false);

  // Get URL params from navigation
  const params = useLocalSearchParams();
  const editMode = (params.editMode = "true");
  const mealId = params.mealId as string;

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

  // Check overall diet compliance
  useEffect(() => {
    if (foods.length > 0) {
      // Consider meal compliant if all items are compliant or neutral
      const allCompliant = foods.every(
        (item) => dietCompliant[item.food_name] !== false
      );
      setOverallDietCompliant(allCompliant);
    }
  }, [dietCompliant, foods]);

  // Debug logs
  console.log("🛠️ Analysis Result:", analysisResult);
  console.log("🖼️ Received Image Path:", imagePath);
  console.log("✏️ Edit Mode:", editMode, "Meal ID:", mealId);

  // Diet compliance check - a simple example that would be replaced with real logic
  const checkDietCompliance = (food) => {
    // Example diet rules - you would replace this with actual diet rules
    // For demo: low-carb diet (under 20g carbs per item is compliant)
    return food.macronutrients.carbs < 20;
  };

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

      if (editMode && mealId) {
        // Update existing meal
        await LocalMealStorageService.updateMeal(
          mealId,
          analysisResult,
          imagePath
        );

        console.log("✅ Meal Updated with ID:", mealId);

        // Navigate back to home with an update message
        router.replace({
          pathname: "/home",
          params: {
            showSuccessAlert: "true",
            alertMessage: "Your meal has been updated",
          },
        });
      } else {
        // Original code for saving a new meal
        const newMealId = await LocalMealStorageService.saveMealFromAnalysis(
          analysisResult,
          imagePath
        );

        console.log("📌 Meal Logged with ID:", newMealId);

        // Navigate to home with a success parameter
        router.replace({
          pathname: "/home",
          params: {
            showSuccessAlert: "true",
            alertMessage: "Your meal has been saved to your Bites Diary",
          },
        });
      }
    } catch (error) {
      console.error("Error saving/updating meal:", error);
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

                {/* Diet Fit indicator on the top-right corner */}
                <View style={styles.topRightContainer}>
                  <View style={styles.dietFitContainer}>
                    <Text style={styles.dietFitText}>Diet Fit</Text>
                    <Ionicons
                      name={
                        overallDietCompliant
                          ? "checkmark-circle"
                          : "close-circle"
                      }
                      size={22}
                      color={
                        overallDietCompliant
                          ? Colors.background.lightGreen
                          : "#ff6b6b"
                      }
                    />
                  </View>
                </View>

                {/* Food Items with Diet Compatibility Icons */}
                {foods && foods.length > 0 ? (
                  <ScrollView style={styles.scrollViewContainer}>
                    {foods.map((item, index) => {
                      // Check if this food is diet compliant
                      const isCompliant = checkDietCompliance(item);

                      // Update diet compliance state for this item
                      if (dietCompliant[item.food_name] === undefined) {
                        setDietCompliant((prev) => ({
                          ...prev,
                          [item.food_name]: isCompliant,
                        }));
                      }

                      return (
                        <View key={index} style={styles.foodItemContainer}>
                          <View style={styles.foodItemRow}>
                            <ScanResultMealItem
                              ingredient={item.food_name}
                              amount={`${item.macronutrients.grams}g`}
                            />
                            <View style={styles.macroAndDietContainer}>
                              <View style={styles.inlineIconsContainer}>
                                <View style={styles.macroItem}>
                                  <View style={styles.macroIcon}>
                                    <CarbsLetterIcon />
                                  </View>
                                  <Text style={styles.macroText}>
                                    {item.macronutrients.carbs}g
                                  </Text>
                                </View>
                                <View style={styles.macroItem}>
                                  <View style={styles.macroIcon}>
                                    <ProteinLetterIcon />
                                  </View>
                                  <Text style={styles.macroText}>
                                    {item.macronutrients.protein}g
                                  </Text>
                                </View>
                                <View style={styles.macroItem}>
                                  <View style={styles.macroIcon}>
                                    <FatLetterIcon />
                                  </View>
                                  <Text style={styles.macroText}>
                                    {item.macronutrients.fat}g
                                  </Text>
                                </View>
                              </View>
                              <Ionicons
                                name={
                                  isCompliant
                                    ? "checkmark-circle"
                                    : "close-circle"
                                }
                                size={20}
                                color={
                                  isCompliant
                                    ? Colors.background.lightGreen
                                    : "#ff6b6b"
                                }
                              />
                            </View>
                          </View>
                        </View>
                      );
                    })}
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
  },
  backgroundPatternContainer: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
    marginTop: -50,
  },
  backgroundPattern: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
  },
  dataContainer: {
    padding: 20,
  },
  typeAndDate: {
    textAlign: "center",
    fontSize: 13,
    color: Colors.text.primary,
    fontFamily: fonts.main.regular,
  },
  totalCalories: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 0,
    color: Colors.text.primary,
    fontFamily: fonts.main.bold,
    fontWeight: "bold",
  },
  editIconContainer: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 100,
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
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 30,
    borderRadius: 100,
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
  // New styles for diet compliance indicators
  topRightContainer: {
    position: "absolute",
    top: 10,
    right: 50,
    zIndex: 100,
  },
  dietFitContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(245, 245, 245, 0.9)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dietFitText: {
    fontSize: 12,
    marginRight: 4,
    fontFamily: fonts.main.medium,
  },

  foodItemContainer: {
    marginBottom: 15,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 5,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  foodItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 5,
  },
  macroAndDietContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  inlineIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
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
