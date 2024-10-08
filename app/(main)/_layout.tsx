import React from "react";
import { Stack } from "expo-router";

const MainLayout = () => {
  return <Stack screenOptions={{ headerShown: false, animation: "none" }} />;
};

export default MainLayout;
