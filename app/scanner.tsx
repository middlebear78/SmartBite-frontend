// app/scanner.tsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  StatusBar,
  Platform,
  UIManager,
  InteractionManager,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import * as FileSystem from "expo-file-system";
import { useRouter, Stack } from "expo-router";
import { useFocusEffect } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RootState } from "../store";
import { setShowFlashIcon, setIsFlashOn } from "../store/CameraSlice";
import {
  Focus,
  ImageIcon,
  CaptureIcon,
  InfoIcon,
  FlashIconOn,
  FlashIconOff,
} from "../components/Camera/CameraIcons";
import { Screen } from "../components/Screen";
import { Colors } from "../constants/Colors";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Scanner() {
  console.log("Component rendered", new Date().toISOString());
  const device = useCameraDevice("back");
  const cameraRef = useRef<Camera>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(true);
  const router = useRouter();

  const showFlashIcon = useSelector(
    (state: RootState) => state.Camera.showFlashIcon,
    shallowEqual
  );
  const isFlashOn = useSelector(
    (state: RootState) => state.Camera.isFlashOn,
    shallowEqual
  );
  const dispatch = useDispatch();

  // Toggle flash function
  const toggleFlash = useCallback(() => {
    dispatch(setIsFlashOn(!isFlashOn));
  }, [dispatch, isFlashOn]);

  // Request camera permissions on mount
  useEffect(() => {
    const requestPermissions = async () => {
      const permission = await Camera.requestCameraPermission();
      console.log("Camera permission status:", permission);
    };

    requestPermissions();
  }, []);

  // Handle component mount/unmount
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Configure Redux state once navigation transitions are done
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (isMounted) {
        dispatch(setShowFlashIcon(true));
        dispatch(setIsFlashOn(false));
      }
    });
  }, [dispatch, isMounted]);

  // Manage screen focus state
  useFocusEffect(
    useCallback(() => {
      setIsVisible(true);

      const transitionTask = InteractionManager.runAfterInteractions(() => {
        if (isMounted) {
          setIsVisible(true);
        }
      });

      return () => {
        transitionTask.cancel();
        if (isMounted) {
          setIsVisible(false);
        }
      };
    }, [isMounted])
  );

  // Capture image from the camera
  const handleCapture = useCallback(async () => {
    console.log("Capture button pressed");

    try {
      if (!cameraRef.current) {
        console.error("Camera ref is null");
        return;
      }

      console.log("Taking photo...");
      const photo = await cameraRef.current.takePhoto({
        qualityPrioritization: "speed",
        skipMetadata: true,
        flash: isFlashOn ? "on" : "off",
      });

      console.log("Photo taken, path:", photo.path);

      // Fix: Get proper filename without any path issues
      const fileName = photo.path.split("/").pop();

      // Check if fileName is valid
      if (!fileName) {
        throw new Error("Invalid file name");
      }

      const destinationPath = FileSystem.documentDirectory + fileName;

      console.log(`Moving photo from ${photo.path} to ${destinationPath}`);

      // Option 1: Copy the file instead of moving it
      await FileSystem.copyAsync({
        from: photo.path,
        to: destinationPath,
      });

      console.log("Photo successfully copied to:", destinationPath);

      // Navigate to the next screen
      router.push({
        pathname: "image-approve",
        params: { imagePath: destinationPath },
      });
    } catch (error) {
      console.error("Camera capture error:", error);
      Alert.alert(
        "Camera Error",
        "There was a problem taking the photo. Please try again."
      );
    }
  }, [router, isFlashOn]);

  // Select an image from the gallery
  const handleSelectImage = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (result.canceled) return;

      if (result.assets.length) {
        router.push({
          pathname: "image-approve",
          params: { imagePath: result.assets[0].uri },
        });
      }
    } catch (error) {
      console.error("Error selecting image: ", error);
    }
  }, [router]);

  const handleInfo = useCallback(() => {
    console.log("info");
  }, []);

  const handleCameraReady = useCallback(() => {
    console.log("Camera is ready!");
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitle: "Back",
          title: "",
          headerTintColor: Colors.text.light,
          headerStyle: { backgroundColor: Colors.background.secondary },
          headerRight: () => (
            <TouchableOpacity
              style={{ opacity: showFlashIcon ? 1 : 0, marginRight: 15 }}
              onPress={showFlashIcon ? toggleFlash : undefined}
            >
              {isFlashOn ? <FlashIconOn /> : <FlashIconOff />}
            </TouchableOpacity>
          ),
        }}
      />

      <Screen title="Scan QR Code" backgroundColor="black">
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="black" />

          {device ? (
            <Camera
              ref={cameraRef}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              photo={true}
              torch={isFlashOn ? "on" : "off"}
              onInitialized={handleCameraReady}
            />
          ) : (
            <View
              style={[StyleSheet.absoluteFill, { backgroundColor: "black" }]}
            />
          )}

          <View>
            <Focus />
          </View>

          <View style={styles.BottomContainer}>
            <Pressable onPress={handleSelectImage}>
              <View style={styles.LeftContainer}>
                <ImageIcon />
              </View>
            </Pressable>

            <Pressable onPress={handleCapture}>
              <View style={styles.CenterContainer}>
                <CaptureIcon />
              </View>
            </Pressable>

            <Pressable onPress={handleInfo}>
              <View style={styles.RightContainer}>
                <InfoIcon />
                <Text style={styles.infoText}>How to scan</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    width: "100%", // Stabilize layout
    height: "100%", // Stabilize layout
  },
  // focusContainer: {
  //   position: "absolute",
  //   opacity: 0.6,
  //   top: "50%",
  //   left: "50%",
  //   transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
  // },
  BottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "85%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 20,
    marginBottom: 30,
  },
  LeftContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(70, 70, 70)",
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  CenterContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  RightContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(70, 70, 70)",
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  infoText: {
    marginTop: 4,
    color: "white",
    fontSize: 10,
    lineHeight: 9,
    fontWeight: "500",
    textAlign: "center",
  },
});
