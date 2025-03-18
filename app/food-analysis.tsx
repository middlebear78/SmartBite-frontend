// app/food-analysis.tsx
import { Text, StyleSheet, Button } from "react-native";
import { Screen } from "../components/Screen";
import { useRouter } from "expo-router";

export default function FoodAnalysis() {
  const router = useRouter();

  return (
    <Screen
      title="Food Analysis Screen"
      nextScreen="/nutrition-info"
      showBack={true}
    >
      <Text style={styles.text}>Calculating Results!</Text>
      <Button
        title={"Back To Home"}
        onPress={() => {
          router.push("/");
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
});
