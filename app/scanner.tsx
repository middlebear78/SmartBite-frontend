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
} from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import * as FileSystem from "expo-file-system"; // ✅ Replaced RNFS
import { useRouter } from "expo-router";
import { useFocusEffect } from "expo-router"; // ✅ Fixed navigation issue
import * as ImagePicker from "expo-image-picker"; // ✅ Replaced react-native-image-picker
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RootState } from "../store";
import { setShowFlashIcon, setIsFlashOn } from "../store/CameraSlice";
import {
  Focus,
  ImageIcon,
  CaptureIcon,
  InfoIcon,
} from "../components/Camera/CameraIcons";
import { Screen } from "../components/Screen";

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
  const [cameraReady, setCameraReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
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
    if (cameraRef.current && cameraReady) {
      try {
        const photo = await cameraRef.current.takePhoto({
          qualityPrioritization: "speed",
          skipMetadata: true,
        });

        const fileName = photo.path.split("/").pop();
        const destinationPath = `${FileSystem.documentDirectory}${fileName}`;

        // ✅ Replaced RNFS.moveFile with FileSystem.moveAsync
        await FileSystem.moveAsync({
          from: photo.path,
          to: destinationPath,
        });

        router.push({
          pathname: "/image-approve",
          params: { imagePath: destinationPath },
        });
      } catch (error) {
        console.error("Error capturing or saving photo:", error);
      }
    } else {
      router.back();
    }
  }, [cameraReady, router]);

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
          pathname: "/image-approve",
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
    setCameraReady(true);
  }, []);

  // Fix the jump: Delay render until isVisible and isMounted are true
  if (!isVisible || !isMounted || !device) {
    return null; // Avoid placeholder to prevent layout shift
  }

  return (
    <Screen title="Scan QR Code" backgroundColor="black">
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="black" />

        {device ? (
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isVisible}
            photo
            torch={isFlashOn ? "on" : "off"} // Add flash support
            onInitialized={handleCameraReady}
          />
        ) : (
          <View
            style={[StyleSheet.absoluteFill, { backgroundColor: "black" }]}
          />
        )}

        <View style={styles.focusContainer}>
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
  focusContainer: {
    position: "absolute",
    opacity: 0.6,
    top: "50%", // Center properly
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }], // Adjust for Focus size
  },
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
