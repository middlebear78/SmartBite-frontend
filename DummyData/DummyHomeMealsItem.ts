// dummymeals.ts - Place this file in your DummyData folder

// Define the interface for food items with the correct structure
export interface FoodItem {
  food_name: string;
  macronutrients: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    grams: number;
  };
}

export interface DummyMeal {
  id: string;
  meal_title: string;
  timestamp: string;
  total_macronutrients: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  local_image_path: string;
  foods: FoodItem[];
}

// Create dummy meals with the correct structure
const dummymeals: DummyMeal[] = [
  {
    id: "meal-1",
    meal_title: "Meatloaf Dinner",
    timestamp: new Date().toISOString(),
    total_macronutrients: {
      calories: 650,
      protein: 35,
      carbs: 45,
      fat: 28,
    },
    local_image_path: "stam.jpg",
    foods: [
      {
        food_name: "Homemade Meatloaf",
        macronutrients: {
          calories: 320,
          protein: 28,
          carbs: 10,
          fat: 18,
          grams: 200,
        },
      },
      {
        food_name: "Mac and Cheese",
        macronutrients: {
          calories: 220,
          protein: 5,
          carbs: 30,
          fat: 8,
          grams: 150,
        },
      },
      {
        food_name: "Green Beans",
        macronutrients: {
          calories: 110,
          protein: 2,
          carbs: 5,
          fat: 2,
          grams: 120,
        },
      },
    ],
  },
  {
    id: "meal-2",
    meal_title: "Healthy Bowl",
    timestamp: new Date().toISOString(),
    total_macronutrients: {
      calories: 580,
      protein: 42,
      carbs: 65,
      fat: 18,
    },
    local_image_path: "healthy-plate.webp",
    foods: [
      {
        food_name: "Grilled Chicken",
        macronutrients: {
          calories: 180,
          protein: 30,
          carbs: 0,
          fat: 4,
          grams: 120,
        },
      },
      {
        food_name: "Quinoa Mix",
        macronutrients: {
          calories: 150,
          protein: 6,
          carbs: 28,
          fat: 2,
          grams: 100,
        },
      },
      {
        food_name: "Chickpeas",
        macronutrients: {
          calories: 80,
          protein: 4,
          carbs: 15,
          fat: 1,
          grams: 80,
        },
      },
      {
        food_name: "Avocado",
        macronutrients: {
          calories: 80,
          protein: 1,
          carbs: 4,
          fat: 8,
          grams: 50,
        },
      },
      {
        food_name: "Mixed Vegetables",
        macronutrients: {
          calories: 90,
          protein: 1,
          carbs: 18,
          fat: 3,
          grams: 120,
        },
      },
    ],
  },
  {
    id: "meal-3",
    meal_title: "Buddha Bowl",
    timestamp: new Date().toISOString(),
    total_macronutrients: {
      calories: 520,
      protein: 25,
      carbs: 60,
      fat: 22,
    },
    local_image_path: "spicy-chicken.jpeg",
    foods: [
      {
        food_name: "Tofu Cubes",
        macronutrients: {
          calories: 150,
          protein: 15,
          carbs: 5,
          fat: 8,
          grams: 120,
        },
      },
      {
        food_name: "Sweet Potato",
        macronutrients: {
          calories: 120,
          protein: 2,
          carbs: 28,
          fat: 0,
          grams: 130,
        },
      },
      {
        food_name: "Broccolini",
        macronutrients: {
          calories: 50,
          protein: 3,
          carbs: 8,
          fat: 0,
          grams: 85,
        },
      },
      {
        food_name: "Avocado",
        macronutrients: {
          calories: 120,
          protein: 1,
          carbs: 6,
          fat: 12,
          grams: 75,
        },
      },
      {
        food_name: "Rice Base",
        macronutrients: {
          calories: 80,
          protein: 4,
          carbs: 13,
          fat: 2,
          grams: 100,
        },
      },
    ],
  },
];

export default dummymeals;
