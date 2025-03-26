import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import TabItem from "./TabItem";
import { useRef, useState } from "react";
import { Colors } from "../../constants/Colors";

const MyMealsTabs = () => {
  const scrollViewRef = useRef<ScrollView>(null);

  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    scrollViewRef.current?.scrollTo({ x: index * 120, animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
      >
        <TabItem
          title="Today"
          isActive={activeTab === 0}
          onPress={() => handleTabPress(0)}
        />
        <TabItem
          title="Last 7 days"
          isActive={activeTab === 1}
          onPress={() => handleTabPress(1)}
        />
        <TabItem
          title="Last Month"
          isActive={activeTab === 2}
          onPress={() => handleTabPress(2)}
        />
        <TabItem
          title="All time"
          isActive={activeTab === 3}
          onPress={() => handleTabPress(3)}
        />
        <TabItem
          title="Favorites"
          isActive={activeTab === 4}
          onPress={() => handleTabPress(4)}
        />
        <TabItem
          title="Date range"
          isActive={activeTab === 5}
          onPress={() => handleTabPress(5)}
        />
      </ScrollView>
      <View style={styles.line} />
    </View>
  );
};

export default MyMealsTabs;

const styles = StyleSheet.create({
  container: {
    height: 55,
  },
  scrollContainer: {
    flexDirection: "row",
    gap: 3,
  },
  line: {
    width: "100%",
    height: 5,
    backgroundColor: Colors.background.darkBlue,
  },
});
