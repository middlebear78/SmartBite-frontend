import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fonts } from "../../constants/fonts";

interface NutritionalInsightsItemProps {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const NutritionalInsightsItem = ({
  title,
  description,
  icon,
  color,
}: NutritionalInsightsItemProps) => {
  return (
    <View style={styles.insightItem}>
      <View style={styles.insightHeader}>
        <Ionicons
          name={icon as keyof typeof Ionicons.glyphMap}
          size={20}
          color={color}
        />
        <Text style={styles.insightTitle}>{title}</Text>
      </View>
      <Text style={styles.insightDescription}>{description}</Text>
    </View>
  );
};

export default NutritionalInsightsItem;

const styles = StyleSheet.create({
  insightItem: {
    marginBottom: 12,
    width: Dimensions.get("window").width * 0.8,
  },
  insightHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  insightTitle: {
    fontSize: 16,
    fontFamily: fonts.main.bold,
    marginLeft: 8,
  },
  insightDescription: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: fonts.main.regular,
    color: "#8E8E93",
    paddingLeft: 28,
  },
});
