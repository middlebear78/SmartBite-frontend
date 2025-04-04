import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { fonts } from "../../constants/fonts";

const Scale = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/analytics/scale.png")}
      style={styles.scale}
    >
      <View style={styles.weightContainer}>
        <Text style={styles.title}>Current Weight</Text>
        <Text style={styles.weight}>80 kg</Text>
      </View>
      <View style={styles.updateContainer}>
        <Text style={styles.update}>Update Weight</Text>
      </View>
    </ImageBackground>
  );
};

export default Scale;

const styles = StyleSheet.create({
  scale: {
    width: Dimensions.get("window").width * 0.6,
    height: Dimensions.get("window").width * 0.6,
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: 50,
    padding: 30,
  },
  weightContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: Colors.primary,
    fontFamily: fonts.main.bold,
  },
  weight: {
    fontSize: 24,
    color: Colors.primary,
    fontFamily: fonts.orbitron.extraBold,
    marginTop: 8,
  },
  updateContainer: {},
  update: {
    color: "white",
    fontSize: 14,
    fontFamily: "nunito-bold",
  },
});
