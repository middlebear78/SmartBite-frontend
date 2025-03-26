import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";

interface TabItemProps {
  title: string;
  isActive: boolean;
  onPress?: () => void;
}

const TabItem = ({ title, isActive, onPress }: TabItemProps) => {
  const [position, setPosition] = useState(0);

  const handlePress = () => {
    onPress?.();
  };

  return (
    <TouchableOpacity
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={handlePress}
      onLayout={(event) => {
        const { x } = event.nativeEvent.layout;
        setPosition(x);
      }}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 50,
    borderTopLeftRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background.lightGray,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
  },
  activeContainer: {
    backgroundColor: Colors.background.darkBlue,
  },
});
