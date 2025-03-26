// components/Camera/CameraIcons.tsx
import * as React from "react";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
  G,
} from "react-native-svg";
import { Colors } from "../constants/Colors";
import { StyleSheet, View } from "react-native";

export const EditIcon = () => (
  <View style={styles.editIconContainer}>
    <Svg width="11" height="11" viewBox="0 0 10 10" fill="none">
      <Path
        d="M0.0113197 9.62626C-0.0179946 9.72856 0.0105868 9.83878 0.0859244 9.91411C0.141621 9.96981 0.216519 10 0.293176 10C0.319999 10 0.347114 9.99634 0.373644 9.98872L3.10969 9.20693L0.792984 6.89014L0.0113197 9.62626Z"
        fill="white"
      />
      <Path
        d="M0.0113197 9.62626C-0.0179946 9.72856 0.0105868 9.83878 0.0859244 9.91411C0.141621 9.96981 0.216519 10 0.293176 10C0.319999 10 0.347114 9.99634 0.373644 9.98872L3.10969 9.20693L0.792984 6.89014L0.0113197 9.62626Z"
        fill="white"
      />
      <Path
        d="M9.74252 1.50085L8.49886 0.257226C8.33309 0.091458 8.11235 0.000146567 7.87725 0H7.87681C7.64171 0 7.42112 0.0911649 7.2555 0.256933L6.6333 0.879111L9.12076 3.36651L9.74295 2.74433C9.90873 2.57856 9.99989 2.35783 9.99975 2.12259C9.99975 1.88749 9.90829 1.66676 9.74252 1.501"
        fill="white"
      />
      <Path
        d="M9.74252 1.50085L8.49886 0.257226C8.33309 0.091458 8.11235 0.000146567 7.87725 0H7.87681C7.64171 0 7.42112 0.0911649 7.2555 0.256933L6.6333 0.879111L9.12076 3.36651L9.74295 2.74433C9.90873 2.57856 9.99989 2.35783 9.99975 2.12259C9.99975 1.88749 9.90829 1.66676 9.74252 1.501V1.50085Z"
        fill="white"
      />
      <Path
        d="M1.12231 6.39035L3.60977 8.87775L8.7065 3.78116L6.21904 1.29376L1.12231 6.39035Z"
        fill="white"
      />
      <Path
        d="M1.12231 6.39035L3.60977 8.87775L8.7065 3.78116L6.21904 1.29376L1.12231 6.39035Z"
        fill="white"
      />
    </Svg>
  </View>
);

export const AddIcon = () => (
  <View style={styles.addIconContainer}>
    <Svg width="13" height="13" viewBox="0 0 11 11" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.1 1.08C6.1 0.48 5.62 0 5.02 0C4.42 0 3.94 0.48 3.94 1.08V3.94H1.08C0.48 3.94 0 4.42 0 5.02C0 5.62 0.48 6.1 1.08 6.1H3.94V8.96C3.94 9.56 4.42 10.04 5.02 10.04C5.62 10.04 6.1 9.56 6.1 8.96V6.1H8.96C9.56 6.1 10.04 5.62 10.04 5.02C10.04 4.42 9.56 3.94 8.96 3.94H6.1V1.08Z"
        fill="white"
      />
    </Svg>
  </View>
);
const styles = StyleSheet.create({
  editIconContainer: {
    backgroundColor: Colors.background.darkBlue,
    padding: 10,
    borderRadius: 100,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  addIconContainer: {
    backgroundColor: Colors.background.darkBlue,
    padding: 10,
    borderRadius: 100,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
