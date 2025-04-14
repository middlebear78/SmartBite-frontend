/**
 * Calculates BMI based on data from the questionnaire Redux store
 * @param state - The Redux state containing questionnaire data
 * @param sectionIndex - The index of the section containing height and weight data
 * @returns The calculated BMI value and category
 */
export const calculateBMIFromStore = (
    state: any,
    sectionIndex: number
  ): { value: number; category: string } | null => {
    try {
      // Get the section data
      const section = state.questionnaire.sections[sectionIndex];
      if (!section) return null;
  
      // Find height and weight answers
      const heightAnswer = section.answer.find((a: any) => a.questionTitle === "height");
      const weightAnswer = section.answer.find((a: any) => a.questionTitle === "weight");
  
      if (!heightAnswer || !weightAnswer) return null;
  
      // Extract values and units
      const heightValue = parseFloat(heightAnswer.answer);
      const heightUnit = heightAnswer.unit || "cm"; // Default to cm if not specified
      
      const weightValue = parseFloat(weightAnswer.answer);
      const weightUnit = weightAnswer.unit || "kg"; // Default to kg if not specified
  
      // Convert to metric if needed
      let heightInMeters = heightUnit === "cm" ? heightValue / 100 : 
                           heightUnit === "in" ? heightValue * 0.0254 : 
                           heightValue; // Assume meters if not cm or inches
      
      let weightInKg = weightUnit === "lbs" ? weightValue * 0.45359237 : weightValue;
  
      // Calculate BMI
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      const roundedBMI = parseFloat(bmiValue.toFixed(1));
      
      // Determine BMI category
      let category: string;
      
      if (roundedBMI < 18.5) {
        category = 'Underweight';
      } else if (roundedBMI >= 18.5 && roundedBMI < 25) {
        category = 'Normal weight';
      } else if (roundedBMI >= 25 && roundedBMI < 30) {
        category = 'Overweight';
      } else {
        category = 'Obese';
      }
      
      return {
        value: roundedBMI,
        category
      };
    } catch (error) {
      console.error('Error calculating BMI:', error);
      return null;
    }
  };