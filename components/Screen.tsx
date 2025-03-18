// components/Screen.tsx
import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
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
  showBack,
  nextScreen,
  backgroundColor = "#fff",
}: ScreenProps) => {
  const router = useRouter();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <View style={styles.content}>
        <View style={styles.childrenContainer}>{children}</View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  childrenContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    gap: 8,
  },
  button: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
    minWidth: 100,
    alignItems: "center",
  },
});
