
import React, { useEffect } from "react";
import { I18nManager, View, StyleSheet } from "react-native";
import { enableScreens } from "react-native-screens";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "../store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Stack, SplashScreen } from "expo-router";
import { Colors } from "../constants/Colors";

enableScreens();
// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Ensure LTR layout
    if (I18nManager.isRTL) {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false); // Disable RTL for the entire app
    }
  }, []);

  const [fontsLoaded] = useFonts({
    Nunito: require("../assets/fonts/Nunito-SemiBold.ttf"),
    NunitoBold: require("../assets/fonts/Nunito-Bold.ttf"),
    NunitoExtraBold: require("../assets/fonts/Nunito-ExtraBold.ttf"),
    DeliusRegular: require("../assets/fonts/Delius-Regular.ttf"),
    OrbitronExtraBold: require("../assets/fonts/Orbitron-ExtraBold.ttf"),
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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <SafeAreaView style={styles.container}>
            {/* Configure StatusBar properties here */}
            <StatusBar
              style="light" // Text color for the status bar
              translucent={true} // Make the status bar translucent
              backgroundColor="transparent" // Make the background transparent
            />
            <Stack
              screenOptions={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: Colors.background.secondary,
                },
                headerTintColor: Colors.text.light,
                headerBackTitle: "Back",
                headerTitle: "", // Empty title by default
                animation: "slide_from_right", // Default animation for most screens
              }}
            >
              
            </Stack>
          </SafeAreaView>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
