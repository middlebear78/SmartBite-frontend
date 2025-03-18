// components/LoginButtons.tsx
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface LoginButtonsProps {
  onPress: () => void;
  type: "google" | "apple";
}

const LoginButtons = ({ onPress, type }: LoginButtonsProps) => {
  let image;
  if (type === "google") {
    image = require("../assets/images/google.png");
  }
  if (type === "apple") {
    image = require("../assets/images/apple.png");
  }

  const backgroundColor = type === "google" ? "white" : "#000000";
  const borderColor = type === "google" ? "#DADCE0" : "white";
  const textColor = type === "google" ? "#000000" : "white";

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor, borderColor, borderWidth: 1 },
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Image
          source={image}
          style={styles.image}
          resizeMode="contain"
          resizeMethod="resize"
        />
        <Text style={[styles.text, { color: textColor }]}>
          Sign in with {type}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LoginButtons;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 55,
    backgroundColor: "red",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 16,
    height: 16,
  },
  text: {
    fontSize: 19,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
