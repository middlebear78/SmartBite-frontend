// components/NumberPickerHorizontal.tsx
import { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import HorizontalPicker from "@vseslav/react-native-horizontal-picker/src";

interface NumberPickerHorizontalProps {
  updateNumber: (number: number, valueString?: string) => void;
  currentNumber: number;
  unit?: string;
  singleItemWidth?: number;
  itemIndex?: number; //if itemIndex is provided, the picker will be scrolled to the itemIndex
}

const NumberPickerHorizontal = ({
  updateNumber,
  currentNumber,
  unit,
  singleItemWidth,
  itemIndex,
}: NumberPickerHorizontalProps) => {
  const [selectedNumber, setSelectedNumber] = useState(currentNumber);

  let Items = Array.from(Array(100).keys()).slice(16);
  if (unit === "ft") {
    Items = Array.from({ length: 48 }, (_, i) => 4 + i / 12); // 4 to 8 ft in steps of inches
  }
  if (unit === "cm") {
    Items = Array.from(Array(230).keys()).slice(140);
  }
  if (unit === "kg") {
    Items = Array.from(Array(170).keys()).slice(35);
  }
  if (unit === "lb") {
    Items = Array.from(Array(350).keys()).slice(77);
  }

  const rednerItem = (item: number, index: number, unit: string) => {
    let displayText = (
      <Text
        style={[
          styles.itemText,
          selectedNumber === item && styles.selectedItem,
        ]}
      >
        {item}
      </Text>
    );
    if (unit === "ft") {
      const feet = Math.floor(item);
      const inches = Math.round((item - feet) * 12);
      if (inches === 0) {
        displayText = (
          <Text
            style={[
              styles.itemText,
              selectedNumber === item && styles.selectedItem,
              { position: "relative", left: -7 },
            ]}
          >
            {feet}′
          </Text>
        );
      } else {
        displayText = (
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              position: "relative",
              left: -7,
            }}
          >
            <Text
              style={[
                styles.itemText,
                selectedNumber === item && styles.selectedItem,
              ]}
            >
              {feet}′
            </Text>
            <Text style={{ fontSize: 20, position: "relative", top: -5 }}>
              {inches}″
            </Text>
          </View>
        );
      }
    }
    return (
      <View key={index} style={[styles.item, { width: singleItemWidth || 80 }]}>
        {displayText}
      </View>
    );
  };

  const onValueChange = (index: number) => {
    let number = Items[index];
    let valueString = "";
    if (unit === "ft") {
      const feet = Math.floor(number);
      const inches = Math.round((number - feet) * 12); // Convert the number to a string representation in feet and inches
      valueString = `${feet}ft ${inches}in`;
    } else {
      // Ensure the number is returned as a float with two decimal places
      number = parseFloat(number.toFixed(2));
      valueString = `${number}`;
    }

    if (selectedNumber !== number) {
      setSelectedNumber(number);
      updateNumber(number, valueString);
    }
  };

  return (
    <View style={styles.pickerContainer}>
      <HorizontalPicker
        defaultIndex={
          itemIndex ? Items.indexOf(itemIndex) : Items.indexOf(currentNumber)
        }
        animatedScrollToDefaultIndex
        data={Items}
        renderItem={(item: number, index: number) =>
          rednerItem(item, index, unit || "")
        }
        itemWidth={singleItemWidth || 80}
        onChange={onValueChange}
      />
      <View style={styles.greenArrowContainer}>
        <Image
          source={require("../assets/images/greenArrow.png")}
          style={styles.greenArrow}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: "column",
    height: 60,
  },
  greenArrowContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  greenArrow: {
    position: "relative",
    top: 0,
    width: 10,
    height: 10,
  },
  item: {
    justifyContent: "flex-end",
    height: 50,
    alignItems: "center",
  },
  selectedItem: {
    fontSize: 40,
    fontFamily: "NunitoBold",
  },
  itemText: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Nunito",
  },
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default NumberPickerHorizontal;
