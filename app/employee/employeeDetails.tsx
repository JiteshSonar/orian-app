import TopBar from "@/components/TopBarWithBackNav";
import { apiService } from "@/service/service";
import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EmployeeDetail = () => {

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View>
        <TopBar title="user detail" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

export default EmployeeDetail;
