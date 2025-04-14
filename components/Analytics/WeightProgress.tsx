import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TextButton } from "../Analytics/WeightProgressButton";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(0, 188, 212, ${opacity})`,
  labelColor: () => "#000",
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: "#00BCD4",
  },
};

const dataByPeriod = {
  week: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{ data: [75, 74.8, 74.5, 74.3, 74.2, 74, 73.9] }],
  },
  month: {
    labels: ["W1", "W2", "W3", "W4"],
    datasets: [{ data: [75, 74.6, 74.2, 73.8] }],
  },
  year: {
    labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
    datasets: [{ data: [80, 77, 75, 73, 72, 71] }],
  },
};

const WeightProgress = () => {
  const [selectedItem, setSelectedItem] = useState<"week" | "month" | "year">("week");

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        {["week", "month", "year"].map((period) => (
          <TextButton
            key={period}
            title={period.charAt(0).toUpperCase() + period.slice(1)}
            onPress={() => setSelectedItem(period as "week" | "month" | "year")}
            isSelected={selectedItem === period}
            borderRadius={16}
          />
        ))}
      </View>

      <LineChart
        data={dataByPeriod[selectedItem]}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

export default WeightProgress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  chart: {
    borderRadius: 16,
  },
});
