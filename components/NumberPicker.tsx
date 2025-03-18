// components/NumberPicker.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RulerPicker } from "react-native-ruler-picker";

interface NumberPickerProps {
  min?: number;
  max?: number;
  step?: number;
  initialValue?: number;
  onValueChange?: (value: number) => void;
  onValueChangeEnd?: (value: number) => void;
  unit?: string;
  fractionDigits?: number;
}

const NumberPicker: React.FC<NumberPickerProps> = ({
  min = 0,
  max = 240,
  step = 1,
  initialValue = 0,
  onValueChange,
  onValueChangeEnd,
  unit = "",
  fractionDigits = 0,
}) => {
  const handleChange = (number: number) => {
    console.log(number);
    if (onValueChange) {
      onValueChange(number);
    }
  };

  const handleChangeEnd = (number: number) => {
    console.log(number);
    if (onValueChangeEnd) {
      onValueChangeEnd(number);
    }
  };

  return (
    <View style={styles.container}>
      <Text>NumberPicker</Text>
      <RulerPicker
        min={min}
        max={max}
        step={step}
        fractionDigits={fractionDigits}
        initialValue={initialValue}
        onValueChange={handleChange}
        onValueChangeEnd={handleChangeEnd}
        unit={unit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NumberPicker;
