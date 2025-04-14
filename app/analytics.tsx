import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { Colors } from "../constants/Colors";
import { Screen } from "../components/Screen";
import WeightSection from "../components/Analytics/WeightSection";
import StepsSection from "../components/Analytics/StepsSection";
import { BottomTabNavigator } from "../components/TabNavigator";
import WaterSection from "../components/Analytics/WaterSection";
import InformationTab from "../components/Analytics/InformationTab";
import WeightProgress from "../components/Analytics/WeightProgress";
import ActivityTracking from "../components/Analytics/ActivityTracking";
import NutritionalInsights from "../components/Analytics/NutritionalInsights";
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
          {/* <StepsSection /> */}
          {/* <WaterSection /> */}

          <InformationTab
            title="Weight Progress"
            color={Colors.background.darkBlue}
          >
            <WeightProgress />
          </InformationTab>

          <InformationTab
            title="Calories Intake"
            color={Colors.background.green}
          >
            <Text>Calories Intake</Text>
          </InformationTab>
          <InformationTab
            title="Macronutrient Distribution"
            color={Colors.background.orange}
          >
            <Text>Macronutrient Distribution</Text>
          </InformationTab>

          <InformationTab
            title="Activity Tracking"
            color={Colors.background.orange}
            hideTab={true}
          >
            <ActivityTracking />
          </InformationTab>

          <InformationTab
            title="Nutritional Insights"
            color={Colors.background.orange}
            hideTab={true}
          >
            <NutritionalInsights />
          </InformationTab>
          <View style={{ height: 100 }}></View>
        </ScrollView>
      </Screen>
      <BottomTabNavigator />
    </>
  );
};

export default Analytics;
