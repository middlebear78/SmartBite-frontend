import React from "react";
import { Screen } from "../../components/Screen";
import { Colors } from "../../constants/Colors";
import { QuestionnaireContent } from "../../components/Questionnaire/QuestionnaireContent";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Section } from "../../types/questionnare";

const QuestionnaireScreen2: React.FC = () => {
  const screenNumber = 2;

  // ✅ Explicitly type the Redux state
  const section: Section | undefined = useSelector(
    (state: RootState) =>
      state.Questionnaire?.questionnaire?.sections[screenNumber - 1]
  );

  // ✅ Prevent errors if section is undefined
  if (!section) {
    return (
      <Screen
        title="Loading..."
        backgroundColor={Colors.background.secondary}
      />
    );
  }

  return (
    <Screen title={section.title} backgroundColor={Colors.background.secondary}>
      <QuestionnaireContent
        sectionIndex={screenNumber}
        topIcon={section.topIcon}
        title={section.title}
        subtitle={section.subtitle}
        question={section.question}
        answer={section.answer}
        selectedOptionId={section.selectedOptionId}
      />
    </Screen>
  );
};

export default QuestionnaireScreen2;
