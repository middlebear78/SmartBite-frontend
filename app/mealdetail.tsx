// app/mealdetail.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Modal,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../components/Screen";
import { useLocalSearchParams } from "expo-router";
import { dummyMeals } from "../DummyData/DummyData";

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
}

interface EditModalProps {
  visible: boolean;
  value: number;
  label: string;
  unit: string;
  color: string;
  onSave: (value: number) => void;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  visible,
  value,
  label,
  unit,
  color,
  onSave,
  onClose,
}) => {
  const [tempValue, setTempValue] = useState(value.toString());

  const handleSave = () => {
    const newValue = parseFloat(tempValue);
    if (!isNaN(newValue) && newValue >= 0) {
      onSave(newValue);
    }
    Keyboard.dismiss();
    onClose();
  };

  const handleCancel = () => {
    setTempValue(value.toString());
    Keyboard.dismiss();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={handleCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit {label}</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { borderColor: color }]}
                value={tempValue}
                onChangeText={setTempValue}
                keyboardType="numeric"
                autoFocus
                selectTextOnFocus
              />
              <Text style={styles.inputUnit}>{unit}</Text>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.saveButton,
                  { backgroundColor: color },
                ]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const MacroItem = ({
  label,
  value,
  unit,
  color,
  onEdit,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
  onEdit: (value: number) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.macroItem}
        onPress={() => setIsEditing(true)}
      >
        <Text style={styles.macroLabel}>{label}</Text>
        <View style={styles.macroValueContainer}>
          <Text style={[styles.macroValue, { color }]}>{value}</Text>
          <Text style={styles.macroUnit}>{unit}</Text>
        </View>
        <View style={styles.editIcon}>
          <Ionicons name="pencil" size={14} color="#666" />
        </View>
      </TouchableOpacity>

      <EditModal
        visible={isEditing}
        value={value}
        label={label}
        unit={unit}
        color={color}
        onSave={onEdit}
        onClose={() => setIsEditing(false)}
      />
    </>
  );
};

export default function MealDetail() {
  const params = useLocalSearchParams();
  const mealId = params.mealId as string;
  const [meal, setMeal] = useState<Meal | null>(null);

  useEffect(() => {
    // Find the meal in the dummy data based on the ID
    const foundMeal = dummyMeals.find((m) => m.id === mealId);
    if (foundMeal) {
      setMeal(foundMeal);
    }
  }, [mealId]);

  const updateMacro = (key: keyof Meal, value: number) => {
    if (meal) {
      setMeal((prev) => ({
        ...prev!,
        [key]: value,
      }));
    }
  };

  if (!meal) {
    return (
      <Screen title="Meal Detail" showBack={true}>
        <View style={styles.container}>
          <Text>Loading meal details...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen title={meal.name} showBack={true}>
      <ScrollView style={styles.container}>
        {meal.image && (
          <Image source={{ uri: meal.image }} style={styles.image} />
        )}

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.timeRow}>
              <Ionicons name="time-outline" size={18} color="#666" />
              <Text style={styles.timeText}>{meal.mealTime}</Text>
              <Text style={styles.dateText}>{meal.date}</Text>
            </View>
          </View>

          <View style={styles.macrosSection}>
            <MacroItem
              label="Calories"
              value={meal.calories}
              unit="kcal"
              color="#2196F3"
              onEdit={(value) => updateMacro("calories", value)}
            />
            <View style={styles.macroGrid}>
              <MacroItem
                label="Protein"
                value={meal.protein}
                unit="g"
                color="#4CAF50"
                onEdit={(value) => updateMacro("protein", value)}
              />
              <MacroItem
                label="Carbs"
                value={meal.carbs}
                unit="g"
                color="#FF9800"
                onEdit={(value) => updateMacro("carbs", value)}
              />
              <MacroItem
                label="Fat"
                value={meal.fat}
                unit="g"
                color="#F44336"
                onEdit={(value) => updateMacro("fat", value)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: Dimensions.get("window").width * 0.75,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timeText: {
    fontSize: 15,
    color: "#666",
  },
  dateText: {
    fontSize: 15,
    color: "#666",
    marginLeft: "auto",
  },
  macrosSection: {
    padding: 16,
    gap: 24,
  },
  macroGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  macroItem: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    position: "relative",
  },
  macroLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  macroValueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 2,
  },
  macroValue: {
    fontSize: 20,
    fontWeight: "600",
  },
  macroUnit: {
    fontSize: 14,
    color: "#666",
    marginLeft: 2,
  },
  editIcon: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    maxWidth: 300,
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    textAlign: "center",
  },
  inputUnit: {
    fontSize: 16,
    color: "#666",
    width: 40,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
  },
  saveButton: {
    backgroundColor: "#2196F3",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
