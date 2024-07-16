import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
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
          <BouncyCheckbox
            size={25}
            fillColor="#007BFF"
            unFillColor="#FFFFFF"
            iconStyle={{ borderColor: "#007BFF" }}
            onPress={(isChecked: boolean) => setWithPhoto(isChecked)}
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
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default ReviewListComponent;
