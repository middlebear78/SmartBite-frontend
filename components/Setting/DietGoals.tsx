import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { MyPlanIcon } from "../SvgIcons";
import CurrentPlanItem from "./CurrentPlanItem";
import InfoItem from "./InfoItem";

const DietGoals = () => {

  const changePlan = () => {
    console.log("change plan located MyPlan.tsx");
  };

  const changeRenewalDate = () => {
    console.log("change renewal date located MyPlan.tsx");
  };

  const changeDietType = () => {
    console.log("change diet type located MyPlan.tsx");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <MyPlanIcon />
        <Text style={styles.headerText}>Diet Goals</Text>
      </View>
      <View style={styles.infoContainer}>
       
        <InfoItem
          backgroundColor={Colors.background.darkBlue}
          title="Renewal Date"
          value="2025-05-01"
          onPress={changeRenewalDate}
        />
        <InfoItem
          backgroundColor={Colors.background.darkBlue}
          title="Diet Type"
          value="Balanced"
          onPress={changeDietType}
        />
      </View>
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
