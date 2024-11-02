import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

// LOCALE IMPORTS
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity>
          <Image
            style={styles.userImage}
            source={{
              uri: "https://xsgames.co/randomusers/avatar.php?g=female",
            }}
          />
        </TouchableOpacity>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text>John</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={24} color={Colors.black} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },
  welcomeContainer: {
    gap: 8,
  },
  welcomeText: {
    color: Colors.darkGrey,
    fontSize: 13,
    fontWeight: "bold",
  },
});

export default Header;
