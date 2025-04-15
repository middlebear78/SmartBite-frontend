import React, { useEffect, useState } from "react";
import {
  I18nManager,
  Text,
  StyleSheet,
  Image,
  View,
  Dimensions,
} from "react-native";
import { Screen } from "../components/Screen";
import { Colors } from "../constants/Colors";
import commonStyles from "../styles/commonStyles";
import RoundButton from "../components/RoundButton";
import { useRouter } from "expo-router";
import { getStoredUser } from "../services/LoginServices";

export default function WelcomeScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // ----------------------------------------User check------------------------------------------
  useEffect(() => {
    // Check if user exists on component mount
    checkStoredUser();
  }, []);

  const checkStoredUser = async () => {
    const storedUser = await getStoredUser();
    if (storedUser) {
      // User exists, navigate to home
      router.replace("home"); // Or whatever your home route is
    } else {
      setIsLoading(false);
    }
    // If no user, stay on welcome screen
  };

  if (isLoading) {
    return null; // Or return a loading spinner if you prefer
  }
  // -------------------------------------------------------------------------------------------
  return (
    <Screen
      title="Welcome"
      showBack={false}
      backgroundColor={Colors.background.secondary}
    >
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={require("../assets/images/Nutrition-plan.gif")}
              style={styles.icon}
            />
          </View>
          <Text style={commonStyles.whiteTitle}>Snap it. Track it.</Text>
          <Text style={commonStyles.whiteText}>
            Stay on top of your nutrition.
          </Text>
        </View>
        <RoundButton
          color="white"
          nextScreen="/questionnaire/1"
          text="Get Started"
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/welcome-image.jpg")}
          style={styles.image}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    zIndex: 1,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
    color: Colors.white,
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    zIndex: 0,
  },
  image: {
    width: "100%",
    height: "80%",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  iconContainer: {
    height: 80,
    width: 80,
    top: 0,
    right: 0,
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 60,
  },
});
