import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import icon from "../assets/images/mainscreenicon.jpg";
import { useNavigation } from "@react-navigation/native";

export default function splashScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.logo} />
      <TouchableOpacity
        style={styles.greenBtn}
        onPress={() => navigation.navigate("login")}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.orangeBtn}
        onPress={() => navigation.navigate("signup")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  greenBtn: {
    width: "100%",
    height: 50,
    backgroundColor: "#15F5BA",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  orangeBtn: {
    backgroundColor: "#6C22A6",
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: 800,
    fontSize: 18,
  },
});
