import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Animated, { SharedValue } from "react-native-reanimated";

// LOCALE IMPORTS
import { NewsDataType } from "@/types";
import { Colors } from "@/constants/Colors";

type Props = {
  items: NewsDataType[];
  paginationIndex: number;
  scrollX: SharedValue<number>;
};

const Pagination = (props: Props) => {
  return (
    <View style={styles.container}>
      {props.items.map((_, index) => {
        return (
          <Animated.View
            style={[
              styles.dot,
              {
                backgroundColor:
                  props.paginationIndex === index
                    ? Colors.tint
                    : Colors.darkGrey,
              },
            ]}
            key={index}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    backgroundColor: "#333",
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 2,
  },
});

export default Pagination;
