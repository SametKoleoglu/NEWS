import { View, Text, StyleSheet } from "react-native";
import React from "react";

type NoResultType = {
  error?: string;
};

const NoResult = ({ error }: NoResultType) => {
  return (
    <View style={styles.container}>
      {error && <Text>{error}</Text>}
      <Text>No Result !!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NoResult;
