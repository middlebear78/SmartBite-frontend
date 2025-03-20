// app/mymeals.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { dummyMeals } from "../DummyData/DummyData";
import { Screen } from "../components/Screen";
import { useRouter } from "expo-router";
import { Colors } from "../constants/Colors";
import { Stack } from "expo-router";

interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
  mealTime: string;
  image?: string;
  saved?: boolean;
}

interface MealItemProps {
  item: Meal;
  onPress: (meal: Meal) => void;
  onEdit?: (id: string) => void;
}

type FilterOption = "day" | "last7" | "week" | "month" | "saved" | "all";

const FilterTab: React.FC<{
  label: string;
  isActive: boolean;
  onPress: () => void;
}> = ({ label, isActive, onPress }) => {
  const words = label.split(" ");

  return (
    <TouchableOpacity
      style={[styles.filterTab, isActive && styles.filterTabActive]}
      onPress={onPress}
    >
      <View style={[styles.tabContent, isActive && styles.tabContentActive]}>
        <View style={styles.tabLabelContainer}>
          {words.map((word, index) => (
            <Text
              key={index}
              style={[
                styles.filterTabText,
                isActive && styles.filterTabTextActive,
              ]}
            >
              {word}
            </Text>
          ))}
        </View>
      </View>
      <View
        style={[
          styles.curve,
          styles.curveLeft,
          isActive && styles.curveLeftActive,
        ]}
      />
      <View
        style={[
          styles.curve,
          styles.curveRight,
          isActive && styles.curveRightActive,
        ]}
      />
    </TouchableOpacity>
  );
};

const MealItem: React.FC<MealItemProps> = ({ item, onPress, onEdit }) => (
  <TouchableOpacity style={styles.mealCard} onPress={() => onPress(item)}>
    <View style={styles.mealHeader}>
      <View style={styles.mealTimeContainer}>
        <Ionicons name="time-outline" size={14} color="#8E8E93" />
        <Text style={styles.mealTime}>{item.mealTime}</Text>
        {item.saved && (
          <View style={styles.savedIcon}>
            <Ionicons name="star" size={14} color="#FFD700" />
          </View>
        )}
      </View>
      <Text style={styles.date}>{item.date}</Text>
    </View>

    <View style={styles.mealContent}>
      <View style={styles.mealInfo}>
        <Text style={styles.mealName}>{item.name}</Text>
        <View style={styles.macros}>
          <Text style={styles.calories}>{item.calories} kcal</Text>
          <View style={styles.macroPills}>
            <Text style={styles.macroPill}>🥩 {item.protein}g</Text>
            <Text style={styles.macroPill}>🍚 {item.carbs}g</Text>
            <Text style={styles.macroPill}>🥑 {item.fat}g</Text>
          </View>
        </View>
      </View>

      {item.image && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.mealImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => onEdit?.(item.id)}
          >
            <Ionicons name="create-outline" size={18} color="#007AFF" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  </TouchableOpacity>
);

export default function MyMeals() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterOption>("day");

  const handleEditMeal = (id: string) => {
    console.log("Editing meal with id:", id);
  };

  const handleMealPress = (meal: Meal) => {
    router.push({
      pathname: "/mealdetail",
      params: { mealId: meal.id },
    });
  };

  const renderItem = ({ item }: { item: Meal }) => (
    <MealItem item={item} onPress={handleMealPress} onEdit={handleEditMeal} />
  );

  const keyExtractor = (item: Meal) => item.id;

  const filterOptions: { label: string; value: FilterOption }[] = [
    { label: "Today", value: "day" },
    { label: "Last 7 Days", value: "last7" },
    { label: "This Week", value: "week" },
    { label: "Last Month", value: "month" },
    { label: "Saved", value: "saved" },
    { label: "All", value: "all" },
  ];

  const isDateInRange = (dateStr: string, startDate: Date, endDate: Date) => {
    const mealDate = new Date(dateStr);
    return mealDate >= startDate && mealDate <= endDate;
  };

  const filterMeals = (meals: Meal[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (activeFilter) {
      case "day":
        return meals.filter((meal) => {
          const mealDate = new Date(meal.date);
          return (
            mealDate.getDate() === today.getDate() &&
            mealDate.getMonth() === today.getMonth() &&
            mealDate.getFullYear() === today.getFullYear()
          );
        });

      case "last7": {
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        return meals.filter((meal) =>
          isDateInRange(meal.date, sevenDaysAgo, today)
        );
      }

      case "week": {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return meals.filter((meal) =>
          isDateInRange(meal.date, startOfWeek, endOfWeek)
        );
      }

      case "month": {
        const startOfLastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        );
        const endOfLastMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        );
        return meals.filter((meal) =>
          isDateInRange(meal.date, startOfLastMonth, endOfLastMonth)
        );
      }

      case "saved":
        return meals.filter((meal) => meal.saved);

      case "all":
        return meals;

      default:
        return meals;
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "white", // Set to white for just this screen
          },
          headerTintColor: "#007AFF", // Blue back button
          headerShadowVisible: false, // No shadow under header
        }}
      />
      <Screen title="My Meals" backgroundColor={Colors.background.primary}>
        <View style={styles.filterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
          >
            {filterOptions.map((option) => (
              <FilterTab
                key={option.value}
                label={option.label}
                isActive={activeFilter === option.value}
                onPress={() => setActiveFilter(option.value)}
              />
            ))}
          </ScrollView>
        </View>

        <FlatList
          data={filterMeals(dummyMeals)}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: "#F2F2F7",
    marginBottom: 0,
  },
  filterScrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 0,
  },
  filterTab: {
    height: 60,
    width: 80,
    marginRight: 4,
    marginBottom: -1,
    position: "relative",
    zIndex: 1,
  },
  filterTabActive: {
    zIndex: 2,
  },
  tabContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "#F2F2F7",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#E5E5EA",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tabContentActive: {
    backgroundColor: "white",
    borderColor: "#E5E5EA",
  },
  tabLabelContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  filterTabText: {
    fontSize: 12,
    color: "#8E8E93",
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 16,
  },
  filterTabTextActive: {
    color: "#007AFF",
  },
  curve: {
    position: "absolute",
    bottom: 0,
    width: 16,
    height: 16,
    backgroundColor: "#F2F2F7",
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  curveLeft: {
    left: -15,
    borderTopRightRadius: 16,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    transform: [{ rotate: "90deg" }],
  },
  curveRight: {
    right: -15,
    borderTopLeftRadius: 16,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    transform: [{ rotate: "-90deg" }],
  },
  curveLeftActive: {
    backgroundColor: "white",
  },
  curveRightActive: {
    backgroundColor: "white",
  },
  list: {
    flex: 1,
    backgroundColor: "white",
  },
  listContent: {
    padding: 12,
    paddingTop: 0,
  },
  mealCard: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  mealTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mealTime: {
    fontSize: 12,
    color: "#8E8E93",
    marginLeft: 4,
  },
  savedIcon: {
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    color: "#8E8E93",
  },
  mealContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mealInfo: {
    flex: 1,
    paddingRight: 12,
  },
  mealName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  macros: {
    gap: 6,
  },
  calories: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
    marginBottom: 4,
  },
  macroPills: {
    flexDirection: "row",
    gap: 6,
  },
  macroPill: {
    fontSize: 12,
    color: "#8E8E93",
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  imageContainer: {
    position: "relative",
    width: 80,
    aspectRatio: 1,
  },
  mealImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  editButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
