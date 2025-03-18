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
} from "../store/QuestionnaireSlice";

type Props = {
  color: "white" | "blue";
  nextScreen: string;
  text: string;
  disabled?: boolean;
};

const RoundButton = ({ color, nextScreen, text, disabled }: Props) => {
  const router = useRouter();

  // Define colors based on your new Colors constant
  let backColor = Colors.white;
  let textColor = Colors.primary;
  let disabledColor = Colors.buttonBlueDisabled;

  if (color === "white") {
    backColor = Colors.white;
    textColor = Colors.primary;
  }
  if (color === "blue") {
    backColor = Colors.buttonBlueActive;
    textColor = Colors.white;
    if (disabled) {
      backColor = Colors.buttonBlueDisabled;
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
