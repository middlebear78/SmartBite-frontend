import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { fonts } from "../../constants/fonts";
import MacroGridItem from "./MacroGridItem";

const MacroGrid = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/food_pattern.png")}
      style={styles.container}
      imageStyle={styles.backgroundPattern}
    >
      <Text style={styles.title}>Daily Nutrition</Text>
      <View style={styles.itemsContainer}>
        <MacroGridItem
          title="Carbs"
          value="325g"
          icon="carbs"
          backgroundColor={Colors.background.lightBlue}
        />
        <MacroGridItem
          title="Fats"
          value="125g"
          icon="fats"
          backgroundColor={Colors.background.lightOrange}
        />
        <MacroGridItem
          title="Proteins"
          value="125g"
          icon="proteins"
          backgroundColor={Colors.background.lightGreen}
        />
      </View>
    </ImageBackground>
  );
};

export default MacroGrid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    height: Dimensions.get("window").height * 0.3, // 30% of the screen height
    borderRadius: 25,
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    color: Colors.text.secondary,
    fontFamily: fonts.main.bold,
  },
  backgroundPattern: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
  },
  itemsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 15,
    marginTop: 20,
  },
});
