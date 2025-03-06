import Header from "@/components/header";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/FontAwesome";
import usermale from "../../assets/images/usermale.jpg";
import ItemCode from "../../components/itemCode";
import InfoCard from "@/components/infoCard";
import { apiService } from "@/service/service";

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../../store/store";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export default function HomeScreen() {
  const navigation = useNavigation();

  const data = [
    { id: 1, icon: "people", text: "Employee", color: "#6200ea" },
    { id: 2, icon: "people", text: "Asset", color: "#ff5722" },
    { id: 3, icon: "settings-outline", text: "Inventory", color: "#4caf50" },
    {
      id: 4,
      icon: "notifications-outline",
      text: "Notifications",
      color: "#fbc02d",
    },
  ];
  const token = useTypedSelector((state) => state.auth.token);

  const getLoggedUser = () => {
    try {
      const res = apiService.getLoggedUser({ token });
      console.log("Logged Uer Details: ", res);
    } catch (error) {
      console.log("Logged user details not fetched ..", error);
    }
  };

  const getInfoOfCards = (id) => {
    console.log("card ID" , id)
    try {
      // navigation.navigate("employeedetail");
      navigation.navigate("assets/assets");
    } catch (error) {
      
    } finally {

    }
  }

  useEffect(() => {
    getLoggedUser();
  }, [token]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Icon name="align-left" size={22} color="#494949" />
          <Text style={styles.headerText}>
            India <Icon name="chevron-down" size={14} />
          </Text>
          <Icon name="search" size={22} />
        </View>
        <View style={styles.grayInfoCard}>
          <View style={styles.graInfoImage}>
            <Image source={usermale} style={styles.logo} />
          </View>
          <View style={styles.grayInfoDet}>
            <View style={styles.flexJustfyBet}>
              <Text style={styles.grayCardTitle}>Jitesh Sonar</Text>
              <Icon name="edit" size={14} />
            </View>
            <View style={styles.flexJustfyBet}>
              <Text>Software Developer {"  "}</Text>
              <Text>37 friends</Text>
            </View>
          </View>
        </View>
        <View style={styles.mainTextHead}>
          <Text style={styles.mainTextt}>
            {" "}
            Hello, <Text style={styles.mainText}>Jeet!</Text>
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}
        >
          {data.map((item) => (
            <ItemCode icon={item.icon} text={item.text} color={item.color} onPressButton={() => getInfoOfCards(item.id)}/>
          ))}
        </View>
        <View>
          {/* <InfoCard /> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  container: {
    height: "100%",
    width: "100%",
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#494949",
  },
  grayInfoCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
  },
  graInfoImage: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  logo: {
    height: 45,
    width: 45,
    resizeMode: "contain",
    marginBottom: 20,
    borderRadius: 100,
  },
  grayInfoDet: {
    padding: 10,
    gap: 10,
    marginLeft: 10,
  },
  flexJustfyBet: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  grayCardTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#06113C",
  },
  mainText: {
    fontWeight: "600",
  },
  mainTextHead: {
    width: "100%",
    display: "flex",
    marginTop: 20,
  },
  mainTextt: {
    fontSize: 28,
    fontWeight: "300",
    lineHeight: 30,
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 2,
    gap: 10,
    flexWrap: "wrap",
  },
});
