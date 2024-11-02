import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { NewsDataType } from "@/types";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { Loading, NewsItem, NoResult } from "@/components";

type Props = {};

const search = (props: Props) => {
  const { query, category, country } = useLocalSearchParams<{
    query: string;
    category: string;
    country: string;
  }>();

  //   STATES
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSearchResults();
  }, [query, category, country]);

  const getSearchResults = async () => {
    try {
      let categoryStr = "";
      let countryStr = "";
      let queryStr = "";

      if (category) {
        categoryStr = `&category=${category}`;
      }
      if (country) {
        countryStr = `&country=${country}`;
      }
      if (query) {
        queryStr = `&q=${query}`;
      }

      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=tr&image=1&removeduplicate=1&size=10${categoryStr}${countryStr}${queryStr}`;
      const response = await axios.get(URL);

      if (response && response.data) {
        setNews(response.data.results);
        setLoading(false);
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={23} color="black" />
            </TouchableOpacity>
          ),
          headerTitle: "Search Results",
        }}
      />
      <View style={styles.container}>
        {loading ? (
          <Loading size={"large"} />
        ) : news && news.length === 0 ? (
          <NoResult />
        ) : (
          <FlatList
            data={news}
            keyExtractor={(_, index) => `list_item${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <NewsItem index={index} item={item} />
            )}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});

export default search;
