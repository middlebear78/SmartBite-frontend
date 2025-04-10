import { TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import { Colors } from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

// Define gradient colors
const gradientColors = {
  primary: "#52E1FF", // Adjust this to match your original primary gradient color
  secondary: "#26CDFF", // Adjust this to match your original secondary gradient color
};

interface TextButtonProps {
  title: string;
  onPress: () => void;
  isSelected: boolean;
  width?: number;
  paddingTop?: number;
  paddingBottom?: number;
  borderRadius?: number;
}

export const TextButton = ({
  title,
  onPress,
  isSelected,
  width,
  paddingTop,
  paddingBottom,
  borderRadius,
}: TextButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        { borderRadius: borderRadius ? borderRadius : 50 },
        styles.container,
      ]}
      onPress={onPress}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={
          isSelected
            ? [
                Colors.background.gradient.primary,
                Colors.background.gradient.secondary,
              ]
            : [Colors.white, Colors.white]
        }
        style={[{ borderRadius: borderRadius ? borderRadius : 50 }]}
      >
        <Text
          style={[
            styles.textButton,
            {
              color: isSelected ? Colors.white : Colors.black,
              width: width ? width : 80,
              paddingTop: paddingTop ? paddingTop : 5,
              paddingBottom: paddingBottom ? paddingBottom : 6,
            },
          ]}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textButton: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedTextButton: {
    fontSize: 14,
    fontWeight: "500",
    padding: 10,
    width: 80,
  },
  container: {
    shadowColor:
      Platform.OS === "ios" ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, .5)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
});
export default TextButton;
