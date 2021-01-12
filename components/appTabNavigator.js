import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExchangeScreen from '../screens/ExchangeScreen';

export const AppNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: <Image source={require("../assets/favicon.png")} />,
            tabBarLevel: "HomeScreen",
        }
    },
    Request_Books: {
        screen: ExchangeScreen,
        navigationOptions: {
            tabBarIcon: <Image source={require("../assets/favicon.png")} />,
            tabBarLevel: "Exchange",
        }
    }
})