import { Screen } from "../../components/Screen";
import { Colors } from "../../constants/Colors";
import { QuestionnaireContent } from "./QuestionnaireContent";
import { Section } from "../../types/questionnaire";

export const QuestionnaireScreen = ({
  sectionIndex,
  topIcon,
  title,
  subtitle,
  question,
  answer,
  selectedOptionId,
}: Section) => {
  return (
    <Screen
      title="Welcome"
      nextScreen="Login"
      showBack={false}
      backgroundColor={Colors.background.secondary}
    >
      <QuestionnaireContent
        sectionIndex={sectionIndex}
        topIcon={topIcon}
        title={title}
        subtitle={subtitle}
        question={question}
        answer={answer}
        selectedOptionId={selectedOptionId}
      />
    </Screen>
  );
};
