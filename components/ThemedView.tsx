// components/ThemedView.tsx
import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

type ColorSchemeType = keyof typeof Colors;

export function ThemedView(props: ViewProps) {
  const { style, ...otherProps } = props;
  const colorScheme = useColorScheme();

  const safeColorScheme: ColorSchemeType = colorScheme ?? "light";

  const viewStyles = [
    styles.default,
    { backgroundColor: Colors[safeColorScheme].background },
    style,
  ];

  return <View style={viewStyles} {...otherProps} />;
}

const styles = StyleSheet.create({
  default: {
    flex: 1,
    padding: 16,
  },
});
