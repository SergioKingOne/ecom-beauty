import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ProductsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="products" />
    </Stack>
  );
};

export default ProductsLayout;
