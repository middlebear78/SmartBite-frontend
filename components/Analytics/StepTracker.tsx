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
import { ProgressChart, BarChart } from "react-native-chart-kit";

interface ScaleProps {
  steps: number;
  goal: number;
}

const StepTracker = ({ steps, goal }: ScaleProps) => {
  const data = {
    data: [0.45],
    colors: ["rgb(0, 174, 239)"],
  };
  const chartConfig = {
    backgroundGradientFrom: "transparent",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "transparent",
    backgroundGradientToOpacity: 0,
    color: () => `rgb(0, 174, 239)`,
    useShadowColorFromDataset: false,
    barPercentage: 0.5,
    decimalPlaces: 0,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 12,
    },
    propsForBackgroundLines: {
      strokeWidth: 0,
    },
  };
  const barChartConfig = {
    backgroundGradientFrom: "transparent",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "transparent",
    backgroundGradientToOpacity: 0,
    color: () => `rgba(255, 255, 255, 1)`,
    useShadowColorFromDataset: false,
    barPercentage: 0.9,
    decimalPlaces: 0,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 12,
    },
    propsForBackgroundLines: {
      strokeWidth: 0,
    },
    propsForDots: {
      r: "0",
    },
    // formatYLabel: () => "",
  };
  const screenWidth = Dimensions.get("window").width;
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Step Tracker</Text>
      <View style={styles.graphContainer}>
        <ProgressChart
          data={data}
          width={screenWidth}
          height={220}
          strokeWidth={20}
          radius={90}
          chartConfig={chartConfig}
          hideLegend={true}
          withCustomBarColorFromData={true}
        />
      </View>
      <View style={styles.numbersContainer}>
        <Text style={[styles.steps]}>{steps} </Text>
        <Text style={[styles.goal]}> Goal {goal}</Text>
      </View>
      <View style={styles.weeklyGraphContainer}>
        <Text style={styles.title}>weekly step history</Text>
        <View style={styles.barChartContainer}>
          <BarChart
            withHorizontalLabels={false}
            withVerticalLabels={true}
            data={{
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              datasets: [
                {
                  data: [7373, 7374, 7373, 7375, 7373, 7374, 7373],
                  colors: [
                    (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
                    (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
                    (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
                    (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
                    (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
                    (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
                    (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
                  ],
                },
              ],
            }}
            width={screenWidth}
            height={70}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={barChartConfig}
            showBarTops={false}
            flatColor={true}
            withCustomBarColorFromData
            verticalLabelRotation={0}
            showValuesOnTopOfBars={false}
            fromZero={true}
            style={{
              opacity: 0.6,
              left: -35,
              // marginLeft: 30,
            }}
          />
          <View style={styles.daysContainer}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <Text key={day} style={styles.dayLabel}>
                {day}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default StepTracker;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    height: Dimensions.get("window").width,
    padding: 30,
    zIndex: 1,
  },
  scale: {
    width: Dimensions.get("window").width * 0.6,
    height: Dimensions.get("window").width * 0.6,
    alignItems: "center",
    justifyContent: "space-between",
    top: Dimensions.get("window").width * 0.1,
    padding: 30,
    zIndex: 1,
  },
  title: {
    fontSize: 16,
    color: Colors.primary,
    fontFamily: fonts.main.extraBold,
  },
  numbersContainer: {
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: 140,
  },
  glow: {
    shadowColor: "#FFFCE2",
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 12,
    shadowOffset: { width: 0, height: 2 },
  },
  steps: {
    fontSize: Dimensions.get("window").width * 0.1,
    lineHeight: Dimensions.get("window").width * 0.1,
    color: Colors.primary,
    fontFamily: fonts.orbitron.extraBold,
    marginTop: 0,
    padding: 0,
    textAlign: "right",
  },
  graphContainer: {
    alignItems: "center",
  },
  goal: {
    color: Colors.primary,
    fontFamily: fonts.main.bold,
    position: "relative",
    bottom: 4,
    fontSize: 14,
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
  weeklyGraphContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 0,
  },
  barChartContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    left: -5,
  },
  dayLabel: {
    color: "white",
    fontSize: 12,
    fontFamily: fonts.main.regular,
  },
});
