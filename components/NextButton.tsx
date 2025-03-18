import { Pressable, Text } from "react-native";
import { useRouter } from "expo-router";

interface NextButtonProps {
  nextScreen: string;
}

const NextButton = ({ nextScreen }: NextButtonProps) => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(nextScreen)}>
      <Text>Next</Text>
    </Pressable>
  );
};

export default NextButton;
