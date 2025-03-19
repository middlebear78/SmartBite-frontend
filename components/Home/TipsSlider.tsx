import { useState, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router"; // Import Expo Router hook
import { Colors } from "../../constants/Colors";
import Carousel, {
  Pagination,
  ICarouselInstance,
} from "react-native-reanimated-carousel";
import TipSliderItem from "./TipSliderItem";
import { useSharedValue } from "react-native-reanimated";

interface Tip {
  id: number;
  title: string;
  description: string;
  imageWidth?: number;
  imageTop?: number;
}

const TipsSlider = () => {
  const { width } = Dimensions.get("window");
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue(0);

  const router = useRouter(); // Initialize the Expo Router hook

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      index,
      animated: true,
    });
  };

  const data: Tip[] = [
    {
      id: 1,
      title: "Eat colors,\nstay vibrant!",
      description: "A variety of foods means a variety of nutrients.",
      imageWidth: 93,
      imageTop: -4,
    },
    {
      id: 2,
      title: "Balanced nutrition",
      description: "fuels your body and mind. Choose wisely!",
    },
    {
      id: 3,
      title: "Good food,\ngood mood!",
      description: "What you eat shapes\nhow you feel.",
    },
    {
      id: 4,
      title: "Listen to your body",
      description:
        "Wellness starts with awareness, honor what your body needs.",
    },
    {
      id: 5,
      title: "Small Choices,\nBig Results",
      description:
        "Small healthy choices every day lead to big results over time",
    },
  ];

  const renderItem = ({ item }: { item: Tip }) => <TipSliderItem tip={item} />;

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        loop
        autoPlay={autoPlay}
        autoPlayInterval={3500}
        width={width}
        height={Dimensions.get("window").height * 0.15}
        data={data}
        renderItem={renderItem}
        onProgressChange={progress}
        onSnapToItem={(index) => setActiveIndex(index)}
        defaultIndex={0}
      />
      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{
          borderColor: Colors.secondary,
          borderWidth: 1,
          borderRadius: 50,
        }}
        activeDotStyle={{ backgroundColor: Colors.secondary }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    height: Dimensions.get("window").height * 0.15,
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2196F3",
  },
});

export default TipsSlider;
