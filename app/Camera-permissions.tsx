// app/camera-permissions.tsx
import * as React from "react";
import { Camera } from "react-native-vision-camera";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { Screen } from "../components/Screen";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function CameraPermissionsScreen() {
  const router = useRouter();
  const [cameraPermission, setCameraPermission] =
    React.useState("not-determined");
  const [microphonePermission, setMicrophonePermission] =
    React.useState("not-determined");

  React.useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const cameraPermissionStatus = await Camera.getCameraPermissionStatus();
    const microphonePermissionStatus =
      await Camera.getMicrophonePermissionStatus();

    setCameraPermission(cameraPermissionStatus);
    setMicrophonePermission(microphonePermissionStatus);
  };

  const requestPermissions = async () => {
    try {
      const newCameraPermission = await Camera.requestCameraPermission();
      const newMicrophonePermission =
        await Camera.requestMicrophonePermission();

      setCameraPermission(newCameraPermission);
      setMicrophonePermission(newMicrophonePermission);

      if (newCameraPermission === "granted") {
        // We'll handle navigation to camera screen later
        Alert.alert("Success", "Camera permission granted!");
        // You could navigate to the camera screen with:
        // router.push("/camera");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to request permissions");
    }
  };

  return (
    <Screen title="Camera Permission Screen" showBack={false}>
      <View style={styles.container}>
        <Text>Camera Permission: {cameraPermission}</Text>
        <Text>Microphone Permission: {microphonePermission}</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermissions}>
          <Text style={styles.buttonText}>Request Permissions</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
