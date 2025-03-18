// app/image-approve.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Screen } from "../components/Screen";
import { colors } from "../theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import { AnalyzeIcon } from "../components/Camera/CameraIcons";
import { uploadImageForAnalysis } from "../services/imagesAnalyzeService";
import * as FileSystem from "expo-file-system";

export default function ImageApprove() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const imagePath = params.imagePath as string;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageDescription, setImageDescription] = useState("");

  const updateImageDescription = (text: string) => {
    setImageDescription(text);
  };

  const handleApprove = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("🖼️ Original Image Path:", imagePath);
      console.log("Image Description:", imageDescription);

      // ✅ Generate a unique filename (using timestamp)
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}_${imagePath.split("/").pop()}`;
      const newPath = `${FileSystem.documentDirectory}${fileName}`;

      // ✅ Check if the file already exists before copying
      const fileExists = await FileSystem.getInfoAsync(newPath);
      if (!fileExists.exists) {
        await FileSystem.copyAsync({
          from: imagePath,
          to: newPath,
        });
        console.log("✅ Image saved to:", newPath);
      } else {
        console.log("⚠️ File already exists, using existing path:", newPath);
      }

      // ✅ Send the image for analysis
      const analysisResult = await uploadImageForAnalysis(newPath);
      console.log("✅ Analysis Result:", analysisResult);

      // ✅ Navigate to NutritionInfo with the correct path
      router.push({
        pathname: "/nutrition-info",
        params: {
          analysisResult: JSON.stringify(analysisResult),
          imagePath: newPath,
        },
      });
    } catch (error) {
      console.error("❌ Error processing image:", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen backgroundColor="black">
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: imagePath }}
          style={styles.backgroundImage}
        >
          <TextInput
            style={styles.input}
            placeholder="Better analyze with image description"
            placeholderTextColor={colors.text.placeholder}
            value={imageDescription}
            onChangeText={updateImageDescription}
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.buttonsContainer}>
            <Pressable
              onPress={() => router.push("/scanner")}
              style={[
                styles.button,
                { backgroundColor: colors.background.lightGray },
              ]}
            >
              <Text style={[styles.buttonText, { color: "black" }]}>
                Retake
              </Text>
            </Pressable>

            {loading ? (
              <View style={styles.button}>
                <LinearGradient
                  style={styles.LinearGradient}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  colors={[
                    colors.background.gradient.primary,
                    colors.background.gradient.secondary,
                  ]}
                >
                  <ActivityIndicator size="small" color="white" />
                </LinearGradient>
              </View>
            ) : (
              <Pressable style={styles.button} onPress={handleApprove}>
                <LinearGradient
                  style={styles.LinearGradient}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  colors={[
                    colors.background.gradient.primary,
                    colors.background.gradient.secondary,
                  ]}
                >
                  <Text style={styles.buttonText}>Analyze</Text>
                  <AnalyzeIcon />
                </LinearGradient>
              </Pressable>
            )}
          </View>
        </ImageBackground>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    position: "absolute",
    bottom: 90,
    padding: 10,
    color: "black",
    width: "80%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 80,
    fontSize: 12,
  },
  errorText: {
    position: "absolute",
    bottom: 130,
    color: "red",
    fontSize: 14,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 5,
    borderRadius: 5,
  },
  buttonsContainer: {
    gap: 20,
    position: "absolute",
    bottom: 10,
    width: "100%",
    height: 60,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 130,
    height: 40,
    borderRadius: 80,
  },
  LinearGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 40,
    borderRadius: 80,
    gap: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
