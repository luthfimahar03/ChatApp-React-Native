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
} from 'native-base';



import {
    StyleSheet,
    ToastAndroid,
} from 'react-native';
import * as firebase from "firebase"

export default class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            username: "",
            password: "",
            phone: ""

        }
    }

    async signup() {

        try {
            await firebase.auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password);
            const username = this.state.username

            await firebase.auth().currentUser.updateProfile({
                displayName: this.state.username
            })
            firebase.database().ref('UsersList/' + username).set({
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                phone: this.state.phone
            }).then((data) => {
                //success callback
                console.log('data ', data)
            }).catch((error) => {
                //error callback
                console.log('error ', error)
            })
            console.log("Account created");
            ToastAndroid.show('Account Created', ToastAndroid.SHORT);
            { this.props.navigation.navigate("Login") }

            // Navigate to the Home page, the user is auto logged in

        } catch (error) {
            console.log(error.toString())
        }

    }

    render() {
        console.log(this.state.email)
        return (
            <Container>
                <View>
                    <Text
                        style={styles.title}>
                        Registration
                    </Text>
                </View>
                <Content>
                    <Form style={{ marginTop: -10 }} >
                        <Label style={styles.label}>Email</Label>
                        <Item rounded style={styles.card}>
                            <Input style={styles.input} onChangeText={(email) => this.setState({ email })} />
                        </Item>
                        <Label style={styles.label}>Phone</Label>
                        <Item rounded style={styles.card}>
                            <Input style={styles.input} onChangeText={(phone) => this.setState({ phone })} />
                        </Item>
                        <Label style={styles.label}>Username</Label>
                        <Item rounded style={styles.card}>
                            <Input style={styles.input} onChangeText={(username) => this.setState({ username })} />
                        </Item>
                        <Label style={styles.label2}>Password</Label>
                        <Item rounded style={styles.card2}>
                            <Input style={styles.input} secureTextEntry onChangeText={(password) => this.setState({ password })} />
                        </Item>
                        <View
                            style={{ width: 300, alignSelf: "center" }}>
                            <Content>
                                <Button full onPress={() => this.signup()} full style={{ backgroundColor: "#27ae60", borderRadius: 30, marginTop: 30 }}>
                                    <Text style={{ fontWeight: "bold" }}>Registration</Text>
                                </Button>
                            </Content>
                            <View style={{ flexDirection: "row", marginTop: 5, marginLeft: 100 }}>
                                <Text>Already Account ? </Text>
                                <Text onPress={() => { this.props.navigation.navigate("Login") }} style={{fontWeight: "bold"}}>Sign In</Text>
                            </View>
                        </View>
                    </Form>
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
        marginBottom: 5,
        marginTop: 10
    },

    label2: {
        marginLeft: 60,
        marginTop: 10,
        marginBottom: 5

    },

    input: {
        marginLeft: 20
    },

    title: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 40,
        fontWeight: "bold",
        marginTop: 30
    }

});
