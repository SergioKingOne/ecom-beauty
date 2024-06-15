import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import LayoutImage from "./LayoutImage"; // Import the LayoutImage component

type TitleProps = {
  name: string;
  size: number;
};

type TextProps = {
  content: string;
  size: number;
};

type LayoutProps = {
  title: TitleProps;
  text?: TextProps;
  layoutImageProps: {
    shape: ViewStyle;
    images: string[];
    imagesQty: number;
  };
};

const Layout: React.FC<LayoutProps> = ({ title, text, layoutImageProps }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: title.size }]}>{title.name}</Text>
      {text && (
        <Text style={[styles.text, { fontSize: text.size }]}>
          {text.content}
        </Text>
      )}
      <LayoutImage {...layoutImageProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    marginBottom: 10,
  },
});

export default Layout;
