import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Screen } from "../../components/Screen";
import { Colors } from "../../constants/Colors";
import { QuestionnaireContent } from "../../components/Questionnaire/QuestionnaireContent";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Section } from "../../types/questionnare";

const QuestionnaireScreen7: React.FC = () => {
  const screenNumber = 7;

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
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/holdingGlass.png")}
          style={styles.image}
        />
      </View>
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

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  image: {
    width: "80%",
    height: 200,
    resizeMode: "contain",
  },
});

export default QuestionnaireScreen7;
