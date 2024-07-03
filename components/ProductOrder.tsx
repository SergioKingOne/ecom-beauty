import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

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
        <ThemedText style={styles.name}>{name}</ThemedText>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.detailText}>
          Units: <ThemedText style={styles.boldText}>{units}</ThemedText>
        </Text>
      </View>
      <ThemedText style={styles.price}>{price}$</ThemedText>
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
