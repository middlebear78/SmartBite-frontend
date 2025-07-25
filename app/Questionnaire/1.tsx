// app/questionnaire/1.tsx
import React from "react";
import { Screen } from "../../components/Screen";
import { Colors } from "../../constants/Colors";
import { QuestionnaireContent } from "../../components/Questionnaire/QuestionnaireContent";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const QuestionnaireScreen1 = () => {
  const screenNumber = 1;

  const section = useSelector(
    (state: RootState) =>
      state.Questionnaire.questionnaire.sections[screenNumber - 1]
  );
  console.log("Section options:", JSON.stringify(section.question.options, null, 2));
  console.log("Current section data:", section);

  if (!section) {
    return (
      <Screen
        title="Loading..."
        backgroundColor={Colors.background.secondary}
        showBack={true}
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

export default QuestionnaireScreen1;
