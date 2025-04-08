import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { Colors } from "../constants/Colors";
import { Screen } from "../components/Screen";
import WeightSection from "../components/Analytics/WeightSection";
import StepsSection from "../components/Analytics/StepsSection";
import WaterSection from "../components/Analytics/WaterSection";
import { BottomTabNavigator } from "../components/TabNavigator";

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
        <ScrollView>
          <WeightSection />
          <StepsSection />
          <WaterSection />
          <View style={{ height: 200 }}></View>
        </ScrollView>
        <BottomTabNavigator />
      </Screen>
    </>
  );
};

export default Analytics;
