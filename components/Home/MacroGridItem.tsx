// components/Home/MacroGridItem.tsx
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { fonts } from "../../theme/fonts";
import { CarbsIcon, FatsIcon, ProteinsIcon } from "./MacroIcons";

interface MacroGridItemProps {
  title: string;
  value: string;
  icon: string;
  backgroundColor: string;
}

const MacroGridItem = ({
  title,
  value,
  icon,
  backgroundColor,
}: MacroGridItemProps) => {
  const getIcon = () => {
    switch (icon) {
      case "carbs":
        return <CarbsIcon />;
      case "fats":
        return <FatsIcon />;
      case "proteins":
        return <ProteinsIcon />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={[styles.iconContainer, { backgroundColor }]}>
        {getIcon()}
      </View>
    </View>
  );
};

export default MacroGridItem;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 160,
    backgroundColor: colors.white,
    borderRadius: 200,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 15,
    fontFamily: fonts.main.regular,
    color: colors.text.primary,
  },
  value: {
    fontSize: 15,
    fontFamily: fonts.main.bold,
    color: colors.text.primary,
  },
  iconContainer: {
    position: "absolute",
    bottom: 10,
    width: 75,
    height: 75,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
