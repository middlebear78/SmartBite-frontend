import {
  View,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";
import StepTracker from "./StepTracker";
import { Colors } from "../../constants/Colors";
import { fonts } from "../../constants/fonts";

const StepsSection = () => {
  const updateWeight = () => {
    console.log("updateWeight located in weightSection.tsx");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/analytics/step-bg.jpg")}
        style={[
          styles.container,
          {
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").width,
          },
        ]}
      >
        <StepTracker steps={6950} goal={10000} />
        <View style={styles.bottomContainer}>
          <View style={styles.flexRow}>
           
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default StepsSection;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  bottomContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  lastWeekWeightChange: {
    position: "relative",
    color: Colors.white,
    fontSize: 16,
    fontFamily: fonts.main.bold,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginBottom: 30,
    marginTop: 15,
  },
  weightChange: {
    color: Colors.white,
    fontSize: 30,
  },
  weightChangeContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  weightChangeNumber: {
    fontFamily: fonts.main.bold,
    color: Colors.white,
    fontSize: 30,
  },
  weightChangeDescription: {
    color: Colors.white,
    fontSize: 16,
    lineHeight: 16,
    fontFamily: fonts.main.regular,
  },
});
