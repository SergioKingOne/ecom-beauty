import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

const paymentMethods = [
  {
    id: "1",
    cardType: "MasterCard",
    cardNumber: "**** **** **** 3947",
    cardHolder: "Jennyfer Doe",
    expiryDate: "05/23",
    isDefault: true,
  },
  {
    id: "2",
    cardType: "Visa",
    cardNumber: "**** **** **** 4546",
    cardHolder: "Jennyfer Doe",
    expiryDate: "11/22",
    isDefault: false,
  },
];

const PayMethod = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment methods</Text>
      <FlatList
        data={paymentMethods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <View
              style={[
                styles.card,
                item.cardType === "MasterCard"
                  ? styles.masterCard
                  : styles.visa,
              ]}
            >
              <Text style={styles.cardNumber}>{item.cardNumber}</Text>
              <Text style={styles.cardHolder}>{item.cardHolder}</Text>
              <Text style={styles.expiryDate}>{item.expiryDate}</Text>
              <Image
                style={styles.cardLogo}
                source={
                  item.cardType === "MasterCard"
                    ? require("@/assets/icons/mastercard.png")
                    : require("@/assets/icons/visa.png")
                }
              />
            </View>
            <Text style={styles.defaultText}>
              Use as default payment method
            </Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fdfbfb",
  },
  title: {
    fontSize: 24,
    fontFamily: "Glorious",
    color: "#131313",
    marginBottom: 16,
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  masterCard: {
    backgroundColor: "#131313",
  },
  visa: {
    backgroundColor: "#818189",
  },
  cardNumber: {
    fontSize: 18,
    color: "#fdfbfb",
    marginBottom: 8,
  },
  cardHolder: {
    fontSize: 14,
    color: "#fdfbfb",
  },
  expiryDate: {
    fontSize: 14,
    color: "#fdfbfb",
    marginBottom: 8,
  },
  cardLogo: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 32,
    height: 32,
  },
  defaultText: {
    fontSize: 14,
    color: "#131313",
  },
  addButton: {
    backgroundColor: "#f29c1d",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    alignSelf: "center",
  },
  addButtonText: {
    color: "#fdfbfb",
    fontSize: 24,
  },
});

export default PayMethod;
