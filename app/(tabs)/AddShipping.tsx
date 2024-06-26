import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const countries = ["United States", "Canada", "Australia"];

const AddShipping = () => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState(countries[0]);

  const handleSaveAddress = () => {
    // Handle saving address logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Adding Shipping Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Full name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="State/Province/Region"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder="Zip Code (Postal Code)"
        value={zipCode}
        onChangeText={setZipCode}
      />
      <Picker
        selectedValue={country}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
      >
        {countries.map((country, index) => (
          <Picker.Item key={index} label={country} value={country} />
        ))}
      </Picker>
      <TouchableOpacity
        style={styles.addressButton}
        onPress={() => handleSaveAddress()}
      >
        <Text style={styles.addressButtonText}>SAVE ADDRESS</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fdfbfb",
    flex: 1,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: "Glorious", // Ensure you have the font available in your project
    color: "#131313",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 18,
    marginBottom: 26,
    fontSize: 18,
    borderRadius: 3,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.5,
    elevation: 2,
  },
  addressButton: {
    backgroundColor: "#f29c1d",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  addressButtonText: {
    fontSize: 18,
    color: "#ffffff",
  },
});

export default AddShipping;
