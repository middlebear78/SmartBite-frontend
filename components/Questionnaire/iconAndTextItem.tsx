// components/Questionnaire/IconAndTextItem.tsx
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  icon?: any;
  iconsSelected?: any;
  iconName: string;
  title: string;
  selected: boolean;
  onPress: () => void;
}

const IconAndTextItem = ({ iconName, title, selected, onPress }: Props) => {
  let icon;
  let iconsSelected;

  if (iconName === "iconMinus") {
    icon = require(`../../assets/icons/iconMinus.png`);
    iconsSelected = require(`../../assets/icons/iconMinusWhite.png`);
  }
  if (iconName === "iconPlus") {
    icon = require(`../../assets/icons/iconPlus.png`);
    iconsSelected = require(`../../assets/icons/iconPlusWhite.png`);
  }
  if (iconName === "iconEqual") {
    icon = require(`../../assets/icons/iconEqual.png`);
    iconsSelected = require(`../../assets/icons/iconEqualWhite.png`);
  }
  if (iconName === "lowActivity") {
    icon = require(`../../assets/icons/lowActivity.png`);
    iconsSelected = require(`../../assets/icons/lowActivityWhite.png`);
  }
  if (iconName === "moderateActivity") {
    icon = require(`../../assets/icons/moderateActivity.png`);
    iconsSelected = require(`../../assets/icons/moderateActivityWhite.png`);
  }
  if (iconName === "highActivity") {
    icon = require(`../../assets/icons/highActivity.png`);
    iconsSelected = require(`../../assets/icons/highActivityWhite.png`);
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        selected
          ? [styles.containerSelected, styles.container]
          : [styles.containerNotSelected, styles.container],
      ]}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }} // Start at the top
        end={{ x: 1, y: 0 }} // End at the bottom
        colors={
          selected
            ? [
                Colors.background.gradient.primary,
                Colors.background.gradient.secondary,
              ]
            : [Colors.white, Colors.white]
        }
        style={[styles.linearGradient, styles.gradientContainer]}
      >
        <Text
          style={[
            styles.title,
            { color: selected ? "white" : Colors.text.primary },
          ]}
        >
          {title}
        </Text>

        <View style={styles.iconContainer}>
          <Image
            source={selected ? iconsSelected : icon}
            style={styles.icon}
            resizeMode="contain"
            resizeMethod="resize"
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default IconAndTextItem;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    maxWidth: 250,
    height: Dimensions.get("window").height * 0.08,
    borderRadius: 20,
    shadowColor: Colors.shadow.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  gradientContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 15,
  },
  containerNotSelected: {
    backgroundColor: "white",
  },
  containerSelected: {
    backgroundColor: Colors.buttonBlueActive,
  },
  additionalSelectedStyle: {
    // Add any additional styles for the selected state here
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
  },
  linearGradient: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
  },
});
