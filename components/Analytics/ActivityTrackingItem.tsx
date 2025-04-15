import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/Colors";

interface ActivityTrackingItemProps {
  label: string;
  value: string;
  progress: number;
}

const ActivityTrackingItem = ({
  label,
  value,
  progress,
}: ActivityTrackingItemProps) => {
  return (
    <View style={styles.progressRow}>
      <Text style={styles.progressLabel}>{label}</Text>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${progress}%`,
              backgroundColor: Colors.background.darkBlue,
            },
          ]}
        />
      </View>
      <Text style={styles.progressValue}>{value}</Text>
    </View>
  );
};

export default ActivityTrackingItem;

const styles = StyleSheet.create({
  progressRow: {
    marginBottom: 12,
    width: Dimensions.get("window").width * 0.8,
  },
  progressLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#E5E5EA",
    borderRadius: 4,
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressValue: {
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "right",
  },
});
