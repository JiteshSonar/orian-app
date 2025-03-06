import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

const TextField = ({
  label,
  value,
  onChange,
  placeholder,
  type,
  secureTextEntry,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label} <Text style={styles.imp}>*</Text> </Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={type === "number" ? "numeric" : "default"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: '100%'
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500'
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  imp: {
    color: 'red'
  }
});

export default TextField;
