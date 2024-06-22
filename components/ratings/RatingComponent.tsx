import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo, otherwise use a compatible icon library
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

// Sample rating breakdown
const ratingBreakdown = [
  { stars: 5, count: 12 },
  { stars: 4, count: 5 },
  { stars: 3, count: 4 },
  { stars: 2, count: 2 },
  { stars: 1, count: 0 },
];

const Ratings = () => {
  const renderRatingBreakdown = () => (
    <View style={styles.breakdownContainer}>
      {ratingBreakdown.map((item) => (
        <View key={item.stars} style={styles.breakdownRow}>
          <View style={styles.starsRow}>
            {[...Array(item.stars)].map((_, i) => (
              <Ionicons key={i} name="star" size={16} color="#f29c1d" />
            ))}
          </View>
          <View style={styles.barContainer}>
            <View
              style={[styles.bar, { width: `${(item.count / 12) * 100}%` }]}
            />
          </View>
          <Text style={styles.ratingCount}>{item.count}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.overallRatingContainer}>
        <ThemedText style={styles.overallRating}>4.3</ThemedText>
        <Text style={styles.ratingText}>23 ratings</Text>
      </View>
      {renderRatingBreakdown()}

      <TouchableOpacity style={styles.reviewButton}>
        <Text style={styles.reviewButtonText}>Write a review</Text>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontFamily: "Glorious", // Make sure to load this font in your project
    color: "#131313",
  },
  overallRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  overallRating: {
    fontSize: 48,
    fontFamily: "Glorious",
  },
  ratingText: {
    fontSize: 16,
    color: "#818189",
    marginLeft: 8,
  },
  breakdownContainer: {
    marginBottom: 16,
  },
  breakdownRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  starsRow: {
    flexDirection: "row",
    width: 80,
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginHorizontal: 8,
  },
  bar: {
    height: "100%",
    backgroundColor: "#f44336",
    borderRadius: 4,
  },
  ratingCount: {
    width: 24,
    textAlign: "right",
    color: "#131313",
  },
  reviewsList: {
    paddingBottom: 16,
  },
  reviewContainer: {
    flexDirection: "row",
    marginVertical: 8,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  reviewContent: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#131313",
  },
  reviewDate: {
    fontSize: 14,
    color: "#818189",
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    color: "#131313",
  },
  reviewButton: {
    backgroundColor: "#f29c1d",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 16,
  },
  reviewButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Ratings;
