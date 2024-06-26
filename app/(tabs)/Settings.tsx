import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
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
    <ThemedView style={styles.container}>
      <ThemedText style={styles.sectionTitle}>Settings</ThemedText>
      <View style={styles.sectionContainer}>
        <ThemedText style={styles.subtitle}>Personal Information</ThemedText>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Full name" />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="12/12/1989" />
      </View>
      <View style={styles.sectionContainer}>
        <ThemedText style={styles.subtitle}>Password</ThemedText>
        <TouchableOpacity>
          <Text style={styles.changeButtonText}>Change</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.sectionContainer, { marginBottom: 60 }]}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <View style={styles.sectionContainer}>
        <ThemedText style={styles.subtitle}>Notifications</ThemedText>
      </View>
      <View style={[styles.switchContainer, { marginTop: 20 }]}>
        <ThemedText style={styles.switchLabel}>Sales</ThemedText>
        <Switch
          value={isSalesEnabled}
          onValueChange={(value) => setIsSalesEnabled(value)}
          thumbColor={isSalesEnabled ? "#f29c1d" : "#fdfbfb"}
          trackColor={{
            false: "rgba(243, 176, 51, 0.2)",
            true: "rgba(243, 176, 51, 0.5)",
          }}
        />
      </View>
      <View style={styles.switchContainer}>
        <ThemedText style={styles.switchLabel}>New arrivals</ThemedText>
        <Switch
          value={isNewArrivalsEnabled}
          onValueChange={(value) => setIsNewArrivalsEnabled(value)}
          thumbColor={isNewArrivalsEnabled ? "#f29c1d" : "#fdfbfb"}
          trackColor={{
            false: "rgba(243, 176, 51, 0.2)",
            true: "rgba(243, 176, 51, 0.5)",
          }}
        />
      </View>
      <View style={styles.switchContainer}>
        <ThemedText style={styles.switchLabel}>
          Delivery status changes
        </ThemedText>
        <Switch
          value={isDeliveryStatusChangesEnabled}
          onValueChange={(value) => setIsDeliveryStatusChangesEnabled(value)}
          thumbColor={isDeliveryStatusChangesEnabled ? "#f29c1d" : "#fdfbfb"}
          trackColor={{
            false: "rgba(243, 176, 51, 0.2)",
            true: "rgba(243, 176, 51, 0.5)",
          }}
        />
      </View>
    </ThemedView>
  );
};

// Define your styles using the provided colors and font
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Glorious",
  },
  inputContainer: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Glorious",
    includeFontPadding: false,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Glorious",
    color: "#131313",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 18,
    marginBottom: 10,
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
  sectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
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
    color: "#818189",
    fontSize: 16,
    includeFontPadding: false,
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
  },
});

export default Settings;
