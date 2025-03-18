// components/Questionnaire/StepIndicator.tsx
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import StepIndicatorItem from "./StepIndicatorItem";

interface StepIndicatorProps {
  sectionIndex: number;
}

const StepIndicator = ({ sectionIndex }: StepIndicatorProps) => {
  const { questionnaire } = useSelector(
    (state: RootState) => state.Questionnaire
  );
  return (
    <View style={styles.container}>
      <View style={styles.line}>
        {questionnaire.sections.map((section, index) => (
          <StepIndicatorItem
            key={index}
            step={index + 1}
            active={sectionIndex === index + 1}
          />
        ))}
      </View>
    </View>
  );
};
export default StepIndicator;

const styles = StyleSheet.create({
  container: {
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  line: {
    height: 2,
    width: "80%",
    backgroundColor: Colors.secondary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
