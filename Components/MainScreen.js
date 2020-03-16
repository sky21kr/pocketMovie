import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import MovieRankingTab from "./AppTabNavigator/MovieRankingTab";
import WantToWatchTab from "./AppTabNavigator/WantToWatchTab";
import Search from ".//AppTabNavigator/Search";
import Detail from "./AppTabNavigator/Detail";
import { Platform } from "react-native";

const AppTabNavigator = createMaterialTopTabNavigator(
  {
    MovieRankingTab: { screen: MovieRankingTab },
    WantToWatchTab: { screen: WantToWatchTab },
    //SeenMovieTab: { screen: SeenMovieTab },
    Search: { screen: Search },
    Detail: { screen: Detail }
  },

  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        ...Platform.select({
          android: {
            backgroundColor: "black"
          }
        })
      },
      iconStyle: { height: 30 },
      activeTintColor: "white",
      inactiveTintColor: "dimgray",
      upperCaseLabel: false,
      showLabel: false,
      showIcon: true
    }
  }
);

const AppTabContainet = createAppContainer(AppTabNavigator);

export default class MainScreen extends Component {
  // navigationOptions 코드 추가
  static navigationOptions = {
    //headerLeft: <Icon name='ios-camera' style={{ paddingLeft:10 }}/>,
    title: " Pocket Movie",
    headerStyle: {
      backgroundColor: "black"
    },
    headerTintColor: "white",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  render() {
    return <AppTabContainet />; // AppTabContainet 컴포넌트를 리턴한다.
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
