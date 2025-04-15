import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/Colors";
import { fonts } from "../../constants/fonts";

interface InformationTabProps {
  title: string;
  color: string;
  children: React.ReactNode;
  hideTab?: boolean;
}

const InformationTab = ({
  title,
  color,
  children,
  hideTab,
}: InformationTabProps) => {
  return (
    <View style={styles.mainContainer}>
      {!hideTab && (
        <View style={[styles.topColorTab, { backgroundColor: color }]}>
          <Text style={styles.topColorTabText}>{title}</Text>
        </View>
      )}
      <View style={styles.container}>{children}</View>
    </View>
  );
};

export default InformationTab;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  topColorTab: {
    width: Dimensions.get("window").width * 0.8,
    height: 37,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  topColorTabText: {
    fontSize: 16,
    color: "white",
    fontFamily: fonts.main.bold,
  },
  container: {
    width: Dimensions.get("window").width * 0.9,
    height: 310,
    backgroundColor: "white",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
