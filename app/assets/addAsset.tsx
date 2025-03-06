import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  Modal,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";
import Checkbox from "expo-checkbox";
import { apiService } from "../../service/service";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import TextField from "@/components/Textfield";

const AddAsset = () => {
  const [advice, setAdvice] = useState([]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
   const [productName, setProductName] = useState("");
   const [category, setCategory] = useState("");
   const [serialNumber, setSerialNumber] = useState("");
   const [description, setDescription] = useState("");
   const [model, setModel] = useState("");
   const [buyingDate, setBuyingDate] = useState("");
   const [price, setPrice] = useState("");
   const [supplier, setSupplier] = useState("");
   const [warrantyPeriod, setWarrantyPeriod] = useState("");
   const [status, setStatus] = useState("");
   const [condition, setCondition] = useState("");
   const [location, setLocation] = useState("");
   const [type, setType] = useState("");
   const [loading, setLoading] = useState(true);
   const [submitting, setSubmitting] = useState(false);


  const [formData, setFormData] = useState({
    productName: "",
    category: "Laptop",
    serialNumber: "DX15-1234567890",
    description: "Dell XPS 15, 16GB RAM, 512GB SSD, Intel i7",
    model: "XPS 15 2025",
    buyingDate: "2025-02-26",
    price: "1800",
    supplier: "Dell",
    warrantyPeriod: "24",
    status: "Available",
    condition: "New",
    location: "Warehouse A",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = {
        productName: "Dell XPS 15",
        category: "Laptop",
        serialNumber: "DX15-1234567890",
        description: "Dell XPS 15, 16GB RAM, 512GB SSD, Intel i7",
        model: "XPS 15 2025",
        buyingDate: "2025-02-26",
        price: "1800",
        supplier: "Dell",
        warrantyPeriod: "24",
        status: "Available",
        condition: "New",
        location: "Warehouse A",
      };
      setFormData(response);
    };

    fetchData();
  }, []);

  

  const handleRegister = async () => {
    try {
      let data = {
        name: userName,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
        tc: isChecked,
      };
      const response = await apiService.registerUser(data);
      console.log("Registration successful:", response);
      if ((response.staus = "Success")) {
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.title}>Add Asset</Text>
          <Formik
            initialValues={{
            //   username: userName,
            //   email: email,
            //   password: password,
            //   confirmPassword: confirmPassword,
            }}
            onSubmit={() => {}}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <>

                {Object.keys(formData).map((key) => (
                  <TextField
                    key={key}
                    label={key.replace(/([A-Z])/g, " $1").trim()} 
                    value={formData[key]}
                    onChange={(val) => handleChange(key, val)}
                    placeholder="Type..."
                    secureTextEntry={false}
                    type={""}
                  />
                ))}

                <TouchableOpacity style={styles.button} onPress={() => {}}>
                  <Text style={styles.buttonText}>Add Asset</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.heading}>Asset added Successfully!</Text>
                <TouchableOpacity
                  style={styles.forgotpasbutton}
                  onPress={() => {
                    setModalVisible(false);
                    //   navigation.navigate("login");
                  }}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 40,
    fontWeight: "bold",
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
    color: "#000",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#15F5BA",
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
  signUp: {
    color: "#000",
  },
  signUpLink: {
    color: "#1E90FF",
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  section: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000c4",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  heading: {
    fontSize: 14,
    fontWeight: 600,
    paddingBottom: 20,
  },
  forgotpasbutton: {
    width: 333,
    height: 50,
    backgroundColor: "#15F5BA",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddAsset;
