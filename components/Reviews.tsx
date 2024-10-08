import React, { forwardRef } from "react";
import { View, Text, StyleSheet, Image, ViewStyle } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Avatar, Button } from "react-native-elements";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

export interface ReviewProps {
  avatarUrl: string;
  name: string;
  rating: number;
  date: string;
  reviewText: string;
  style?: ViewStyle;
}

const ReviewComponent = forwardRef<View, ReviewProps>(
  ({ avatarUrl, name, rating, date, reviewText, style }, ref) => {
    const renderStars = (count: number) => {
      let stars = [];
      for (let i = 0; i < 5; i++) {
        stars.push(
          <FontAwesome
            key={i}
            name={i < count ? "star" : "star-o"}
            size={16}
            color={i < count ? "#f29c1d" : "#ccc"}
          />
        );
      }
      return <View style={styles.stars}>{stars}</View>;
    };

    return (
      <ThemedView style={[styles.container, style]}>
        <View style={styles.header}>
          <Avatar
            rounded
            source={{ uri: avatarUrl }}
            size="medium"
            containerStyle={styles.avatar}
          />
          <View style={styles.headerText}>
            <ThemedText style={styles.name}>{name}</ThemedText>
            {renderStars(rating)}
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
        <ThemedText style={styles.reviewText}>{reviewText}</ThemedText>
        <View style={styles.footer}>
          <Button
            title=""
            type="clear"
            icon={<FontAwesome name="thumbs-up" size={16} color="#f29c1d" />}
            titleStyle={styles.helpfulText}
            buttonStyle={styles.helpfulButton}
          />
        </View>
      </ThemedView>
    );
  }
);

ReviewComponent.displayName = "ReviewComponent";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    marginRight: 10,
  },
  headerText: {
    flexDirection: "column",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
  },
  stars: {
    flexDirection: "row",
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: "#555",
  },
  reviewText: {
    fontSize: 14,
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  helpfulButton: {
    padding: 0,
  },
  helpfulText: {
    color: "#818189",
    marginLeft: 5,
  },
});

export default ReviewComponent;
