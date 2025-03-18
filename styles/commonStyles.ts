import { StyleSheet } from "react-native";
import { colors } from "../constants/Colors";
const commonStyles = StyleSheet.create({
  whiteTitle: {
    fontSize: 30, // Adjust the size as needed
    fontFamily: "Nunito",
    color: colors.white,
    textAlign: "center",
  },
  whiteText: {
    fontSize: 18,
    lineHeight: 20,
    marginBottom: 10,
    fontFamily: "Nunito",
    color: colors.white,
    textAlign: "center",
  },
  buttonText: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 100,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Nunito",
    fontSize: 18,
  },
});

export default commonStyles;
