// components/Questionnaire/StepIndicatorItem.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { CheckMarkIcon } from "../SvgIcons";
interface StepIndicatorItemProps {
  active: boolean;
  step: number;
}

const StepIndicatorItem = ({ active, step }: StepIndicatorItemProps) => {
  const haveAnswered = useSelector((state: RootState) =>
    state.Questionnaire.questionnaire.sections[step - 1].answer.some(
      (a) => a.clicked
    )
  );

  let stepItem = <View style={styles.stepIndicatorItem}></View>;

  if (haveAnswered) {
    stepItem = (
      <View style={styles.haveAnsweredStepIndicatorItem}>
        <CheckMarkIcon />
      </View>
    );
  }

  if (active) {
    stepItem = <View style={styles.activeStepIndicatorItem}></View>;
  }

  return stepItem;
};

export default StepIndicatorItem;

const styles = StyleSheet.create({
  stepIndicatorItem: {
    height: 18,
    width: 18,
    borderRadius: 50,
    backgroundColor: Colors.background.lightBlue,
  },
  activeStepIndicatorItem: {
    height: 28,
    width: 28,
    borderRadius: 50,
    backgroundColor: Colors.secondary,
  },
  haveAnsweredStepIndicatorItem: {
    height: 28,
    width: 28,
    borderRadius: 50,
    backgroundColor: Colors.success,
    alignItems: "center",
    justifyContent: "center",
  },
});
