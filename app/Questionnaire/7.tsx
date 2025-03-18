// app/questionnaire/7.tsx
import { View, Image, StyleSheet } from "react-native";
import { Screen } from "../../components/Screen";
import { colors } from "../../theme/colors";
import { QuestionnaireContent } from "../../components/Questionnaire/QuestionnaireContent";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function QuestionnaireScreen7() {
  const screenNumber = 7;
  const section = useSelector(
    (state: RootState) =>
      state.Questionnaire.questionnaire.sections[screenNumber - 1]
  );

  return (
    <Screen title={section.title} backgroundColor={colors.background.secondary}>
      <Image
        source={require("../../assets/images/holdingGlass.png")}
        style={styles.image}
      />
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

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    top: "-25%",
    left: 0,
    backgroundColor: "blue",
  },
});
