import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { CustomCheckBox } from "./PayMethod";

const addresses = [
  {
    id: "1",
    name: "Jane Doe",
    address: "3 Newbridge Court\nChino Hills, CA 91709, United States",
    isDefault: true,
  },
  {
    id: "2",
    name: "John Doe",
    address: "3 Newbridge Court\nChino Hills, CA 91709, United States",
    isDefault: false,
  },
  {
    id: "3",
    name: "John Doe",
    address: "51 Riverside\nChino Hills, CA 91709, United States",
    isDefault: false,
  },
];

const Shipping = () => {
  const renderAddressItem = ({ item }: { item: (typeof addresses)[0] }) => (
    <View
      style={[styles.addressContainer, item.isDefault && styles.defaultAddress]}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.name}>{item.name}</Text>
        <TouchableOpacity>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.address}>{item.address}</Text>
      <View style={styles.checkboxContainer}>
        <CustomCheckBox isChecked={item.isDefault} onPress={() => {}} />
        <Text style={styles.checkboxLabel}>Use as the shipping address</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={addresses}
        renderItem={renderAddressItem}
        keyExtractor={(item) => item.id}
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
  addressContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  defaultAddress: {
    borderColor: "#f29c1d",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#131313",
  },
  edit: {
    fontSize: 16,
    marginBottom: 8,
    color: "#f29c1d",
  },
  address: {
    fontSize: 16,
    marginBottom: 8,
    color: "#818189",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 8,
    color: "#131313",
  },
  addButton: {
    backgroundColor: "#f29c1d",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  addButtonText: {
    fontSize: 32,
    color: "#fdfbfb",
  },
});

export default Shipping;
