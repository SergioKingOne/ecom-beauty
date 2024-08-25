import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import ThemedScrollView from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/app/(auth)/AuthContext";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const DB_URL = process.env.EXPO_PUBLIC_DB_URL;

const getAuthToken = async () => {
  return await SecureStore.getItemAsync("userToken");
};

export const UserProfile: React.FC = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = await getAuthToken();
      const response = await axios.get(`${DB_URL}/api/v1/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!user) {
    return <ThemedText>Loading...</ThemedText>;
  }

  return (
    <ThemedScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: user.profilePicture || "https://via.placeholder.com/150",
          }}
          style={styles.profilePic}
        />
        <ThemedText
          style={styles.name}
        >{`${user.firstName} ${user.lastName}`}</ThemedText>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Recent Activity</ThemedText>
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
            router.push("/myOrders");
          }}
        >
          <Ionicons
            name="receipt-outline"
            size={24}
            color={Colors.light.tint}
          />
          <Text style={styles.settingsText}>My Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            router.push("/settings");
          }}
        >
          <Ionicons
            name="settings-outline"
            size={24}
            color={Colors.light.tint}
          />
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color={Colors.light.tint}
          />
          <Text style={styles.settingsText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ThemedScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
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
