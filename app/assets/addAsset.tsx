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
import TextFieldDropdown from "@/components/DropdownPicker";
import TopBar from "@/components/TopBarWithBackNav";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import DropDownPicker from "react-native-dropdown-picker";
const AddAsset = () => {
  const [advice, setAdvice] = useState([]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("");
  const [buyingDate, setBuyingDate] = useState(new Date());
  const [price, setPrice] = useState("");
  const [supplier, setSupplier] = useState("");
  const [warrantyPeriod, setWarrantyPeriod] = useState("");
  const [status, setStatus] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [category_description, setCategory_description] = useState("");
  const [isLaptop, setIsLaptop] = useState(false);
  const [asset_category_description, setAsset_category_description] =
    useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const StatudItems = [
    { label: "Available", value: "Available" },
    { label: "Unavailable", value: "Unavailable" },
  ];

  const ConditionItems = [
    { label: "New", value: "New" },
    { label: "Old", value: "Old" },
  ];
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setBuyingDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const loginValidationSchema = yup.object().shape({
    username: yup.string().required("sername is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6)
      .when("oldPassword", (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
    confirmPassword: yup
      .string()
      .when("password", (password, field) =>
        password ? field.required().oneOf([yup.ref("password")]) : field
      ),
  });

  const [formData, setFormData] = useState({
    productName,
    categoryData: {
      category,
      category_description: asset_category_description,
      is_laptop: isLaptop,
    },
    serialNumber,
    description,
    model,
    buyingDate: buyingDate.toString(),
    price: parseFloat(price),
    supplier,
    warrantyPeriod: parseInt(warrantyPeriod),
    status,
    condition,
    location,
    image: "",
  });

  useEffect(() => {}, []);

  const handleAddAsset = async () => {
    const data = {
      productName: productName,
      categoryData: {
        category: category,
        description: category_description,
        is_laptop: isLaptop,
      },
      serialNumber: serialNumber,
      description: description,
      model: model,
      buyingDate: buyingDate,
      price: price,
      supplier: supplier,
      warrantyPeriod: parseInt(warrantyPeriod),
      status: status,
      condition: condition,
      location: location,
      image: "",
    };
    try {
      const response = await apiService.addAsset(data);
      console.log("Asset Added", response);
      console.log("success request Body", data);
      if ((response.status = "Success")) {
        setModalVisible(true);
        data == null;
      }
    } catch (error) {
      console.error("Asset Added failed:", error);
      console.log("failed request Body", data);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBar title="Add Asset" />
      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={
            {
              // username: userName,
              // email: email,
              // password: password,
              // confirmPassword: confirmPassword,
            }
          }
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
              {/* product name */}
              <TextField
                label="Product Name"
                value={productName}
                onChange={setProductName}
                placeholder="Product Name"
                secureTextEntry={false}
                type={"string"}
                onPress={() => {}}
              />

              <TextField
                label="Serial Number"
                value={serialNumber}
                onChange={setSerialNumber}
                placeholder="Serial Number"
                secureTextEntry={false}
                type={"string"}
                onPress={() => {}}
              />
              <TextField
                label="Description"
                value={description}
                onChange={setDescription}
                placeholder="Description"
                secureTextEntry={false}
                type={"string"}
                onPress={() => {}}
              />
              <TextField
                label="Model"
                value={model}
                onChange={setModel}
                placeholder="model"
                secureTextEntry={false}
                type={"string"}
                onPress={() => {}}
              />
              <TextField
                label="Buying Date"
                value={date.toLocaleString()}
                onChange={setBuyingDate}
                placeholder="Buying Date"
                secureTextEntry={false}
                type={"string"}
                onPress={showDatepicker}
              />
              {/* <Button onPress={showDatepicker} title="Show date picker!" />
              <Button onPress={showTimepicker} title="Show time picker!" />*/}
              {/* <Text>selected: {date.toLocaleString()}</Text> */}
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={"date"}
                  is24Hour={false}
                  onChange={onChange}
                />
              )}
              <TextField
                label="Price"
                value={price}
                onChange={setPrice}
                placeholder="price"
                secureTextEntry={false}
                type={"number"}
                onPress={() => {}}
              />
              <TextField
                label="Supplier"
                value={supplier}
                onChange={setSupplier}
                placeholder="Supplier"
                secureTextEntry={false}
                type={"string"}
                onPress={() => {}}
              />
              <TextField
                label="Warranty Period"
                value={warrantyPeriod}
                onChange={setWarrantyPeriod}
                placeholder="Supplier"
                secureTextEntry={false}
                type={"string"}
                onPress={() => {}}
              />
              <TextField
                label="Location"
                value={location}
                onChange={setLocation}
                placeholder="Location"
                secureTextEntry={false}
                type={"string"}
                onPress={() => {}}
              />

              <TextFieldDropdown
                label="Condition"
                items={ConditionItems}
                selectedValue={condition}
                onValueChange={setCondition}
                placeholder="Select an option"
                searchable={false}
                style={styles.dropdown}
              />
              <TextField
                label="Category"
                value={category}
                onChange={setCategory}
                placeholder="Category"
                secureTextEntry={false}
                type={"string"}
                onPress={() => {}}
              />
              <TextField
                label="Category Description"
                value={category_description}
                onChange={setCategory_description}
                placeholder="Category Description"
                secureTextEntry={false}
                type={"string"}
                onPress={() => {}}
              />
              <TextFieldDropdown
                label="Status"
                items={StatudItems}
                selectedValue={status}
                onValueChange={setStatus}
                placeholder="Select an option"
                searchable={false}
                style={styles.dropdown}
              />
              <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isLaptop}
                  onValueChange={setIsLaptop}
                  color={isLaptop ? "#017355" : undefined}
                />
                <Text style={styles.paragraph}>Is Laptop</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleAddAsset();
                }}
                // disabled={!isValid}
              >
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
              <Text style={styles.heading}>Asset is Added successfully!</Text>
              <TouchableOpacity
                style={styles.forgotpasbutton}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("assets/assets");
                }}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  dropdown: {
    width: "100%",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#15F5BA",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
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
    fontWeight: 600,
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
  safeArea: {
    height: "100%",
  },
});

export default AddAsset;
