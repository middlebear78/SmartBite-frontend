import React, { useEffect } from "react";
import { enableScreens } from "react-native-screens";
import "react-native-gesture-handler";
import { Text, View } from "react-native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "../store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack, SplashScreen } from "expo-router";

enableScreens();
// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Nunito: require("../assets/fonts/Nunito-SemiBold.ttf"),
    NunitoBold: require("../assets/fonts/Nunito-Bold.ttf"),
    NunitoExtraBold: require("../assets/fonts/Nunito-ExtraBold.ttf"),
    DeliusRegular: require("../assets/fonts/Delius-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Hide the splash screen when fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // If fonts aren't loaded, return nothing (splash screen stays visible)
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <Stack screenOptions={{ headerShown: false }} />
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
