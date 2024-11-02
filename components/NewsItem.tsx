import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

// LOCALE IMPORTS
import { NewsDataType } from "@/types";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";

type NewsItemProps = {
  index: number;
  item: NewsDataType;
};

const NewsItem = ({ index, item }: NewsItemProps) => {
  return (
    <Link href={`/news/${item.article_id}`} asChild key={index}>
      <TouchableOpacity>
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.image_url }} style={styles.itemImage} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemCategory}>{item.category}</Text>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <View style={styles.itemSourceInfo}>
              <Image
                source={{ uri: item.source_icon }}
                style={styles.itemSourceImage}
              />
              <Text style={styles.itemSourceName}>{item.source_name}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    gap: 10,
    justifyContent: "space-between",
  },
  itemCategory: {
    color: Colors.lightGrey,
    fontSize: 12,
    textTransform: "capitalize",
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 12,
  },
  itemSourceInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  itemSourceImage: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  itemSourceName: {
    color: Colors.darkGrey,
    fontSize: 12,
    fontWeight: "400",
  },
});

export default NewsItem;
