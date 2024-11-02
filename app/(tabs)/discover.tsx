import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// LOCALE IMPORTS
import { DiscoverType, SearchBar } from "@/components";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

const Page = () => {
  const { top: safeTop } = useSafeAreaInsets();

  // STATES
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {}, [searchQuery, category, country]);

  const updateCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  const updateCountry = (newCountry: string) => {
    setCountry(newCountry);
  };

  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      <SearchBar setSearchQuery={setSearchQuery} />
      <DiscoverType
        title="Categories"
        isCategory
        updateCategory={updateCategory}
      />
      <DiscoverType title="Countries" isCountry updateCountry={updateCountry} />
      <Link
        href={{
          pathname: "/news/search",
          params: { query: searchQuery, category, country },
        }}
        asChild
        style={styles.searchButton}
      >
        <TouchableOpacity>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchButton: {
    marginVertical: 20,
    padding: 12,
    backgroundColor: Colors.tint,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
  },
});
