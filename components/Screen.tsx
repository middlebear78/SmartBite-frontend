// components/Screen.tsx
import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRouter } from "expo-router";

type ScreenProps = {
  title?: string;
  children?: React.ReactNode;
  showBack?: boolean;
  nextScreen?: string;
  backgroundColor?: string;
};

export const Screen = ({
  title,
  children,
  showBack = false,
  nextScreen,
  backgroundColor = "#fff",
}: ScreenProps) => {
  const router = useRouter();

  const handleNext = () => {
    if (nextScreen) {
      router.push(nextScreen);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        {showBack && (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}

        <View style={styles.childrenContainer}>{children}</View>

        {nextScreen && (
          <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 0,
  },
  childrenContainer: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
    padding: 10,
  },
  nextButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    left: 20,
    backgroundColor: "#4A90E2",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
