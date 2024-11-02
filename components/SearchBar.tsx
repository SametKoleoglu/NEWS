import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

// LOCALE IMPORTS
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type SearchBarProps = {
  marginHorizontal?: boolean;
  setSearchQuery?: Function;
};

const SearchBar = ({ marginHorizontal, setSearchQuery }: SearchBarProps) => {
  return (
    <View
      style={[styles.container, marginHorizontal && { marginHorizontal: 20 }]}
    >
      <View style={styles.subContainer}>
        <Ionicons name="search-outline" size={20} color={Colors.lightGrey} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={Colors.lightGrey}
          autoCapitalize="none"
          onChangeText={
            setSearchQuery ? (query) => setSearchQuery(query) : () => {}
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  subContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#E4E4E4",
    borderRadius: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.lightGrey,
  },
});

export default SearchBar;
