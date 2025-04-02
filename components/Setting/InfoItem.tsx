import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";
import { ArrowRightIcon } from "../SvgIcons";

interface InfoItemProps {
  title: string;
  onPress?: () => void;
  backgroundColor: string;
  value?: string;
  marginTop?: number;
  disabled?: boolean;
}

const InfoItem = ({
  title,
  onPress,
  backgroundColor,
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
      <Text style={styles.text}>{title}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        {!disabled && <ArrowRightIcon />}
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
    color: Colors.white,
    fontFamily: "NunitoBold",
    fontSize: 15,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  value: {
    color: Colors.white,
    fontFamily: "Nunito",
    fontSize: 15,
    opacity: 0.8,
  },
});
