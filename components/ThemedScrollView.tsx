// components/ThemedView.tsx
import React from "react";
import { ScrollView, ViewProps, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

type ColorSchemeType = keyof typeof Colors;

export function ThemedScrollView(props: ViewProps) {
  const { style, ...otherProps } = props;
  const colorScheme = useColorScheme();

  const safeColorScheme: ColorSchemeType = colorScheme ?? "light";

  const viewStyles = [
    styles.default,
    { backgroundColor: Colors[safeColorScheme].background },
    style,
  ];

  return <ScrollView style={viewStyles} {...otherProps} />;
}

const styles = StyleSheet.create({
  default: {},
});

export default ThemedScrollView;
