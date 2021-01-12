import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import db from "../config";
import firebase from "firebase";

export default class SideBar extends Component {
  render() {
    return (
      <View>
        <View>
          <DrawerItems {...this.props} />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("HomeScreen");
              firebase.auth().signOut();
            }}
          />
        </View>
      </View>
    );
  }
}
