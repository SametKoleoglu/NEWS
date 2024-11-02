import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

// LOCALE IMPORTS
import { NewsDataType } from "@/types";
import Loading from "./Loading";
import NewsItem from "./NewsItem";

type NewsListProps = {
  newsList: Array<NewsDataType>;
};

const NewsList = ({ newsList }: NewsListProps) => {
  return (
    <View style={styles.container}>
      {newsList.length === 0 ? (
        <Loading size={"large"} style={{ marginTop: 200 }} />
      ) : (
        newsList.map((item, index) => {
          return <NewsItem key={index} index={index} item={item} />;
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 50,
  },
});

export default NewsList;
