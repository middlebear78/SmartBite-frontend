// app/howToUse.tsx
import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../constants/Colors";

const { width, height } = Dimensions.get("window");

// Instructions data for how to use the camera
const INSTRUCTIONS = [
  {
    id: 1,
    title: "Position your meal in frame",
    description: "Center your plate within the focus area for best results",
    image: require("../assets/howToUse/howto-step1.png"),
  },
  {
    id: 2,
    title: "Good lighting is important",
    description: "Use the flash icon if needed for better photo quality",
    image: require("../assets/howToUse/howto-step2.png"),
  },
  {
    id: 3,
    title: "Capture your meal",
    description: "Tap the large center button to take a photo",
    image: require("../assets/howToUse/howto-step3.png"),
  },
  {
    id: 4,
    title: "Review and confirm",
    description: "Check your photo and tap confirm to log your meal",
    image: require("../assets/howToUse/howto-step4.png"),
  },
  {
    id: 5,
    title: "Handling closed food items",
    description:
      "For sandwiches or packaged food,you can either open to show contents or add/edit items after logging",
    image: require("../assets/howToUse/howto-step5.png"),
  },
];

export default function HowToUse() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideAnimation = useRef(new Animated.Value(height)).current;

  // Slide-up animation on component mount
  useEffect(() => {
    Animated.spring(slideAnimation, {
      toValue: 0,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);

  // Handle going back to scanner screen
  const handleBack = () => {
    Animated.timing(slideAnimation, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      router.back();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <Animated.View
        style={[styles.modal, { transform: [{ translateY: slideAnimation }] }]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>How to Use</Text>
          <View style={styles.placeholderForAlignment} />
        </View>

        <Animated.FlatList
          data={INSTRUCTIONS}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <View style={styles.imageContainer}>
                <Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          )}
        />

        {/* Pagination dots */}
        <View style={styles.pagination}>
          {INSTRUCTIONS.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 20, 8],
              extrapolate: "clamp",
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.4, 1, 0.4],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={i.toString()}
                style={[styles.dot, { width: dotWidth, opacity }]}
              />
            );
          })}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  modal: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 20 : 10,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.light || "#FFFFFF",
    textAlign: "center",
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: Colors.text.light || "#FFFFFF",
    fontSize: 16,
  },
  placeholderForAlignment: {
    width: 50, // To balance the header layout
  },
  slide: {
    width,
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.text.light || "#FFFFFF",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.text.light || "#FFFFFF",
    marginHorizontal: 4,
  },
});
