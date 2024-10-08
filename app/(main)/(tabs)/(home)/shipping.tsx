import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { CustomCheckBox } from "./payMethod";
import { StackNavigationProp } from "@react-navigation/stack";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

type RootStackParamList = {
  AddShipping: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "AddShipping">;

const initialAddresses = [
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
  const router = useRouter();
  const [addresses, setAddresses] = useState(initialAddresses);

  const toggleDefaultAddress = (selectedId: string) => {
    const updatedAddresses = addresses.map((address) => ({
      ...address,
      isDefault: address.id === selectedId,
    }));
    setAddresses(updatedAddresses);
  };

  const renderAddressItem = ({ item }: { item: (typeof addresses)[0] }) => (
    <View
      style={[styles.addressContainer, item.isDefault && styles.defaultAddress]}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ThemedText style={styles.name}>{item.name}</ThemedText>
        <TouchableOpacity>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.address}>{item.address}</Text>
      <View style={styles.checkboxContainer}>
        <CustomCheckBox
          isChecked={item.isDefault}
          onPress={() => toggleDefaultAddress(item.id)}
        />
        <Text style={styles.checkboxLabel}>Use as the shipping address</Text>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Shipping Addresses</ThemedText>
      <FlatList
        data={addresses}
        renderItem={renderAddressItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/addShipping")}
      >
        <Text style={styles.addButtonText}>+</Text>
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
  addressContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 28,
  },
  defaultAddress: {
    borderColor: "#f29c1d",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
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
    marginTop: 8,
  },
  checkboxLabel: {
    marginLeft: 8,
    color: "#131313",
  },
  addButton: {
    backgroundColor: "#f29c1d",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    alignSelf: "flex-end",
  },
  addButtonText: {
    color: "#fdfbfb",
    fontSize: 40,
    includeFontPadding: false,
  },
});

export default Shipping;
