import React from "react";
import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { Colors } from "../constants/Colors";
import { Screen } from "../components/Screen";
import WeightSection from "../components/Analytics/WeightSection";

const Analytics = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "My progress",
          headerStyle: { backgroundColor: Colors.white },
          headerShadowVisible: false,
        }}
      />

      <Screen>
        <WeightSection />
      </Screen>
    </>
  );
};

export default Analytics;
