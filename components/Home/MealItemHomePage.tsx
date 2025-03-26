import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../constants/Colors";

interface MealHomePageProps {
  mealType: string;
  date: string;
  calories: number;
  macros: string;
  image: string;
  mealId: string;
}

const MealHomePage = ({
  mealType,
  date,
  calories,
  macros,
  image,
  mealId,
}: MealHomePageProps) => {
  const goToMealPage = () => {
    console.log("go to meal page", mealId);
  };

  return (
    <TouchableOpacity onPress={goToMealPage} style={styles.shadowContainer}>
      <View style={styles.container}>
        <ImageBackground
          source={image || require("../../assets/noMealImage.jpg")}
          style={styles.image}
        ></ImageBackground>
        <View style={styles.dateContainer}>
          <Text style={styles.mealTypeAndDate}>
            {mealType} {date}
          </Text>
          <Text style={styles.calories}>{calories} cal</Text>
          <Text style={styles.macros}>{macros}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MealHomePage;

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
  container: {
    flex: 1,
    height: 90,
    backgroundColor: Colors.white,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "black",
  },
  dateContainer: {
    height: "100%",
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: Colors.text.secondary,
  },
  image: {
    width: 100,
    height: "100%",
    borderRadius: 20,
  },
  mealTypeAndDate: {
    fontSize: 12,
    color: Colors.text.primary,
  },
  calories: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text.primary,
  },
  macros: {
    marginTop: 3,
    fontSize: 12,
    color: Colors.text.primary,
  },
});
