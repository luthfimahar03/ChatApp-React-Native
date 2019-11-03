import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {
    Text,
    Container,
    Header,
    Left,
    Button,
    Icon,
    Body,
    Col,
    Right,
} from 'native-base'

import {
    StyleSheet
} from 'react-native'

import {
    Avatar
} from 'react-native-elements'

import firebase from 'firebase'



export default class Chats extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.navigation.getParam('username'),
            phone: this.props.navigation.getParam('phone'),
            email: this.props.navigation.getParam('email'),
            messages: [],
            userf: []
        }
    }


    async componentDidMount() {
        let userf = await firebase.auth().currentUser;
        await this.setState({
            userf,
            messages: [],
        })
        await this.getMessage()
    }

    userInfo = () => {
        return {
            username: this.state.userf.displayName,
            email: this.state.userf.email,
            id: this.state.userf.uid,
            _id: this.state.userf.uid
        }
    }

    getMessage = () => {
        firebase.database().ref(`Messages/${this.props.navigation.getParam("username")}/${this.state.userf.displayName}/`).on(
            'value', (data) => {
                let arrayData = []
                data.forEach((child) => {
                    arrayData = [({
                        _id: child.key,
                        text: child.val().text,
                        createdAt: child.val().createdAt,
                        user: {
                            _id: child.val().user._id,
                            username: child.val().user.username,
                            avatar: child.val().user.avatar
                        }
                    }), ...arrayData]
                })
                this.setState({ messages: arrayData })
            })
    }

    onSend(messages = []) {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i]
            const message = {
                text,
                user: {
                    _id: this.state.userf.displayName,
                    name: "",
                },
                createdAt: firebase.database.ServerValue.TIMESTAMP
            }
            firebase.database().ref(`Messages/${this.props.navigation.getParam("username")}/${this.state.userf.displayName}/`).push(message)
            firebase.database().ref(`Messages/${this.state.userf.displayName}/${this.props.navigation.getParam("username")}/`).push(message)
        }
    }

    render() {
        const { goBack } = this.props.navigation;
        const { navigation } = this.props

        return (
            <Container>
                <Header style={styles.header} >
                    <Left>
                        <Button transparent onPress={() => goBack()}>
                            <Icon
                                name='md-arrow-round-back'
                                type="Ionicons"
                                style={{ color: "black" }} />
                        </Button>
                    </Left>
                    <Body style={{ flexDirection: "row", marginTop: 10 }}>
                        <Button style={{ paddingBottom: 5 }} transparent onPress={() => this.props.navigation.navigate("Profile", {
                            username: this.state.username,
                            phone: this.state.phone,
                            email: this.state.email,
                        }
                        )}>
                            <Avatar
                                rounded
                                source={{ uri: `https://ui-avatars.com/api/?background=d88413&color=FFF&name=${this.props.navigation.getParam("username")}` }}
                            />
                        </Button>

                        <Col style={{ marginLeft: 10 }}>
                            <Text style={{ marginTop: 0 }} >
                                {(navigation.getParam('username', 'default value'))}</Text>
                            <Text style={{ fontSize: 15 }}>Online</Text>
                        </Col>
                    </Body>
                    <Right >
                    </Right>
                </Header>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{ _id: this.state.userf.displayName }}
                />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: "white",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    }
})