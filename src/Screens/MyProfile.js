import React, { Component } from 'react'
import {
    Container,
    Header,
    Content,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    Text,
    View,
    CardItem,
    Card,
} from 'native-base';

import {
    Image,
    StyleSheet
} from 'react-native'

import * as firebase from 'firebase'


export default class MyProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userf: [],
            phone: []
        }
    }

    async componentDidMount() {
        let userf = await firebase.auth().currentUser;
        await this.setState({
            userf,
        })
        await this.getPhone()
    }

    getPhone = () => {
        firebase.database().ref('UsersList').on('value', (data) => {
                let user = data.val()
                Object.keys(user).map(key=>{
                    this.setState({
                        phone: user[key].phone
                    })
                })
            })
    }

    render() {
        const { goBack } = this.props.navigation;
        console.log(this.state.phone)
        return (
            <Container>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent onPress={() => goBack()}>
                            <Icon
                                name='md-arrow-round-back'
                                type="Ionicons"
                                style={{ color: "black" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "black" }}>My Profile</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder contentContainerStyle={{ flexGrow: 1 }}>
                    <Card transparent >
                        <CardItem>
                            <Body>
                                <View style={{ alignSelf: 'center' }}>
                                    <Image source={{ uri: `https://ui-avatars.com/api/?background=d88413&color=FFF&name=${this.state.userf.displayName}` }} style={styles.image} />
                                </View>
                                <View style={{ marginTop: 40, height: 60 }} >
                                    <View style={styles.flex}>
                                        <Icon
                                            name="user"
                                            type="FontAwesome"
                                            style={styles.icon} />
                                        <View style={{ flexDirection: "column", marginLeft: 27 }}>
                                            <Text style={{ color: "grey" }} >
                                                Name
                                                    </Text>
                                            <Text style={{ fontSize: 17 }}>
                                                {this.state.userf.displayName}
                                            </Text>
                                            <View
                                                style={styles.line}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View style={{ marginTop: 20 }}>
                                    <View style={styles.flex}>
                                        <Icon
                                            name="phone"
                                            type="MaterialCommunityIcons"
                                            style={styles.icon} />
                                        <View style={styles.col}>
                                            <Text style={{ color: "grey" }} >
                                                Phone
                                                </Text>
                                            <Text style={{ fontSize: 17 }}>
                                                {this.state.phone}
                                            </Text>
                                            <View
                                                style={styles.line}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <View style={styles.flex}>
                                        <Icon
                                            name="email"
                                            type="MaterialCommunityIcons"
                                            style={styles.icon} />
                                        <View style={styles.col}>
                                            <Text style={{ color: "grey" }} >
                                                Email
                                                </Text>
                                            <Text style={{ fontSize: 17 }}>
                                                {this.state.userf.email}
                                            </Text>
                                            <View
                                                style={styles.line}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginTop: 20, marginLeft: -15 }}>
                                    <View style={styles.flex}>
                                        <Button transparent onPress={() => this.props.navigation.navigate("Maps")}>
                                            <Icon
                                                name='google-maps'
                                                type="MaterialCommunityIcons"
                                                style={ {fontSize: 30, color: "black" }} />
                                        </Button>
                                        <View style={styles.col}>
                                            <Text style={{ fontSize: 17, marginLeft: -20, marginTop: 15 }}>
                                                My Location
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "white",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    flex: {
        flexDirection: 'row'
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: 200,
        marginTop: 10
    },
    col: {
        flexDirection: "column",
        marginLeft: 20
    },
    icon: {
        marginTop: 7,
        height: 40
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100
    }
})

