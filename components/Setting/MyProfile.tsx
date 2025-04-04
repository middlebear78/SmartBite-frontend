import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/Colors";
import { MyProfileIcon } from "../SvgIcons";
import MyProfileItem from "./MyProfileItem";

const MyProfile = () => {
  const editAge = () => {
    console.log("editAge located in components/Setting/MyProfile.tsx");
  };
  const editHeight = () => {
    console.log("editHeight located in components/Setting/MyProfile.tsx");
  };
  const editWeight = () => {
    console.log("editWeight located in components/Setting/MyProfile.tsx");
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.backgroundContainer}>
        <MyProfileIcon />
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.headerContainer}>
          <MyProfileIcon />
          <Text style={styles.headerText}>My Profile</Text>
        </View>
        <View style={styles.itemsContainer}>
          <MyProfileItem type="age" number="28" onPress={editAge} />
          <MyProfileItem
            type="height"
            number="170"
            unit="cm"
            onPress={editHeight}
          />
          <MyProfileItem
            type="weight"
            number="60"
            unit="kg"
            onPress={editWeight}
          />
        </View>
      </View>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  backgroundContainer: {
    width: "100%",
    height: Dimensions.get("window").height * 0.2,
    backgroundColor: Colors.background.darkBlue,
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  dataContainer: {
    padding: 20,
    width: "80%",
    backgroundColor: Colors.background.lightBlue,
    height: Dimensions.get("window").height * 0.21,
    borderRadius: 25,
    marginTop: 30,
    shadowColor: Colors.shadow.primary,
    shadowOffset: { width: 0, height: 11 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  headerText: {
    fontFamily: "Nunito",
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.text.secondary,
  },
  itemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 14,
  },
});
