// components/Gradient.tsx
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/Colors";

// Define gradient colors in constants
const gradientColors = {
  primary: "#52E1FF", // Adjust to match your original gradient primary color
  secondary: "#26CDFF", // Adjust to match your original gradient secondary color
};

interface GradientProps {
  isSelected: boolean;
  children: React.ReactNode;
  style: any;
  nonSelectedColor?: string;
}

const Gradient = ({
  isSelected,
  children,
  style,
  nonSelectedColor = Colors.light.background,
}: GradientProps) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={
        isSelected
          ? [gradientColors.primary, gradientColors.secondary]
          : [nonSelectedColor, nonSelectedColor]
      }
      style={style}
    >
      {children}
    </LinearGradient>
  );
};

export default Gradient;
