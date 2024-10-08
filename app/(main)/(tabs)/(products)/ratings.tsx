import RatingComponent from "@/components/Ratings";
import ReviewListComponent from "@/components/ReviewsList";
import { ThemedText } from "@/components/ThemedText";
import { CustomHeader } from "@/components/CustomHeader";
import { Pencil } from "lucide-react-native";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const reviews = [
  {
    avatarUrl:
      "https://media.licdn.com/dms/image/D4E35AQGvxKJ86UxJDA/profile-framedphoto-shrink_100_100/0/1709308762102?e=1721703600&v=beta&t=mClQUygLhI3OH6SI2c4Q0r5j2VYgUHDdzBv_fd_UUSs",
    name: "Helene Moore",
    rating: 4,
    date: "June 5, 2019",
    reviewText:
      "The dress is great! Very classy and comfortable. It fit perfectly! I'm 5'7'' and 130 pounds. I am a 34B chest. This dress would be too long for those who are shorter but could be hemmed. I wouldn't recommend it for those big chested as I am smaller chested and it fit me perfectly. The underarms were not too wide and the dress was made well.",
  },
  {
    avatarUrl:
      "https://media.licdn.com/dms/image/C4D03AQG8b1J2Jv5QzA/profile-displayphoto-shrink_100_100/0/1517506329183?e=1721703600&v=beta&t=1g2J9j9y3Yx5hXv6vKJ0K9L5kPm9w1Y4r3j6tH3jvQc",
    name: "John Doe",
    rating: 5,
    date: "June 3, 2019",
    reviewText:
      "The dress is great! Very classy and comfortable. It fit perfectly! I'm 5'7'' and 130 pounds. I am a 34B chest. This dress would be too long for those who are shorter but could be hemmed. I wouldn't recommend it for those big chested as I am smaller chested and it fit me perfectly. The underarms were not too wide and the dress was made well.",
  },
  {
    avatarUrl:
      "https://media.licdn.com/dms/image/C4D03AQG8b1J2Jv5QzA/profile-displayphoto-shrink_100_100/0/1517506329183?e=1721703600&v=beta&t=1g2J9j9y3Yx5hXv6vKJ0K9L5kPm9w1Y4r3j6tH3jvQc",
    name: "Jane Doe",
    rating: 4.5,
    date: "June 1, 2019",
    reviewText:
      "The dress is great! Very classy and comfortable. It fit perfectly! I'm 5'7'' and 130 pounds. I am a 34B chest. This dress would be too long for those who are shorter but could be hemmed. I wouldn't recommend it for those big chested as I am smaller chested and it fit me perfectly. The underarms were not too wide and the dress was made well.",
  },
  // Add more review objects as needed
];

const Ratings = () => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <CustomHeader options={{ title: "" }} />
        <ThemedText style={styles.header}>Rating & Reviews</ThemedText>
        <RatingComponent
          rating={4.5}
          totalRatings={100}
          ratingsBreakdown={[20, 30, 50, 0, 0]}
        />
        <ReviewListComponent reviews={reviews} scrollY={scrollY} />
      </Animated.ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // TODO: handle review writing
          }}
        >
          <Pencil color="#131313" size={18} />
          <Text style={styles.buttonText}>Write a review</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 40,
    paddingBottom: 80,
  },
  header: {
    fontSize: 32,
    fontFamily: "Glorious",
    marginTop: 16,
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
  buttonContainer: {
    position: "absolute",
    bottom: 24,
    right: 24,
    zIndex: 10,
  },
  button: {
    backgroundColor: "#f29c1d",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#131313",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 6,
  },
});

export default Ratings;
