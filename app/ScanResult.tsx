import React from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Stack } from "expo-router";
import { Screen } from "../components/Screen";
import { Colors } from "../constants/Colors";
import MacroGridItem from "../components/Home/MacroGridItem";
import { ScrollView } from "react-native-gesture-handler";
import { EditIcon, AddIcon } from "../components/SvgIcons";
import ScanResultMealItem from "../components/ScanResultMealItem";

const ScanResult = () => {
  const editTitleAndDate = () => {
    console.log("editTitleAndDate on ScanResult.tsx");
  };

  const addIngredient = () => {
    console.log("addIngredient on ScanResult.tsx");
  };

  const saveIngredient = () => {
    console.log("saveIngredient on ScanResult.tsx");
  };

  const cancelAddIngredient = () => {
    console.log("cancelAddIngredient on ScanResult.tsx");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: Colors.white },
          headerTintColor: Colors.text.primary,
          headerShadowVisible: false,
          headerTitle: "Meal Details",
        }}
      />
      <Screen title="ScanResult">
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require("../assets/demoImage.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.macroGridContainer}>
            <MacroGridItem
              title="Carbs"
              value="325g"
              icon="carbs"
              backgroundColor={Colors.background.lightBlue}
            />
            <MacroGridItem
              title="Fats"
              value="125g"
              icon="fats"
              backgroundColor={Colors.background.lightOrange}
            />
            <MacroGridItem
              title="Proteins"
              value="125g"
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
                <Text style={styles.totalCalories}>Total - 3000 cal</Text>
                <ScrollView style={styles.scrollViewContainer}>
                  <ScanResultMealItem
                    ingredient="Rice and vegetables"
                    amount="100g"
                  />
                  <ScanResultMealItem ingredient="Chicken" amount="250g" />
                  <ScanResultMealItem ingredient="Broccoli" amount="140g" />
                </ScrollView>
                <View style={styles.addIngredientContainer}>
                  <TouchableOpacity
                    onPress={saveIngredient}
                    style={styles.saveIngredientContainer}
                  >
                    <Text style={styles.saveIngredientText}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={addIngredient}
                    style={styles.addIconContainer}
                  >
                    <AddIcon />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={cancelAddIngredient}
                    style={styles.cancelAddIngredientContainer}
                  >
                    <Text style={styles.cancelAddIngredientText}>Cancel</Text>
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
});
