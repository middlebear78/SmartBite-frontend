// app/analytics.tsx
import { Text, StyleSheet } from "react-native";
import { Screen } from "../components/Screen";

export default function Analytics() {
  return (
    <Screen title="Analytics" showBack={true}>
      <Text style={styles.text}>This is the Analytics Screen!</Text>
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
