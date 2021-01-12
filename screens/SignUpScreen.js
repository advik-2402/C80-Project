import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, Modal, KeyboardAvoidingView, ScrollView } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            emailID: '',
            password: '',
            isModalVisible: false,
            firstName: '',
            lastName: '',
            address: '',
            contactNo: '',
            confirmPassword: '',
        }
    }

    showModal = () => {
        return (
            <Modal animationType="fade" transparent={true} visible={this.state.isModalVisible}>
                <View style={styles.modalContainer}>
                    <ScrollView>
                        <KeyboardAvoidingView>
                            <Text style={styles.modalTitle}>Registration</Text>
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={'First Name'}
                                maxLength={10}
                                onChangeText={(text) => {
                                    this.setState({
                                        firstName: text,
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={'Last Name'}
                                maxLength={10}
                                onChangeText={(text) => {
                                    this.setState({
                                        lastName: text,
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={'Contact No'}
                                keyboardType={"numeric"}
                                maxLength={10}
                                onChangeText={(text) => {
                                    this.setState({
                                        contactNo: text,
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={'Address'}
                                multiline={true}
                                onChangeText={(text) => {
                                    this.setState({
                                        address: text,
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={'Email ID'}
                                keyboardType={"email-address"}
                                onChangeText={(text) => {
                                    this.setState({
                                        emailID: text,
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={'Password'}
                                secureTextEntry={true}
                                onChangeText={(text) => {
                                    this.setState({
                                        password: text,
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={'Confirm Password'}
                                secureTextEntry={true}
                                onChangeText={(text) => {
                                    this.setState({
                                        confirmPassword: text,
                                    })
                                }}
                            />
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity
                                    style={styles.registerButton}
                                    onPress={() => {
                                        this.userSignup(this.state.emailID, this.state.password, this.state.confirmPassword);
                                    }}
                                    style={styles.button}>
                                    <Text style={styles.registerButtonText}>Register</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => {
                                        this.setState({
                                            isModalVisible: false,
                                        })
                                    }}>
                                    <Text style={styles.registerButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    userLogin = (emailID, password) => {
        firebase.auth().signInWithEmailAndPassword(emailID, password)
            .then((response) => {
                // Signed in 
                // ...
                this.props.navigation.navigate('HomeScreen')
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
                return Alert.alert(errorMessage);
            });
    }

    userSignup = (emailID, password, confirmPassword) => {
        if (password !== confirmPassword) {
            return Alert.alert("Password doesn't Match!\nCheck your password");
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(emailID, password)
                .then((response) => {
                    db.collection('users').add({
                        FirstName: this.state.firstName,
                        LastName: this.state.lastName,
                        ContactNo: this.state.contactNo,
                        Address: this.state.address,
                        EmailID: this.state.emailID,
                    })
                    return Alert.alert("Account Created!", " ", [{
                        text: 'okay',
                        onPress: () => {
                            this.setState({
                                isModalVisible: false,
                            })
                        }
                    }]);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
                    return Alert.alert(errorMessage);
                });

            /*setTimeout(function () {
            document.querySelector('.alert').style.display = 'none';
        }, 5000);*/
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Barter System</Text>
                </View>
                <View>
                    <TextInput
                        placeholder="abc@example.com"
                        keyboardType="email-address"
                        onChangeText={
                            (text) => {
                                this.setState({
                                    emailID: text,
                                })
                            }
                        }
                        style={styles.loginBox}
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Password"
                        onChangeText={
                            (text) => {
                                this.setState({
                                    password: text,
                                })
                            }
                        }
                        style={styles.loginBox}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            this.userLogin(this.state.emailID, this.state.password);
                        }}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                isModalVisible: true,
                            })
                            this.showModal();
                        }}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FADA5E',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginBox: {
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor: '#000000',
        fontSize: 20,
        margin: 10,
        paddingLeft: 10,
    },
    title: {
        fontSize: 65,
        fontWeight: '300',
        paddingBottom: 30,
        color: '#FC6A03'
    },
    button: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: "#ff9800",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8, },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        marginBottom: 20,
        marginTop: 20,
    },
    buttonText: {
        color: '#ffff',
        fontWeight: '200',
        fontSize: 20
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
    },
    registerButton: {
        width: 200,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30
    },
    registerButtonText: {
        color: '#ff5722',
        fontSize: 15,
        fontWeight: 'bold'
    },
    cancelButton: {
        width: 200,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    KeyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalTitle: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 30,
        color: '#ff5722',
        margin: 50
    },
    modalContainer: {
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffff",
        marginRight: 30,
        marginLeft: 30,
        marginTop: 80,
        marginBottom: 80,
    },
    formTextInput: {
        width: "75%",
        height: 35,
        alignSelf: 'center',
        borderColor: '#ffab91',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding: 10
    },
    modalBackButton: {
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10
    },

})
