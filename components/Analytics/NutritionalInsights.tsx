import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Colors } from "../../constants/Colors";
import { fonts } from "../../constants/fonts";
import NutritionalInsightsItem from "./NutritionalInsightsItem";
import { NutritionalInsightsIcon } from "../SvgIcons";

const NutritionalInsights = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <NutritionalInsightsIcon />
        <Text style={styles.title}>Nutritional Insights</Text>
      </View>
      <ScrollView>
        <NutritionalInsightsItem
          title="Protein Goal Achieved"
          description="You've met your protein goal 6 out of 7 days this week."
          icon="checkmark-circle"
          color={Colors.background.green}
        />

        <NutritionalInsightsItem
          title="Sodium Intake"
          description="Your sodium intake is 15% above recommended levels."
          icon="alert-circle"
          color={Colors.background.orange}
        />

        <NutritionalInsightsItem
          title="Hydration"
          description="Average water intake: 1.8L/day (Goal: 2.5L)"
          icon="water"
          color={Colors.background.darkBlue}
        />
      </ScrollView>
    </View>
  );
};

export default NutritionalInsights;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.main.bold,
    marginLeft: 8,
  },
});
