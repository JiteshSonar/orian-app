import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";

const SearchableDropdown = ({ options, onOptionSelected }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showOptions, setShowOptions] = useState(false);

  const filterOptions = (text) => {
    setSearchText(text);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(text.toLowerCase())
      )
    );
    setShowOptions(true);
  };

  const onOptionPress = (option) => {
    setSearchText(option);
    onOptionSelected(option);
    setShowOptions(false);
  };

  return (
    <View>
      <View style={styles.input}>
        <TextInput
          value={searchText}
          onFocus={() => setShowOptions(true)}
          onChangeText={filterOptions}
          placeholder="Search..."
        />
      </View>

      {showOptions && (
        <View style={styles.list}>
          <ScrollView>
            {filteredOptions.map((item, index) => (
              <>
                <TouchableOpacity
                  onPress={() => onOptionPress(item)}
                  style={{ height: 40, justifyContent: "center" }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: "#f1f1f1" }}></View>
              </>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    width: "100%",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    fontSize: 14,
  },
  list: {
    position: "relative",
    height: 250,
    width: "100%",
    padding: 10,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    borderRadius: 15,
    backgroundColor: "#ffffff",
    // zIndex: 1
  },
});
export default SearchableDropdown;
