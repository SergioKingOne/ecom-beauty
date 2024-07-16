import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";
import ReviewComponent from "./Reviews";
import { ThemedText } from "./ThemedText";

interface ReviewListProps {
  reviews: {
    avatarUrl: string;
    name: string;
    rating: number;
    date: string;
    reviewText: string;
  }[];
}

const ReviewListComponent: React.FC<ReviewListProps> = ({ reviews }) => {
  const [withPhoto, setWithPhoto] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.reviewCount}>
          {reviews.length} reviews
        </ThemedText>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={withPhoto}
            onPress={() => setWithPhoto(!withPhoto)}
            containerStyle={styles.checkbox}
          />
          <ThemedText style={styles.checkboxLabel}>With photo</ThemedText>
        </View>
      </View>
      <View>
        {reviews.map((review, index) => (
          <ReviewComponent key={index} {...review} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  reviewCount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    padding: 0,
    margin: 0,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default ReviewListComponent;
