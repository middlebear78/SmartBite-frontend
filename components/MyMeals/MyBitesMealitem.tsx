import { View, Text, Image, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import MacroItem from "./MacroItem";

interface MyBitesMealitemProps {
  mealTitle: string;
  carbs: string;
  fats: string;
  proteins: string;
  image: string;
  mealCalories: string;
  mealType: string;
}

const MyBitesMealitem = ({
  mealType,
  mealTitle,
  carbs,
  fats,
  proteins,
  image,
  mealCalories,
}: MyBitesMealitemProps) => {
  return (
    <View style={styles.mealItem}>
      <View style={styles.imageContainer}>
        <Image
          source={image || require("../../assets/noMealImage.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.mealDetails}>
        <Text style={styles.mealType}>{mealType}</Text>
        <Text style={styles.mealTitle}>{mealTitle}</Text>
        <View style={styles.macroContainer}>
          <MacroItem
            title="Carbs"
            value={carbs}
            backgroundColor={Colors.background.lightBlue}
          />
          <MacroItem
            title="Fats"
            value={fats}
            backgroundColor={Colors.background.lightOrange}
          />
          <MacroItem
            title="Proteins"
            value={proteins}
            backgroundColor={Colors.background.lightGreen}
          />
        </View>
        <Text style={styles.mealCalories}>meal cal {mealCalories}</Text>
      </View>
    </View>
  );
};

export default MyBitesMealitem;

const styles = StyleSheet.create({
  mealItem: {
    margin: 10,
    borderRadius: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    height: 180,
  },
  imageContainer: {
    width: "35%",
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  mealDetails: { padding: 20, width: "65%" },

  mealCalories: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.text.secondary,
    fontWeight: "bold",
  },
  macroContainer: {
    flexDirection: "row",
    gap: 20,
    marginTop: 10,
  },
  mealType: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  mealTitle: {
    fontSize: 14,
  },
});
