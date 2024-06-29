import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";

const Settings = () => {
  const [isSalesEnabled, setIsSalesEnabled] = React.useState(true);
  const [isNewArrivalsEnabled, setIsNewArrivalsEnabled] = React.useState(false);
  const [isDeliveryStatusChangesEnabled, setIsDeliveryStatusChangesEnabled] =
    React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Settings</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Full name</Text>
        <TextInput style={styles.input} placeholder="Full name" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Date of Birth</Text>
        <TextInput style={styles.input} placeholder="12/12/1989" />
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.changeButton}>
          <Text style={styles.changeButtonText}>Change</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Sales</Text>
        <Switch
          value={isSalesEnabled}
          onValueChange={(value) => setIsSalesEnabled(value)}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>New arrivals</Text>
        <Switch
          value={isNewArrivalsEnabled}
          onValueChange={(value) => setIsNewArrivalsEnabled(value)}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Delivery status changes</Text>
        <Switch
          value={isDeliveryStatusChangesEnabled}
          onValueChange={(value) => setIsDeliveryStatusChangesEnabled(value)}
        />
      </View>
    </View>
  );
};

// Define your styles using the provided colors and font
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fdfbfb",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Glorious",
    color: "#131313",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Glorious",
    color: "#131313",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#818189",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
  },
  changeButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f29c1d",
    borderRadius: 8,
  },
  changeButtonText: {
    color: "#fff",
    fontFamily: "Glorious",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Glorious",
    color: "#131313",
  },
});

export default Settings;
