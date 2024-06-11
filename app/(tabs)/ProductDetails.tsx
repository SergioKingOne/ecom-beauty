// app/(tabs)/ProductDetails.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

type RootStackParamList = {
  ProductDetails: { productId: string };
};

type ProductDetailsRouteProp = RouteProp<RootStackParamList, "ProductDetails">;

const ProductDetailsScreen = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const { productId } = route.params;
  // Fetch product details using productId

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Product Details for {productId}</ThemedText>
      {/* Add product details content here */}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ProductDetailsScreen;
