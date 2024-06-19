import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { fetchProductDetails } from "@/services/api";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Product } from "@/types/product";
import { Ionicons } from "@expo/vector-icons";
import { ThemedIcon } from "./ThemedIcon";

export type RootStackParamList = {
  ProductDetails: { productId: string };
};

type ProductDetailsRouteProp = RouteProp<RootStackParamList, "ProductDetails">;

const DropdownButton = ({
  label,
  style,
}: {
  label: string;
  style?: object;
}) => (
  <TouchableOpacity style={[styles.button, style]}>
    <Text style={styles.buttonText}>{label}</Text>
    <Ionicons name="chevron-down" size={16} color="#000" />
  </TouchableOpacity>
);

const ListItem = ({ label }: { label: string }) => (
  <TouchableOpacity style={styles.listItem}>
    <Text style={styles.listItemText}>{label}</Text>
    <Ionicons name="chevron-forward" size={20} />
  </TouchableOpacity>
);

const ProductDetailsScreen: React.FC = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const productData = await fetchProductDetails(productId);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProductDetails();
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
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }} // Ensure this path points to the correct image URI
          style={styles.productImage}
        />
        <View style={styles.containerOptions}>
          <DropdownButton label="Size" style={styles.sizeButton} />
          <DropdownButton label="Black" />
          <TouchableOpacity style={styles.iconButton}>
            <ThemedIcon name="heart-outline" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
          </View>
          <Text style={styles.description}>{product.description}</Text>
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
        <Text style={styles.suggestionsTitle}>You can also like this</Text>
        <ScrollView horizontal>
          {/* Render suggested products here */}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfbfb",
  },
  containerOptions: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fdfbfb",
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
    color: "#000",
  },
  iconButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
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
    marginVertical: 20,
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
    color: "#000",
  },
  suggestionsContainer: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontFamily: "Glorious", // Ensure this font is properly linked in your project
    color: "#131313",
    marginBottom: 10,
  },
});

export default ProductDetailsScreen;
