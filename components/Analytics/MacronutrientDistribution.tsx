import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Colors } from "../../constants/Colors";
import GraphLegend from "./GraphLegend";

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(0, 174, 239, ${opacity})`,
  labelColor: () => "#000",
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: Colors.background.darkBlue,
  },
  propsForBackgroundLines: {
    strokeWidth: 0,
  },
  barPercentage: 1.3,
};

const macroData = {
  labels: ["Protein", "Carbs", "Fat"],
  data: [30, 50, 20],
};

const MacronutrientDistribution = () => {
  return (
    <View style={styles.container}>
      <BarChart
        data={{
          labels: macroData.labels,
          datasets: [
            {
              data: macroData.data,
            },
          ],
        }}
        width={Dimensions.get("window").width * 0.9}
        height={260}
        chartConfig={{
          ...chartConfig,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        yAxisLabel=""
        yAxisSuffix="%"
        fromZero
      />
      <View style={styles.legendDescription}>
        <GraphLegend
          title="Protein"
          value="30%"
          color={Colors.background.darkBlue}
        />
        <GraphLegend
          title="Carbs"
          value="50%"
          color={Colors.background.orange}
        />
        <GraphLegend title="Fat" value="20%" color={Colors.background.green} />
      </View>
    </View>
  );
};

export default MacronutrientDistribution;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 20,
  },

  macroLegend: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingTop: 12,
  },
  legendDescription: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    gap: 20,
  },
});
