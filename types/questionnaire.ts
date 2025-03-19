// types/questionnare.ts
export interface QuestionOption {
  id: number;
  title: string;
  subtitle?: string;
  icon?: string;
}

export interface Question {
  type: string;
  options: QuestionOption[];
}

export interface Answer {
  questionTitle: string;
  answer: string;
  unit?: string;
  itemIndex?: string;
  clicked?: boolean;
}

export interface Section {
  sectionIndex: number;
  topIcon: string;
  title: string;
  subtitle: string;
  question: Question;
  answer: Answer[];
  selectedOptionId: string;
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
      {
        sectionIndex: 1,
        topIcon: "destination",
        answer: [],
        selectedOptionId: "",
        title: "Your Wellness Journey",
        subtitle: "What is your main goal?",
        question: {
          type: "iconAndText",
          options: [
            {
              id: 1,
              title: "Lose Weight",
              icon: "iconMinus",
            },
            {
              id: 2,
              title: "Gain Weight",
              icon: "iconPlus",
            },
            {
              id: 3,
              title: "Maintain weight",
              icon: "iconEqual",
            },
          ],
        },
      },
      {
        sectionIndex: 2,
        topIcon: "morning",
        answer: [],
        selectedOptionId: "",
        title: "Your Daily Routine",
        subtitle: "How active are you?",
        question: {
          type: "iconAndText",
          options: [
            {
              id: 1,
              title: "Low Activity",
              subtitle: "little or no exercise",
              icon: "lowActivity",
            },
            {
              id: 2,
              title: "Moderate Activity",
              subtitle: "light exercise weekly",
              icon: "moderateActivity",
            },
            {
              id: 3,
              title: "High Activity",
              subtitle: "frequent intense exerciset",
              icon: "highActivity",
            },
          ],
        },
      },
      {
        sectionIndex: 3,
        topIcon: "influence",
        answer: [],
        selectedOptionId: "",
        title: "A Little About You",
        subtitle: "Tell us about yourself",
        question: {
          type: "genderAndAge",
          options: [
            {
              id: 1,
              title: "Male",
              icon: "male",
            },
            {
              id: 2,
              title: "Female",
              icon: "female",
            },
            {
              id: 3,
              title: "Other",
              icon: "other",
            },
          ],
        },
      },
      {
        sectionIndex: 4,
        topIcon: "height",
        answer: [
          {
            clicked: false,
            questionTitle: "height",
            answer: "180",
            unit: "cm",
            itemIndex: "",
          },
          {
            clicked: false,
            questionTitle: "weight",
            answer: "50",
            unit: "kg",
            itemIndex: "",
          },
        ],
        selectedOptionId: "",
        title: "Your Body Profile",
        subtitle: "What are your measurements?",
        question: {
          type: "bodyProfile",
          options: [],
        },
      },
      {
        sectionIndex: 5,
        topIcon: "nutrition",
        answer: [],
        selectedOptionId: "",
        title: "Your Preferences",
        subtitle: "Do you have any dietary preferences?",
        question: {
          type: "whiteButton",
          options: [
            {
              id: 1,
              title: "Vegetarian",
            },
            {
              id: 2,
              title: "Vegan",
            },
            {
              id: 3,
              title: "Ketogenic",
            },
            {
              id: 4,
              title: "Palo",
            },
            {
              id: 5,
              title: "Other",
            },
            {
              id: 6,
              title: "No preference",
            },
          ],
        },
      },
      {
        sectionIndex: 6,
        topIcon: "user",
        answer: [],
        selectedOptionId: "",
        title: "Join the Community",
        subtitle: "Sign up to start tracking!",
        question: {
          type: "register",
          options: [],
        },
      },
      {
        sectionIndex: 7,
        topIcon: "iconNutrition",
        answer: [],
        selectedOptionId: "",
        title: "You're All Set!",
        subtitle: "Ready to start your journey?",
        question: {
          type: "allSet",
          options: [],
        },
      },
    ],
  },
};
