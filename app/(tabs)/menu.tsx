// app/(tabs)/menu.tsx

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Colors from "@/constants/Colors";

type RootStackParamList = {
  Category: { category: string };
  Settings: undefined;
  About: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const Menu: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Menu</Text>
      <View style={styles.menuItem}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Category", { category: "Skincare" })
          }
        >
          <Text style={styles.menuText}>Skincare</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Category", { category: "Cosmetics" })
          }
        >
          <Text style={styles.menuText}>Cosmetics</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Category", { category: "Fragrance" })
          }
        >
          <Text style={styles.menuText}>Fragrance</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity onPress={() => navigation.navigate("About")}>
          <Text style={styles.menuText}>About</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfbfb",
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontFamily: "Glorious",
    color: "#131313",
    paddingVertical: 16,
    textAlign: "center",
  },
  menuItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  menuText: {
    fontSize: 18,
    fontFamily: "Glorious",
    color: "#131313",
  },
});

export default Menu;
