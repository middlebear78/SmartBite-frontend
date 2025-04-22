// components/Questionnaire/GenderAndAge.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import TextButton from "../TextButton";
import NumberPickerHorizontal from "../NumberPickerHorizontal";
import { Section } from "../../types/questionnaire";

interface GenderAndAgeProps {
  question: Section["question"];
  answer: Section["answer"];
  sectionIndex: number;
  handleSelectOption: (
    value: string,
    selectedOptionId: string,
    sectionIndex: number,
    questionTitle: string
  ) => void;
}

const GenderAndAge: React.FC<GenderAndAgeProps> = ({
  question,
  answer,
  sectionIndex,
  handleSelectOption,
}) => {
  const [name, setName] = useState("");

  const handleNameChange = (text: string) => {
    setName(text);
    handleSelectOption(text, "name", sectionIndex, "name");
  };

  const genderData = question.options.map((option) => {
    return (
      <TextButton
        key={option.id}
        isSelected={answer.some(
          (ans) => ans.answer === option.title && ans.questionTitle === "gender"
        )}
        title={option.title}
        onPress={() =>
          handleSelectOption(
            option.title,
            option.id.toString(),
            sectionIndex,
            "gender"
          )
        }
      />
    );
  });

  return (
    <View style={styles.genderAndAgeContainer}>
      <Text style={{ fontSize: 14, fontWeight: "500", marginBottom: 10 }}>
        We’d love to know your name!
      </Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "transparent",
          borderWidth: 1,
          width: "80%",
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor: "white",
          borderRadius: 5,
          marginBottom: 40,
        }}
        placeholder="Your Name"
        onChangeText={handleNameChange}
        value={name}
      />
      <Text style={{ fontSize: 14, fontWeight: "500", marginBottom: 10 }}>
        Gender
      </Text>
      <View style={styles.genderContainer}>{genderData}</View>
      <Text style={{ fontSize: 14, fontWeight: "500", marginTop: 50 }}>
        Age
      </Text>
      <View style={styles.ageContainer}>
        <NumberPickerHorizontal
          currentNumber={parseInt(
            answer.find((ans) => ans.questionTitle === "age")?.answer || "18",
            10
          )}
          updateNumber={(number) =>
            handleSelectOption(
              number.toString(),
              number.toString(),
              sectionIndex,
              "age"
            )
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  genderAndAgeContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  ageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
});

export default GenderAndAge;
