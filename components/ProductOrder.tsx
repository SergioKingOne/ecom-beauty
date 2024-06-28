import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface ProductOrderProps {
  imageUrl: string;
  name: string;
  brand: string;
  units: number;
  price: number;
}

const ProductOrder: React.FC<ProductOrderProps> = ({
  imageUrl,
  name,
  brand,
  units,
  price,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.detailText}>
          Units: <Text style={styles.boldText}>{units}</Text>
        </Text>
      </View>
      <Text style={styles.price}>{price}$</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  brand: {
    color: "#888",
    fontSize: 14,
    marginVertical: 2,
  },
  detailText: {
    fontSize: 14,
    color: "#333",
  },
  boldText: {
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-end",
    marginRight: 15,
    marginBottom: 15,
  },
});

export default ProductOrder;
