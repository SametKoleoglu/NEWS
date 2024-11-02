import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";

// LOCALE IMPORTS
import newsCategoryList from "@/constants/Categories";
import { Colors } from "@/constants/Colors";

type Props = {
  onCategoryChanged: (category: string) => void;
};

const Categories = (props: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<TouchableOpacity[] | null[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectCategory = (index: number) => {
    const selected = itemRef.current[index];
    setActiveIndex(index);

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 20, y: 0, animated: true });
    });

    props.onCategoryChanged(newsCategoryList[index].slug);
  };

  return (
    <View>
      <Text style={styles.title}>Trending Right Now</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.itemsWrapper}
      >
        {newsCategoryList.map((item, index) => (
          <TouchableOpacity
            key={index}
            ref={(e) => (itemRef.current[index] = e)}
            style={[styles.item, activeIndex === index && styles.itemActive]}
            onPress={() => handleSelectCategory(index)}
          >
            <Text
              style={[
                styles.itemText,
                activeIndex === index && { color: Colors.white },
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20,
  },
  itemsWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 20,
    marginBottom: 10,
  },
  item: {
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  itemActive: {
    backgroundColor: Colors.tint,
    borderColor: Colors.tint,
  },
  itemText: {
    fontSize: 14,
    color: Colors.darkGrey,
    letterSpacing: 0.5,
  },
});

export default Categories;
