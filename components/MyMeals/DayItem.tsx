import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { useState, useRef } from "react";
import { ExpandIcon } from "../SvgIcons";
import MyBitesMealitem from "./MyBitesMealitem";
import * as FileSystem from "expo-file-system";

type DayItemProps = {
  date: string;
  totalCalories: number;
  awardType: "gold" | "silver" | "bronze" | null;
  meals?: any[]; // Add this prop to accept meals data
};

const DayItem = ({
  date,
  totalCalories,
  awardType,
  meals = [],
}: DayItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const awardsGold = require("../../assets/images/awards/broccoliAwardGold.png");
  const awardsSilver = require("../../assets/images/awards/broccoliAwardSilver.png");
  const awardsBronze = require("../../assets/images/awards/broccoliAwardBronze.png");

  const awardImage =
    awardType === "gold"
      ? awardsGold
      : awardType === "silver"
      ? awardsSilver
      : awardType === "bronze"
      ? awardsBronze
      : null;

  // Add animation value
  const animatedValue = useRef(new Animated.Value(0)).current;

  const containerWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["90%", "100%"],
  });

  const borderRadius = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0],
  });

  // Animation function
  const toggleExpand = (expanded: boolean) => {
    Animated.spring(animatedValue, {
      toValue: expanded ? 1 : 0,
      useNativeDriver: false,
      tension: 40,
      friction: 8,
    }).start();
  };

  const handlePress = () => {
    setIsExpanded(!isExpanded);
    toggleExpand(!isExpanded);
  };

  // Helper function to determine meal type based on time
  const getMealType = (timestamp) => {
    if (!timestamp) return "Meal";

    const date = new Date(timestamp);
    const hour = date.getHours();

    if (hour < 10) return "Breakfast";
    if (hour < 14) return "Lunch";
    if (hour < 18) return "Afternoon Snack";
    return "Dinner";
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={handlePress} style={styles.mainContainer}>
        <Animated.View
          style={[
            styles.container,
            {
              width: containerWidth,
              borderRadius: borderRadius,
            },
          ]}
        >
          <View>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.totalCalories}>{totalCalories}</Text>
          </View>
          <View style={styles.awardsAndExpandIconContainer}>
            <View style={styles.awardsContainer}>
              <Image source={awardImage} style={styles.awardsImage} />
            </View>
            <View style={styles.expandIconContainer}>
              <ExpandIcon isExpanded={isExpanded} />
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.expandedContainer}>
          {meals && meals.length > 0 ? (
            // Map through the meals array and render MyBitesMealitem for each meal
            meals.map((meal, index) => {
              // Convert macronutrient values to strings with 'g' appended
              const carbs = `${meal.total_macronutrients?.carbs || 0}g`;
              const fats = `${meal.total_macronutrients?.fat || 0}g`;
              const proteins = `${meal.total_macronutrients?.protein || 0}g`;
              const calories = `${meal.total_macronutrients?.calories || 0}`;

              // Determine meal type based on timestamp
              const mealType = getMealType(meal.timestamp);

              // Process image path
              const getImageSource = () => {
                if (!meal.local_image_path) {
                  return require("../../assets/demoImage.png");
                }

                if (meal.local_image_path.startsWith("file://")) {
                  return { uri: meal.local_image_path };
                }

                // If it's just a filename (stored without path)
                if (!meal.local_image_path.includes("/")) {
                  return {
                    uri: `${FileSystem.documentDirectory}meal_images/${meal.local_image_path}`,
                  };
                }

                // If it's a full path, extract filename
                const filename = meal.local_image_path.split("/").pop();

                if (filename) {
                  return {
                    uri: `${FileSystem.documentDirectory}meal_images/${filename}`,
                  };
                }

                return require("../../assets/demoImage.png");
              };

              return (
                <MyBitesMealitem
                  key={meal.id || `meal-${index}`}
                  meal_title={meal.meal_title}
                  mealType={getMealType(meal.timestamp)}
                  total_macronutrients={meal.total_macronutrients}
                  local_image_path={meal.local_image_path}
                  timestamp={meal.timestamp}
                />
              );
            })
          ) : (
            // Show a message when no meals are found
            <View style={styles.noMealsContainer}>
              <Text style={styles.noMealsText}>
                No meals recorded for this day
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default DayItem;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    alignItems: "center",
  },
  container: {
    width: "90%",
    height: 70,
    borderRadius: 10,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expandedContainer: {
    height: "auto",
    width: "100%",
    minHeight: 200,
    borderRadius: 0,
    backgroundColor: Colors.background.lightBlue,
    marginBottom: 20,
    paddingVertical: 10,
  },
  date: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  totalCalories: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  awardsContainer: {
    width: 50,
    height: 50,
  },
  awardsImage: {
    width: "100%",
    height: "100%",
  },
  expandIconContainer: {
    width: 25,
    height: 40,
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  awardsAndExpandIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noMealsContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  noMealsText: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: "center",
  },
});
