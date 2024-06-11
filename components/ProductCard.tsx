import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Product = {
  name: string;
  price: number;
};

type ProductCardProps = {
  product: Product;
  onPress: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{product.name}</Text>
    <Text style={styles.price}>${product.price}</Text>
    <Button title="View Details" onPress={onPress} />
  </View>
);

// ... rest of your code

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
});

export default ProductCard;
