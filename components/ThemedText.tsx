// components/ThemedText.tsx
import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme"; // Fixed import statement

export function ThemedText(
  props: TextProps & {
    type?: "title" | "subtitle" | "default" | "defaultSemiBold";
  }
) {
  const { style, type = "default", ...otherProps } = props;
  const colorScheme = useColorScheme();

  const safeColorScheme = colorScheme ?? "light";

  const textStyles = [
    styles.default,
    { color: Colors[safeColorScheme].text },
    type === "title" && styles.title,
    type === "subtitle" && styles.subtitle,
    type === "defaultSemiBold" && styles.defaultSemiBold,
    style,
  ];

  return <Text style={textStyles} {...otherProps} />;
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    fontFamily: "Glorious",
  },
  defaultSemiBold: {
    fontSize: 16,
    fontFamily: "Glorious",
    fontWeight: "600",
  },
  title: {
    fontSize: 28,
    fontFamily: "Glorious",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Glorious",
    fontWeight: "600",
  },
});
