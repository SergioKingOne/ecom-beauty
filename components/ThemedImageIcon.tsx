import React from "react";
import { Image, ImageProps } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

type ColorSchemeType = keyof typeof Colors;

export function ThemedImageIcon(props: ImageProps) {
  const { style, ...otherProps } = props;
  const colorScheme = useColorScheme();

  const safeColorScheme: ColorSchemeType = colorScheme ?? "light";

  const iconStyles = [{ tintColor: Colors[safeColorScheme].text }, style];

  return <Image style={iconStyles} {...otherProps} />;
}
