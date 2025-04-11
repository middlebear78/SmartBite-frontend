import { View, Text, StyleSheet } from "react-native";
import { ActivityTrackingIcon } from "../SvgIcons";
import { Colors } from "../../constants/Colors";
import { fonts } from "../../constants/fonts";

const ActivityTracking = () => {
  return (
    <View style={styles.container}>
      <ActivityTrackingIcon />
      <Text style={styles.title}>Activity Tracking</Text>
    </View>
  );
};

export default ActivityTracking;

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
