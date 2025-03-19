import { StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
const commonStyles = StyleSheet.create({
  whiteTitle: {
    fontSize: 30, // Adjust the size as needed
    fontFamily: "Nunito",
    color: Colors.white,
    textAlign: "center",
  },
  whiteText: {
    fontSize: 18,
    lineHeight: 20,
    marginBottom: 10,
    fontFamily: "Nunito",
    color: Colors.white,
    textAlign: "center",
  },
  buttonText: {
    backgroundColor: Colors.primary,
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
