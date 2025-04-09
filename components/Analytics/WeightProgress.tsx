import { View, Text, StyleSheet } from "react-native";
const WeightProgress = () => {
  return (
    <View style={styles.container}>
      <Text>Weight Progress</Text>
    </View>
  );
};

export default WeightProgress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
