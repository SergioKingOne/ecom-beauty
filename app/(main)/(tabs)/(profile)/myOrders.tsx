import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const MyOrders = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Delivered");

  const orders = [
    {
      id: "1",
      orderNumber: "1947034",
      trackingNumber: "IW3475453455",
      quantity: 3,
      totalAmount: 112,
      date: "05-12-2019",
      status: "Delivered",
    },
    {
      id: "2",
      orderNumber: "1947035",
      trackingNumber: "IW3475453456",
      quantity: 2,
      totalAmount: 75,
      date: "06-12-2019",
      status: "Processing",
    },
    {
      id: "3",
      orderNumber: "1947036",
      trackingNumber: "IW3475453457",
      quantity: 1,
      totalAmount: 45,
      date: "07-12-2019",
      status: "Cancelled",
    },
    {
      id: "4",
      orderNumber: "1947037",
      trackingNumber: "IW3475453458",
      quantity: 4,
      totalAmount: 180,
      date: "08-12-2019",
      status: "Delivered",
    },
    // Add more orders as needed
  ];

  const renderOrder = ({ item } = { item: orders[0] }) => (
    <View style={styles.orderContainer}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderTitle}>Order №{item.orderNumber}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
      </View>
      <Text style={styles.orderDetails}>
        Tracking number: {item.trackingNumber}
      </Text>
      <View style={styles.orderHeader}>
        <Text style={styles.orderDetails}>
          Quantity: <Text style={styles.orderTitle}>{item.quantity}</Text>
        </Text>
        <Text style={styles.orderDetails}>
          Total Amount:{" "}
          <Text style={styles.orderTitle}>${item.totalAmount}</Text>
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => router.push("/orderDetails")}
        >
          <Text style={styles.detailsButtonText}>Details</Text>
        </TouchableOpacity>
        <Text style={styles.orderStatus}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.header}>My Orders</ThemedText>
      <View style={styles.tabsContainer}>
        {["Delivered", "Processing", "Cancelled"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={orders.filter((order) => order.status === activeTab)}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 10,
    fontFamily: "Glorious",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 15,
  },
  tab: {
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: "#fdfbfb",
  },
  activeTab: {
    backgroundColor: "#f29c1d",
    paddingHorizontal: 20,
  },
  tabText: {
    fontSize: 16,
    color: "#818189",
  },
  activeTabText: {
    color: "#fdfbfb",
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  orderContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#131313",
  },
  orderDetails: {
    fontSize: 14,
    color: "#818189",
    marginBottom: 5,
  },
  orderDate: {
    fontSize: 16,
    color: "#818189",
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: "#fdfbfb",
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f29c1d",
  },
  detailsButtonText: {
    color: "#f29c1d",
    fontSize: 16,
  },
  orderStatus: {
    fontSize: 16,
    color: "#f29c1d",
  },
});

export default MyOrders;
