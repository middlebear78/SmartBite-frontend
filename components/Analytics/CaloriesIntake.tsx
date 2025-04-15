import { View, Text, StyleSheet } from "react-native";

const CaloriesIntake = () => {
  return (
    <View style={styles.container}>
      <Text>Calories Intake container</Text>
    </View>
  );
};

export default CaloriesIntake;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
