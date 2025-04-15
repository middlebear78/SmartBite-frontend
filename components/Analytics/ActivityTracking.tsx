import { View, Text, StyleSheet, Dimensions } from "react-native";
import { ActivityTrackingIcon } from "../SvgIcons";
import { fonts } from "../../constants/fonts";
import ActivityTrackingItem from "./ActivityTrackingItem";

const ActivityTracking = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ActivityTrackingIcon />
        <Text style={styles.title}>Activity Tracking</Text>
      </View>
      <ActivityTrackingItem
        label="Daily Steps"
        value="7,531 / 10,000"
        progress={75}
      />

      <ActivityTrackingItem
        label="Exercise Minutes"
        value="30 / 50 min"
        progress={60}
      />

      <ActivityTrackingItem
        label="Active Calories"
        value="225 / 500 kcal"
        progress={45}
      />
    </View>
  );
};

export default ActivityTracking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: Dimensions.get("window").width,
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
