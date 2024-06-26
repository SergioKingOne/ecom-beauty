import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import { NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  Home: undefined;
};

type OrderSuccessProps = {
  navigation: NavigationProp<RootStackParamList, "Home">;
};

const OrderSuccess: React.FC<OrderSuccessProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/icons/success.jpeg")}
        style={styles.image}
      />
      <Text style={styles.title}>Success!</Text>
      <Text style={styles.subtitle}>
        Your order will be delivered soon. Thank you for choosing our app!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>CONTINUE SHOPPING</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
    color: "#000",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrderSuccess;
