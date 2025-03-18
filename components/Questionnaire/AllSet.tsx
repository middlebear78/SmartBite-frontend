// components/Questionnaire/AllSet.tsx
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import { Colors } from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const AllSet = () => {
  const onPress = () => {
    console.log(
      "take snap shot - located in components/Questionnaire/AllSet.tsx"
    );
  };

  return (
    <View style={styles.takeSnapShotContainer}>
      <TouchableOpacity
        style={styles.takeSnapShotButton}
        onPress={() => onPress()}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }} // Start at the top
          end={{ x: 1, y: 0 }} // End at the bottom
          colors={[
            Colors.background.gradient.primary,
            Colors.background.gradient.secondary,
          ]}
          style={[
            {
              borderRadius: 20,
              width: 100,
              height: 100,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Image
            source={require("../../assets/images/takeSnapShot.png")}
            resizeMode="contain"
            style={[
              {
                width: 70,
                height: 70,
              },
            ]}
          />
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.takeSnapShotText}>
        Start tracking your meals{"\n"}by snapping a photo
      </Text>
    </View>
  );
};

export default AllSet;

const styles = StyleSheet.create({
  takeSnapShotContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  takeSnapShotButton: {
    shadowColor: Colors.shadow.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    width: 100,
    height: 100,
    marginTop: 60,
  },
  takeSnapShotText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
  },
});
