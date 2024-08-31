import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { fetchAllProducts, fetchFavoriteProducts } from "@/services/api";
import { Product } from "@/types/product";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import ThemedScrollView from "@/components/ThemedScrollView";
import { ThemedImageIcon } from "@/components/ThemedImageIcon";
import { ThemedIcon } from "@/components/ThemedIcon";

const categories = ["All", "Skincare", "Cosmetics", "Fragrance"];

export const Favorites: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const favoriteProducts = await fetchFavoriteProducts();
        setProducts(favoriteProducts);
      } catch (error) {
        console.error("Error fetching favorite products:", error);
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
    <ThemedScrollView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.logoText}>FAVORITES</ThemedText>
        <TouchableOpacity>
          <ThemedImageIcon
            source={require("@/assets/icons/search.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category &&
                  styles.selectedCategoryButtonText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.filters}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => router.push("/filters")}
        >
          <ThemedIcon name="filter" size={16} />
          <ThemedText style={styles.filterText}>Filters</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <ThemedIcon name="swap-vertical" size={16} />
          <ThemedText style={styles.filterText}>
            Price: lowest to high
          </ThemedText>
        </TouchableOpacity>
      </View>
      <View style={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </View>
    </ThemedScrollView>
  );
};

const ProductCard: React.FC<{ product: Product; style?: any }> = ({
  product,
  style,
}) => {
  return (
    <View
      style={[
        styles.productCard,
        style,
        product.stock == 0 ? { opacity: 0.5 } : {},
      ]}
      key={product.id}
    >
      <View>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        {product.discountPrice && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-20%</Text>
          </View>
        )}
        <TouchableOpacity style={styles.closeButton}>
          <Ionicons name="close" size={26} color={Colors.black} />
        </TouchableOpacity>
        {product.stock !== 0 && (
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="cart-outline" size={20} color={Colors.white} />
          </TouchableOpacity>
        )}
        {product.stock === 0 && (
          <View style={styles.soldOutOverlay}>
            <Text style={styles.soldOutText}>
              Sorry, this item is currently sold out
            </Text>
          </View>
        )}
      </View>
      <View style={styles.ratingContainer}>
        {renderStars(product.rating)}
        <Text style={styles.ratingCount}>({product.rating})</Text>
      </View>
      <View>
        <Text style={styles.productBrand}>{product.category}</Text>
        <ThemedText style={styles.productName}>{product.name}</ThemedText>
        <View style={styles.priceContainer}>
          <ThemedText
            style={
              product.discountPrice && parseFloat(product.discountPrice) > 0
                ? styles.noDiscountPrice
                : styles.price
            }
          >
            ${product.price}
          </ThemedText>
          {product.discountPrice && parseFloat(product.discountPrice) > 0 && (
            <Text style={styles.discountPrice}>
              $
              {parseFloat(product.price) -
                parseFloat(product.price) * parseFloat(product.discountPrice)}
            </Text>
          )}
        </View>
      </View>
    </View>
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
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  icon: {
    height: 24,
    width: 24,
    marginLeft: 16,
  },
  logoText: {
    fontSize: 24,
    fontFamily: "Glorious",
  },
  categoryScroll: {
    flexDirection: "row",
    marginBottom: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 5,
  },
  selectedCategoryButton: {
    backgroundColor: Colors.black,
  },
  categoryButtonText: {
    fontSize: 16,
    color: Colors.black,
  },
  selectedCategoryButtonText: {
    color: "#fff",
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 16,
    marginLeft: 5,
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
  closeButton: {
    position: "absolute",
    right: 5,
    top: 5,
    opacity: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButton: {
    position: "absolute",
    right: 0,
    bottom: -20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f29c1d",
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  soldOutOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 5,
  },
  soldOutText: {
    color: "black",
  },
  productBrand: {
    fontSize: 18,
    color: "#818189",
  },
  productName: {
    fontSize: 20,
    fontFamily: "Glorious",
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

export default Favorites;
