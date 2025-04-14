import {
  View,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";
import Scale from "./Scale";
import { Colors } from "../../constants/Colors";
import { fonts } from "../../constants/fonts";

const WeightSection = () => {
  const updateWeight = () => {
    console.log("updateWeight located in weightSection.tsx");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/analytics/weight-bg.jpg")}
        style={[
          styles.container,
          {
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").width,
          },
        ]}
      >
        <Scale weight={69.2} unit="kg" updateWeight={updateWeight} />
        <View style={styles.bottomContainer}>
          <Text style={styles.lastWeekWeightChange}>
            -0.2 kg from last week
          </Text>
          <View style={styles.flexRow}>
            <View style={styles.weightChangeContainer}>
              <Text style={styles.weightChangeNumber}>-0.2 kg</Text>
              <Text style={styles.weightChangeDescription}>Last 30 days</Text>
            </View>
            <View style={styles.weightChangeContainer}>
              <Text style={styles.weightChangeNumber}>-5 kg</Text>
              <Text style={styles.weightChangeDescription}>Total loss</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WeightSection;

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
    justifyContent: "space-between",
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
