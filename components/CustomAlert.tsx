// components/CustomAlert.tsx
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { Colors } from "../constants/Colors";
// Import from Expo Vector Icons instead
import { MaterialIcons } from "@expo/vector-icons";

type AlertType = "success" | "error" | "info";

interface CustomAlertProps {
  visible: boolean;
  message: string;
  type?: AlertType;
  duration?: number;
  onHide?: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  message,
  type = "success",
  duration = 2000,
  onHide,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]).start();

      // Auto hide after duration
      const hideTimer = setTimeout(() => {
        hideAlert();
      }, duration);

      return () => clearTimeout(hideTimer);
    }
  }, [visible]);

  const hideAlert = (): void => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
      Animated.timing(translateY, {
        toValue: 20,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
    ]).start(() => {
      if (onHide) onHide();
    });
  };

  if (!visible) return null;

  interface IconData {
    icon: JSX.Element;
    backgroundColor: string;
    borderColor: string;
  }

  const getIconAndColor = (): IconData => {
    switch (type) {
      case "success":
        return {
          icon: (
            <MaterialIcons
              name="check-circle"
              size={24}
              color={Colors.success}
            />
          ),
          backgroundColor: Colors.background.lightGreen,
          borderColor: Colors.success,
        };
      case "error":
        return {
          icon: <MaterialIcons name="error" size={24} color={Colors.error} />,
          backgroundColor: Colors.background.lightRed || "#FFDAD6",
          borderColor: Colors.error,
        };
      case "info":
        return {
          icon: <MaterialIcons name="info" size={24} color={Colors.primary} />,
          backgroundColor: Colors.background.lightBlue,
          borderColor: Colors.primary,
        };
      default:
        return {
          icon: (
            <MaterialIcons
              name="check-circle"
              size={24}
              color={Colors.success}
            />
          ),
          backgroundColor: Colors.background.lightGreen,
          borderColor: Colors.success,
        };
    }
  };

  const { icon, backgroundColor, borderColor } = getIconAndColor();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [{ translateY }],
          backgroundColor,
          borderColor,
        },
      ]}
    >
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 120, // Position from bottom instead of top
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 9999,
  },
  iconContainer: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text.primary,
  },
});

export default CustomAlert;
