import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedIcon } from "./ThemedIcon";
import { ThemedView } from "./ThemedView";
import { useRouter } from "expo-router";

interface CustomHeaderProps {
  options: {
    title: string;
  };
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({ options }) => {
  const router = useRouter();

  return (
    <ThemedView style={styles.header}>
      {router.canGoBack() && (
        <TouchableOpacity
          onPress={() => router.back()}
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
