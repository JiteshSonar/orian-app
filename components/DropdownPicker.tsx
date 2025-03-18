// TextFieldDropdown.js
import React,{useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const TextFieldDropdown = ({
  label,
  items,
  selectedValue,
  onValueChange,
  placeholder = "Select an option...",
  searchable = true,
  style = {},
  labelStyle = {},
  containerStyle = {}
}) => {
  const [open, setOpen] = useState(false);
  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>} {/* Display the label */}
      
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        items={items}
        value={selectedValue}
        setValue={onValueChange}
        placeholder={placeholder}
        
        searchable={searchable} // Enables searching
        containerStyle={{
          height: 50,
          borderWidth: 1,
          borderColor: '#d3d3d3',
          borderRadius: 5,
          ...style,
        }}
        style={{
          backgroundColor: '#fafafa',
          borderColor: '#d3d3d3',
          borderWidth: 1,
          borderRadius: 5,
        }}
        dropDownStyle={{
          backgroundColor: '#fafafa',
          borderColor: '#d3d3d3',
        }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        labelStyle={{
          fontSize: 14,
          color: '#333',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20, // space between different dropdowns
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500'
  },
});

export default TextFieldDropdown;
