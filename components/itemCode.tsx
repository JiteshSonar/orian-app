import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ItemCode = ({ icon, text, color, onPressButton }) => {
  return (
    <TouchableOpacity
      style={[styles.cardContainer, { backgroundColor: color }]}
      onPress={onPressButton}
    >
      <View>
        <View style={styles.iconContainer}>
          <Icon name={icon} size={25} color="#fff" style={{ padding: 10 }} />
        </View>
        <View>
          <Text style={styles.txtContainer}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "48%",
    height: 100,
    borderRadius: 24,
    margin: 4,
  },
  iconContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  txtContainer: {
    fontSize: 16,
    color: "#fff",
    padding: 10,
  },
});

export default ItemCode;
