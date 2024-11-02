import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

// LOCALE IMPORTS
import { Colors } from "@/constants/Colors";

type CheckBoxProps = {
  label: string;
  checked: boolean;
  onPress?: () => void;
};

const CheckBox = ({ label, checked, onPress }: CheckBoxProps) => {
  const rnAnimatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        checked ? "rgba(239,142,82,0.1)" : "transparent",
        { duration: 150 }
      ),
      borderColor: withTiming(checked ? Colors.tint : Colors.black, {
        duration: 150,
      }),
      paddingRight: withTiming(checked ? 12 : 14, { duration: 150 }),
    };
  }, [checked]);

  const rnTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(checked ? Colors.tint : Colors.black, {
        duration: 150,
      }),
    };
  }, [checked]);

  return (
    <Animated.View
      style={[styles.container, rnAnimatedContainerStyle]}
      layout={LinearTransition.springify().mass(0.7)}
      onTouchEnd={onPress}
    >
      <Animated.Text style={[styles.label, rnTextStyle]}>{label}</Animated.Text>
      {checked && (
        <Animated.View
          style={styles.iconContainer}
          entering={FadeIn.duration(350)}
          exiting={FadeOut}
        >
          <AntDesign
            name="checkcircle"
            size={14}
            color={checked ? Colors.tint : Colors.lightGrey}
          />
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: Colors.black,
    paddingHorizontal: 16,
    borderRadius: 32,
  },
  label: {
    fontSize: 14,
    color: Colors.tint,
  },
  iconContainer: {
    marginLeft: 12,
    width: 15,
    height: 15,
  },
});

export default CheckBox;
