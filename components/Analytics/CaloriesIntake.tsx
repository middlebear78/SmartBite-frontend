import { View, ScrollView, StyleSheet } from "react-native";
import CaloriesIntakeItem from "./CaloriesIntakeItem";
const CaloriesIntake = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <CaloriesIntakeItem
          date="Mar 25, 2025"
          description="After morning run"
          calories="69.2kg"
        />
        <CaloriesIntakeItem
          date="Mar 25, 2025"
          description="After morning run"
          calories="69.2kg"
        />
        <CaloriesIntakeItem
          date="Mar 25, 2025"
          description="After morning run"
          calories="69.2kg"
        />
        <CaloriesIntakeItem
          date="Mar 25, 2025"
          description="After morning run"
          calories="69.2kg"
        />
        <CaloriesIntakeItem
          date="Mar 25, 2025"
          description="After morning run"
          calories="69.2kg"
        />
        <CaloriesIntakeItem
          date="Mar 25, 2025"
          description="After morning run"
          calories="69.2kg"
        />
      </ScrollView>
    </View>
  );
};

export default CaloriesIntake;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",
    padding: 16,
  },
});
