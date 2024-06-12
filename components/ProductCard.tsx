// components/ProductCard.tsx
import React from "react";
import {
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Product } from "@/types/product";
import Colors from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigation = useNavigation<any>(); // Specify 'any' type for useNavigation to avoid type error

  const handlePress = () => {
    navigation.navigate("ProductDetails", { productId: product.id });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Button
        title="Add to cart"
        onPress={handlePress}
        color={Colors.light.primary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: Colors.light.card,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    alignItems: "center",
    flex: 1,
    margin: 8,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    fontFamily: "Glorious",
  },
  price: {
    fontSize: 16,
    color: Colors.light.secondary,
    marginBottom: 8,
  },
});

export default ProductCard;
