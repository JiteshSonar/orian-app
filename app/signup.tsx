import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Modal,
} from "react-native";
import loginimage from "../assets/images/login.png";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";
import Checkbox from "expo-checkbox";
import { apiService } from "../service/service";

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

const Signup = () => {
  const [advice, setAdvice] = useState([]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

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
    <View style={styles.container}>
      <Image source={loginimage} style={styles.logo} />
      <Text style={styles.title}>Sign Up</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{
          username: userName,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
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
            <View style={styles.inputContainer}>
              <Icon name="people-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="username"
                onChangeText={(e) => {
                  handleChange("username");
                  setuserName(e);
                }}
                onBlur={handleBlur("username")}
                value={userName}
              />
            </View>
            {/* {errors.username && touched.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )} */}
            <View style={styles.inputContainer}>
              <Icon name="mail-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={(e) => {
                  handleChange("email");
                  setEmail(e);
                }}
                onBlur={handleBlur("email")}
                value={email}
              />
            </View>
            {/* {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )} */}
            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(e) => {
                  handleChange("password");
                  setpassword(e);
                }}
                onBlur={handleBlur("password")}
                value={password}
              />
            </View>
            {/* {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )} */}
            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={(e) => {
                  handleChange("confirmPassword password");
                  setconfirmPassword(e);
                }}
                onBlur={handleBlur("confirmPassword password")}
                value={confirmPassword}
              />
            </View>
            {/* {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )} */}
            <View style={styles.section}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#017355" : undefined}
              />
              <Text style={styles.paragraph}>Terms and condition</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleRegister();
              }}
              // disabled={!isValid}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Text style={styles.signUp}>
                Already have an account?{" "}
                <Text style={styles.signUpLink}>Login</Text>
              </Text>
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
            <Text style={styles.heading}>Register Successfully!</Text>
            <TouchableOpacity
              style={styles.forgotpasbutton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("login");
              }}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  title: {
    fontSize: 32,
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

export default Signup;
