import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

// TODO: Implement best practices for authentication.
const AuthLayout = () => {
  return <Stack screenOptions={{ headerShown: false, animation: "none" }} />;
};

export default AuthLayout;
