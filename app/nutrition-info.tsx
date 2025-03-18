// app/nutrition-info.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function NutritionInfo() {
  const params = useLocalSearchParams();
  const analysisResult = params.analysisResult
    ? JSON.parse(params.analysisResult as string)
    : null;
  const imagePath = params.imagePath as string;

  // ✅ Debugging
  console.log("🛠️ Analysis Result:", analysisResult);
  console.log("🖼️ Received Image Path:", imagePath);

  // ✅ Extract data safely
  const analysis = analysisResult?.analysis;
  const foods = analysis?.foods || [];
  const mealTitle = analysis?.meal_title || "Unknown Meal";
  const totalMacros = analysis?.total_macronutrients || {};

  // ✅ Handle "Log Meal" button
  const handleLogMeal = () => {
    Alert.alert("✅ Meal Logged", "Your meal has been saved successfully.");
    console.log("📌 Meal Logged:", analysis);
  };

  // ✅ Handle "Fix Results" button
  const handleFixResults = () => {
    Alert.alert(
      "⚠️ Fixing Results",
      "You can now edit or correct your meal details."
    );
    console.log("✏️ Fixing Results for:", analysis);
  };

  return (
    <View style={styles.container}>
      {/* ✅ Display Meal Title */}
      <Text style={styles.title}>{mealTitle}</Text>

      {/* ✅ Show Image from Local Storage */}
      {imagePath && (
        <Image
          source={{ uri: imagePath }}
          style={styles.image}
          resizeMode="contain"
          onError={(e) =>
            console.log("❌ Image Load Error:", e.nativeEvent.error)
          }
        />
      )}

      {/* ✅ Show Foods List */}
      <FlatList
        data={foods}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.foodItem}>
            <Text style={styles.foodName}>{item.food_name}</Text>
            <Text style={styles.category}>Category: {item.category}</Text>
            <Text>Calories: {item.macronutrients.calories} kcal</Text>
            <Text>Protein: {item.macronutrients.protein} g</Text>
            <Text>Carbs: {item.macronutrients.carbs} g</Text>
            <Text>Fat: {item.macronutrients.fat} g</Text>
            <Text>Weight: {item.macronutrients.grams} g</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.errorText}>No food detected</Text>
        }
      />

      {/* ✅ Show Total Macronutrients */}
      <View style={styles.totalMacros}>
        <Text style={styles.totalTitle}>Total Macronutrients</Text>
        <Text>Calories: {totalMacros.calories} kcal</Text>
        <Text>Protein: {totalMacros.protein} g</Text>
        <Text>Carbs: {totalMacros.carbs} g</Text>
        <Text>Fat: {totalMacros.fat} g</Text>
        <Text>Weight: {totalMacros.grams} g</Text>
      </View>

      {/* ✅ Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.logButton} onPress={handleLogMeal}>
          <Text style={styles.buttonText}>📌 Log Meal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fixButton} onPress={handleFixResults}>
          <Text style={styles.buttonText}>✏️ Fix Results</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  foodItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  category: {
    fontSize: 14,
    color: "#666",
  },
  totalMacros: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  logButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  fixButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});
