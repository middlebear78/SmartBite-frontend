import { useCallback, useMemo, useRef, useEffect } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Colors } from "../../constants/Colors";

import { useSharedValue } from "react-native-reanimated";

interface Props {
  children: React.ReactNode;
}

export const QuestionnaireBottomSheet = ({ children }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["68%"], []);

  useEffect(() => {
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={styles.bottomSheetBackground}
      enablePanDownToClose={false}
      enableHandlePanningGesture={false}
      enableContentPanningGesture={false}
      enableDynamicSizing={false}
      handleStyle={{ display: "none" }}
    >
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  bottomSheetBackground: {
    backgroundColor: Colors.background.primary,
    borderRadius: 24,
  },
  backgroundImage: {
    flex: 1,
  },
});
