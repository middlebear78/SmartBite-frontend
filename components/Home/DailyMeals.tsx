// components/Home/DailyMeals.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { Colors } from "../../constants/Colors";

import { ArrowBottomIcon } from "./MacroIcons";

const DailyMeals = () => {
  let meals = [];
  let dataToShow = (
    <View
      style={[
        styles.noMealsContainer,
        {
          height:
            Platform.OS === "android"
              ? Dimensions.get("window").height * 0.14
              : Dimensions.get("window").height * 0.09,
          marginTop: 10,
        },
      ]}
    >
      <Text style={styles.noMealsText}>You haven't added any meals today!</Text>
      <TouchableOpacity>
        <Text style={styles.addMealButtonText}>Add your first meal</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 5 }}>
        <ArrowBottomIcon />
      </View>
    </View>
  );

  if (meals.length > 0) {
    dataToShow = <Text>Daily Meals</Text>;
  }

  return dataToShow;
};

export default DailyMeals;

const styles = StyleSheet.create({
  noMealsText: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  addMealButtonText: {
    color: Colors.text.secondary,
    fontSize: 14,
    fontFamily: "Nunito",
    fontWeight: "700",
    marginTop: 2,
  },
  noMealsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
