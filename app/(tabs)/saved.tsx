import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Stack } from "expo-router";
import { Loading, NewsItem, NoResult } from "@/components";
import { useIsFocused } from "@react-navigation/native";


const Page = () => {
  // STATES
  const [bookmarkNews, setBookmarkNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchBookmarks();
  }, [isFocused]);

  const fetchBookmarks = async () => {
    try {
      await AsyncStorage.getItem("bookmark").then(async (token) => {
        const res = JSON.parse(token);
        if (res != null && res.length > 0) {
          let queryStr = res.join(",");
          console.log("res", queryStr);
          const response = await axios.get(
            `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${queryStr}`
          );
          if (response && response.data) {
            setBookmarkNews(response.data.results);
            setLoading(false);
          }
        } else {
          setBookmarkNews([]);
          setLoading(false);
        }
      });
    } catch (error : any) {
      setError(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <NoResult error={error} />;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <View style={styles.container}>
        {loading ? (
          <Loading size={"large"} />
        ) : bookmarkNews && bookmarkNews.length === 0 ? (
          <NoResult />
        ) : (
          <FlatList
            data={bookmarkNews}
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

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});
