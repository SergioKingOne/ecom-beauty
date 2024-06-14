// app/(tabs)/favorites.tsx

import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  FlatList,
  View,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "@/components/ProductCard";
import { fetchFavoriteProducts } from "@/services/api";
import { Product } from "@/types/product";
import { StackNavigationProp } from "@react-navigation/stack";
import Colors from "@/constants/Colors";

type RootStackParamList = {
  ProductDetails: { productId: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, "ProductDetails">;

export const Favorites: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoriteProducts = await fetchFavoriteProducts();
        setFavorites(favoriteProducts);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    loadFavorites();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Favorites</Text>
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
        numColumns={1}
        contentContainerStyle={styles.flatListContent}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfbfb",
  },
  header: {
    paddingVertical: 16,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Glorious",
    color: "#131313",
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
});

export default Favorites;
