// app/settings.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { Screen } from "../components/Screen";
import { Stack } from "expo-router";
import { BottomTabNavigator } from "@/components/TabNavigator";
import { Colors } from "../constants/Colors";
import MyProfile from "../components/Setting/MyProfile";
import MyPlan from "../components/Setting/MyPlan";
import DietGoals from "../components/Setting/DietGoals";
import Preferences from "../components/Setting/Preferences";
import About from "../components/Setting/About";

export default function SettingsScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Settings",
          headerStyle: { backgroundColor: Colors.background.darkBlue },
          headerShadowVisible: false,
          headerTintColor: Colors.white,
        }}
      />
      <Screen showBack={false} backgroundColor={Colors.background.lightBlue}>
        <StatusBar barStyle="light-content" />
        <ScrollView style={styles.container}>
          <MyProfile />
          <MyPlan />
          <DietGoals />
          <Preferences />
          <About />
          <View style={styles.gap}></View>
        </ScrollView>
      </Screen>
      <BottomTabNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gap: {
    height: 120,
  },
});
