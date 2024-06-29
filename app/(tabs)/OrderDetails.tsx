import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ProductOrder from "@/components/ProductOrder";

const OrderDetails = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Order №1947034</Text>
            <Text style={styles.headerTextSmall}>05-12-2019</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.headerTextSmall}>
              Tracking number: <Text style={styles.infoText}>IW3475453455</Text>
            </Text>
            <Text style={styles.delivered}>Delivered</Text>
          </View>
          <Text style={styles.textContainer}>3 items</Text>
        </View>

        <View style={styles.items}>
          <ProductOrder
            imageUrl="https://img.freepik.com/free-photo/selfcare-products-flowers-arrangement_23-2149249576.jpg?t=st=1718250433~exp=1718254033~hmac=0368cf1ed7d61001bb58993ba0338f7d89b9a5c352f67875c15b2187a5ef7405&w=740"
            name="Perfume"
            brand="Esika"
            units={1}
            price={51}
          />
          <ProductOrder
            imageUrl="https://img.freepik.com/free-photo/selfcare-products-flowers-arrangement_23-2149249576.jpg?t=st=1718250433~exp=1718254033~hmac=0368cf1ed7d61001bb58993ba0338f7d89b9a5c352f67875c15b2187a5ef7405&w=740"
            name="Perfume"
            brand="Esika"
            units={1}
            price={51}
          />
          <ProductOrder
            imageUrl="https://img.freepik.com/free-photo/selfcare-products-flowers-arrangement_23-2149249576.jpg?t=st=1718250433~exp=1718254033~hmac=0368cf1ed7d61001bb58993ba0338f7d89b9a5c352f67875c15b2187a5ef7405&w=740"
            name="Perfume"
            brand="Esika"
            units={1}
            price={51}
          />
        </View>

        <View style={styles.orderInfo}>
          <Text style={styles.orderInfoTitle}>Order Information</Text>
          <View style={styles.infoContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.infoText}>Shipping Address:</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.infoValue}>
                3 Newbridge Court, Chino Hills, CA 91709, United States
              </Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.infoText}>Payment Method:</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.infoValue}>**** **** **** 3947</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.infoText}>Delivery method:</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.infoValue}>FedEx, 3 days, 15$</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.infoText}>Discount:</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.infoValue}>10%, Personal promo code</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.infoText}>Total Amount:</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.infoValue}>133$</Text>
            </View>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Reorder</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.feedbackButton]}>
            <Text style={styles.feedbackText}>Leave feedback</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfbfb",
    paddingTop: 40,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    color: "#131313",
  },
  headerTextSmall: {
    fontSize: 14,
    color: "#818189",
  },
  delivered: {
    fontSize: 14,
    color: "#f29c1d",
    marginTop: 10,
  },
  items: {
    marginBottom: 20,
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
    color: "#131313",
  },
  itemDescription: {
    fontSize: 14,
    color: "#818189",
  },
  itemPrice: {
    fontSize: 14,
    color: "#131313",
    marginTop: 5,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 15,
    width: "100%",
  },
  labelContainer: {
    flex: 1,
  },
  valueContainer: {
    flex: 2,
  },
  orderInfo: {
    marginBottom: 20,
  },
  orderInfoTitle: {
    fontSize: 18,
    color: "#131313",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: "#818189",
  },
  infoValue: {
    fontSize: 14,
    color: "#131313",
    flexShrink: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1,
    marginHorizontal: 15,
    alignItems: "center",
  },
  feedbackButton: {
    backgroundColor: "#f29c1d",
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
  },
  feedbackText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
});

export default OrderDetails;
