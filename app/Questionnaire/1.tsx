// app/questionnaire/1.tsx
import { Screen } from "../../components/Screen";
import { colors } from "../../theme/colors";
import { QuestionnaireContent } from "../../components/Questionnaire/QuestionnaireContent";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function QuestionnaireScreen1() {
  const screenNumber = 1;

  const section = useSelector(
    (state: RootState) =>
      state.Questionnaire.questionnaire.sections[screenNumber - 1]
  );

  return (
    <Screen title={section.title} backgroundColor={colors.background.secondary}>
      <QuestionnaireContent
        sectionIndex={screenNumber}
        topIcon={section.topIcon}
        title={section.title}
        subtitle={section.subtitle}
        question={section.question} // all the options of the question
        answer={section.answer} // the answer of the question (text)
        selectedOptionId={section.selectedOptionId} // the id of the selected option (number)
      />
    </Screen>
  );
}
