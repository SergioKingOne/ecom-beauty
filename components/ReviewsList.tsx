import React, { useState, forwardRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import Animated, {
  useAnimatedStyle,
  interpolate,
  SharedValue,
} from "react-native-reanimated";
import ReviewComponent, { ReviewProps } from "./Reviews";
import { ThemedText } from "./ThemedText";

interface ReviewListProps {
  reviews: ReviewProps[];
  scrollY: SharedValue<number>;
}

const ReviewListComponent: React.FC<ReviewListProps> = ({
  reviews,
  scrollY,
}) => {
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
            checkedColor="#f29c1d"
          />
          <ThemedText style={styles.checkboxLabel}>With photo</ThemedText>
        </View>
      </View>
      <View>
        {reviews.map((review, index) => (
          <AnimatedReview
            key={index}
            {...review}
            index={index}
            scrollY={scrollY}
          />
        ))}
      </View>
    </View>
  );
};

const AnimatedReviewComponentBase =
  Animated.createAnimatedComponent(ReviewComponent);

interface AnimatedReviewProps extends ReviewProps {
  index: number;
  scrollY: SharedValue<number>;
}

const AnimatedReviewComponent = forwardRef<View, AnimatedReviewProps>(
  (props, ref) => {
    const { index, scrollY, ...rest } = props;
    const animatedStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        scrollY.value,
        [index * 200, (index + 1) * 200],
        [0.3, 1],
        { extrapolateRight: "clamp" }
      );

      return {
        opacity,
      };
    });

    return (
      <AnimatedReviewComponentBase ref={ref} style={animatedStyle} {...rest} />
    );
  }
);

const AnimatedReview: React.FC<AnimatedReviewProps> = (props) => {
  return <AnimatedReviewComponent {...props} />;
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
