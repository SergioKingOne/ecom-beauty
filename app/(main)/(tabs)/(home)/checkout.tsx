import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedContainer } from "@/components/ThemedContainer";
import { ThemedOpacity } from "@/components/ThemedOpacity";
import { ThemedImageIcon } from "@/components/ThemedImageIcon";

const Checkout = () => {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Checkout</ThemedText>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Shipping address</ThemedText>
        <ThemedContainer style={styles.addressContainer}>
          <ThemedText style={styles.text}>Jane Doe</ThemedText>
          <ThemedText style={styles.text}>3 Newbridge Court</ThemedText>
          <ThemedText style={styles.text}>
            Chino Hills, CA 91709, United States
          </ThemedText>
          <TouchableOpacity
            style={styles.changeButton}
            onPress={() => router.push("/shipping")}
          >
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </ThemedContainer>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Payment</ThemedText>
        <ThemedContainer style={styles.paymentContainer}>
          <Image
            source={require("@/assets/icons/mastercard.png")}
            style={styles.paymentIcon}
          />
          <ThemedText style={styles.text}>**** **** **** 3947</ThemedText>
          <TouchableOpacity
            style={styles.changeButton}
            onPress={() => router.push("/payMethod")}
          >
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </ThemedContainer>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Delivery method</ThemedText>
        <View style={styles.deliveryMethods}>
          <ThemedOpacity style={styles.deliveryOption}>
            <Image
              source={require("@/assets/icons/fedex.png")}
              style={styles.deliveryIcon}
            />
            <ThemedText style={styles.text}>2-3 days</ThemedText>
          </ThemedOpacity>
          <ThemedOpacity style={styles.deliveryOption}>
            <Image
              source={require("@/assets/icons/usps.png")}
              style={styles.deliveryIcon}
            />
            <ThemedText style={styles.text}>2-3 days</ThemedText>
          </ThemedOpacity>
          <ThemedOpacity style={styles.deliveryOption}>
            <ThemedImageIcon
              source={require("@/assets/icons/dhl.png")}
              style={styles.deliveryIcon}
            />
            <ThemedText style={styles.text}>2-3 days</ThemedText>
          </ThemedOpacity>
        </View>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryLine}>
          <Text style={styles.Summarytext}>Order:</Text>
          <ThemedText
            style={[styles.SummarytextMoney, { textAlign: "right", flex: 1 }]}
          >
            112$
          </ThemedText>
        </View>
        <View style={styles.summaryLine}>
          <Text style={styles.Summarytext}>Delivery:</Text>
          <ThemedText
            style={[styles.SummarytextMoney, { textAlign: "right", flex: 1 }]}
          >
            15$
          </ThemedText>
        </View>
        <View style={styles.summaryLine}>
          <Text style={styles.SummarytextFinal}>Summary:</Text>
          <ThemedText
            style={[
              styles.SummarytextMoneyFinal,
              { textAlign: "right", flex: 1 },
            ]}
          >
            127$
          </ThemedText>
        </View>
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => router.push("/orderSuccess")}
      >
        <Text style={styles.submitButtonText}>SUBMIT ORDER</Text>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
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
    borderRadius: 8,
    borderWidth: 1,
  },
  paymentContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
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
    borderRadius: 8,
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
  },
  SummarytextFinal: {
    fontSize: 18,
    color: "#818989",
  },
  SummarytextMoneyFinal: {
    fontSize: 18,
  },
  text: {
    fontSize: 16,
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
