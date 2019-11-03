import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Left,
  Button,
  Body,
  Title
} from 'native-base';

import {
  StyleSheet,
  ToastAndroid
} from 'react-native'

import * as firebase from "firebase"
export default class Settings extends Component {

  async signOut() {
    try {
      await firebase.auth().signOut();
      console.log("Sign Out Success");
      ToastAndroid.show('Sign Out Success', ToastAndroid.SHORT);
      {this.props.navigation.navigate("Login")}
      // signed out
    } catch (error){
      console.log(error.toString())
     // an error
    } 
  }
  
  render() {
    const { goBack } = this.props.navigation;
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
          <Body>
            <Title style={{ color: "black" }}>Settings</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card transparent>
            <CardItem button onPress={() => { this.props.navigation.navigate("MyProfile") }}>
              <Icon active
                name="profile"
                type="AntDesign" />
              <Text style={styles.text} >My Profile</Text>
              <Right>
                <Icon
                  name="arrow-right"
                  type="FontAwesome"
                  style={{marginRight: -40}} />
              </Right>
            </CardItem>
            <CardItem button onPress={() => {this.signOut()}}>
              <Icon active
                name="logout"
                type="AntDesign" />
              <Text style={styles.text}>Log Out</Text>
              <Right>
                <Icon
                  name="arrow-right"
                  type="FontAwesome"
                  style={{marginRight: -45 }} />
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
  },
  header: {
    height: 60,
    backgroundColor: "white",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  }
})