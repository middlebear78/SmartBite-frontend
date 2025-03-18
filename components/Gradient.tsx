import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/Colors"; // ✅ Ensure correct import

interface GradientProps {
  isSelected: boolean;
  children: React.ReactNode;
  style?: any;
  nonSelectedColor?: string;
}

const Gradient: React.FC<GradientProps> = ({
  isSelected,
  children,
  style = {},
  nonSelectedColor = Colors.background.lightGray, // ✅ Default color to avoid `undefined`
}) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }} // ✅ Start at the top
      end={{ x: 1, y: 0 }} // ✅ End at the bottom
      colors={
        isSelected
          ? [
              Colors.background.gradient.primary,
              Colors.background.gradient.secondary,
            ]
          : [nonSelectedColor, nonSelectedColor]
      }
      style={[style]} // ✅ Ensure style is applied properly
    >
      {children}
    </LinearGradient>
  );
};

export default Gradient;
