import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsScreen from "@/app/(tabs)/products";
import FiltersScreen from "@/app/(tabs)/filters";
import RatingsScreen from "@/app/(tabs)/Ratings";

const Stack = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Products">
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Filter"
        component={FiltersScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProductsNavigator;
