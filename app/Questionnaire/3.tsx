// app/questionnaire/3.tsx
import { Screen } from "../../components/Screen";
import { Colors } from "../../constants/Colors";
import { QuestionnaireContent } from "../../components/Questionnaire/QuestionnaireContent";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function QuestionnaireScreen3() {
  const screenNumber = 3;
  const section = useSelector(
    (state: RootState) =>
      state.Questionnaire.questionnaire.sections[screenNumber - 1]
  );

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
}
