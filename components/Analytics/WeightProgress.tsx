import { View, Text, StyleSheet } from "react-native";
import WeightProgressButton from "../Analytics/WeightProgressButton";
import { useState } from "react";

const WeightProgress = () => {
    const [selectedItem, setSelectedItem] = useState("week");

    const handleSelectItem = (item: string) => {
        setSelectedItem(item);
    };

    return (
        <View style={styles.container}>
            <Text>Weight Progress</Text>
            <WeightProgressButton title="Week" onPress={() => handleSelectItem("week")} isSelected={selectedItem === "week"} />
            <WeightProgressButton title="Month" onPress={() => handleSelectItem("month")} isSelected={selectedItem === "month"} />
            <WeightProgressButton title="Year" onPress={() => handleSelectItem("year")} isSelected={selectedItem === "year"} />
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
