import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { PreferencesIcon } from "../SvgIcons";
import InfoItem from "./InfoItem";
import { LinearGradient } from "expo-linear-gradient";

const Preferences = () => {
  const changeUnits = () => {
    console.log("change units located Preferences.tsx");
  };

  const changeLanguage = () => {
    console.log("change language located Preferences.tsx");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <PreferencesIcon />
        <Text style={styles.headerText}>Preferences</Text>
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
          title="Units"
          value="Metric"
          onPress={changeUnits}
        />
        <InfoItem
          backgroundColor={Colors.white}
          textColor={Colors.primary}
          title="Language"
          value="English"
          onPress={changeLanguage}
        />
      </LinearGradient>
    </View>
  );
};

export default Preferences;

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
