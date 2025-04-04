import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";
import { ArrowRightIcon } from "../SvgIcons";

interface InfoItemProps {
  title: string;
  onPress?: () => void;
  backgroundColor: string;
  textColor?: string;
  value?: string;
  marginTop?: number;
  disabled?: boolean;
}

const InfoItem = ({
  title,
  onPress,
  backgroundColor,
  textColor,
  value,
  marginTop,
  disabled,
}: InfoItemProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.8}
      style={[styles.container, { backgroundColor, marginTop }]}
      onPress={onPress}
    >
      <Text
        style={[styles.text, { color: textColor ? textColor : Colors.white }]}
      >
        {title}
      </Text>
      <View style={styles.valueContainer}>
        <Text
          style={[
            styles.value,
            { color: textColor ? textColor : Colors.white },
          ]}
        >
          {value}
        </Text>
        {!disabled && <ArrowRightIcon color={textColor ? textColor : Colors.white} />}
      </View>
    </TouchableOpacity>
  );
};

export default InfoItem;

const styles = StyleSheet.create({
  container: {
    height: 40,
    flex: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: "NunitoBold",
    fontSize: 15,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  value: {
    fontFamily: "Nunito",
    fontSize: 15,
    opacity: 0.8,
  },
});
