// services/loginServices/LoginServices.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppleAuthentication from "expo-apple-authentication";

export interface GoogleUser {
  type: "Google";
  [key: string]: any;
}

export interface AppleUser {
  type: "apple";
  id: string;
  email: string | null;
  fullName: AppleAuthentication.AppleAuthenticationFullName | null;
  identityToken: string | null;
  authorizationCode: string | null;
  realUserStatus: AppleAuthentication.AppleAuthenticationUserDetectionStatus;
}

export type UserInfo = GoogleUser | AppleUser | null;

export const getGoogleUserInfo = async (token: string): Promise<UserInfo> => {
  if (!token) return null;
  try {
    const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userData = await response.json();

    console.log("Google Login Success - User Info:", {
      email: userData.email,
      name: userData.name,
      id: userData.id,
      picture: userData.picture,
    });

    await AsyncStorage.setItem("@user", JSON.stringify(userData));
    return userData;
  } catch (error) {
    console.error("Google Authentication Error:", error);
    return null;
  }
};

export const appleSignIn = async (): Promise<UserInfo> => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    const user: AppleUser = {
      id: credential.user,
      email: credential.email,
      fullName: credential.fullName,
      identityToken: credential.identityToken,
      authorizationCode: credential.authorizationCode,
      realUserStatus: credential.realUserStatus,
      type: "apple",
    };

    await AsyncStorage.setItem("@user", JSON.stringify(user));

    console.log("Apple Login Success - User Info:", {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    });

    return user;
  } catch (error: any) {
    if (error.code === "ERR_REQUEST_CANCELED") {
      console.log("Apple Sign In: User cancelled");
    } else {
      console.error("Apple Sign In Error:", error);
    }
    return null;
  }
};

export const checkAppleAuthAvailable = async (): Promise<boolean> => {
  return await AppleAuthentication.isAvailableAsync();
};

export const clearUserData = async (): Promise<void> => {
  await AsyncStorage.removeItem("@user");
};

export const getStoredUser = async (): Promise<UserInfo> => {
  const user = await AsyncStorage.getItem("@user");
  return user ? JSON.parse(user) : null;
};
