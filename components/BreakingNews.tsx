import {
  View,
  Text,
  StyleSheet,
  ViewToken,
  useWindowDimensions,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

// LOCALE IMPORTS
import { Colors } from "@/constants/Colors";
import { NewsDataType } from "@/types";
import SliderItem from "./SliderItem";
import Pagination from "./Pagination";
import Loading from "./Loading";

type Props = {
  data: Array<NewsDataType>;
};

const BreakingNews = (props: Props) => {
  const [Data, setData] = useState(props.data);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const interval = useRef<NodeJS.Timeout>();
  const offset = useSharedValue(0);
  const { width } = useWindowDimensions();

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      offset.value = e.contentOffset.x;
    },
  });

  useEffect(() => {
    if (isAutoPlay) {
      interval.current = setInterval(() => {
        offset.value = offset.value + width;
      }, 5000);
    } else {
      clearInterval(interval.current);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [isAutoPlay, offset, width]);

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true);
  });

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (
      viewableItems[0].index !== undefined &&
      viewableItems[0].index !== null
    ) {
      setPaginationIndex(viewableItems[0].index % props.data.length);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BreakingNews</Text>

      {Data && Data.length === 0 ? (
        <Loading size={"large"} style={{ marginVertical: 50 }} />
      ) : (
        <View style={styles.slideWrapper}>
          <Animated.FlatList
            ref={ref}
            data={Data}
            keyExtractor={(_, index) => `list_item${index}`}
            renderItem={({ item, index }) => (
              <SliderItem index={index} slideItem={item} scrollX={scrollX} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={onScrollHandler}
            scrollEventThrottle={16}
            onEndReachedThreshold={0.5}
            onEndReached={() => setData([...Data, ...props.data])}
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
            onScrollBeginDrag={() => {
              setIsAutoPlay(false);
            }}
            onScrollEndDrag={() => {
              setIsAutoPlay(true);
            }}
          />
          <Pagination
            items={props.data}
            scrollX={scrollX}
            paginationIndex={paginationIndex}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20,
  },
  slideWrapper: {
    //     flex: 1,
    //     width: "100%",
    justifyContent: "center",
  },
});

export default BreakingNews;
