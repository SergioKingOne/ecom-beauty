import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Product } from "@/types/product";
import Colors from "@/constants/Colors";

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
    </View>
    <View style={styles.detailsContainer}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    backgroundColor: Colors.light.card,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    width: "100%",
    height: 180,
    backgroundColor: Colors.light.secondary,
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  detailsContainer: {
    padding: 16,
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Glorious",
    marginBottom: 8,
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    color: Colors.light.primary,
    marginBottom: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  buttonText: {
    color: Colors.light.card,
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default ProductCard;
