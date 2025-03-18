// components/Home/DateAndCalories.tsx
import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import DateSlider from "./DateSlider";
import SelectedDateInfo from "./SelectedDateInfo";

const DateAndCalories = () => {
  const [isToday, setIsToday] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Update the isToday state when the date slider is updated
  const updateIsToday = (value: boolean) => {
    setIsToday(value);
  };

  const updateSelectedDate = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <DateSlider
        updateIsToday={updateIsToday}
        updateSelectedDate={updateSelectedDate}
      />
      <SelectedDateInfo selectedDate={selectedDate} isToday={isToday} />
    </View>
  );
};

export default DateAndCalories;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    height: Dimensions.get("window").height * 0.15, // 15% of the screen height
  },
});
