import React from "react";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";

type ColorSchemeType = keyof typeof Colors;

export function ThemedCategoryButton({
  category,
  selectedCategory,
  handleCategoryPress,
}: {
  category: string;
  selectedCategory: string;
  handleCategoryPress: (category: string) => void;
}) {
  const colorScheme = useColorScheme();
  const safeColorScheme: ColorSchemeType = colorScheme ?? "light";

  return (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && {
          borderColor: Colors[safeColorScheme].text,
        },
      ]}
      onPress={() => handleCategoryPress(category)}
    >
      <ThemedText style={[styles.categoryText]}>{category}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryButton: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "transparent",
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "Glorious",
  },
});
