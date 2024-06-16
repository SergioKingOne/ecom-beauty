// app/(tabs)/products.tsx

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { fetchAllProducts } from "@/services/api";
import { Product } from "@/types/product";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await fetchAllProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.orange} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Explore Catalog</Text>
      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={16} color={Colors.black} />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="swap-vertical" size={16} color={Colors.black} />
          <Text style={styles.filterText}>Price: lowest to high</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.productGrid}>
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <View>
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />
              {product.discountPrice && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-20%</Text>
                </View>
              )}
              <TouchableOpacity style={styles.favoriteButton}>
                <Ionicons name="heart-outline" size={16} color={Colors.black} />
              </TouchableOpacity>
            </View>
            <View style={styles.ratingContainer}>
              {renderStars(product.rating)}
              <Text style={styles.ratingCount}>({product.rating})</Text>
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productBrand}>{product.category}</Text>
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.priceContainer}>
                {product.discountPrice && (
                  <Text style={styles.discountPrice}>
                    ${product.discountPrice}
                  </Text>
                )}
                <Text style={styles.price}>${product.price}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <View style={styles.stars}>
      {[...Array(fullStars)].map((_, index) => (
        <Ionicons key={index} name="star" size={14} color={Colors.orange} />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <Ionicons
          key={index}
          name="star-outline"
          size={14}
          color={Colors.orange}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfbfb",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontFamily: "Glorious",
    color: "#131313",
    paddingVertical: 16,
    textAlign: "center",
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    padding: 8,
    borderRadius: 4,
  },
  filterText: {
    fontSize: 14,
    fontFamily: "Glorious",
    color: "#131313",
    marginLeft: 4,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    backgroundColor: "transparent",
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: Colors.orange,
    borderRadius: 4,
    padding: 4,
  },
  discountText: {
    fontSize: 12,
    fontFamily: "Glorious",
    color: "#fff",
  },
  favoriteButton: {
    position: "absolute",
    right: 0,
    bottom: -15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    // transparency
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
    // iOS shadow properties
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    // Android shadow property
    elevation: 4,
  },
  productInfo: {
    paddingTop: 8,
  },
  productBrand: {
    fontSize: 14,
    fontFamily: "Glorious",
    color: "#818189",
  },
  productName: {
    fontSize: 16,
    fontFamily: "Glorious",
    color: "#131313",
    marginVertical: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  discountPrice: {
    fontSize: 14,
    fontFamily: "Glorious",
    color: "#818189",
    textDecorationLine: "line-through",
    marginRight: 4,
  },
  price: {
    fontSize: 16,
    fontFamily: "Glorious",
    color: "#f29c1d",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    marginTop: 8,
  },
  stars: {
    flexDirection: "row",
  },
  ratingCount: {
    fontSize: 14,
    fontFamily: "Glorious",
    color: "#818189",
    marginLeft: 4,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Products;
