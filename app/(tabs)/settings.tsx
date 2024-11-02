import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

// LOCALE IMPORTS
import { Settings } from "@/constants/Settings";
import { SettingItem } from "@/components";

const Page = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <View style={styles.container}>
        {Settings.map((item, index) => (
          <SettingItem key={index} item={item} />
        ))}
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },
});
