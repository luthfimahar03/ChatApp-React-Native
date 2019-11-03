import React, { Component } from 'react';
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Label,
    Button,
    Text,
    View,
    Row,
} from 'native-base';

import { 
    StyleSheet,
    ToastAndroid } from 'react-native';
import * as firebase from "firebase"

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }
    }

    async login() {

        try {
            await firebase.auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password);

            console.log("Logged in");
            ToastAndroid.show('Login Success', ToastAndroid.SHORT);
            { this.props.navigation.navigate('Contact') }

            // Navigate to the Home page, the user is auto logged in

        } catch (error) {
            console.log(error.toString())
            ToastAndroid.show('Failed Login', ToastAndroid.SHORT);
        }


    }



    render() {
        return (
            <Container>
                <View>
                    <Text
                        style={styles.title}>
                        Sign In
                    </Text>
                </View>
                <Content>
                    <Form style={{ marginTop: 50 }} >
                        <Label style={styles.label}>Email</Label>
                        <Item rounded style={styles.card}>
                            <Input style={styles.input} onChangeText={(email) => this.setState({ email })} />
                        </Item>
                        <Label style={styles.label2}>Password</Label>
                        <Item rounded style={styles.card2}>
                            <Input style={styles.input} secureTextEntry onChangeText={(password) => this.setState({ password })} />
                        </Item>
                        <View style={{ width: 300, alignSelf: "center" }}>
                            <Content>
                                <Button full onPress={() => this.login()} full style={{ backgroundColor: "#27ae60", borderRadius: 30, marginTop: 30 }}>
                                    <Text style={{ fontWeight: "bold" }}>Sign In</Text>
                                </Button>
                            </Content>
                        </View>
                    </Form>
                    <Row style={styles.row}>
                        <Text style={styles.account}>Don't Have Account ?</Text>
                        <Text style={styles.signup} onPress={() => { this.props.navigation.navigate("Registration") }}> Sign Up Here</Text>
                    </Row>

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        width: 300,
        alignSelf: "center",

    },
    card2: {
        width: 300,
        alignSelf: "center",
    },

    label: {
        marginLeft: 60,
        marginBottom: 5
    },

    label2: {
        marginLeft: 60,
        marginTop: 30,
        marginBottom: 5

    },

    input: {
        marginLeft: 20
    },

    title: {
        fontSize: 40,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 40,
        fontWeight: "bold",
        marginTop: 70
    },

    account: {
        fontSize: 15,
    },

    signup: {
        fontSize: 15,
        fontWeight: "bold"
    },
    row: {
        alignSelf: "center",
        marginTop: 10
    }

});
