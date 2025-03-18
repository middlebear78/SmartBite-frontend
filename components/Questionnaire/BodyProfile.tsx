// components/Questionnaire/BodyProfile.tsx
import { View, Text, StyleSheet } from "react-native";
import { Section } from "../../types/questionnaire";
import TextButton from "../TextButton";
import { useDispatch } from "react-redux";
import {
  updateHeightUnit,
  updateWeightUnit,
} from "../../store/questionnaireSlice";
import NumberPickerHorizontal from "../NumberPickerHorizontal";

interface BodyProfileProps {
  question: Section["question"];
  answer: Section["answer"];
  sectionIndex: number;
  handleSelectOption: (
    value: string,
    selectedOptionId: string,
    sectionIndex: number,
    questionTitle: string,
    valueString?: string
  ) => void;
}

const BodyProfile = ({
  question,
  answer,
  sectionIndex,
  handleSelectOption,
}: BodyProfileProps) => {
  const dispatch = useDispatch();

  const selectHeightUnit = (unit: string) => {
    dispatch(
      updateHeightUnit({
        unit,
        sectionIndex,
      })
    );
  };

  const selectWeightUnit = (unit: string) => {
    dispatch(
      updateWeightUnit({
        unit,
        sectionIndex,
      })
    );
  };

  const selectedHeightUnit = answer.find(
    (ans) => ans.questionTitle === "height"
  )?.unit;
  const selectedWeightUnit = answer.find(
    (ans) => ans.questionTitle === "weight"
  )?.unit;

  const handleUpdateHeight = (number: number, value?: string) => {
    handleSelectOption(
      number.toString(),
      number.toString(),
      sectionIndex,
      "height",
      value
    );
  };

  const handleUpdateWeight = (number: number, value?: string) => {
    handleSelectOption(
      number.toString(),
      number.toString(),
      sectionIndex,
      "weight",
      value
    );
  };

  return (
    <View style={styles.bodyProfileContainer}>
      <View style={styles.selectHeightUnitContainer}>
        <Text style={{ fontSize: 14, fontWeight: "500" }}>Height</Text>
        <View style={styles.heightUnitButtons}>
          <TextButton
            title="cm"
            onPress={() => selectHeightUnit("cm")}
            isSelected={selectedHeightUnit === "cm"}
          />
          <TextButton
            title="ft"
            onPress={() => selectHeightUnit("ft")}
            isSelected={selectedHeightUnit === "ft"}
          />
        </View>
      </View>
      <View style={styles.NumberPickerHorizontalContainer}>
        <NumberPickerHorizontal
          singleItemWidth={selectedHeightUnit === "cm" ? 100 : 120}
          unit={answer.find((ans) => ans.questionTitle === "height")?.unit}
          currentNumber={parseInt(
            answer.find((ans) => ans.questionTitle === "height")?.answer ||
              "180",
            10
          )}
          updateNumber={(number, inches) => handleUpdateHeight(number, inches)}
        />
      </View>

      <View style={styles.selectWeightUnitContainer}>
        <Text style={{ fontSize: 14, fontWeight: "500" }}>Weight</Text>
        <View style={styles.weightUnitButtons}>
          <TextButton
            title="kg"
            onPress={() => selectWeightUnit("kg")}
            isSelected={selectedWeightUnit === "kg"}
          />
          <TextButton
            title="lb"
            onPress={() => selectWeightUnit("lb")}
            isSelected={selectedWeightUnit === "lb"}
          />
        </View>
      </View>
      <View style={styles.NumberPickerHorizontalContainer}>
        <NumberPickerHorizontal
          singleItemWidth={100}
          unit={answer.find((ans) => ans.questionTitle === "weight")?.unit}
          currentNumber={parseInt(
            answer.find((ans) => ans.questionTitle === "weight")?.answer ||
              "50",
            10
          )}
          updateNumber={(number, inches) => handleUpdateWeight(number, inches)}
        />
      </View>
    </View>
  );
};

export default BodyProfile;

const styles = StyleSheet.create({
  bodyProfileContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  NumberPickerHorizontalContainer: {
    width: "100%",
    height: 50,
  },
  selectHeightUnitContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 15,
  },
  heightUnitButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },
  selectWeightUnitContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 65,
    marginBottom: 15,
  },
  weightUnitButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },
});
