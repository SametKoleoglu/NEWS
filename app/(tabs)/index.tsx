import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BreakingNews,
  Categories,
  Header,
  Loading,
  NewsList,
  SearchBar,
} from "@/components";
import axios from "axios";


const Page = () => {
  const { top: safeTop } = useSafeAreaInsets();
  const KEY =process.env.EXPO_PUBLIC_API_KEY

  // STATES
  const [loading, setLoading] = useState(true);
  const [breakingNews, setBreakingNews] = useState([]);
  const [news, setNews] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getNews();
    getBreakingNews();
  }, []);
  const getBreakingNews = async () => {
    try {
      const BASE_URL = `https://newsdata.io/api/1/news?apikey=${KEY}&language=tr&image=1&removeduplicate=1&size=5`;
      const response = await axios.get(BASE_URL);

      if (response && response.data) {
        setBreakingNews(response.data.results);
        setLoading(false);
      }
    } catch (error: any) {
      console.error(error.message);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const getNews = async (category: string = "") => {
    try {
      let categoryStr = "";
      if (category.length !== 0) {
        categoryStr = `&category=${category}`;
      }
      const BASE_URL = `https://newsdata.io/api/1/news?apikey=${KEY}&language=tr&image=1&removeduplicate=1&size=10&${categoryStr}`;
      const response = await axios.get(BASE_URL);

      if (response && response.data) {
        setNews(response.data.results);
        setLoading(false);
      }
    } catch (error: any) {
      console.error(error.message);
      setErrorMessage(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const onCatChanged = (category: string) => {
    setNews([]);
    getNews(category);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.container, { paddingTop: safeTop }]}
    >
      <Header />
      <SearchBar marginHorizontal />
      {loading ? (
        <Loading size={"large"} color={"#000"} style={{ flex: 1 }} />
      ) : (
        <BreakingNews data={breakingNews} />
      )}
      <Categories onCategoryChanged={onCatChanged} />
      <NewsList newsList={news} />
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
