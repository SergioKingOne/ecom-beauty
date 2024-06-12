import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import HomeScreen from "@/app/(tabs)/index";
import ExploreScreen from "@/app/(tabs)/explore";

const Tab = createBottomTabNavigator();

export default function App() {
  const colorScheme = useColorScheme();

  let [fontsLoaded] = useFonts({
    Glorious: require("@/assets/fonts/GLORIOUS.otf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const safeColorScheme = colorScheme ?? "light";

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Explore") {
              iconName = focused ? "search" : "search-outline";
            } else {
              iconName = "alert"; // Make sure this is a valid icon name
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
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
