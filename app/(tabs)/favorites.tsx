import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "@/components/ProductCard";
import { fetchFavoriteProducts } from "@/services/api";
import { Product } from "@/types/product";
import { StackNavigationProp } from "@react-navigation/stack";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

type RootStackParamList = {
  ProductDetails: { productId: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, "ProductDetails">;

export const Favorites: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoriteProducts = await fetchFavoriteProducts();
        setFavorites(favoriteProducts);
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    loadFavorites();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.headerText}>Favorites</ThemedText>
      </View>
      <FlatList
        data={favorites}
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
        contentContainerStyle={styles.flatListContent}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    paddingVertical: 16,
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontFamily: "Glorious",
  },
  flatListContent: {
    paddingHorizontal: 8,
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  productImage: {
    width: "100%",
    height: 150,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontFamily: "Glorious",
    fontSize: 18,
    color: "#131313",
  },
  productPrice: {
    fontSize: 16,
    color: "#f29c1d",
  },
});

export default Favorites;
