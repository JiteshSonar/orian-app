import {
  StyleSheet,
  Image,
  Text,
  Platform,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "@/components/header";
export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <StatusBar style="auto" backgroundColor="#6200ea" />
        <Header title="Dashboard" onBackPress={() => {}} style={{}} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  safeContainer: {
    flex: 1,
  },
  container: {
    height: "100%",
    width: "100%",
  },
});
