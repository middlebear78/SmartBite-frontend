// components/Home/DateItem.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Colors } from "../../constants/Colors";
import { fonts } from "../../constants/fonts";
import Gradient from "../Gradient";

interface DateItemProps {
  day: string;
  number: number;
  isSelected: boolean;
  isToday: boolean;
  isLastItem: boolean;
  onPress: () => void;
  award: string;
}

const DateItem = ({
  day,
  number,
  isSelected,
  isToday,
  isLastItem,
  onPress,
  award,
}: DateItemProps) => {
  const handlePress = () => {
    onPress();
  };

  let awardElement = null;
  if (award === "gold") {
    awardElement = (
      <View style={styles.awardContainer}>
        <Image
          style={styles.awardIcon}
          resizeMode="contain"
          resizeMethod="resize"
          source={require("../../assets/images/awards/broccoliAwardGold.png")}
        />
      </View>
    );
  }
  if (award === "silver") {
    awardElement = (
      <View style={styles.awardContainer}>
        <Image
          style={styles.awardIcon}
          resizeMode="contain"
          resizeMethod="resize"
          source={require("../../assets/images/awards/broccoliAwardSilver.png")}
        />
      </View>
    );
  }
  if (award === "bronze") {
    awardElement = (
      <View style={styles.awardContainer}>
        <Image
          style={styles.awardIcon}
          resizeMode="contain"
          resizeMethod="resize"
          source={require("../../assets/images/awards/broccoliAwardBronze.png")}
        />
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.dateContainer, isLastItem && styles.lastItem]}
    >
      <Gradient
        nonSelectedColor={Colors.background.primary}
        isSelected={isSelected}
        style={styles.gradientContainer}
      >
        <Text style={[styles.dayText, isSelected && styles.selectedText]}>
          {day}
        </Text>
        <Text style={[styles.dateText, isSelected && styles.selectedText]}>
          {number}
        </Text>
      </Gradient>
      {isToday && <Text style={styles.todayText}>Today</Text>}
      {!isToday && awardElement}
    </TouchableOpacity>
  );
};

export default DateItem;

const styles = StyleSheet.create({
  dateContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 2,
  },
  awardContainer: {
    position: "relative",
    width: 40,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    top: -12,
  },
  awardIcon: {
    width: 37,
    height: 37,
  },
  gradientContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.secondary,
    height: 78,
  },
  todayText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
    color: Colors.text.secondary,
  },
  dayText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.secondary,
    fontFamily: fonts.main.bold,
    marginTop: -4,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.secondary,
    fontFamily: fonts.main.bold,
    marginTop: -5,
  },
  selectedText: {
    color: "#FFFFFF",
  },
  lastItem: {
    // marginLeft: 20,
  },
});
