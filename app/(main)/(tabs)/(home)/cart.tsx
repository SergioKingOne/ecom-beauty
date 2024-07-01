import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

const CartScreen: React.FC = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "BIOGLOW",
      description: "Face cream with pearl effect",
      price: 60,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "GROWN ALCHEMY",
      description: "Face serum with azulene extract",
      price: 30,
      quantity: 1,
      image:
        "https://plus.unsplash.com/premium_photo-1673628167571-532a6c5f5d16?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]);
  const [promoCode, setPromoCode] = useState("");

  const handleQuantityChange = (id: number, amount: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + amount } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.header}>CART</Text>
      <ScrollView style={styles.cartItemsContainer}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{item.price}$</Text>
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(item.id, -1)}
                  disabled={item.quantity === 1}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(item.id, 1)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.trashButton}
              onPress={() => handleRemoveItem(item.id)}
            >
              <Image
                source={require("@/assets/icons/trash-bin.png")}
                style={styles.trashIcon}
              />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.promoButton}>
          <Text style={styles.promoButtonText}>Enter promo code</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.totalContainer}>
        <Text style={styles.totalPriceLabel}>Total price:</Text>
        <Text style={styles.totalPrice}>{totalPrice}$</Text>
      </View>
      <TouchableOpacity
        style={styles.payButton}
        onPress={() => router.push("/checkout")}
      >
        <Text style={styles.payButtonText}>CHECK OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfbfb",
    paddingLeft: 16,
    paddingRight: 16,
  },
  backButton: {
    position: "absolute",
    top: 34,
    left: 15,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 48,
    fontFamily: "Glorious",
    color: "#131313",
  },
  header: {
    fontSize: 24,
    fontFamily: "Glorious",
    color: "#131313",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 64,
  },
  cartItemsContainer: {
    flex: 1,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderBottomWidth: 0,
    borderBottomColor: "#ececec",
    paddingBottom: 0,
  },
  image: {
    width: 100,
    height: 100,
  },
  details: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 20,
    fontFamily: "Glorious",
    color: "#131313",
  },
  description: {
    fontSize: 14,
    color: "#818189",
  },
  priceContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  price: {
    fontSize: 16,
    fontFamily: "Glorious",
    color: "#131313",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    justifyContent: "flex-end",
  },
  quantityButton: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#131313",
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  quantityButtonText: {
    fontSize: 18,
    color: "#131313",
  },
  quantity: {
    fontSize: 18,
    fontFamily: "Glorious",
    color: "#131313",
    marginHorizontal: 4,
  },
  trashButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  trashIcon: {
    width: 24,
    height: 24,
  },
  promoButton: {
    justifyContent: "center",
    backgroundColor: "transparent",
    height: 48,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: "#131313",
  },
  promoButtonText: {
    color: "#131313",
    fontSize: 18,
    textAlign: "center",
  },
  totalContainer: {
    marginBottom: 16,
  },
  totalPriceLabel: {
    fontSize: 18,
    color: "#818189",
    textAlign: "center",
  },
  totalPrice: {
    fontSize: 34,
    fontFamily: "Glorious",
    color: "#131313",
    textAlign: "center",
  },
  payButton: {
    backgroundColor: "#131313",
    padding: 16,
    marginBottom: 32,
  },
  payButtonText: {
    color: "#fdfbfb",
    textAlign: "center",
    fontSize: 18,
  },
});

export default CartScreen;
