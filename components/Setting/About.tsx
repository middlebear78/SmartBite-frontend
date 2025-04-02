import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { MyPlanIcon } from "../SvgIcons";
import CurrentPlanItem from "./CurrentPlanItem";
import InfoItem from "./InfoItem";

const About = () => {



  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <MyPlanIcon />
        <Text style={styles.headerText}>Abour</Text>
      </View>
      <View style={styles.infoContainer}>
        <InfoItem
          backgroundColor={Colors.background.darkBlue}
          title="Version"
          value="1.0.0"
          disabled={true}
        />
      </View>
    </View>
  );
};

export default About;

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
