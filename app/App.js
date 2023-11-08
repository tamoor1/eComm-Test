import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Routes, { MainScreen, Basket, Detail } from "./routes";

const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Routes.Main}
      component={MainScreen}
    />
    <Stack.Screen
      name={Routes.Detail}
      component={Detail}
    />
    <Stack.Screen
      name={Routes.Basket}
      component={Basket}
    />
  </Stack.Navigator>
);

export default Main = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  )
}