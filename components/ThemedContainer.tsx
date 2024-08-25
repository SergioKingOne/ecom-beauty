import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

type ColorSchemeType = keyof typeof Colors;

export function ThemedContainer(props: ViewProps) {
  const { style, ...otherProps } = props;
  const colorScheme = useColorScheme();

  const safeColorScheme: ColorSchemeType = colorScheme ?? "light";

  const viewStyles = [
    styles.default,
    { backgroundColor: Colors[safeColorScheme].background },
    { borderColor: Colors[safeColorScheme].text },
    style,
  ];

  return <View style={viewStyles} {...otherProps} />;
}

const styles = StyleSheet.create({
  default: {},
});
