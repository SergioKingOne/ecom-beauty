import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const safeColorScheme = colorScheme ?? "light";

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "(home)") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "(favorites)") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "(products)") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "(profile)") {
            iconName = focused ? "person" : "person-outline";
          } else {
            iconName = "alert";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor:
          Colors[safeColorScheme]?.primary ?? "defaultColor",
        tabBarInactiveTintColor: Colors[safeColorScheme].secondary,
        tabBarStyle: { backgroundColor: Colors[safeColorScheme].background },
        headerStyle: { backgroundColor: Colors[safeColorScheme].background },
        headerTintColor: Colors[safeColorScheme].text,
        headerTitleStyle: { fontFamily: "Glorious" },
        headerShown: false,
      })}
    >
      <Tabs.Screen name="(home)" options={{ title: "Home" }} />
      <Tabs.Screen name="(favorites)" options={{ title: "Favorites" }} />
      <Tabs.Screen name="(products)" options={{ title: "Products" }} />
      <Tabs.Screen name="(profile)" options={{ title: "Profile" }} />
    </Tabs>
  );
}
