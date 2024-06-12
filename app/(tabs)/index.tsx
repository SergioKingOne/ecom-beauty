// app/(tabs)/index.tsx
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  FlatList,
  View,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/services/api";
import { Product } from "@/types/product";
import { StackNavigationProp } from "@react-navigation/stack";
import Colors from "@/constants/Colors";

type RootStackParamList = {
  ProductDetails: { productId: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, "ProductDetails">;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    loadProducts();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        dark: Colors.dark.background,
        light: Colors.light.background,
      }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>
          What's New?
        </ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.productsContainer}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate("ProductDetails", { productId: item.id })
              }
            />
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    margin: 16,
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.light.text,
    fontFamily: "Glorious",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  productsContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
