import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base'; // 추가된 코드
import { createAppContainer  } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import HomeTab from './AppTabNavigator/HomeTab';
import SearchTab from './AppTabNavigator/SearchTab';
import AddMediaTab from './AppTabNavigator/AddMediaTab';
import LikesTab from './AppTabNavigator/LikesTab';
import ProfileTab from './AppTabNavigator/ProfileTab';
import { Platform } from 'react-native'


const AppTabNavigator = createMaterialTopTabNavigator({
  HomeTab:{ screen: HomeTab },
  Search:{ screen: SearchTab },
  AddMedia:{ screen: AddMediaTab },
  Likes:{ screen: LikesTab },
  Profile:{ screen: ProfileTab }
}, {
  animationEnabled: true,
  swipeEnabled: true,
  tabBarPosition: "bottom",
  tabBarOptions: {
    style: {
        ...Platform.select({
          android:{
            backgroundColor:'white',
          }
        })
      },
    iconStyle: { height: 8 },
    activeTintColor: '#000',
    inactiveTintColor: '#d1cece',
    upperCaseLabel: false,
    showLabel: true,
    showIcon: true,
  }
});

const AppTabContainet = createAppContainer(AppTabNavigator);

export default class MainScreen extends Component {
  // navigationOptions 코드 추가
  static navigationOptions = {
    headerLeft: <Icon name='ios-camera' style={{ paddingLeft:10 }}/>,
    title: 'poketMovie',
    headerRight: <Icon name='ios-send' style={{ paddingRight:10 }}/>,
  }

  render() {
    return <AppTabContainet/>; // AppTabContainet 컴포넌트를 리턴한다.
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});