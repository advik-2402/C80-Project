import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, Modal, KeyboardAvoidingView, ScrollView } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class ExchangeScreen extends Component {
    constructor() {
        super();
        this.state = {
            userID: firebase.auth().currentUser.email,
            itemName: '',
            reasonToRequest: '',
        }
    }

    createUniqueID = () => {
        return Math.random().toString(36).substring(7);
    }

    addRequest = (itemName, reasonToRequest) => {
        var userID = this.state.userID;
        var randomRequestID = this.createUniqueID();

        db.collection('requestItems').add({
            "userID": userID,
            "itemName": itemName,
            "reasonToRequest": reasonToRequest,
            "requestID": randomRequestID,
        })

        this.setState({
            bookName: '',
            reasonToRequest: '',
        })

        return Alert.alert("Item Request Added!");
    }

    render() {
        return (
            <View>
                <Header />
                <KeyboardAvoidingView>
                    <TextInput
                        placeholder="Item Name"
                        value={this.state.itemName}
                        onChangeText={text => {
                            this.setState({
                                bookName: text,
                            })
                        }}></TextInput>
                    <TextInput
                        placeholder="Description"
                        value={this.state.reasonToRequest}
                        multiline
                        numberOfLines={8}
                        onChangeText={text => {
                            this.setState({
                                reasonToRequest: text,
                            })
                        }}></TextInput>
                    <TouchableOpacity
                        onPress={() => {
                            this.addRequest(itemName, reasonToRequest);
                        }}>
                        <Text>Add Request</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}