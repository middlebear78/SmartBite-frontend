import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { fonts } from "../../constants/fonts";
import { UpdateWeightIcon } from "../SvgIcons";

interface ScaleProps {
  weight: number;
  unit: string;
  updateWeight: () => void;
}

const Scale = ({ weight, unit, updateWeight }: ScaleProps) => {
  return (
    <ImageBackground
      source={require("../../assets/images/analytics/scale.png")}
      style={styles.scale}
    >
      <View style={styles.weightContainer}>
        <Text style={styles.title}>Current Weight</Text>
        <View style={styles.numberWeightContainer}>
          <Text style={[styles.weight, styles.glow]}>{weight} </Text>
          <Text style={[styles.unit, styles.glow]}>{unit}</Text>
        </View>
      </View>
      <View style={styles.updateContainer}>
        <TouchableOpacity onPress={updateWeight} style={styles.glow}>
          <UpdateWeightIcon width={53} />
        </TouchableOpacity>
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
    top: Dimensions.get("window").width * 0.1,
    padding: 30,
    zIndex: 1,
  },
  weightContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: Colors.primary,
    fontFamily: fonts.main.bold,
  },
  numberWeightContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },
  glow: {
    shadowColor: "#FFFCE2",
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 12,
    shadowOffset: { width: 0, height: 2 },
  },
  weight: {
    fontSize: Dimensions.get("window").width * 0.1,
    lineHeight: Dimensions.get("window").width * 0.1,
    color: Colors.white,
    fontFamily: fonts.orbitron.extraBold,
    marginTop: 8,
    padding: 0,
    textAlign: "right",
  },
  unit: {
    fontSize: Dimensions.get("window").width * 0.05,
    color: Colors.white,
    fontFamily: fonts.orbitron.extraBold,
    position: "relative",
    bottom: 4,
  },
  updateContainer: {
    alignItems: "center",
    position: "relative",
    bottom: 10,
  },
  update: {
    color: Colors.primary,
    fontSize: 14,
    fontFamily: fonts.main.bold,
  },
  weightChange: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: fonts.main.regular,
    marginTop: 10,
    textAlign: "center",
    position: "absolute",
    bottom: 10,
  },
});
