import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import React, { useState } from "react";

// LOCALE IMPORTS
import { MaterialIcons } from "@expo/vector-icons";
import { SettingsType } from "@/types";
import { Colors } from "@/constants/Colors";

type SettingItemType = {
  item: SettingsType;
};

const SettingItem = ({ item }: SettingItemType) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleSwitch = () => setIsDarkMode((previousState) => !previousState);

  return (
    <TouchableOpacity
      style={styles.itemButton}
      disabled={item.title == "Dark Mode"}
    >
      <Text
        style={[
          styles.itemButtonText,
          item.title == "Signout" && { color: Colors.tint },
        ]}
      >
        {item.title}
      </Text>
      {item.title == "Dark Mode" ? (
        <Switch
          trackColor={{ false: Colors.black, true: Colors.tint }}
          thumbColor={isDarkMode ? Colors.black : Colors.tint}
          ios_backgroundColor={Colors.black}
          onValueChange={toggleSwitch}
          value={isDarkMode}
          style={{
            transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
            marginBottom: -15,
            marginRight: -8,
          }}
        />
      ) : (
        <MaterialIcons
          name={item.title == "Signout" ? "logout" : "chevron-right"}
          size={18}
          color={item.title == "Signout" ? Colors.tint : Colors.darkGrey}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  itemButtonText: {
    fontSize: 15,
    fontWeight: "500",
  },
});

export default SettingItem;
