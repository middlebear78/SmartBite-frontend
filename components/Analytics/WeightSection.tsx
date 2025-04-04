import {
  View,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from "react-native";
import Scale from "./Scale";

const WeightSection = () => {
  return (
    <View>
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
        <Scale />
      </ImageBackground>
    </View>
  );
};

export default WeightSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
