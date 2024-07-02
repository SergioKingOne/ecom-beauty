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
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedImageIcon } from "@/components/ThemedImageIcon";
import { useColorScheme } from "@/hooks/useColorScheme";

const CartScreen: React.FC = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
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
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ThemedText style={styles.backButtonText}>←</ThemedText>
      </TouchableOpacity>
      <ThemedText style={styles.header}>CART</ThemedText>
      <ScrollView style={styles.cartItemsContainer}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <ThemedText style={styles.name}>{item.name}</ThemedText>
              <Text style={styles.description}>{item.description}</Text>
              <View style={styles.priceContainer}>
                <ThemedText style={styles.price}>{item.price}$</ThemedText>
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={[
                    styles.quantityButton,
                    {
                      borderColor: colorScheme === "light" ? "#131313" : "#fff",
                    },
                  ]}
                  onPress={() => handleQuantityChange(item.id, -1)}
                  disabled={item.quantity === 1}
                >
                  <ThemedText style={styles.quantityButtonText}>-</ThemedText>
                </TouchableOpacity>
                <ThemedText style={styles.quantity}>{item.quantity}</ThemedText>
                <TouchableOpacity
                  style={[
                    styles.quantityButton,
                    {
                      borderColor: colorScheme === "light" ? "#131313" : "#fff",
                    },
                  ]}
                  onPress={() => handleQuantityChange(item.id, 1)}
                >
                  <ThemedText style={styles.quantityButtonText}>+</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.trashButton}
              onPress={() => handleRemoveItem(item.id)}
            >
              <ThemedImageIcon
                source={require("@/assets/icons/trash-bin.png")}
                style={styles.trashIcon}
              />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          style={[
            styles.promoButton,
            {
              borderColor: colorScheme === "light" ? "#131313" : "#fff",
            },
          ]}
        >
          <ThemedText style={styles.promoButtonText}>
            Enter promo code
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.totalContainer}>
        <Text style={styles.totalPriceLabel}>Total price:</Text>
        <ThemedText style={styles.totalPrice}>{totalPrice}$</ThemedText>
      </View>
      <TouchableOpacity
        style={[
          styles.payButton,
          {
            backgroundColor: colorScheme === "light" ? "#131313" : "#f29c1d",
          },
        ]}
        onPress={() => router.push("/checkout")}
      >
        <Text style={styles.payButtonText}>CHECK OUT</Text>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  header: {
    fontSize: 24,
    fontFamily: "Glorious",
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
  },
  quantity: {
    fontSize: 18,
    fontFamily: "Glorious",
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
    textAlign: "center",
  },
  payButton: {
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
