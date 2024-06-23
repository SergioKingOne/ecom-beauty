import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const Checkout = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping address</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.text}>Jane Doe</Text>
          <Text style={styles.text}>3 Newbridge Court</Text>
          <Text style={styles.text}>Chino Hills, CA 91709, United States</Text>
          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment</Text>
        <View style={styles.paymentContainer}>
          <Image
            source={require("@/assets/icons/mastercard.png")}
            style={styles.paymentIcon}
          />
          <Text style={styles.text}>**** **** **** 3947</Text>
          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery method</Text>
        <View style={styles.deliveryMethods}>
          <TouchableOpacity style={styles.deliveryOption}>
            <Image
              source={require("@/assets/icons/fedex.png")}
              style={styles.deliveryIcon}
            />
            <Text style={styles.text}>2-3 days</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deliveryOption}>
            <Image
              source={require("@/assets/icons/usps.png")}
              style={styles.deliveryIcon}
            />
            <Text style={styles.text}>2-3 days</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deliveryOption}>
            <Image
              source={require("@/assets/icons/dhl.png")}
              style={styles.deliveryIcon}
            />
            <Text style={styles.text}>2-3 days</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryLine}>
          <Text style={styles.Summarytext}>Order:</Text>
          <Text
            style={[styles.SummarytextMoney, { textAlign: "right", flex: 1 }]}
          >
            112$
          </Text>
        </View>
        <View style={styles.summaryLine}>
          <Text style={styles.Summarytext}>Delivery:</Text>
          <Text
            style={[styles.SummarytextMoney, { textAlign: "right", flex: 1 }]}
          >
            15$
          </Text>
        </View>
        <View style={styles.summaryLine}>
          <Text style={styles.SummarytextFinal}>Summary:</Text>
          <Text
            style={[
              styles.SummarytextMoneyFinal,
              { textAlign: "right", flex: 1 },
            ]}
          >
            127$
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>SUBMIT ORDER</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: "#fdfbfb",
  },
  title: {
    fontSize: 24,
    fontFamily: "Glorious",
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  addressContainer: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderColor: "#f2c1d",
    borderWidth: 1,
  },
  paymentContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderColor: "#f2c1d",
    borderWidth: 1,
  },
  paymentIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  deliveryMethods: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deliveryOption: {
    alignItems: "center",
    padding: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderColor: "#f2c1d",
    borderWidth: 1,
  },
  deliveryIcon: {
    width: 40,
    height: 40,
    marginBottom: 4,
  },
  summaryContainer: {
    marginBottom: 24,
  },
  summaryLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  Summarytext: {
    fontSize: 16,
    color: "#818989",
  },
  SummarytextMoney: {
    fontSize: 16,
    color: "#131313",
  },
  SummarytextFinal: {
    fontSize: 18,
    color: "#818989",
  },
  SummarytextMoneyFinal: {
    fontSize: 18,
    color: "#131313",
  },
  text: {
    fontSize: 16,
    color: "#131313",
  },
  changeButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  changeText: {
    color: "#f29c1d",
    fontFamily: "Glorious",
  },
  submitButton: {
    backgroundColor: "#f29c1d",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 18,
    color: "#ffffff",
  },
});

export default Checkout;
