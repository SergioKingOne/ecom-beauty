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
import { useNavigation } from "@react-navigation/native";
import { fetchAllProducts, fetchFavoriteProducts } from "@/services/api";
import { Product } from "@/types/product";
import { StackNavigationProp } from "@react-navigation/stack";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { ProductCard } from "./products";
import Colors from "@/constants/Colors";

type RootStackParamList = {
  ProductDetails: { productId: string };
  Filter: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "ProductDetails">;

const categories = ["All", "Skincare", "Cosmetics", "Fragrance"];

export const Favorites: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );

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
      <View style={styles.header}>
        <Text style={styles.logoText}>FAVORITES</Text>
        <TouchableOpacity>
          <Image
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
          onPress={() => navigation.navigate("Filter")}
        >
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
          <ProductCard key={product.id} product={product} />
        ))}
      </View>
    </ScrollView>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
  },
  icon: {
    height: 24,
    width: 24,
    marginLeft: 16,
  },
  logoText: {
    fontSize: 24,
    fontFamily: "Glorious",
    color: "#131313",
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

export default Favorites;
