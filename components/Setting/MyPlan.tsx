import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { MyPlanIcon } from "../SvgIcons";
import CurrentPlanItem from "./CurrentPlanItem";
import InfoItem from "./InfoItem";
import { useRouter } from "expo-router";

const MyPlan = () => {
  const router = useRouter();

  const changePlan = () => {
    console.log("change plan located MyPlan.tsx");
    router.push("subscriptionPlan");
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
        <Text style={styles.headerText}>My Plan</Text>
      </View>
      <View style={styles.infoContainer}>
        <CurrentPlanItem
          plan="premium" // premium, pro, basic
        />
        <InfoItem
          backgroundColor={Colors.background.gray}
          title="Change Plan"
          onPress={changePlan}
        />
        <InfoItem
          backgroundColor={Colors.background.darkBlue}
          title="Renewal Date"
          value="2025-05-01"
          onPress={changeRenewalDate}
          marginTop={20}
        />
        <InfoItem
          backgroundColor={Colors.background.darkBlue}
          title="Diet Type"
          value="Balanced"
          onPress={changeDietType}
        />
        <InfoItem
          backgroundColor={Colors.background.darkBlue}
          title="Daily Calorie Goal"
          value="2000 cal"
          onPress={changeDietType}
        />
      </View>
    </View>
  );
};

export default MyPlan;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
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
