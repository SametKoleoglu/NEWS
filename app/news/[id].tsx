import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Moment from "moment";

// LOCALE IMPORTS
import { NewsDataType } from "@/types";
import { Loading, NoResult } from "@/components";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewsDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  // STATES
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [bookmark, setBookmark] = useState<boolean>(false);

  useEffect(() => {
    getNewsDetails();
  }, []);

  useEffect(() => {
    if (!loading) {
      renderBookmark(news[0].article_id);
    }
  }, [loading]);

  const getNewsDetails = async () => {
    try {
      setLoading(true);
      const BASE_URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
      const response = await axios.get(BASE_URL);

      if (response && response.data) {
        setNews(response.data.results);
        setLoading(false);
      }
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const saveBookmark = async (newsId: string) => {
    setBookmark(true);
    await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);
      if (res !== null) {
        let data = res.find((value: string) => value === newsId);
        if (data == null) {
          res.push(newsId);
          AsyncStorage.setItem("bookmark", JSON.stringify(res));
          alert("News added ! 👍");
        }
      } else {
        let bookmark = [];
        bookmark.push(newsId);
        AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
        alert("News add to bookmark ! 👍");
      }
    });
  };

  const removeBookmark = async (newsId: string) => {
    setBookmark(false);
    const bookmark = await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);
      return res.filter((id: string) => id !== newsId);
    });
    await AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
    alert("News removed from bookmark ! 👍");
  };

  const renderBookmark = async (newsId: string) => {
    await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);
      if (res != null) {
        let data = res.find((value: string) => value === newsId);
        return data == null ? setBookmark(false) : setBookmark(true);
      }
    });
  };

  if (error) {
    return <NoResult error={error} />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
          title: "News Details",
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                bookmark
                  ? removeBookmark(news[0].article_id)
                  : saveBookmark(news[0].article_id)
              }
            >
              <Ionicons
                name={bookmark ? "heart" : "heart-outline"}
                size={24}
                color={bookmark ? "red" : "black"}
              />
            </TouchableOpacity>
          ),
        }}
      />
      {loading ? (
        <Loading size={"large"} />
      ) : news && news.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.container}
          style={styles.subContainer}
        >
          <Text style={styles.title}>{news[0].title}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              {Moment(news[0].pubDate).format("MMMM DD, hh:mm a")}
            </Text>
            <Text style={styles.infoText}>{news[0].source_name}</Text>
          </View>
          <Image source={{ uri: news[0].image_url }} style={styles.image} />
          {news[0].content ? (
            <Text style={styles.content}>{news[0].content}</Text>
          ) : (
            <Text style={styles.content}>{news[0].description}</Text>
          )}
        </ScrollView>
      ) : (
        <NoResult />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    gap: 20,
    paddingTop: 10,
  },
  subContainer: {
    marginHorizontal: 20,
    paddingBottom: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  infoText: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  image: {
    width: "100%",
    height: "30%",
    borderRadius: 20,
  },
  content: {
    fontSize: 14,
    letterSpacing: 1,
    lineHeight: 23,
    color: Colors.darkGrey,
  },
});

export default NewsDetails;
