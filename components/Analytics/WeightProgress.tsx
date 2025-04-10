import { View, StyleSheet, Dimensions } from "react-native";
import { TextButton } from "../Analytics/WeightProgressButton";
import { useState } from "react";

const WeightProgress = () => {
  const [selectedItem, setSelectedItem] = useState("week");

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TextButton
          title="Week"
          onPress={() => handleSelectItem("week")}
          isSelected={selectedItem === "week"}
          borderRadius={16}
        />
        <TextButton
          title="Month"
          onPress={() => handleSelectItem("month")}
          isSelected={selectedItem === "month"}
          borderRadius={16}
        />
        <TextButton
          title="Year"
          onPress={() => handleSelectItem("year")}
          isSelected={selectedItem === "year"}
          borderRadius={16}
        />
      </View>
    </View>
  );
};

export default WeightProgress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 13,
  },
});
