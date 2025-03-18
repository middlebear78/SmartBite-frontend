import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTintColor: "#000000",
      }}
    />
  );
}
