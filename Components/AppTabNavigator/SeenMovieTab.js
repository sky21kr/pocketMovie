import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "native-base";
import "react-native-gesture-handler";

export default class SeenMovieTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-albums" style={{ color: tintColor }} />
    )
  };

  render() {
    return (
      <View style={style.container}>
        <Text>SeenMovieTab</Text>
        <Button
          title="hi"
          onPress={() => this.props.navigation.navigate("Detail")}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
