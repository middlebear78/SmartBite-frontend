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

type DayItemProps = {
  date: string;
  totalCalories: number;
  awardType: "gold" | "silver" | "bronze" | null;
};

const DayItem = ({ date, totalCalories, awardType }: DayItemProps) => {
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
          {/* day data needs to be fetched from the database */}
          <MyBitesMealitem
            mealTitle="Chicken and Rice"
            mealType="Lunch"
            carbs="10g"
            fats="10g"
            proteins="10g"
            mealCalories="1212"
            image={require("../../assets/demoImage.png")}
          />
          <MyBitesMealitem
            mealTitle="long title long titlelong titlelong titlelong titlelong title"
            mealType="Lunch"
            carbs="10g"
            fats="10g"
            proteins="10g"
            mealCalories="1212"
            image={require("../../assets/demoImage.png")}
          />
          <MyBitesMealitem
            mealTitle="Chicken and Rice"
            mealType="Lunch"
            carbs="10g"
            fats="10g"
            proteins="10g"
            mealCalories="1212"
            image={require("../../assets/demoImage.png")}
          />
          <MyBitesMealitem
            mealTitle="Chicken and Rice"
            mealType="Lunch"
            carbs="10g"
            fats="10g"
            proteins="10g"
            mealCalories="1212"
            image={require("../../assets/demoImage.png")}
          />
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
});
