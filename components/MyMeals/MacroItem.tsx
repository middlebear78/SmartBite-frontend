import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Colors";
import { CarbsIcon, FatsIcon, ProteinsIcon } from "../Home/MacroIcons";

type MacroItemProps = {
  title: string;
  value: string;
  backgroundColor: string;
};

const MacroItem = ({ title, value, backgroundColor }: MacroItemProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor }]}>
        {title === "Carbs" && <CarbsIcon size={22} />}
        {title === "Fats" && <FatsIcon size={22} />}
        {title === "Proteins" && <ProteinsIcon size={22} />}
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

export default MacroItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    borderRadius: 100,
    padding: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  valueContainer: {
    marginTop: 3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 13,
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
