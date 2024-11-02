import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

// LOCALE IMPORTS
import { Colors } from "@/constants/Colors";
import { NewsDataType } from "@/types";

type Props = {
  index: number;
  slideItem: NewsDataType;
  scrollX: SharedValue<number>;
};

const { width, height } = Dimensions.get("screen");

const SliderItem = (props: Props) => {
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            props.scrollX.value,
            [
              (props.index - 1) * width,
              props.index * width,
              (props.index + 1) * width,
            ],
            [-width * 0.15, 0, width * 0.15],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            props.scrollX.value,
            [
              (props.index - 1) * width,
              props.index * width,
              (props.index + 1) * width,
            ],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Link href={`/news/${props.slideItem.article_id}`} asChild>
      <TouchableOpacity>
        <Animated.View style={[styles.itemWrapper, rnStyle]}>
          <Image
            source={{ uri: props.slideItem.image_url }}
            style={styles.image}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.background}
          >
            <View style={styles.infoContainer}>
              {props.slideItem.source_icon && (
                <Image
                  source={{ uri: props.slideItem.source_icon }}
                  style={styles.sourceIcon}
                />
              )}
              <Text style={styles.sourceName}>
                {props.slideItem.source_name}
              </Text>
            </View>
            <Text numberOfLines={2} style={styles.title}>
              {props.slideItem.title}
            </Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    width: width,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: width - 60,
    height: height * 0.23,
    borderRadius: 20,
  },
  background: {
    width: width - 60,
    height: height * 0.23,
    borderRadius: 20,
    position: "absolute",
    top: 0,
    left: 30,
    right: 0,
    padding: 20,
  },
  sourceIcon: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  infoContainer: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    gap: 10,
    top: 80,
    paddingHorizontal: 20,
  },
  sourceName: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: "800",
  },
  title: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "600",
    position: "absolute",
    top: 120,
    paddingHorizontal: 20,
  },
});

export default SliderItem;
