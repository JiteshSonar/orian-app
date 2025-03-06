import React from 'react'
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "@/components/header";

const profile = () => {
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
  safeContainer: {
    flex: 1,
  },
  container: {
    height: "100%",
    width: "100%",
  },
});

export default profile