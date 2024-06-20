import { Review } from "@/types/Review";
import React from "react";
import { View, Text, StyleSheet, FlatList, Image, Button } from "react-native";
import RatingComponent from "@/components/ratings/RatingComponent";
// Sample data
const reviews = [
  {
    id: "1",
    user: "Helene Moore",
    date: "June 5, 2019",
    rating: 4,
    review: `The dress is great! Very classy and comfortable. It fit perfectly! I'm 5'7" and 130 pounds. I am a 34B chest. This dress would be too long for those who are shorter but could be hemmed. I wouldn't recommend it for those big chested as I am smaller chested and it fit me perfectly. The underarms were not too wide and the dress was made well.`,
    avatar: "https://via.placeholder.com/50", // Placeholder for the avatar image
  },
];

const Ratings = () => {
  const renderReview = ({ item }: { item: Review }) => (
    <View style={styles.reviewContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.reviewContent}>
        <Text style={styles.userName}>{item.user}</Text>
        <Text style={styles.reviewDate}>{item.date}</Text>
        <Text style={styles.reviewText}>{item.review}</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rating & Reviews</Text>
      <RatingComponent />
      <FlatList
        data={reviews}
        renderItem={renderReview}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.reviewsList}
      />
      <Button
        title="Write a review"
        onPress={() => {
          /* Handle review writing */
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fdfbfb",
  },
  header: {
    fontSize: 24,
    fontFamily: "Glorious", // Make sure to load this font in your project
    color: "#131313",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  ratingText: {
    fontSize: 48,
    fontFamily: "Glorious",
    color: "#f29c1d",
  },
  ratingSubText: {
    fontSize: 16,
    color: "#818189",
    marginLeft: 8,
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
});

export default Ratings;
