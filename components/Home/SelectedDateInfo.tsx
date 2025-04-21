// components/Home/SelectedDateInfo.tsx
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import Gradient from "../Gradient";
import { Colors } from "../../constants/Colors";
import { fonts } from "../../constants/fonts";

interface SelectedDateInfoProps {
  isToday: boolean;
  selectedDate: string;
}

const SelectedDateInfo = ({ isToday, selectedDate }: SelectedDateInfoProps) => {
  const widthAnim = useRef(new Animated.Value(isToday ? 45 : 60)).current;

  useEffect(() => {
    Animated.spring(widthAnim, {
      toValue: isToday ? 45 : 60,
      damping: 10, // Controls bounce (lower = more bounce)
      stiffness: 200, // Controls speed
      mass: 1, // Controls inertia
      useNativeDriver: false,
    }).start();
  }, [isToday]);

  let dataToshow;
  if (isToday) {
    dataToshow = (
      <View style={styles.todayContainer}>
        <Text style={styles.bigText}>2000</Text>
        <Text style={styles.smallText}>Calories left{"\n"}for today</Text>
      </View>
    );
  } else {
    dataToshow = (
      <View style={styles.dataStatsContainer}>
        <View style={styles.statsContainer}>
          <Text style={styles.tipText}>KEEP GOING!</Text>
          <Text style={styles.dataStatsText}>Your daily cal</Text>
          <Text style={styles.dataStatsText}>1450 cal</Text>
        </View>

        <View style={styles.awardContainer}>
          <Image
            source={require("../../assets/images/awards/broccoliAwardGold.png")}
            style={styles.awardImage}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}></View>
      <Animated.View
        style={[
          styles.container,
          {
            width: widthAnim.interpolate({
              inputRange: [45, 60],
              outputRange: ["45%", "60%"],
            }),
          },
        ]}
      >
        <Gradient
          nonSelectedColor={Colors.background.primary}
          isSelected={isToday}
          style={styles.gradientContainer}
        >
          {dataToshow}
        </Gradient>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  gradientContainer: {
    flex: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  bigText: {
    fontFamily: fonts.main.bold,
    fontSize: 50,
    height: 55,
    color: Colors.white,
    position: "relative",
    top: -5,
  },
  smallText: {
    fontSize: 18,
    lineHeight: 20,
    color: Colors.white,
    fontFamily: fonts.main.regular,
    textAlign: "center",
  },
  todayContainer: {
    position: "relative",
    top: Platform.OS === "ios" ? -2 : -3,
  },
  dataStatsContainer: {
    flexDirection: "row",
    position: "relative",
  },
  awardContainer: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  awardImage: {
    right: 15,
    top: 2,
    width: 90,
  },
  statsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tipText: {
    fontFamily: fonts.main.extraBold,
    fontSize: 16,
    color: Colors.text.tertiary,
  },
  dataStatsText: {
    fontFamily: fonts.main.bold,
    fontSize: 16,
    lineHeight: 20,
    color: Colors.text.primary,
  },
});

export default SelectedDateInfo;
