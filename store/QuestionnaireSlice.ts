import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Section, initialQuestionnaireState } from "../types/questionnare";

const questionnaireSlice = createSlice({
  name: "Questionnaire",
  initialState: initialQuestionnaireState,
  reducers: {
    updateHeightUnit: (
      state,
      action: PayloadAction<{
        unit: string;
        sectionIndex: number;
        updateOnlyClicked?: boolean;
      }>
    ) => {
      const { unit, sectionIndex, updateOnlyClicked } = action.payload;
      if (updateOnlyClicked) {
        const section = state.questionnaire.sections[sectionIndex - 1];
        section.answer.find((a) => a.questionTitle === "height")!.clicked =
          true;
        section.answer.find((a) => a.questionTitle === "weight")!.clicked =
          true;
        return;
      }
      const section = state.questionnaire.sections[sectionIndex - 1];
      section.answer.find((a) => a.questionTitle === "height")!.unit = unit;
      section.answer.find((a) => a.questionTitle === "height")!.clicked = true;
    },
    updateWeightUnit: (
      state,
      action: PayloadAction<{
        unit: string;
        sectionIndex: number;
      }>
    ) => {
      const { unit, sectionIndex } = action.payload;
      const section = state.questionnaire.sections[sectionIndex - 1];
      section.answer.find((a) => a.questionTitle === "weight")!.unit = unit;
      section.answer.find((a) => a.questionTitle === "weight")!.clicked = true;
    },
    updateAnswer: (
      state,
      action: PayloadAction<{
        answer: string;
        selectedOptionId: string;
        sectionIndex: number;
        questionTitle: string;
        valueString?: string;
      }>
    ) => {
      const {
        questionTitle,
        answer,
        selectedOptionId,
        sectionIndex,
        valueString,
      } = action.payload;
      const section = state.questionnaire.sections[sectionIndex];

      const existingAnswerIndex = section.answer.findIndex(
        (a) => a.questionTitle === questionTitle
      );
      if (existingAnswerIndex !== -1) {
        if (valueString) {
          section.answer[existingAnswerIndex].answer = valueString;
          section.answer[existingAnswerIndex].itemIndex = answer;
          section.answer[existingAnswerIndex].clicked = true;
        } else {
          section.answer[existingAnswerIndex].answer = answer;
          section.answer[existingAnswerIndex].clicked = true;
        }
      } else {
        // Push new answer if no match found
        section.answer.push({ questionTitle, answer, clicked: true });
      }
      section.selectedOptionId = selectedOptionId;
    },
  },
});

export const { updateAnswer, updateHeightUnit, updateWeightUnit } =
  questionnaireSlice.actions;
export default questionnaireSlice.reducer;
