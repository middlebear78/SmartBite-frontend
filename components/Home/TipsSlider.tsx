// app/components/TipsSlider.tsx
import React, { useState, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/Colors"; // Adjust the import path if needed
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import TipSliderItem from "./TipSliderItem";
import Animated, { useSharedValue } from "react-native-reanimated";

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

  const ref = useRef<Carousel<Tip>>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    if (ref.current) {
      ref.current.scrollTo({
        index,
        animated: true,
      });
    }
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
        renderItem={({ item }) => <TipSliderItem tip={item} />}
        onProgressChange={(_, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
        onSnapToItem={setActiveIndex}
        defaultIndex={0}
      />
      <Pagination
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
});

export default TipsSlider;
