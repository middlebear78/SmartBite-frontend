// components/TabNavigator.tsx
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/Colors";
import {
  HomeIcon,
  MyBitesIcon,
  ProgressIcon,
  SettingsIcon,
} from "./TabNavigatorIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, usePathname } from "expo-router";
import { Asset, useAssets } from "expo-asset"; // For preloading assets

export const BottomTabNavigator = () => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  // Preload the asset
  const [assets] = useAssets([require("../assets/icons/menuScanIcon.png")]);

  const isActive = (route: string) => {
    if (route === "/" && pathname === "/") return true;
    if (route !== "/" && pathname.includes(route)) return true;
    return false;
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Platform.OS === "android" ? 68 : 0,
          position: "absolute",
        },
      ]}
    >
      <View style={styles.centerTab}>
        <TouchableOpacity
          onPress={() => router.push("scanner")}
          style={styles.centerButton}
        >
          <View style={styles.centerButton}>
            {assets && assets[0] && (
              <Image
                source={{ uri: assets[0].uri }}
                style={styles.centerButtonImage}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={[
          Colors.background.gradient.primary,
          Colors.background.gradient.secondary,
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.tabBar}
      >
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("home")}
        >
          <HomeIcon isSelected={isActive("home")} />
          <Text
            style={[
              styles.tabTitle,
              {
                color: isActive("home")
                  ? Colors.white
                  : Colors.buttonBlueDisabled,
              },
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("mymeals")}
        >
          <MyBitesIcon isSelected={isActive("mymeals")} />
          <Text
            style={[
              styles.tabTitle,
              {
                color: isActive("mymeals")
                  ? Colors.white
                  : Colors.buttonBlueDisabled,
              },
            ]}
          >
            My Bites
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.centerTabPlaceholder}
        ></TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("analytics")}
        >
          <ProgressIcon isSelected={isActive("analytics")} />
          <Text
            style={[
              styles.tabTitle,
              {
                color: isActive("analytics")
                  ? Colors.white
                  : Colors.buttonBlueDisabled,
              },
            ]}
          >
            Progress
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("settings")}
        >
          <SettingsIcon isSelected={isActive("settings")} />
          <Text
            style={[
              styles.tabTitle,
              {
                color: isActive("settings")
                  ? Colors.white
                  : Colors.buttonBlueDisabled,
              },
            ]}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBar: {
    overflow: "hidden",
    flexDirection: "row",
    height: 95,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
    alignItems: "center",
    justifyContent: "space-around",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 85,
  },
  centerTab: {
    width: 75,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    bottom: -54,
    zIndex: 1,
    alignSelf: "center",
  },
  centerTabPlaceholder: {
    flex: 1.2,
  },
  centerButton: {
    width: 75,
    height: 75,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#009ed9",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centerButtonImage: {
    width: 75,
    height: 75,
  },
  tabTitle: {
    fontSize: 12,
    marginTop: 4,
    color: "white",
    fontWeight: "500",
  },
  centerTitle: {
    marginTop: 8,
  },
});
