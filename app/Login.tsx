// app/login.tsx
import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import LoginButtons from "../components/LoginButtons";
import { RootState } from "../store";
import {
  getGoogleUserInfo,
  appleSignIn,
  checkAppleAuthAvailable,
  clearUserData,
  getStoredUser,
  UserInfo,
} from "../services/LoginServices";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const [userInfo, setUserInfo] = React.useState<UserInfo>(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
    androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
    // redirectUri: "https://auth.expo.io/@uri123/smart-bite",
    scopes: ["profile", "email"],
  });

  const [isAppleAuthAvailable, setIsAppleAuthAvailable] =
    React.useState<boolean>(false);
  const Questionnaire = useSelector((state: RootState) => state.Questionnaire);

  React.useEffect(() => {
    const questionnaireData = Questionnaire.questionnaire.sections
      .map((section) =>
        section.answer.map((answer) => ({
          questionTitle: answer.questionTitle,
          answer: answer.answer,
        }))
      )
      .flat();
    console.log("Current Questionnaire Data:", questionnaireData);
  }, []);

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  React.useEffect(() => {
    initializeAppleAuth();
  }, []);

  React.useEffect(() => {
    if (request) {
      console.log("Auto-generated redirect URI:", request.redirectUri);
    }
  }, [request]);

  const initializeAppleAuth = async () => {
    const isAvailable = await checkAppleAuthAvailable();
    setIsAppleAuthAvailable(isAvailable);
  };

  const handleSignInWithGoogle = async () => {
    //  Comment out or remove this line to bypass the stored user check
    // const storedUser = await getStoredUser();

    // Remove the storedUser conditional check, always attempt sign-in

    // if (!storedUser) {
    if (response?.type === "success" && response.authentication?.accessToken) {
      const userData = await getGoogleUserInfo(
        response.authentication.accessToken
      );
      if (userData) {
        setUserInfo(userData);
        router.replace("/questionnaire/7");
      }
    }

    //   } else {
    //     setUserInfo(storedUser);
    //     console.log("Existing Google user info:", storedUser);
    //     router.replace("home");
    //   }
    // };
  };
  const handleAppleSignIn = async () => {
    const userData = await appleSignIn();
    if (userData) {
      setUserInfo(userData);
      router.replace("/questionnaire/7");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Create your account to{"\n"} save your progress
      </Text>

      <View style={styles.buttonsContainer}>
        {Platform.OS === "ios" && isAppleAuthAvailable && (
          <LoginButtons onPress={handleAppleSignIn} type="apple" />
        )}
        <LoginButtons
          onPress={() => {
            console.log("Redirect URI:", request?.redirectUri);
            promptAsync();
          }}
          type="google"
        />
      </View>

      {/* {__DEV__ && <Button title="Clear User Data" onPress={clearUserData} />} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  title: {
    paddingTop: 60,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30,
  },
  buttonsContainer: {
    width: "100%",
    gap: 20,
  },
});
