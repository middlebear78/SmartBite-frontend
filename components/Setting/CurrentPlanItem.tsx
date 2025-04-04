import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

interface CurrentPlanItemProps {
  plan: "premium" | "pro" | "basic";
}

const CurrentPlanItem = ({ plan }: CurrentPlanItemProps) => {
  return (
    <LinearGradient
      colors={Colors.plans[plan] as [string, string]}
      style={styles.container}
    >
      <View style={styles.planContainer}>
        <Text style={styles.title}>Current Plan</Text>
        <Text style={styles.planText}>{plan.toUpperCase()}</Text>
      </View>
    </LinearGradient>
  );
};

export default CurrentPlanItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    backgroundColor: Colors.background.darkBlue,
    borderRadius: 25,
  },
  planContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: -5,
    color: Colors.white,
    fontFamily: "Nunito",
  },
  planText: {
    marginTop: 0,
    fontSize: 30,
    color: Colors.white,
    fontFamily: "NunitoExtraBold",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
