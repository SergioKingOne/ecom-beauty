import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";
import ReviewComponent from "./Reviews";

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
        <Text style={styles.reviewCount}>{reviews.length} reviews</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={withPhoto}
            onPress={() => setWithPhoto(!withPhoto)}
            containerStyle={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>With photo</Text>
        </View>
      </View>
      <ScrollView>
        {reviews.map((review, index) => (
          <ReviewComponent key={index} {...review} />
        ))}
      </ScrollView>
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
