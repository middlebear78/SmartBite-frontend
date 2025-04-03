import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { DietGoalsIcon } from "../SvgIcons";
import InfoItem from "./InfoItem";
import { LinearGradient } from "expo-linear-gradient";
const DietGoals = () => {
  const changePlan = () => {
    console.log("change plan located MyPlan.tsx");
  };

  const changeTargetWeight = () => {
    console.log("change target weight located DietGoals.tsx");
  };

  const changeWeeklyGoal = () => {
    console.log("change weekly goal located DietGoals.tsx");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ position: "relative", top: -4 }}>
          <DietGoalsIcon />
        </View>
        <Text style={styles.headerText}>Diet Goals</Text>
      </View>
      <LinearGradient
        colors={[
          Colors.background.gradient.secondary,
          Colors.background.gradient.primary,
        ]}
        style={styles.infoContainer}
      >
        <InfoItem
          backgroundColor={Colors.white}
          textColor={Colors.primary}
          title="Target Weight"
          value="65 kg"
          onPress={changeTargetWeight}
        />
        <InfoItem
          backgroundColor={Colors.white}
          textColor={Colors.primary}
          title="Weekly Goal"
          value="-0.5 kg"
          onPress={changeWeeklyGoal}
        />
      </LinearGradient>
    </View>
  );
};

export default DietGoals;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  headerText: {
    fontFamily: "Nunito",
    fontSize: 14,
    fontWeight: "bold",
  },
  infoContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 25,
    padding: 30,
    shadowColor: Colors.shadow.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 5,
    gap: 15,
  },
});
