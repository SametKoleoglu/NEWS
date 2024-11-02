import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";

// LOCALE IMPORTS
import { useNewsCategories } from "@/hooks/useNewsCategories";
import { useNewsCountries } from "@/hooks/useNewsCountries";
import CheckBox from "./CheckBox";
import { CountryListType, NewsCategoryType } from "@/types";

type DiscoverTypeProps = {
  title: string;
  isCategory?: boolean;
  updateCategory?: (newCategory: string) => void;
  updateCountry?: (newCountry: string) => void;
  isCountry?: boolean;
};

const DiscoverType = ({
  title,
  isCategory,
  isCountry,
  updateCategory,
  updateCountry,
}: DiscoverTypeProps) => {
  const { newsCategories, toggleNewsCategory } = useNewsCategories();
  const { newsCountries, toggleNewsCountries } = useNewsCountries();

  //   STATES
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");

  if (isCategory) {
    if (updateCategory) {
      updateCategory(category);
    }
  }
  if (isCountry) {
    if (updateCountry) {
      updateCountry(country);
    }
  }

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.listContainer}>
        {isCategory &&
          newsCategories.map((item: NewsCategoryType, index) => {
            return (
              <CheckBox
                key={index}
                label={item.title}
                checked={item.selected}
                onPress={() => {
                  toggleNewsCategory(item.id);
                  setCategory(item.slug);
                }}
              />
            );
          })}
        {isCountry &&
          newsCountries.map((item: CountryListType, index) => {
            return (
              <CheckBox
                key={index}
                label={item.name}
                checked={item.selected}
                onPress={() => {
                  toggleNewsCountries(index);
                  setCountry(item.code);
                }}
              />
            );
          })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 12,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: 20,
    marginTop: 12,
  },
});

export default DiscoverType;
