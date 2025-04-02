import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/Colors";
import { PencilIcon } from "../SvgIcons";
interface MyProfileItemProps {
  type: "age" | "height" | "weight";
  unit?: string;
  number: string;
  onPress: () => void;
}

const MyProfileItem = ({ type, unit, number, onPress }: MyProfileItemProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.editIconContainer}>
          <PencilIcon />
        </View>
        <LinearGradient
          colors={[
            Colors.background.gradient.secondary,
            Colors.background.gradient.primary,
          ]}
          style={styles.gradient}
        >
          <Text style={styles.number}>{number}</Text>
          {unit && <Text style={styles.unit}>{unit}</Text>}
        </LinearGradient>
      </TouchableOpacity>
      <Text style={styles.type}>{type}</Text>
    </View>
  );
};

export default MyProfileItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  gradient: {
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").width * 0.2,
    borderRadius: 25,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  number: {
    fontFamily: "Nunito",
    fontWeight: "900",
    fontSize: 28,
    color: Colors.white,
  },
  unit: {
    fontFamily: "Nunito",
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.white,
    opacity: 0.6,
    position: "absolute",
    bottom: 7,
  },
  type: {
    fontFamily: "Nunito",
    fontSize: 14,
    marginTop: 4,
  },
  editIconContainer: {
    position: "absolute",
    top: 7,
    left: 10,
    zIndex: 1,
  },
});
