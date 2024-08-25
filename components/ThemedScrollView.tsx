import React from "react";
import {
  ScrollView,
  ViewProps,
  ScrollViewProps,
  StyleSheet,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

type ColorSchemeType = keyof typeof Colors;

// Extend ViewProps to include an optional contentContainerStyle from ScrollViewProps
interface ThemedScrollViewProps extends ViewProps {
  contentContainerStyle?: ScrollViewProps["contentContainerStyle"];
}

export function ThemedScrollView({
  style,
  contentContainerStyle,
  ...otherProps
}: ThemedScrollViewProps) {
  const colorScheme = useColorScheme();

  const safeColorScheme: ColorSchemeType = colorScheme ?? "light";

  const viewStyles = [
    styles.default,
    { backgroundColor: Colors[safeColorScheme].background },
    style,
  ];

  // Pass contentContainerStyle to ScrollView
  return (
    <ScrollView
      style={viewStyles}
      contentContainerStyle={contentContainerStyle}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  default: {},
});

export default ThemedScrollView;
