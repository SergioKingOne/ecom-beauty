import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemedIcon } from "./ThemedIcon";
import { ThemedView } from "./ThemedView";

interface CustomHeaderProps {
  options: {
    title: string;
  };
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({ options }) => {
  const navigation = useNavigation();

  return (
    <ThemedView style={styles.header}>
      {navigation.canGoBack() && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ThemedIcon name="chevron-back" size={32} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{options.title}</Text>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    paddingHorizontal: 10,
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
