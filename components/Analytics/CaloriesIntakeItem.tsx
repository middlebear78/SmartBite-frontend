import { View, Text, StyleSheet } from "react-native";
import { fonts } from "../../constants/fonts";
import { Colors } from "../../constants/Colors";

interface CaloriesIntakeItemProps {
  date: string;
  description: string;
  calories: string;
}

const CaloriesIntakeItem = ({ date, description, calories }: CaloriesIntakeItemProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View>
        <Text style={styles.calories}>{calories}</Text>
      </View>
    </View>
  );
};

export default CaloriesIntakeItem;

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: Colors.background.lightGray,
    borderBottomWidth: 1,
  },
  date: {
    fontFamily: fonts.main.regular,
    fontSize: 14,
    color: Colors.text.primary,
  },
  description: {
    fontFamily: fonts.main.regular,
    fontSize: 13,
    color: Colors.text.placeholder,
  },
  caloriesContainer: {
    fontFamily: fonts.main.regular,
    color: Colors.text.placeholder,
  },
  calories: {
    fontFamily: fonts.main.bold,
    fontSize: 17,
    color: Colors.text.secondary,
  },
});
