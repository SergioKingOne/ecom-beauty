import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";

interface RatingComponentProps {
  rating: number;
  totalRatings: number;
  ratingsBreakdown: number[];
}

const RatingComponent: React.FC<RatingComponentProps> = ({
  rating,
  totalRatings,
  ratingsBreakdown,
}) => {
  const renderStars = (count: number) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i < count ? "star" : "star-o"}
          size={20}
          color={i < count ? "#FFD700" : "#ccc"}
        />
      );
    }
    return <View style={styles.stars}>{stars}</View>;
  };

  const renderRatingBars = () => {
    return ratingsBreakdown.map((count, index) => (
      <View key={index} style={styles.ratingRow}>
        <View style={styles.starsRow}>{renderStars(5 - index)}</View>
        <View style={styles.barContainer}>
          <View
            style={[styles.bar, { width: `${(count / totalRatings) * 100}%` }]}
          />
        </View>
        <ThemedText style={styles.count}>{count}</ThemedText>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.rating}>{rating.toFixed(1)}</ThemedText>
        <Text style={styles.totalRatings}>{totalRatings} ratings</Text>
      </View>
      {renderRatingBars()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  rating: {
    fontSize: 48,
    fontWeight: "bold",
    marginRight: 10,
  },
  totalRatings: {
    fontSize: 16,
    color: "#555",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  starsRow: {
    flexDirection: "row",
    width: 100,
  },
  barContainer: {
    flex: 1,
    height: 10,
    backgroundColor: "#eee",
    marginHorizontal: 10,
  },
  bar: {
    height: "100%",
    backgroundColor: "#ff6347",
  },
  count: {
    width: 20,
    textAlign: "center",
  },
  stars: {
    flexDirection: "row",
  },
});

export default RatingComponent;
