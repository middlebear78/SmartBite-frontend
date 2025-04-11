// components/Home/TipSliderItem.tsx
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../../constants/Colors";
import { fonts } from "../../constants/fonts";
interface Tip {
  id: number;
  title: string;
  description: string;
  imageWidth?: number;
  imageTop?: number;
}

interface TipSliderItemProps {
  tip: Tip;
}

// Static imports
import tip1Image from "../../assets/images/tip1.png";
import tip2Image from "../../assets/images/tip2.png";
import tip3Image from "../../assets/images/tip3.png";
import tip4Image from "../../assets/images/tip4.png";
import tip5Image from "../../assets/images/tip5.png";

const TipSliderItem = ({ tip }: TipSliderItemProps) => {
  // Match the ID with static imports
  let imageSource;
  switch (tip.id) {
    case 1:
      imageSource = tip1Image;
      break;
    case 2:
      imageSource = tip2Image;
      break;
    case 3:
      imageSource = tip3Image;
      break;
    case 4:
      imageSource = tip4Image;
      break;
    case 5:
      imageSource = tip5Image;
      break;
    default:
      imageSource = tip1Image; // Default image in case of missing ID
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{tip.title}</Text>
        <Text style={styles.description}>{tip.description}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={imageSource}
          style={[
            styles.tipImage,
            {
              width: tip.imageWidth ? `${tip.imageWidth}%` : "100%",
              top: tip.imageTop ? `${tip.imageTop}%` : 0,
            },
          ]}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 125,
    backgroundColor: "#F8F8F8",
    borderRadius: 25,
    marginHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    lineHeight: 20,
    marginBottom: 5,
    fontFamily: fonts.delius,
    textAlign: "left",
    color: Colors.primary,
  },
  description: {
    fontSize: 13,
    lineHeight: 16,
    fontFamily: fonts.delius,
    textAlign: "left",
    color: Colors.primary,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 10,
  },
  tipImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "relative",
  },
});

export default TipSliderItem;
