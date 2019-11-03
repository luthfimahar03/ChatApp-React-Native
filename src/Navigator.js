import React, { Component } from 'react'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';


import {Icon} from 'native-base'


import Login from './Screens/Login'
import Registration from './Screens/Registration'
import Contact from './Screens/Contact'
import Profile from './Screens/Profile'
import Chats from './Screens/Chats'
import Settings from './Screens/Settings'
import MyProfile from './Screens/MyProfile'
import Loading from './Screens/Loading'
import Maps from './Screens/Maps'

import {
  View
} from 'react-native'

const TabNavigation = createMaterialBottomTabNavigator(
  {
    Contact: {
      screen: Contact,
      navigationOptions: {
        tabBarLabel: null,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor, fontSize: 24 }]} type="AntDesign" name={'contacts'} />
          </View>
        )
      }
    },
    // Maps: {
    //   screen: Maps,
    //   navigationOptions: {
    //     tabBarLabel: null,
    //     tabBarIcon: ({ tintColor }) => (
    //       <View>
    //         <Icon style={[{ color: tintColor, fontSize: 24 }]} type="MaterialCommunityIcons" name={'google-maps'} />
    //       </View>
    //     )
    //   }
    // },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarLabel: null,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor, fontSize: 24 }]} type="AntDesign" name={'setting'} />
          </View>
        )
      }
    }
  },
  {
    activeColor: '#202a43',
    inactiveColor: '#979797',
    barStyle: { backgroundColor: "#fff" }
  }
)
const MainNavigator = createStackNavigator({

  Contact: TabNavigation,
  // ListChat: {
  //   screen: ListChat
  // },
  Settings: {
    screen: Settings
  },
  Maps,
  Profile,
  MyProfile,
  Chats,
  Registration,
  Login,
  Loading
}, {
  headerMode: 'none',
  initialRouteName: 'Login'
})

export default createAppContainer(MainNavigator)