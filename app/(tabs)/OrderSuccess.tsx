import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import { NavigationProp } from "@react-navigation/native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

type RootStackParamList = {
  Home: undefined;
};

type OrderSuccessProps = {
  navigation: NavigationProp<RootStackParamList, "Home">;
};

const OrderSuccess: React.FC<OrderSuccessProps> = ({ navigation }) => {
  return (
    <ThemedView style={styles.container}>
      <Image
        source={require("@/assets/images/success.jpeg")}
        style={styles.image}
      />
      <ThemedText style={styles.title}>Success!</ThemedText>
      <ThemedText style={styles.subtitle}>
        Your order will be delivered soon. Thank you for choosing our app!
      </ThemedText>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>CONTINUE SHOPPING</Text>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: "Glorious",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#f29c1d",
    position: "absolute",
    bottom: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
  },
});

export default OrderSuccess;
