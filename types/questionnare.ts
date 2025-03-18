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
  topIcon?: string;
  title: string;
  subtitle?: string;
  question: any; // Update to the actual type if available
}

export interface Questionnaire {
  sections: Section[];
}

export interface QuestionnaireState {
  questionnaire: Questionnaire;
}

// Initial state structure for Redux
export const initialQuestionnaireState: QuestionnaireState = {
  questionnaire: {
    sections: [
      {
        sectionIndex: 0,
        selectedOptionId: "",
        answer: [],
        title: "Default Title",
        question: [],
      },
    ],
  },
};
