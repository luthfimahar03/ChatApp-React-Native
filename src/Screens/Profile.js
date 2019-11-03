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


export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.navigation.getParam('username'),
            phone: this.props.navigation.getParam('phone'),
            email: this.props.navigation.getParam('email')
        }
    }


    render() {
        const { goBack } = this.props.navigation;
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
                        <Title style={{ color: "black" }}>Profile</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder contentContainerStyle={{ flexGrow: 1 }}>
                    <Card transparent >
                        <CardItem>
                            <Body>
                                <View style={{ alignSelf: 'center' }}>
                                    <Image source={{uri:`https://ui-avatars.com/api/?background=d88413&color=FFF&name=${this.props.navigation.getParam("username")}`}} style={styles.image} />
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
                                                {this.state.username}
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
                                                {this.state.email}
                                                </Text>
                                            <View
                                                style={styles.line}
                                            />
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

