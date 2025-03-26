import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../constants/Colors";
import { EditIcon } from "./SvgIcons";
interface ScanResultMealItemProps {
  ingredient: string;
  amount: string;
}

const ScanResultMealItem = ({
  ingredient,
  amount,
}: ScanResultMealItemProps) => {
  const editIngredient = () => {
    console.log("edit ingredient on ScanResultMealItem.tsx");
  };
  return (
    <View style={styles.container}>
      <View style={styles.ingredientContainer}>
        <Text style={styles.ingredient}>{ingredient}</Text>
        <Text style={styles.amount}>{amount}</Text>
      </View>
      <TouchableOpacity onPress={editIngredient}>
        <EditIcon />
      </TouchableOpacity>
    </View>
  );
};

export default ScanResultMealItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    minHeight: 60,
    padding: 10,

    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ingredientContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 3,
    lineHeight: 16,
  },
  amount: {
    fontSize: 14,
    lineHeight: 14,
  },
});
