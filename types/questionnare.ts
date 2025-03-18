export interface Answer {
  questionTitle: string;
  answer: string;
  clicked: boolean;
  unit?: string;
  itemIndex?: string;
}

export interface Section {
  sectionIndex: number;
  selectedOptionId: string;
  answer: Answer[];
}

export interface Questionnaire {
  sections: Section[];
}

export interface QuestionnaireState {
  questionnaire: Questionnaire;
}

export const initialQuestionnaireState: QuestionnaireState = {
  questionnaire: {
    sections: [
      // Initialize with your sections structure here
      // For example:
      {
        sectionIndex: 0,
        selectedOptionId: "",
        answer: [],
      },
    ],
  },
};
