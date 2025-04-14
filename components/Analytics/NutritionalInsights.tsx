import { View, Text, StyleSheet } from "react-native";
import { NutritionalInsightsIcon } from "../SvgIcons";
import { Colors } from "../../constants/Colors";
import { fonts } from "../../constants/fonts";

const NutritionalInsights = () => {
  return (
    <View style={styles.container}>
      <NutritionalInsightsIcon />
      <Text style={styles.title}>Nutritional Insights</Text>
    </View>
  );
};

export default NutritionalInsights;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.main.bold,
    marginTop: 4,
  },
});
