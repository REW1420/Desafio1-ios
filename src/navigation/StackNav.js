import { View, Text } from "react-native";
import React from "react";
import Login from "../screens/Login";
import FacebookHome from "../screens/FacebookHome";
import GoogleHome from "../screens/GoogleHome";
import { createStackNavigator } from "@react-navigation/stack";

import GithubHome from "../screens/GithubHome";

const Stack = createStackNavigator();
export default function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={FacebookHome} />
      <Stack.Screen name="GithubHome" component={GithubHome} />
      <Stack.Screen name="GoogleHome" component={GoogleHome} />
    </Stack.Navigator>
  );
}
