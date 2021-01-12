import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./screens/SignUpScreen";
import { AppNavigator } from "./components/appTabNavigator";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import SideBar from "./components/sideBar";
import Settings from "./screens/settings";

export default function App() {
  return (
    <View>
      <AppContainer />
    </View>
  );
}

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppTabNavigator,
    },
    Setting: {
      screen: Settings,
    },
  },
  { contentComponent: SideBar },
  { initialRouteName: "Home" }
);
