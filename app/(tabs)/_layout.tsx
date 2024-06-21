import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Signup from "@/app/(tabs)/signup";
import HomeScreen from "@/app/(tabs)/index";
import FavoritesScreen from "@/app/(tabs)/favorites";
import ProductsScreen from "@/app/(tabs)/products";
import UserProfileScreen from "@/app/(tabs)/user";
import CartScreen from "@/app/(tabs)/cart";
import ProductDetailsScreen from "@/components/ProductDetails";
import Login from "@/app/(tabs)/login";
import ForgotPassword from "@/app/(tabs)/forgotPassword";
import ProductsNavigatorScreen from "@/app/(tabs)/ProductsNavigator";
import RatingsScreen from "@/app/(tabs)/Ratings";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Ratings"
        component={RatingsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  const colorScheme = useColorScheme();
  const safeColorScheme = colorScheme ?? "light";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Explore") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Products") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "User") {
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
        // remove the header from the tab navigator
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Products" component={ProductsNavigatorScreen} />
      <Tab.Screen name="User" component={UserProfileScreen} />
    </Tab.Navigator>
  );
}

function App() {
  const [fontsLoaded] = useFonts({
    Glorious: require("@/assets/fonts/GLORIOUS.otf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function SignupScreen({ navigation }: { navigation: any }) {
  return <Signup onSignup={() => navigation.replace("Main")} />;
}

function LoginScreen({ navigation }: { navigation: any }) {
  return <Login onLogin={() => navigation.replace("Main")} />;
}

function ForgotPasswordScreen({ navigation }: { navigation: any }) {
  return <ForgotPassword onForgotPassword={() => navigation.replace("Main")} />;
}

export default App;
