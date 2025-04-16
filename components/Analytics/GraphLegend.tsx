import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { fonts } from "@/constants/fonts";

interface GraphLegendProps {
  title: string;
  value: string;
  color: string;
}

const GraphLegend = ({ title, value, color }: GraphLegendProps) => {
  return (
    <View style={styles.legendDescriptionItem}>
      <View style={[styles.circle, { backgroundColor: color }]}></View>
      <Text style={styles.legendDescriptionText}>
        {title}: {value}
      </Text>
    </View>
  );
};

export default GraphLegend;

const styles = StyleSheet.create({
  legendDescriptionItem: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  legendDescriptionText: {
    fontSize: 14,
    fontFamily: fonts.main.regular,
    color: Colors.text.placeholder,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
