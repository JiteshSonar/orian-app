import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import im from '../assets/images/user.jpg';

const InfoCard = ({}) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={im}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.ageRating}>12</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Legends of Runeterra</Text>
        <Text style={styles.company}>Riot Games, Inc</Text>
        <Text style={styles.category}>Categoria: Cartas</Text>
        <Text style={styles.description}>
          Jogo de cartas, estratégia e habilidade.
        </Text>
        <TouchableOpacity style={styles.soonButton}>
          <Text style={styles.soonText}>EM BREVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 4,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
  },
  imageContainer: {
    backgroundColor: "orange",
    padding: 20,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 80,
    height: 80,
  },
  ageRating: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "yellow",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  company: {
    fontSize: 14,
    color: "#666",
  },
  category: {
    fontSize: 14,
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: "#333",
  },
  soonButton: {
    backgroundColor: "black",
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  soonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default InfoCard;
