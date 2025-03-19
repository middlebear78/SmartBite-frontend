// @ts-nocheck
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";

export function App() {
  return <ExpoRoot context={require.context("./app", true, /\.[jt]sx?$/)} />;
}

registerRootComponent(App);
