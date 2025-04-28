// app/subscription.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { Stack } from "expo-router";
import { Screen } from "../components/Screen";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function SubscriptionScreen() {
  // State to track which pricing option is selected
  const [pricingOption, setPricingOption] = React.useState("annual"); // Default to annual plan

  // Define the features for comparison
  const features = [
    {
      title: "AI food identification",
      free: "15 identifications",
      premium: "Unlimited",
      isLimited: true,
    },
    {
      title: "Diet compatibility check",
      free: false,
      premium: true,
      tooltip: "Check if meals fit your diet",
    },
    {
      title: "Health tools (Step tracker & Water log)",
      free: false,
      premium: true,
    },
    {
      title: "Cloud storage for data",
      free: false,
      premium: true,
      tooltip: "Your data is backed up even if you change/lose your phone",
    },
    {
      title: "Manual food logging",
      free: true,
      premium: true,
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Subscription",
          headerStyle: { backgroundColor: Colors.background.darkBlue },
          headerShadowVisible: false,
          headerTintColor: Colors.white,
        }}
      />
      <Screen showBack={true} backgroundColor={Colors.background.lightBlue}>
        <StatusBar barStyle="light-content" />
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Choose Your Plan</Text>

          {/* Comparison Table */}
          <View style={styles.tableContainer}>
            <View style={styles.headerRow}>
              <View style={styles.featureCell}>
                <Text style={styles.headerText}>Features</Text>
              </View>
              <View style={styles.planCell}>
                <Text style={styles.headerText}>FREE</Text>
              </View>
              <View style={styles.planCell}>
                <Text style={styles.headerText}>PREMIUM</Text>
              </View>
            </View>

            {features.map((feature, index) => (
              <View key={index} style={styles.row}>
                <View style={styles.featureCell}>
                  <Text style={styles.featureText}>{feature.title}</Text>
                  {feature.tooltip && (
                    <Text style={styles.tooltipText}>{feature.tooltip}</Text>
                  )}
                </View>
                <View style={styles.planCell}>
                  {feature.isLimited ? (
                    <Text style={styles.limitedText}>{feature.free}</Text>
                  ) : feature.free ? (
                    <Ionicons name="checkmark-circle" size={24} color="green" />
                  ) : (
                    <Ionicons name="close-circle" size={24} color="red" />
                  )}
                </View>
                <View style={styles.planCell}>
                  {feature.isLimited ? (
                    <Text style={styles.unlimitedText}>{feature.premium}</Text>
                  ) : feature.premium ? (
                    <Ionicons name="checkmark-circle" size={24} color="green" />
                  ) : (
                    <Ionicons name="close-circle" size={24} color="red" />
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Pricing Options */}
          <View style={styles.pricingContainer}>
            <Text style={styles.pricingTitle}>Choose Your Payment Option</Text>

            <TouchableOpacity
              style={[
                styles.planOption,
                pricingOption === "monthly" && styles.recommendedPlan,
              ]}
              onPress={() => setPricingOption("monthly")}
            >
              <View>
                <Text style={styles.planName}>Monthly</Text>
                <Text style={styles.planDescription}>Billed monthly</Text>
              </View>
              <Text style={styles.planPrice}>$7.99/month</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.planOption,
                pricingOption === "annual" && styles.recommendedPlan,
              ]}
              onPress={() => setPricingOption("annual")}
            >
              <View style={styles.planTextContainer}>
                <Text style={styles.planName}>Annual</Text>
                <Text style={styles.planDescription}>
                  Billed annually, save 20%
                </Text>
              </View>
              <Text style={styles.planPrice}>$6.39/month</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={() => {
              // Handle subscription based on pricingOption
              console.log(`Subscribing to Premium ${pricingOption} plan`);
            }}
          >
            <Text style={styles.subscribeButtonText}>
              Get Premium {pricingOption === "monthly" ? "Monthly" : "Annual"}{" "}
              Plan
            </Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            By subscribing, you agree to our Terms of Service and Privacy
            Policy.
          </Text>
        </ScrollView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  tableContainer: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    paddingVertical: 12,
  },
  row: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingVertical: 12,
  },
  featureCell: {
    flex: 2,
    paddingLeft: 16,
    justifyContent: "center",
  },
  planCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  headerSubtitle: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
    marginTop: 2,
    paddingHorizontal: 4,
  },
  featureText: {
    fontSize: 14,
  },
  tooltipText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  limitedText: {
    fontSize: 12,
    color: "#FF8C00",
    textAlign: "center",
  },
  unlimitedText: {
    fontSize: 12,
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
  },
  pricingContainer: {
    marginBottom: 24,
  },
  pricingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  planOption: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recommendedPlan: {
    borderWidth: 2,
    borderColor: "#007BFF",
  },
  planTextContainer: {
    flex: 1,
  },
  planName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  planDescription: {
    color: "#666",
    marginTop: 4,
  },
  planPrice: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subscribeButton: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  subscribeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  disclaimer: {
    textAlign: "center",
    color: "#666",
    fontSize: 12,
    marginBottom: 32,
  },
});
