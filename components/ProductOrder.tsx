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
    overflow: "hidden",
    marginBottom: 15,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "cover",
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  brand: {
    color: "#888",
    fontSize: 16,
    marginVertical: 4,
  },
  detailText: {
    fontSize: 16,
    color: "#888",
  },
  boldText: {
    color: "#000",
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-end",
    marginRight: 0,
    marginBottom: 10,
  },
});

export default ProductOrder;
