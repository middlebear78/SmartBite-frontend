import React from "react";
import { Stack } from "expo-router";
import { Screen } from "../components/Screen";
import { Colors } from "../constants/Colors";
import { View, Text, StatusBar, StyleSheet, ScrollView } from "react-native";
import { BottomTabNavigator } from "../components/TabNavigator";
import MyMealsTabs from "../components/MyMeals/MyMealsTabs";
import DayItem from "../components/MyMeals/DayItem";
const MyMeals = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "My Bites",
          headerStyle: { backgroundColor: Colors.white },
          headerShadowVisible: false,
        }}
      />

      <Screen title="My Meals">
        <MyMealsTabs />
        <ScrollView>
          <View style={styles.DayItemsContainer}>
            <DayItem
              date="Thursday 20.3.2025"
              totalCalories={1000}
              awardType="gold"
            />
            <DayItem
              date="Wednesday 19.3.2025"
              totalCalories={1450}
              awardType="silver"
            />
            <DayItem
              date="Tuesday 18.3.2025"
              totalCalories={3232}
              awardType="bronze"
            />
            <DayItem
              date="Monday 17.3.2025"
              totalCalories={1212}
              awardType="bronze"
            />
            <DayItem
              date="Sunday 16.3.2025"
              totalCalories={2344}
              awardType="bronze"
            />
            <DayItem
              date="Saturday 15.3.2025"
              totalCalories={1233}
              awardType="silver"
            />
            <DayItem
              date="Friday 14.3.2025"
              totalCalories={1000}
              awardType="gold"
            />
          </View>
        </ScrollView>
      </Screen>
      <BottomTabNavigator />
    </>
  );
};

export default MyMeals;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  DayItemsContainer: {
    gap: 20,
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    marginTop: 20,
    marginBottom: 100,
  },
});
