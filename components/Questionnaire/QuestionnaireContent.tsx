// components/Questionnaire/QuestionnaireContent.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import commonStyles from "../../styles/commonStyles";
import RoundButton from "../RoundButton";
import { QuestionnaireBottomSheet } from "../BottomSheet/QuestionnaireBottomSheet";
import { updateAnswer } from "../../store/QuestionnaireSlice";
import { useDispatch } from "react-redux";
import { Section } from "../../types/questionnaire";
import IconAndTextItem from "./iconAndTextItem";
import GenderAndAge from "./GenderAndAge";
import BodyProfile from "./BodyProfile";
import TextButton from "../TextButton";
import AllSet from "./AllSet";
import StepIndicator from "./StepIndicator";
import LoginScreen from "../../app/Login";

export const QuestionnaireContent = ({
  sectionIndex,
  topIcon,
  title,
  subtitle,
  question,
  answer,
  selectedOptionId,
}: Section) => {
  const dispatch = useDispatch();
  const [disabledButton, setDisabledButton] = useState(true);
  const [showNextButton, setShowNextButton] = useState(true);

  useEffect(() => {
    if (question.type === "register") {
      setShowNextButton(false);
    }

    if (question.type === "allSet") {
      setShowNextButton(false);
    }

    if (question.type === "bodyProfile") {
      const height = answer.find((ans) => ans.questionTitle === "height");
      const weight = answer.find((ans) => ans.questionTitle === "weight");
      if (height?.answer !== "" && weight?.answer !== "") {
        setDisabledButton(false);
      }
      return;
    }
    if (question.type === "genderAndAge") {
      const gender = answer.find((ans) => ans.questionTitle === "gender");
      const age = answer.find((ans) => ans.questionTitle === "age");
      if (gender && age) {
        setDisabledButton(false);
      }
      return;
    }
    if (answer.length > 0) {
      setDisabledButton(false);
    }
  }, [answer, sectionIndex]);

  const handleSelectOption = (
    value: string,
    selectedOptionId: string,
    sectionIndex: number,
    questionTitle: string,
    valueString?: string
  ) => {
    dispatch(
      updateAnswer({
        answer: value,
        selectedOptionId: selectedOptionId,
        sectionIndex: sectionIndex - 1,
        questionTitle: questionTitle,
        valueString: valueString,
      })
    );
  };

  let questionData = null;
  if (question.type === "register") {
    questionData = (
      <LoginScreen nextScreen={`/questionnaire/${sectionIndex + 1}`} />
    );
  }
  if (question.type === "iconAndText") {
    questionData = question.options.map((option) => {
      return (
        <IconAndTextItem
          key={option.id}
          selected={selectedOptionId === option.id.toString()}
          iconName={option.icon || ""}
          title={option.title}
          onPress={() =>
            handleSelectOption(
              option.title,
              option.id.toString(),
              sectionIndex,
              title
            )
          }
        />
      );
    });
  }

  if (question.type === "whiteButton") {
    const mapQuestionData = question.options.map((option) => {
      return (
        <TextButton
          paddingTop={10}
          paddingBottom={10}
          borderRadius={20}
          width={220}
          isSelected={selectedOptionId === option.id.toString()}
          key={option.id}
          title={option.title}
          onPress={() =>
            handleSelectOption(
              option.title,
              option.id.toString(),
              sectionIndex,
              title
            )
          }
        />
      );
    });
    questionData = (
      <View style={styles.scrollViewContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {mapQuestionData}
        </ScrollView>
      </View>
    );
  }

  if (question.type === "genderAndAge") {
    questionData = (
      <GenderAndAge
        question={question}
        answer={answer}
        sectionIndex={sectionIndex}
        handleSelectOption={handleSelectOption}
      />
    );
  }

  if (question.type === "bodyProfile") {
    questionData = (
      <BodyProfile
        question={question}
        answer={answer}
        sectionIndex={sectionIndex}
        handleSelectOption={handleSelectOption}
      />
    );
  }

  if (question.type === "allSet") {
    questionData = <AllSet />;
  }

  let topIconImage = null;
  if (topIcon === "destination") {
    topIconImage = require("../../assets/images/destination.gif");
  }
  if (topIcon === "morning") {
    topIconImage = require("../../assets/images/morning.gif");
  }
  if (topIcon === "influence") {
    topIconImage = require("../../assets/images/influence.gif");
  }
  if (topIcon === "height") {
    topIconImage = require("../../assets/images/height.gif");
  }
  if (topIcon === "nutrition") {
    topIconImage = require("../../assets/images/nutrition.gif");
  }
  if (topIcon === "user") {
    topIconImage = require("../../assets/images/user.gif");
  }

  return (
    <>
      <View style={styles.topContainer}>
        <StepIndicator sectionIndex={sectionIndex} />
        <View style={styles.iconContainer}>
          <Image source={topIconImage} style={styles.icon} />
        </View>
        <Text style={commonStyles.whiteTitle}>{title}</Text>
        <Text style={commonStyles.whiteText}>{subtitle} </Text>
      </View>

      <QuestionnaireBottomSheet>
        <View style={styles.bottomSheetContent}>
          <View style={[styles.optionsContainer, { gap: 20 }]}>
            {questionData}
          </View>
          {showNextButton && (
            <View style={styles.buttonContainer}>
              <RoundButton
                color="blue"
                disabled={disabledButton}
                nextScreen={`/questionnaire/${sectionIndex + 1}`}
                text="next"
              />
            </View>
          )}

          {question.type === "allSet" && (
            <View style={styles.buttonContainer}>
              <RoundButton color="blue" nextScreen="/" text="Go to Dashboard" />
            </View>
          )}
        </View>
      </QuestionnaireBottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    zIndex: 1,
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    top: 0,
    zIndex: -1,
  },
  greenArrow: {
    width: 10,
    height: 10,
    position: "absolute",
    bottom: 0,
  },
  genderAndAgeContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  ageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  optionsContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80%",
  },
  bottomSheetContent: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
    color: "white",
  },
  image: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  iconContainer: {
    height: 70,
    width: Dimensions.get("window").width,
    marginBottom: -10,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  topContainer: {
    justifyContent: "center",
    height: Dimensions.get("window").height * 0.3,
  },
  scrollView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContent: {
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
