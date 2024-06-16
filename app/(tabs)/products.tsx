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
            <View>
              <Text style={styles.productBrand}>{product.category}</Text>
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.priceContainer}>
                <Text
                  style={
                    product.discountPrice &&
                    parseFloat(product.discountPrice) > 0
                      ? styles.noDiscountPrice
                      : styles.price
                  }
                >
                  ${product.price}
                </Text>
                {product.discountPrice &&
                  parseFloat(product.discountPrice) > 0 && (
                    <Text style={styles.discountPrice}>
                      $
                      {parseFloat(product.price) -
                        parseFloat(product.price) *
                          parseFloat(product.discountPrice)}
                    </Text>
                  )}
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
    marginBottom: 64,
  },
  productCard: {
    width: "48%",
    backgroundColor: "transparent",
    marginVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
  },
  discountBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: Colors.orange,
    borderRadius: 24,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  discountText: {
    fontSize: 18,
    fontFamily: "Glorious",
    color: "#fff",
  },
  favoriteButton: {
    position: "absolute",
    right: 0,
    bottom: -20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff",
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  productBrand: {
    fontSize: 18,
    color: "#818189",
  },
  productName: {
    fontSize: 20,
    fontFamily: "Glorious",
    color: "#131313",
    marginVertical: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  discountPrice: {
    fontSize: 20,
    fontFamily: "Glorious",
    color: Colors.orange,
  },
  noDiscountPrice: {
    fontSize: 18,
    fontFamily: "Glorious",
    color: "#818189",
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  price: {
    fontSize: 20,
    fontFamily: "Glorious",
    color: "#131313",
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  stars: {
    flexDirection: "row",
  },
  ratingCount: {
    fontSize: 12,
    fontFamily: "Glorious",
    color: "#818189",
    marginLeft: 8,
    marginTop: 3,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Products;