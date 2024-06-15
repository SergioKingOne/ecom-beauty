import React from "react";
import { View, Image, StyleSheet, ViewStyle } from "react-native";

type LayoutProps = {
  shape: ViewStyle; // Style object for the container
  images: string[]; // Array of image URIs
  imagesQty: number; // Maximum number of images to show
};

const LayoutImage: React.FC<LayoutProps> = ({ shape, images, imagesQty }) => {
  // Logic to render images based on imagesQty
  let renderedImages = images.slice(0, imagesQty); // Limit images to imagesQty

  return (
    <View style={[styles.container, shape]}>
      {renderedImages.map((image, index) => (
        <Image key={index} source={{ uri: image }} style={styles.image} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100, // Adjust dimensions as per your layout requirements
    height: 100,
    margin: 5,
  },
});

export default LayoutImage;
