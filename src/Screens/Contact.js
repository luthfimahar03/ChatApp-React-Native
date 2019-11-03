import React, { Component } from 'react';
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    Thumbnail,
    Text,
} from 'native-base';
import {
    StyleSheet,
    FlatList
} from 'react-native';

import * as firebase from "firebase"
export default class Contact extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: [],
            userf: []
        }
    }

    async componentDidMount() {
        let userf = await firebase.auth().currentUser;
        await this.setState({
            userf
        })
        let arraydata = []
        firebase.database().ref('UsersList').on('value', (data) => {
            Object.values(data.val()).map(function (key) {
                if (key.username != userf.displayName) {
                    arraydata.push(key)
                }
            });
            this.setState({
                user: arraydata
            })
        })
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: "white", borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                    <Body style={{ alignItems: "center" }}>
                        <Title style={{ color: "black" }}>My Contact</Title>
                    </Body>

                </Header>

                <Content>
                    <FlatList
                        data={this.state.user}
                        renderItem={({ item, key }) => {
                            let data = JSON.parse(JSON.stringify(item))
                            return (
                                <List>
                                    <ListItem avatar button={true} onPress={() => this.props.navigation.navigate("Chats", {
                                        username: data.username,
                                        phone: data.phone,
                                        email: data.email
                                    })}>
                                        <Left>
                                            <Thumbnail source={{uri:`https://ui-avatars.com/api/?background=d88413&color=FFF&name=${data.username}`}} />
                                        </Left>
                                        <Body>
                                            <Text>{data.username}</Text>
                                            <Text note>Di rumah</Text>
                                        </Body>
                                        <Right/>
                                    </ListItem>
                                </List>

                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    Right: {
        marginLeft: 50
    },
    Text: {
        paddingLeft: 10
    }
})