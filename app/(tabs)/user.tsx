// app/(tabs)/UserProfile.tsx

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";

export const UserProfile: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://example.com/profile-pic.jpg" }} // Replace with actual profile pic URL
          style={styles.profilePic}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {/* List of recent activities or orders */}
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>Order #1234 - Delivered</Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>Order #5678 - Shipped</Text>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            /* navigation.navigate("Settings") */
          }}
        >
          <Ionicons
            name="settings-outline"
            size={24}
            color={Colors.light.tint}
          />
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => console.log("Log out pressed")}
        >
          <Ionicons
            name="log-out-outline"
            size={24}
            color={Colors.light.tint}
          />
          <Text style={styles.settingsText}>Log Out</Text>
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
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontFamily: "Glorious",
    color: "#131313",
  },
  email: {
    fontSize: 16,
    color: "#818189",
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Glorious",
    color: "#131313",
    marginBottom: 10,
  },
  activityItem: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  activityText: {
    fontSize: 16,
    color: "#131313",
  },
  settingsButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  settingsText: {
    fontSize: 16,
    color: "#131313",
    marginLeft: 10,
  },
});

export default UserProfile;
