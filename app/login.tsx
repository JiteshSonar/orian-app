import React, { useState } from "react";
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

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import loginimage from "../assets/images/login.png";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
// import { useAuth } from "../auth/authContext";
import { Link } from "expo-router";
import { apiService } from "@/service/service";
import { useDispatch } from "react-redux";
import { setToken } from "@/store/auth/authSlice";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPssword, setConfirmPassword] = useState("");

  const handleLogin = async () => {
    try {
      let data = {
        email: email,
        password: password,
      };
      const response = await apiService.loginUser(data);
      console.log("Login successful:", response);

      if (response.token) {
        dispatch(setToken(response.token));
      }
      if ((response.staus = "Success")) {
        navigation.navigate("(tabs)"); 
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      let data = {
        password: password,
        password_confirmation: confirmPssword,
      };
      const response = await apiService.changePassword(data);
      console.log("Password change successful:", response);

      if ((response.staus = "Success")) {
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Password change failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={loginimage} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: "", password: "" }}
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
                  setPassword(e);
                }}
                onBlur={handleBlur("password")}
                value={password}
              />
            </View>
            {/* {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )} */}
            {/* <TouchableOpacity onPress={() => navigation.navigate("Forget")}> */}
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleLogin();
              }}
              // disabled={!isValid}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("signup")}>
              <Text style={styles.signUp}>
                Don't have an account?{" "}
                <Text style={styles.signUpLink}>Sign Up</Text>
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
            <Text style={styles.heading}>Change Your Password!</Text>
            <View style={styles.inputContainer}>
              <Icon name="mail-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                keyboardType="email-address"
                onChangeText={(e) => {
                  setPassword(e);
                }}
                // onBlur={handleBlur("email")}
                value={password}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={(e) => {
                  setConfirmPassword(e);
                }}
                // onBlur={handleBlur("password")}
                value={confirmPssword}
              />
            </View>
            <TouchableOpacity
              style={styles.forgotpasbutton}
              onPress={() => setModalVisible(false)}
              // disabled={!isValid}
            >
              <Text style={styles.buttonText}>Submit</Text>
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

export default Login;
