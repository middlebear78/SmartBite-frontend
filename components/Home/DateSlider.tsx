// components/Home/DateSlider.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  View,
  Animated,
  Platform,
} from "react-native";
import { Colors } from "../../constants/Colors";

import DateItem from "./DateItem";

interface DateSliderProps {
  updateIsToday: (isToday: boolean) => void;
  updateSelectedDate: (date: string) => void;
}

const DateSlider = ({ updateIsToday, updateSelectedDate }: DateSliderProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [isFirstRender, setIsFirstRender] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);
  const itemRefs = useRef<React.RefObject<View>[]>([]);
  const containerWidth = useRef(new Animated.Value(55)).current;

  const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    let awardType = "gold";
    if (i === 2) {
      awardType = "silver";
    }
    if (i === 3) {
      awardType = "bronze";
    }
    if (i === 4) {
      awardType = "bronze";
    }
    if (i === 5) {
      awardType = "gold";
    }
    if (i === 6) {
      awardType = "silver";
      i;
    }
    if (i === 7) {
      awardType = "silver";
    }
    d.setDate(d.getDate() - i);
    return {
      day: d.toLocaleDateString("en-US", { weekday: "short" }).charAt(0),
      number: d.getDate(),
      fullDate: d.toISOString().split("T")[0],
      award: awardType,
    };
  });

  useEffect(() => {
    setSelectedDate(lastSevenDays[0].number.toString());
    itemRefs.current = lastSevenDays.map(() => React.createRef<View>());
  }, []);

  const onScrollViewLayout = (event: LayoutChangeEvent) => {
    if (isFirstRender) {
      scrollViewRef.current?.scrollToEnd({ animated: false });
      setIsFirstRender(false);
    }
  };

  const handleDateChange = (date: string, index: number, fullDate: string) => {
    setSelectedDate(date);
    updateIsToday(index === 0);
    updateSelectedDate(date);
    Animated.spring(containerWidth, {
      toValue: index === 0 ? 55 : 45,
      damping: 10,
      stiffness: 200,
      mass: 1,
      useNativeDriver: false,
    }).start();

    // Calculate scroll position for RTL direction
    const totalItems = lastSevenDays.length;
    const itemWidth = 60; // Width of each date item
    const scrollPosition = (totalItems - 1 - index) * itemWidth;
    scrollViewRef.current?.scrollTo({ x: scrollPosition, animated: true });
  };

  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      style={[
        styles.scrollViewContainer,
        {
          width: containerWidth.interpolate({
            inputRange: [45, 55],
            outputRange: ["45%", "55%"],
          }),
        },
      ]}
      horizontal
      showsHorizontalScrollIndicator={false}
      onLayout={onScrollViewLayout}
    >
      <View style={[styles.dateContainer]}>
        {lastSevenDays.map((date, index) => (
          <View ref={itemRefs.current[index]} key={date.day + date.number}>
            <DateItem
              award={date.award}
              day={date.day}
              number={date.number}
              isSelected={selectedDate === date.number.toString()}
              isToday={index === 0}
              isLastItem={index === lastSevenDays.length - 1}
              onPress={() =>
                handleDateChange(date.number.toString(), index, date.fullDate)
              }
            />
          </View>
        ))}
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: Colors.background.primary,
    paddingVertical: 10,
    borderRadius: 25,
    width: "55%",
  },
  dateContainer: {
    direction: "rtl",
    display: "flex",
    flexDirection: Platform.OS === 'ios' ? "row" : "row-reverse",
    gap: 15,
    paddingHorizontal: 20,
  },
});

export default DateSlider;
