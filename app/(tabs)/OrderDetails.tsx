import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const OrderDetails = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Order №1947034</Text>
        <Text style={styles.headerTextSmall}>05-12-2019</Text>
        <Text style={styles.headerTextSmall}>
          Tracking number: IW3475453455
        </Text>
        <Text style={styles.delivered}>Delivered</Text>
      </View>
      <View style={styles.items}>
        {/* Replace with dynamic item rendering */}
        <View style={styles.item}>
          <Image style={styles.itemImage} source={{ uri: "image-url" }} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>Pullover</Text>
            <Text style={styles.itemDescription}>Mango</Text>
            <Text style={styles.itemDescription}>Color: Gray Size: L</Text>
            <Text style={styles.itemPrice}>51$</Text>
          </View>
        </View>
        {/* Repeat for other items */}
      </View>
      <View style={styles.orderInfo}>
        <Text style={styles.infoText}>Shipping Address:</Text>
        <Text style={styles.infoValue}>
          3 Newbridge Court ,Chino Hills, CA 91709, United States
        </Text>
        <Text style={styles.infoText}>Payment method:</Text>
        <Text style={styles.infoValue}>**** **** **** 3947</Text>
        <Text style={styles.infoText}>Delivery method:</Text>
        <Text style={styles.infoValue}>FedEx, 3 days, 15$</Text>
        <Text style={styles.infoText}>Discount:</Text>
        <Text style={styles.infoValue}>10%, Personal promo code</Text>
        <Text style={styles.infoText}>Total Amount:</Text>
        <Text style={styles.infoValue}>133$</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Reorder</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.feedbackButton]}>
          <Text style={styles.buttonText}>Leave feedback</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfbfb",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#dcdcdc",
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Glorious",
    color: "#131313",
  },
  headerTextSmall: {
    fontSize: 14,
    fontFamily: "Glorious",
    color: "#818189",
  },
  delivered: {
    fontSize: 14,
    fontFamily: "Glorious",
    color: "#f29c1d",
    marginTop: 10,
  },
  items: {
    padding: 20,
  },
  item: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#dcdcdc",
    paddingVertical: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: "Glorious",
    color: "#131313",
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: "Glorious",
    color: "#818189",
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: "Glorious",
    color: "#131313",
    marginTop: 5,
  },
  orderInfo: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#dcdcdc",
  },
  infoText: {
    fontSize: 14,
    fontFamily: "Glorious",
    color: "#131313",
    marginTop: 10,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: "Glorious",
    color: "#818189",
    marginTop: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  button: {
    backgroundColor: "#f29c1d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  feedbackButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Glorious",
    color: "#fff",
  },
});

export default OrderDetails;
