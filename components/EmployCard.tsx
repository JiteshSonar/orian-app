import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import usermale from "../assets/images/user.jpg";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { setId } from "@/store/auth/globalStateSlice";

const EmployeeCard = ({ employ }) => {
  const navigation = useNavigation();
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <View style={styles.card}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={
            usermale
            // uri: employee.profilePicture || "https://via.placeholder.com/150",
          }
          style={styles.profileImage}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{employ.employeeName}</Text>
          <Text style={styles.position}>{employ.position}</Text>
        </View>
      </View>

      {/* Employee Details */}
      <Text style={styles.detailText}>
        Employee ID: <Text style={styles.detailValue}>{employ.employeeId}</Text>
      </Text>
      <Text style={styles.detailText}>
        Email: <Text style={styles.detailValue}>{employ.email}</Text>
      </Text>
      <Text style={styles.detailText}>
        Phone: <Text style={styles.detailValue}>{employ.phoneNumber}</Text>
      </Text>
      <Text style={styles.detailText}>
        Department: <Text style={styles.detailValue}>{employ.department}</Text>
      </Text>
      <Text style={styles.detailText}>
        Salary: <Text style={styles.detailValue}>₹ {employ.salary}</Text>
      </Text>
      <Text style={styles.detailText}>
        Joining Date:{" "}
        <Text style={styles.detailValue}>
          {new Date(employ.joiningDate).toDateString()}
        </Text>
      </Text>

      <TouchableOpacity
        style={styles.greenBtn}
        onPress={() => {
          dispatch(setId(employ.employeeId));
          navigation.navigate("employee/employeeDetails");
        }}
      >
        <Text style={styles.eVoucher}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  infoContainer: {
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  position: {
    fontSize: 14,
    color: "#666",
  },
  detailText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
  detailValue: {
    fontWeight: "bold",
    color: "#000",
  },
  greenBtn: {
    width: "100%",
    height: 40,
    backgroundColor: "#8CE8C9",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  eVoucher: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#008000",
  },
});

export default EmployeeCard;
