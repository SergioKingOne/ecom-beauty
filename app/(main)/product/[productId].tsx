import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchAllProducts, fetchProductDetails } from "@/services/api";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Product } from "@/types/product";
import { Ionicons } from "@expo/vector-icons";
import { ThemedIcon } from "@/components/ThemedIcon";
import { ProductCard } from "@/app/(main)/(tabs)/(products)/products";
import ThemedScrollView from "@/components/ThemedScrollView";
import { StackNavigationProp } from "@react-navigation/stack";
import { useLocalSearchParams, useRouter } from "expo-router";

export type RootStackParamList = {
  ProductDetails: { productId: string };
  Ratings: undefined;
};

type ProductDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProductDetails"
>;

const DropdownButton = ({
  label,
  style,
}: {
  label: string;
  style?: object;
}) => (
  <TouchableOpacity style={[styles.button, style]}>
    <ThemedText style={styles.buttonText}>{label}</ThemedText>
    <ThemedIcon name="chevron-down" size={16} />
  </TouchableOpacity>
);

const ListItem = ({ label }: { label: string }) => (
  <TouchableOpacity style={styles.listItem}>
    <ThemedText style={styles.listItemText}>{label}</ThemedText>
    <ThemedIcon name="chevron-forward" size={20} />
  </TouchableOpacity>
);

const screenWidth = Dimensions.get("window").width;
const productCardWidth = screenWidth / 2.5 - 15;

const ProductDetailsScreen: React.FC = () => {
  const navigation = useNavigation<ProductDetailsNavigationProp>();
  const router = useRouter();
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
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

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        if (typeof productId === "string") {
          const productData = await fetchProductDetails(productId);
          setProduct(productData);
        } else {
          console.error("productId is undefined or not a string");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProductDetails();
    }
  }, [productId]);

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (!product) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Product not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <ThemedView style={styles.containerOptions}>
          <DropdownButton label="Size" style={styles.sizeButton} />
          <DropdownButton label="Black" />
          <TouchableOpacity style={styles.iconButton}>
            <ThemedIcon name="heart-outline" size={24} />
          </TouchableOpacity>
        </ThemedView>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <ThemedText style={styles.title}>{product.name}</ThemedText>
            <ThemedText style={styles.price}>${product.price}</ThemedText>
          </View>
          <Text style={styles.description}>{product.description}</Text>
          <TouchableOpacity
            onPress={() => router.push(`/ratings?productId=${productId}`)}
          >
            <View style={styles.rating}>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <Ionicons
                    key={index}
                    name="star"
                    size={16}
                    color="#FFA41C"
                    style={styles.star}
                  />
                ))}
              <Text style={styles.reviewCount}>(10)</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <ListItem label="Shipping info" />
        <ListItem label="Support" />
      </View>
      <View style={styles.suggestionsContainer}>
        <ThemedText style={styles.suggestionTitle}>
          You may also like this
        </ThemedText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20, paddingLeft: 20 }}
        >
          {products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              style={{
                marginRight: index !== products.length - 1 ? 15 : 0,
                width: productCardWidth,
              }}
            />
          ))}
        </ScrollView>
      </View>
    </ThemedScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerOptions: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 10,
  },
  sizeButton: {
    borderColor: "red",
  },
  buttonText: {
    marginRight: 10,
    fontSize: 16,
  },
  iconButton: {
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#888",
    marginVertical: 5,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    marginRight: 5,
  },
  reviewCount: {
    fontSize: 14,
    color: "#888",
    marginLeft: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdfbfb",
  },
  imageContainer: {
    alignItems: "center",
  },
  productImage: {
    width: "90%",
    height: 300,
    resizeMode: "contain",
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  subTitle: {
    fontSize: 18,
    color: "#818189",
    marginVertical: 5,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  option: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    color: "#818189",
  },
  optionValue: {
    fontSize: 16,
    color: "#131313",
  },
  addButton: {
    backgroundColor: "#f29c1d",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
  },
  addButtonText: {
    color: "#fdfbfb",
    fontSize: 16,
    fontFamily: "Glorious",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.5,
    elevation: 2,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  listItemText: {
    fontSize: 16,
  },
  suggestionsContainer: {
    marginBottom: 40,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontFamily: "Glorious",
    color: "#131313",
    marginBottom: 10,
  },
  suggestionContainer: {
    padding: 10,
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 20,
  },
  productCard: {
    width: 150,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  discountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  discountBadge: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 5,
  },
  discountText: {
    color: "#fff",
    fontSize: 12,
  },
  newBadge: {
    backgroundColor: "black",
    borderRadius: 5,
    padding: 5,
  },
  newText: {
    color: "#fff",
    fontSize: 12,
  },
  suggestionProductImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
    borderRadius: 5,
    marginVertical: 10,
  },
  infoContainer: {
    alignItems: "flex-start",
  },
  brand: {
    fontSize: 12,
    color: "#888",
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  oldPrice: {
    fontSize: 12,
    color: "#888",
    textDecorationLine: "line-through",
    marginRight: 5,
  },
  suggestionPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  suggestionReviewCount: {
    fontSize: 12,
    color: "#888",
    marginLeft: 5,
  },
  favoriteButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default ProductDetailsScreen;
