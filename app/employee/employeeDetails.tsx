import { apiService } from '@/service/service';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { RootState } from "../../store/store";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import TopBar from '@/components/TopBarWithBackNav';
import { SafeAreaView } from "react-native-safe-area-context";
import usermale from '../../assets/images/user.jpg';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const EmployeeDetail = () => {

  const id = useTypedSelector((state) => state.globalState.id);

  const [loading, setLoading] = useState(true);
  const [employe, setEmploy] = useState([]);

  const getAssetDetail = async () => {
    try {
      setLoading(true);
      const res = await apiService.getEmployDetail(id);
      setEmploy(res.employee);
    } catch (error) {
      console.error("Error fetching employ:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAssetDetail();
    console.log("employe", employe);
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <TopBar title="Asset Detail" />
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={
              usermale
              // uri: employee.profilePicture || "https://via.placeholder.com/150",
            }
            style={styles.profileImage}
          />
        </View>

        {/* Employee Name and ID */}
        <View style={styles.header}>
          <Text style={styles.name}>{employe.employeeName}</Text>
          <Text style={styles.employeeId}>Employee ID: {employe.employeeId}</Text>
        </View>

        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <Text>Email: <Text style={styles.sectionHead}>{employe.email}</Text> </Text>
          <Text>Phone: <Text style={styles.sectionHead}>{employe.phoneNumber}</Text></Text>
          <Text>Address: <Text style={styles.sectionHead}>{employe.address}</Text></Text>
          <Text>Date of Birth: <Text style={styles.sectionHead}>{new Date(employe.dateOfBirth).toLocaleDateString()}</Text></Text>
          <Text>Gender: <Text style={styles.sectionHead}>{employe.gender}</Text></Text>
        </View>

        {/* Job Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Information</Text>
          <Text>Department: <Text style={styles.sectionHead}>{employe.department}</Text></Text>
          <Text>Position: <Text style={styles.sectionHead}>{employe.position}</Text></Text>
          <Text>Salary: ₹ <Text style={styles.sectionHead}>{employe.salary}</Text></Text>
          <Text>Reporting Manager: <Text style={styles.sectionHead}>{employe.reportingManager}</Text></Text>
          <Text>Work Experience: <Text style={styles.sectionHead}>{employe.workExperience} years</Text></Text>
          <Text>Employment Type: <Text style={styles.sectionHead}>{employe.employmentType}</Text></Text>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {employe.skills?.map((skill, index) => (
              <View key={index} style={styles.skillItem}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          <Text>Name: <Text style={styles.sectionHead}>{employe.emergencyContact?.name}</Text></Text>
          <Text>Relation: <Text style={styles.sectionHead}>{employe.emergencyContact?.relation}</Text></Text>
          <Text>Phone: <Text style={styles.sectionHead}>{employe.emergencyContact?.phone}</Text></Text>
        </View>

        {/* Bank Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bank Details</Text>
          <Text>Account Number: <Text style={styles.sectionHead}>{employe.bankDetails?.accountNumber}</Text></Text>
          <Text>Bank Name: <Text style={styles.sectionHead}>{employe.bankDetails?.bankName}</Text></Text>
          <Text>IFSC Code: <Text style={styles.sectionHead}>{employe.bankDetails?.ifscCode}</Text></Text>
        </View>

        {/* Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents</Text>
          <Text>Aadhaar Number: <Text style={styles.sectionHead}>{employe.documents?.aadhaarNumber}</Text></Text>
          <Text>PAN Number: <Text style={styles.sectionHead}>{employe.documents?.panNumber}</Text></Text>
        </View>
        <View style={styles.bottomGap}>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#ffffff",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  employeeId: {
    fontSize: 16,
    color: '#888',
  },
  section: {
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#444',
  },
  sectionHead: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillItem: {
    backgroundColor: '#229799',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 8,
  },
  skillText: {
    color: '#fff',
    fontSize: 12,
  },
  bottomGap: {
    height: 50
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    // alignContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 8
  },
});

export default EmployeeDetail;
