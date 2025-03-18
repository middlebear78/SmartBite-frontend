// components/Home/TipSliderItem.tsx
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { colors } from "../../theme/colors";

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

const TipSliderItem = ({ tip }: TipSliderItemProps) => {
  let imageSource;
  switch (tip.id) {
    case 1:
      imageSource = require(`../../assets/images/tip1.png`);
      break;
    case 2:
      imageSource = require(`../../assets/images/tip2.png`);
      break;
    case 3:
      imageSource = require(`../../assets/images/tip3.png`);
      break;
    case 4:
      imageSource = require(`../../assets/images/tip4.png`);
      break;
    case 5:
      imageSource = require(`../../assets/images/tip5.png`);
      break;
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
    fontWeight: "bold",
    fontFamily: "DeliusRegular",
    textAlign: "left",
    color: colors.primary,
  },
  description: {
    fontSize: 13,
    lineHeight: 16,
    fontFamily: "DeliusRegular",
    textAlign: "left",
    color: colors.primary,
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
