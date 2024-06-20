import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Review } from "@/types/Review";

interface RatingItem {
  stars: number;
  count: number;
}

const ratingsData = [
  { stars: 5, count: 12 },
  { stars: 4, count: 5 },
  { stars: 3, count: 4 },
  { stars: 2, count: 2 },
  { stars: 1, count: 0 },
];

const RatingComponent = () => {
  const [fontsLoaded] = useFonts({
    Glorious: require("@/assets/fonts/GLORIOUS.otf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const renderRatingRow = ({ item }: { item: RatingItem }) => (
    <View style={styles.ratingRow}>
      <Text style={styles.starText}>{"★".repeat(item.stars)}</Text>
      <View style={styles.bar}>
        <View
          style={{ ...styles.filledBar, width: `${(item.count / 23) * 100}%` }}
        />
      </View>
      <Text style={styles.countText}>{item.count}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.averageRating}>4.3</Text>
      <Text style={styles.totalRatings}>23 ratings</Text>
      <FlatList
        data={ratingsData}
        renderItem={renderRatingRow}
        keyExtractor={(item) => item.stars.toString()}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131313",
    padding: 20,
  },
  averageRating: {
    fontSize: 48,
    color: "#f29c1d",
    fontFamily: "GLORIOUS",
  },
  totalRatings: {
    fontSize: 18,
    color: "#fdfbfb",
    marginBottom: 20,
  },
  list: {
    width: "100%",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  starText: {
    fontSize: 24,
    color: "#f29c1d",
    fontFamily: "GLORIOUS",
    marginRight: 10,
  },
  bar: {
    flex: 1,
    height: 10,
    backgroundColor: "#818189",
    borderRadius: 5,
    overflow: "hidden",
    marginRight: 10,
  },
  filledBar: {
    height: "100%",
    backgroundColor: "#f29c1d",
  },
  countText: {
    fontSize: 16,
    color: "#fdfbfb",
    fontFamily: "GLORIOUS",
  },
});

export default RatingComponent;
