// components/RoundButton.tsx
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import {
  updateHeightUnit,
  updateWeightUnit,
} from "../store/questionnaireSlice";

type Props = {
  color: "white" | "blue";
  nextScreen: string;
  text: string;
  disabled?: boolean;
};

const RoundButton = ({ color, nextScreen, text, disabled }: Props) => {
  const router = useRouter();

  // Define colors based on your new Colors constant
  let backColor = Colors.light.background;
  let textColor = Colors.light.tint;
  let disabledColor = "#AEC4D5"; // Adjust this to match your buttonBlueDisabled color

  if (color === "white") {
    backColor = Colors.light.background;
    textColor = Colors.light.tint;
  }
  if (color === "blue") {
    backColor = Colors.light.tint;
    textColor = Colors.light.background;
    if (disabled) {
      backColor = disabledColor;
    }
  }

  const dispatch = useDispatch();

  const handlePress = () => {
    if (nextScreen === "/questionnaire/4") {
      dispatch(
        updateHeightUnit({
          unit: "cm",
          sectionIndex: 4,
          updateOnlyClicked: true,
        })
      );
    }
    router.push(nextScreen);
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        disabled={disabled}
        style={[styles.button, { backgroundColor: backColor }]}
        onPress={handlePress}
      >
        <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    width: "100%",
    height: 45,
    marginTop: 20,
  },
  button: {
    height: "100%",
    width: "80%",
    borderRadius: 30,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Nunito",
  },
});

export default RoundButton;
