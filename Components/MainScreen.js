import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base'; // 추가된 코드
import { createAppContainer  } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import SeenMovieTab from './AppTabNavigator/MovieRankingTab';
import MovieRankingTab from './AppTabNavigator/WantToWatchTab';
import WantToWatchTab from './AppTabNavigator/SeenMovieTab';
import { Platform } from 'react-native'
//import { Ionicons } from '@expo/vector-icons';


const AppTabNavigator = createMaterialTopTabNavigator({
  "SeenMovieTab":{ screen: SeenMovieTab },
  "MovieRankingTab":{ screen: MovieRankingTab },
  "WantToWatchTab":{ screen: WantToWatchTab }
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
    iconStyle: { height: 30 },
    activeTintColor: '#000',
    inactiveTintColor: '#d1cece',
    upperCaseLabel: false,
    showLabel: false,
    showIcon: true,
  }
});

const AppTabContainet = createAppContainer(AppTabNavigator);

export default class MainScreen extends Component {
  // navigationOptions 코드 추가
  static navigationOptions = {
    //headerLeft: <Icon name='ios-camera' style={{ paddingLeft:10 }}/>,
    title: 'PoketMovie',
    headerRight: <Icon name='ios-search' style={{ paddingRight:10 }}/>,
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